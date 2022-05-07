import random

from battle_manager import BankerPlayAlone, TeamPlay


class FiveTenK:
    def __init__(self):
        self._hand_cards = None
        self._banker_seat = None
        self._banker_card = None
        self._battle_manager = None

    def deal(self):
        self._shuffle()
        self._team()
        return self._hand_cards, self._banker_seat, self._banker_card

    def change_banker_card(self, banker_card: int):
        self._banker_card = banker_card
        self._team()

    def play_cards(self, action_cards: list[int]):
        return self._battle_manager.act(action_cards)

    def _shuffle(self):
        cards = list(range(52)) * 2
        random.shuffle(cards)
        banker_card_index = random.randint(0, 103)
        self._banker_card = cards[banker_card_index]
        self._banker_seat = banker_card_index // 26
        self._hand_cards = [sorted(cards[i * 26: (i + 1) * 26], reverse=True) for i in range(4)]

    def _team(self):
        if self._hand_cards[self._banker_seat].count(self._banker_card) == 2:
            self._battle_manager = BankerPlayAlone(self._banker_seat)
            return

        for i, hand_cards in enumerate(self._hand_cards):
            if i == self._banker_seat:
                continue
            if self._banker_card in hand_cards:
                a, b = self._banker_seat, i
                c, d = set(range(4)) - {a, b}
                teammates = [0] * 4
                teammates[a] = b
                teammates[b] = a
                teammates[c] = d
                teammates[d] = a
                self._battle_manager = TeamPlay(self._banker_seat, self._banker_card, teammates)
                return
