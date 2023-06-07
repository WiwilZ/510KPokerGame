import random

from play_manager import SinglePlay, TeamPlay


class FiveTenK:
    card_score_map = [0, 0, 5, 0, 0, 0, 0, 10, 0, 0, 10, 0, 0]

    def __init__(self, logger):
        self._logger = logger
        self._hand_list = None
        self._banker_seat = None
        self._banker_card = None
        self._play_manager = None

    def deal(self):
        self._shuffle()
        self._team()
        return self._hand_list, self._banker_seat, self._banker_card

    def change_banker_card(self, banker_card: int):
        self._banker_card = banker_card
        self._team()

    def play(self, cards: list[int]):
        score = sum(self.card_score_map[i // 4] for i in cards) if cards else 0
        return self._play_manager.act(cards, score)

    def _shuffle(self):
        cards = list(range(52)) * 2
        random.shuffle(cards)
        banker_card_index = random.randint(0, 103)
        self._banker_card = cards[banker_card_index]
        self._banker_seat = banker_card_index // 26
        self._hand_list = [sorted(cards[i * 26: (i + 1) * 26], reverse=True) for i in range(4)]
        self._logger.info(
            f'shuffle: hand_list: {self._hand_list}, banker_seat: {self._banker_seat}, banker_card: {self._banker_card}')

    def _team(self):
        if self._hand_list[self._banker_seat].count(self._banker_card) == 2:
            self._play_manager = SinglePlay(self._banker_seat, self._logger)
            self._logger.info(f'{self._banker_seat} play alone')
            return

        for i, hand_cards in enumerate(self._hand_list):
            if i == self._banker_seat:
                continue
            if self._banker_card in hand_cards:
                a, b = self._banker_seat, i
                c, d = set(range(4)) - {a, b}
                teammates = [0] * 4
                teammates[a] = b
                teammates[b] = a
                teammates[c] = d
                teammates[d] = c
                self._play_manager = TeamPlay(self._banker_seat, self._banker_card, teammates, self._logger)
                self._logger.info(f'{a} team {b}  {c} team {d}')
                return
