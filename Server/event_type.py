from enum import IntEnum, auto


class EventType(IntEnum):
    JOIN_OR_CREATE_ROOM = auto()
    CREATE_ROOM = auto()
    JOIN_ROOM = auto()
    GET_ROOM_INFO = auto()
    EXIT_ROOM = auto()
    DEAL = auto()
    CHANGE_BANKER_CARD = auto()
    PLAY_CARDS = auto()
    RESTART = auto()

    ON_JOIN_ROOM = auto()
    ON_ROOM_MEMBER_CHANGE = auto()
    ON_DEAL = auto()
    ON_BANKER_CARD_CHANGE = auto()
    ON_ACT = auto()
