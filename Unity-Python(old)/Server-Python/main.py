import hashlib
import hmac
import json
import secrets
import socketserver

import lobby
from event_type import EventType


def log(message):
    print('[GameServer]:', message)


class GameServer(socketserver.BaseRequestHandler):
    def setup(self):
        log(f"收到 {self.client_address} 的连接请求")

    def handle(self):
        log(f'验证 {self.client_address}')
        length = 32
        self.request.sendall(length.to_bytes(4, byteorder='big'))
        msg = secrets.token_bytes(length)
        self.request.sendall(msg)
        try:
            digest = hmac.new(b'wiwilz', msg, hashlib.sha1).digest()
            self.request.settimeout(5)
            response = self._read_data(len(digest))
            if not hmac.compare_digest(digest, response):
                return
        except:
            return

        self.request.settimeout(None)
        self.request.sendall(bytes([0]))
        log(f'{self.client_address} 通过验证')

        try:
            while True:
                event_type_byte = self.request.recv(1)
                if not event_type_byte:
                    return
                event_type = event_type_byte[0]
                data_len = int.from_bytes(self._read_data(4), byteorder='big')
                if data_len > 0:
                    data = json.loads(self._read_data(data_len).decode())
                    self._handle_msg(event_type, data)
                else:
                    self._handle_msg(event_type)
        except:
            return

    def finish(self):
        if (room := getattr(self, '_room', None)) is not None:
            lobby.exit_room(self.request, room)
            self._room = None
        log(f'{self.client_address} 断开连接')

    def _read_data(self, length):
        buffer = memoryview(bytearray(length))
        total_bytes = 0
        while total_bytes < length:
            read_bytes = self.request.recv_into(buffer[total_bytes:], length - total_bytes)
            if read_bytes == 0:
                raise InterruptedError()
            total_bytes += read_bytes
        return buffer.tobytes()

    def _handle_msg(self, event_type, data=None):
        log(f"收到 {self.client_address} 发来的消息：{event_type=} {data=}")
        match event_type:
            case EventType.JOIN_OR_CREATE_ROOM:
                log(f'{self.client_address} JOIN_OR_CREATE_ROOM')
                self._room = lobby.join_or_create_room(self.request)
            case EventType.CREATE_ROOM:
                log(f'{self.client_address} CREATE_ROOM')
                self._room = lobby.create_room(self.request)
            case EventType.JOIN_ROOM:
                room_no = data['room_no']
                log(f'{self.client_address} JOIN_ROOM: {room_no}')
                self._room = lobby.join_room(self.request, room_no)
            case EventType.GET_ROOM_INFO:
                log(f'{self.client_address} GET_ROOM_INFO')
                self._room.get_room_info(self.request)
            case EventType.EXIT_ROOM:
                log(f'{self.client_address} EXIT_ROOM')
                lobby.exit_room(self.request, self._room)
                self._room = None
            case EventType.DEAL:
                log(f'{self.client_address} DEAL')
                self._room.deal()
            case EventType.CHANGE_BANKER_CARD:
                banker_card = data['banker_card']
                log(f'{self.client_address} CHANGE_BANKER_CARD: {banker_card}')
                self._room.change_banker_card(banker_card)
            case EventType.PLAY_CARDS:
                action_type = data['action_type']
                action_cards = data['action_cards']
                log(f'{self.client_address} PLAY_CARDS: {action_type=} {action_cards=}')
                self._room.play_cards(action_type, action_cards)
            case EventType.RESTART:
                log(f'{self.client_address} RESTART')
                self._room.restart()


class MyThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    with MyThreadingTCPServer(('10.0.20.16', 11111), GameServer) as server:
        log(f"启动服务器：{server.server_address}")
        server.serve_forever()
    log("服务器关闭")
