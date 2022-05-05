from itertools import cycle


class BankerPlayAlone:
    def __init__(self, banker_seat: int):
        self._iter_seat = cycle([(banker_seat + i) % 4 for i in range(4)])
        self._from_seat = banker_seat
        self._card_counts = [26] * 4
        self._scorer = None
        self._score = 0
        self._pass_cnt = 0
        self._score_map = [0, 0, 5, 0, 0, 0, 0, 10, 0, 0, 10, 0, 0]
        self.act = self._act0

    def _act0(self, action_cards: list[int]):
        self._pass_cnt = 0
        self._card_counts[self._from_seat] -= len(action_cards)
        if self._card_counts[self._from_seat] == 0:
            return {
                'battle_type': 0,
                'winner': self._from_seat,
                'from_seat': self._from_seat
            }

        self._score += sum(self._score_map[i // 4] for i in action_cards)
        self._scorer = self._from_seat
        self.act = self._act1

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act1(self, action_cards: list[int]):
        if action_cards:
            return self._act0(action_cards)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }
        if self._pass_cnt == 2:
            ret |= {
                'scorer': self._scorer,
                'score': self._score
            }
            self._score = 0
            self.act = self._act0
        else:
            self._pass_cnt += 1
        return ret
