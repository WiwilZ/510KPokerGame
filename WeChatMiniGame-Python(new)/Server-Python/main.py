import asyncio
import json
import logging
from http import HTTPStatus
from urllib.parse import unquote

import websockets

from room import Room

users = {}


async def ws_handler(websocket):
    authorization = json.loads(websocket.request_headers["Authorization"])

    nickname = unquote(authorization['nickname'])
    avatar_url = authorization['avatar_url']
    openid = authorization['openid']

    logger = logging.getLogger(openid)
    logger.setLevel(logging.INFO)
    file_handler = logging.FileHandler(f'logs/user/{nickname}-{openid}.log', encoding='utf-8')
    file_handler.setFormatter(logging.Formatter(
        "[%(asctime)s file %(filename)s, %(funcName)s, line %(lineno)d] %(message)s", "%Y-%m-%d %H:%M:%S"
    ))
    logger.addHandler(file_handler)
    logger.info('-----已连接-----')

    websocket.nickname = nickname
    websocket.avatar_url = avatar_url
    websocket.openid = openid
    websocket.logger = logger

    event = authorization['event']
    match event['type']:
        case 'match_room':
            if ws := users.get(openid):
                await ws.close()
            websocket.room = await Room.match_room(websocket)
        case 'create_room':
            if ws := users.get(openid):
                await ws.close()
            websocket.room = await Room.create_room(websocket)
        case 'join_room':
            if ws := users.get(openid):
                await ws.close()
            websocket.room = await Room.join_room(websocket, event['data']['room_no'])
            if websocket.room is None:
                logger.info('-----加入房间失败，断开连接-----')
                return
        case 'reconnect':
            if ws := users.get(openid):
                websocket.room = ws.room
                websocket.room.replace_websocket(ws, websocket)
                await ws.close()

                seat = websocket.room.websockets[websocket]
                if not websocket.room.is_in_battle:
                    obj = {
                        'type': 'reconnect_result',
                        'data': {
                            'player_list': websocket.room.players,
                            'player_count': websocket.room.player_count,
                            'my_seat': seat
                        }
                    }
                    logger.info('恢复组队阶段')
                else:
                    obj = {
                        'type': 'reconnect_result',
                        'data': {
                            'player_list': websocket.room.players,
                            'player_count': websocket.room.player_count,
                            'my_seat': seat,
                            'battle_state': {

                            }
                        }
                    }
                    logger.info('恢复对战阶段')
                await websocket.send(json.dumps(obj, separators=(',', ':')))
            else:
                await websocket.send(json.dumps({
                    'type': 'reconnect_result',
                    'data': {
                        'error_msg': '后台挂起超过1分钟，已被移出房间'
                    }
                }, separators=(',', ':')))
                logger.info('-----后台挂起超过1分钟，已被移出房间，断开连接-----')
                return

    users[openid] = websocket

    try:
        async for message in websocket:
            logger.info(f'receive event: {message}')
            event = json.loads(message)
            match event['type']:
                case 'hide':
                    msg = await asyncio.wait_for(websocket.recv(), timeout=60)
                    logger.info(f'receive event: {msg}')

                case 'join_room':
                    websocket.room.remove_player(websocket)
                    websocket.room = await Room.join_room(websocket, event['data']['room_no'])
                    if websocket.room is None:
                        logger.info('-----加入房间失败，断开连接-----')
                        return

                case 'get_players_info':
                    await websocket.room.get_players_info(websocket)

                case 'start':
                    await websocket.room.start()

                case 'change_banker_card':
                    websocket.room.change_banker_card(websocket, event['data']['banker_card'])
                case 'play':
                    data = event['data']['action']
                    websocket.room.play(data['model'], data['cards'])
    except Exception as e:
        logger.info(f'发生异常：{e}')

    del users[openid]
    websocket.room.remove_player(websocket)
    logger.info('-----断开连接-----')


logging.basicConfig(
    format="[%(asctime)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    level=logging.INFO,
    encoding='utf-8'
)


class MyWebSocketServerProtocol(websockets.WebSocketServerProtocol):
    async def process_request(self, path, request_headers):
        try:
            authorization = json.loads(request_headers["Authorization"])
        except Exception:
            authorization = {}

        if authorization.keys() == {'nickname', 'avatar_url', 'openid', 'event'}:
            return await super().process_request(path, request_headers)
        print('authenticate failed!')
        return HTTPStatus.UNAUTHORIZED, {}, b''


async def main():
    async with websockets.serve(ws_handler, '127.0.0.1', 54321, create_protocol=MyWebSocketServerProtocol):
        await asyncio.Future()


asyncio.run(main())
