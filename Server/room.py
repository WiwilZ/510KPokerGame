from threading import RLock

from event_type import EventType
from five_ten_k import FiveTenK
from util import send_response


def log(message):
    print('[Room]:', message)


class Room:
    def __init__(self, request, room_no):
        self._requests = [request]
        self._no = room_no
        self._battle_manager = FiveTenK()
        self._restart_cnt = 0
        self._mutex = RLock()

    @property
    def no(self):
        return self._no

    def empty(self):
        return not self._requests

    def full(self):
        return len(self._requests) == 4

    def __str__(self):
        return f'{self._no}: {self._requests}'

    def add_player(self, request):
        data = {
            'room_no': self._no,
            'member_count': len(self._requests) + 1,
            'seat': -1
        }
        for seat, req in enumerate(self._requests):
            data['seat'] = seat
            send_response(req, EventType.ON_ROOM_MEMBER_CHANGE, data)
        self._requests.append(request)
        log(f'{request} 加入房间。当前房间玩家：{self._requests}')

    def remove_player(self, request):
        self._requests.remove(request)
        data = {
            'room_no': self._no,
            'member_count': len(self._requests),
            'seat': -1
        }
        for seat, req in enumerate(self._requests):
            data['seat'] = seat
            send_response(req, EventType.ON_ROOM_MEMBER_CHANGE, data)
        log(f'{request} 退出房间。当前房间玩家：{self._requests}')

    def get_room_info(self, request):
        send_response(request, EventType.ON_ROOM_MEMBER_CHANGE, {
            'room_no': self._no,
            'member_count': len(self._requests),
            'seat': self._requests.index(request)
        })
        log(f'{request} 请求获取房间信息。')

    def deal(self):
        hand_cards, banker_seat, banker_card = self._battle_manager.deal()
        for seat, (request, cards) in enumerate(zip(self._requests, hand_cards)):
            send_response(request, EventType.ON_DEAL, {
                'seat': seat,
                'hand_cards': cards,
                'banker_seat': banker_seat,
                'banker_card': banker_card
            })
        log('向玩家发牌。')

    def change_banker_card(self, banker_card):
        self._battle_manager.change_banker_card(banker_card)
        data = {'banker_card': banker_card}
        for request in self._requests:
            send_response(request, EventType.ON_BANKER_CARD_CHANGE, data)
        log(f'重选庄家牌：{banker_card}')

    def play_cards(self, action_type, action_cards):
        data = {
                   'action_type': action_type,
                   'action_cards': action_cards
               } | self._battle_manager.play_cards(action_cards)
        for request in self._requests:
            send_response(request, EventType.ON_ACT, data)
        log(f'广播出牌：{action_type=} {action_cards=}')

    def restart(self):
        log('玩家申请再来一局')
        with self._mutex:
            if self._restart_cnt == 3:
                self.deal()
                self._restart_cnt = 0
            else:
                self._restart_cnt += 1
