from itertools import count
from threading import RLock

from event_type import EventType
from room import Room
from util import send_response

mutex = RLock()
iter_room_no = count()
rooms: dict[int, Room] = {}


def log(message):
    print('[lobby]:', message)


def create_room(request):
    with mutex:
        room_no = next(iter_room_no)
        room = Room(request, room_no)
        rooms[room_no] = room
        log(f'{request} 创建了一个房间。当前所有房间：')
        for r in rooms.values():
            print(r)
        return room


def join_room(request, room_no):
    if not room_no.isdigit():
        send_response(request, EventType.ON_JOIN_ROOM, {'return_code': 1})
        log(f'{request} 请求加入的房间号 `{room_no}` 不合法')
        return None

    with mutex:
        room = rooms.get(int(room_no))
        if room is None:
            send_response(request, EventType.ON_JOIN_ROOM, {'return_code': 2})
            log(f'{request} 请求加入的房间号 `{room_no}` 不存在')
            return None
        if room.full():
            send_response(request, EventType.ON_JOIN_ROOM, {'return_code': 3})
            log(f'{request} 请求加入的房间号 `{room_no}` 已满员')
            return None

        room.add_player(request)
        send_response(request, EventType.ON_JOIN_ROOM, {'return_code': 0})
        log(f'{request} 加入房间: {room}')
        return room


def join_or_create_room(request):
    with mutex:
        for room in rooms.values():
            if not room.full():
                room.add_player(request)
                log(f'{request} 加入房间: {room}')
                return room
        return create_room(request)


def exit_room(request, room):
    with mutex:
        room.remove_player(request)
        log(f'{request} 退出房间: {room}')
        if room.empty():
            del rooms[room.no]
            log(f'删除房间。当前所有房间：')
            for r in rooms.values():
                print(r)
