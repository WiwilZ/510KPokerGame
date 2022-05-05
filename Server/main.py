import hashlib
import hmac
import json
import secrets
import socketserver

from event_type import EventType
from room import Room


def log(message):
    print('[GameServer]:', message)


class GameServer(socketserver.BaseRequestHandler):
    _secret_key = b'wiwilz'
    _time_out = 10

    def setup(self):
        self.request.settimeout(self._time_out)
        log(f"收到 {self.client_address} 的连接请求")

    def handle(self):
        if not self._authenticate():
            return

        self.request.settimeout(None)
        self.request.sendall(b'0')
        log(f'{self.client_address} 通过验证')

        while True:
            try:
                msg = self.request.recv(4096).decode('utf-8')
                if not msg:
                    return
                log(f"收到 {self.client_address} 发来的消息：{msg}")
                self._handle_msg(msg)
            except Exception:
                return

    def finish(self):
        if (room := getattr(self, '_room', None)) is not None:
            room.remove_player(self.request)
        log(f'{self.client_address} 断开连接')

    def _authenticate(self):
        log(f'开始验证 {self.client_address}')
        msg = secrets.token_bytes(32)
        self.request.sendall(msg)
        try:
            response = self.request.recv(4096)
            digest = hmac.new(self._secret_key, msg, hashlib.sha1).digest()
            return hmac.compare_digest(digest, response)
        except Exception:
            return False

    def _handle_msg(self, msg):
        req = json.loads(msg)
        event_type = int(req['event_type'])
        match event_type:
            case EventType.QUICK_START:
                log(f'{self.client_address} QUICK_START')
                self._room = Room.join_or_create_room(self.request)
            case EventType.CREATE_ROOM:
                log(f'{self.client_address} CREATE_ROOM')
                self._room = Room(self.request)
            case EventType.JOIN_ROOM:
                room_no = req['data']['room_no']
                log(f'{self.client_address} JOIN_ROOM: {room_no}')
                self._room = Room.join_room(self.request, room_no)
            case EventType.GET_ROOM_INFO:
                log(f'{self.client_address} GET_ROOM_INFO')
                self._room.get_room_info(self.request)
            case EventType.EXIT_ROOM:
                log(f'{self.client_address} EXIT_ROOM')
                self._room.remove_player(self.request)
                self._room = None
            case EventType.DEAL:
                log(f'{self.client_address} DEAL')
                self._room.deal()
            case EventType.CHANGE_BANKER_CARD:
                banker_card = req['data']['banker_card']
                log(f'{self.client_address} CHANGE_BANKER_CARD: {banker_card}')
                self._room.change_banker_card(banker_card)
            case EventType.PLAY_CARDS:
                data = req['data']
                action_type = data['action_type']
                action_cards = data['action_cards']
                log(f'{self.client_address} PLAY_CARDS: {action_type=} {action_cards=}')
                self._room.play_cards(action_type, action_cards)
            case EventType.PLAY_AGAIN:
                log(f'{self.client_address} PLAY_AGAIN')
                self._room.play_again()


class MyThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    with MyThreadingTCPServer(('10.0.20.16', 11111), GameServer) as server:
        log(f"启动服务器：{server.server_address}")
        server.serve_forever()
    log("服务器关闭")
