import asyncio
import json
import logging
from itertools import count

import websockets
from prettytable import PrettyTable

from five_ten_k import FiveTenK


def serialize(obj):
    return json.dumps(obj, separators=(',', ':'))


iter_room_no = count()

logger = logging.getLogger('room')
logger.setLevel(logging.INFO)
__file_handler = logging.FileHandler('logs/room.log', encoding='utf-8')
__file_handler.setFormatter(logging.Formatter(
    "[%(asctime)s file %(filename)s, %(funcName)s, line %(lineno)d] %(message)s", "%Y-%m-%d %H:%M:%S"
))
logger.addHandler(__file_handler)


class Room:
    rooms = {}

    def __init__(self):
        self.no = str(next(iter_room_no))
        self.websockets = {}
        self.players = [None] * 4
        self.logger = logging.getLogger(self.no)
        self.logger.setLevel(logging.INFO)
        file_handler = logging.FileHandler(f'logs/room/{self.no}.log', encoding='utf-8')
        file_handler.setFormatter(logging.Formatter(
            "[%(asctime)s file %(filename)s, %(funcName)s, line %(lineno)d] %(message)s", "%Y-%m-%d %H:%M:%S"
        ))
        self.logger.addHandler(file_handler)
        self.battle_manager = FiveTenK(self.logger)
        self.is_in_battle = False

    @property
    def player_count(self):
        return len(self.websockets)

    def replace_websocket(self, old, new):
        self.websockets[new] = self.websockets.pop(old)

    def add_player(self, websocket):
        seat = self.players.index(None)
        self.logger.info(f'add player `{websocket.nickname}` with seat {seat}')
        info = {
            'nickname': websocket.nickname,
            'avatar_url': websocket.avatar_url
        }
        self.players[seat] = info

        websockets.broadcast(self.websockets, serialize({
            'type': 'player_enter',
            'data': {
                'seat': seat,
                'info': info
            }
        }))

        self.websockets[websocket] = seat
        self.logger.info(f"\n{self.table('add player')}")

    def remove_player(self, websocket):
        try:
            seat = self.websockets[websocket]
        except KeyError:
            return

        self.is_in_battle = False
        del self.websockets[websocket]
        self.players[seat] = None

        websockets.broadcast(self.websockets, serialize({
            'type': 'player_exit',
            'data': {
                'seat': seat
            }
        }))
        self.logger.info(f"\n{self.table('remove player')}")

    async def get_players_info(self, websocket):
        seat = self.websockets[websocket]
        await websocket.send(serialize({
            'type': 'get_players_info_result',
            'data': {
                'player_list': self.players,
                'player_count': self.player_count
            }
        }))
        self.logger.info(f'{self.players[seat]["nickname"]} get players info')

    async def start(self):
        self.logger.info('-----deal-----')
        self.is_in_battle = True
        hand_list, banker_seat, banker_card = self.battle_manager.deal()
        await asyncio.wait({
            ws.send(serialize({
                'type': 'deal',
                'data': {
                    'banker_seat': banker_seat,
                    'banker_card': banker_card,
                    'my_hand': hand_list[seat]
                }
            })) for ws, seat in self.websockets.items()
        })

    def change_banker_card(self, websocket, banker_card):
        self.logger.info(f'change banker card: {banker_card}')
        self.battle_manager.change_banker_card(banker_card)
        websockets.broadcast(self.websockets.keys() - {websocket}, serialize({
            'type': 'player_change_banker_card',
            'data': {
                'banker_card': banker_card
            }
        }))

    def play(self, model, cards):
        self.logger.info(f'play: model: {model} cards: {cards}')
        res = self.battle_manager.play(cards)
        websockets.broadcast(self.websockets, serialize({
            'type': 'player_play',
            'data': {
                        'action': {
                            'model': model,
                            'cards': cards
                        }
                    } | res
        }))

    def table(self, title=None):
        x = PrettyTable(['seat', '0', '1', '2', '3'])
        if title:
            x.title = title
        x.align['seat'] = 'l'
        x.add_row(['nickname'] + [p['nickname'] if p else '' for p in self.players])
        return str(x)

    def __str__(self):
        return self.table()

    @classmethod
    async def match_room(cls, websocket):
        logger.info(f'{websocket.nickname} match room begin')

        for room in cls.rooms.values():
            if room.player_count < 4:
                break
        else:
            room = cls()
            cls.rooms[room.no] = room
            logger.info(f'{websocket.nickname} create room #{room.no}')
            logger.info('current total rooms:')
            for no, room in cls.rooms.items():
                logger.info(f'#{no}\n{room}')

        room.add_player(websocket)
        await websocket.send(serialize({
            'type': 'match_room_result',
            'data': {
                'room_no': room.no,
                'my_seat': room.websockets[websocket]
            }
        }))
        logger.info(f'{websocket.nickname} match room #{room.no}')
        return room

    @classmethod
    async def create_room(cls, websocket):
        logger.info(f'{websocket.nickname} create room begin')

        for room in cls.rooms.values():
            if room.player_count == 0:
                break
        else:
            room = cls()
            cls.rooms[room.no] = room
            logger.info(f'{websocket.nickname} create room #{room.no}')
            logger.info('current total rooms:')
            for no, room in cls.rooms.items():
                logger.info(f'#{no}\n{room}')

        room.add_player(websocket)
        await websocket.send(serialize({
            'type': 'create_room_result',
            'data': {
                'room_no': room.no
            }
        }))
        return room

    @classmethod
    async def join_room(cls, websocket, room_no):
        logger.info(f'{websocket.nickname} join room #{room_no} begin')

        room = cls.rooms.get(room_no)

        if room is None:
            await websocket.send(serialize({
                'type': 'join_room_result',
                'data': {
                    'error_msg': f'{room_no}号房间不存在'
                }
            }))
            logger.info(f'{websocket.nickname} join room #{room_no} not existed')
            return None
        if room.player_count == 4:
            await websocket.send(serialize({
                'type': 'join_room_result',
                'data': {
                    'error_msg': f'{room_no}号房间已满'
                }
            }))
            logger.info(f'{websocket.nickname} join room #{room_no} full')

        room.add_player(websocket)
        await websocket.send(serialize({
            'type': 'join_room_result',
            'data': {
                'room_no': room.no,
                'my_seat': room.websockets[websocket]
            }
        }))
        logger.info(f'{websocket.nickname} join to room #{room_no}')
        return room
