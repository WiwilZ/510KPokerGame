from enum import IntEnum, auto


class EventType(IntEnum):
    QUICK_START = auto()
    CREATE_ROOM = auto()
    JOIN_ROOM = auto()
    GET_ROOM_INFO = auto()
    EXIT_ROOM = auto()
    DEAL = auto()
    CHANGE_BANKER_CARD = auto()
    PLAY_CARDS = auto()
    PLAY_AGAIN = auto()

    ON_JOIN_ROOM = auto()
    ON_RECEIVE_ROOM_INFO = auto()
    ON_DEAL = auto()
    ON_CHANGE_BANKER_CARD = auto()
    ON_RECEIVE_ACTION = auto()

