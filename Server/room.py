import json
import threading

from event_type import EventType
from poker_game import PokerGame


def log(message):
    print('[Room]:', message)


class Room:
    __global_mutex = threading.Lock()
    __next_room_no = 0
    __rooms = {}

    def __init__(self, request):
        self._mutex = threading.Lock()
        self._requests = [request]
        self._poker_game = PokerGame()
        self._play_again_cnt = 0
        with Room.__global_mutex:
            self._no = Room.__next_room_no
            Room.__rooms[self._no] = self
            Room.__next_room_no += 1
            log(f'{request} 创建了一个房间。当前所有房间:')
            print(*Room.__rooms.keys())

    def add_player(self, request):
        with self._mutex:
            self._add_player(request)

    def remove_player(self, request):
        with self._mutex:
            self._remove_player(request)

    def get_room_info(self, request):
        with self._mutex:
            self._get_room_info(request)

    def deal(self):
        with self._mutex:
            self._deal()

    def change_banker_card(self, banker_card):
        with self._mutex:
            self._change_banker_card(banker_card)

    def play_cards(self, action_type, action_cards):
        with self._mutex:
            self._play_cards(action_type, action_cards)

    def play_again(self):
        with self._mutex:
            self._play_again()

    def _add_player(self, request):
        player_count = len(self._requests) + 1
        for seat, req in enumerate(self._requests):
            req.sendall(json.dumps({
                'event_type': EventType.ON_RECEIVE_ROOM_INFO,
                'data': {
                    'room_no': self._no,
                    'seat': seat,
                    'player_count': player_count
                }
            }).encode('utf-8'))
        self._requests.append(request)
        log(f'{request} 加入房间。当前房间玩家：{self._requests}')

    def _remove_player(self, request):
        if len(self._requests) == 1:
            with Room.__global_mutex:
                del Room.__rooms[self._no]
                log(f'当前房间无玩家，删除房间。当前所有房间：{Room.__rooms}')
                return

        self._requests.remove(request)
        for seat, request in enumerate(self._requests):
            request.sendall(json.dumps({
                'event_type': EventType.ON_RECEIVE_ROOM_INFO,
                'data': {
                    'room_no': self._no,
                    'seat': seat,
                    'player_count': len(self._requests)
                }
            }).encode('utf-8'))
        log(f'{request} 退出房间。当前房间玩家：{self._requests}')

    def _get_room_info(self, request):
        request.sendall(json.dumps({
            'event_type': EventType.ON_RECEIVE_ROOM_INFO,
            'data': {
                'room_no': self._no,
                'seat': self._requests.index(request),
                'player_count': len(self._requests)
            }
        }).encode('utf-8'))
        log(f'{request} get_room_info')

    def _deal(self):
        hand_cards, banker_seat, banker_card = self._poker_game.deal()
        for seat, (request, cards) in enumerate(zip(self._requests, hand_cards)):
            request.sendall(json.dumps({
                'event_type': EventType.ON_DEAL,
                'data': {
                    'seat': seat,
                    'hand_cards': cards,
                    'banker_seat': banker_seat,
                    'banker_card': banker_card
                }
            }).encode('utf-8'))
        log('向玩家发牌。')

    def _change_banker_card(self, banker_card):
        self._poker_game.change_banker_card(banker_card)
        for request in self._requests:
            request.sendall(json.dumps({
                'event_type': EventType.ON_CHANGE_BANKER_CARD,
                'data': {
                    'banker_card': banker_card
                }
            }).encode('utf-8'))
        log(f'更改庄家牌：{banker_card}')

    def _play_cards(self, action_type, action_cards):
        data = {
                   'action_type': action_type,
                   'action_cards': action_cards
               } | self._poker_game.play_cards(action_cards)
        res = json.dumps({
            'event_type': EventType.ON_RECEIVE_ACTION,
            'data': data
        }).encode('utf-8')
        for request in self._requests:
            request.sendall(res)
        log(f'广播出牌：{data}')

    def _play_again(self):
        log('玩家申请再来一局')
        if self._play_again_cnt == 3:
            self._deal()
            self._play_again_cnt = 0
        else:
            self._play_again_cnt += 1

    def empty(self):
        with self._mutex:
            return not self._requests

    def full(self):
        with self._mutex:
            return len(self._requests) == 4

    @staticmethod
    def join_room(request, room_no):
        if not room_no.isdigit():
            request.sendall(json.dumps({
                'event_type': EventType.ON_JOIN_ROOM,
                'data': {
                    'ret_code': 1
                }
            }).encode('utf-8'))
            log(f'{request} 请求加入的房间号 {room_no} 不合法')
            return None
        with Room.__global_mutex:
            room = Room.__rooms.get(int(room_no))
            if room is None:
                request.sendall(json.dumps({
                    'event_type': EventType.ON_JOIN_ROOM,
                    'data': {
                        'ret_code': 2
                    }
                }).encode('utf-8'))
                log(f'{request} 请求加入的房间号 {room_no} 不存在')
                return None
            if room.full():
                request.sendall(json.dumps({
                    'event_type': EventType.ON_JOIN_ROOM,
                    'data': {
                        'ret_code': 3
                    }
                }).encode('utf-8'))
                log(f'{request} 请求加入的房间号 {room_no} 已满员')
                return None
            room.add_player(request)
            request.sendall(json.dumps({
                'event_type': EventType.ON_JOIN_ROOM,
                'data': {
                    'ret_code': 0
                }
            }).encode('utf-8'))
            log(f'{request} 加入 {room_no} 号房间')
            return room

    @staticmethod
    def join_or_create_room(request):
        with Room.__global_mutex:
            for room in Room.__rooms.values():
                if not room.full():
                    room.add_player(request)
                    return room
        return Room(request)
