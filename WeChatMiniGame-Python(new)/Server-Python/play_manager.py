from abc import abstractmethod, ABC
from itertools import cycle


class PlayManager(ABC):
    def __init__(self, banker_seat: int, logger):
        self._logger = logger
        self._iter_seat = cycle([(banker_seat + i) % 4 for i in range(4)])
        self._from_seat = next(self._iter_seat)
        self._card_counts = [26] * 4
        self._scorer = None
        self._score = 0
        self.act = self._act0

    @abstractmethod
    def _act0(self, action_cards: list[int], action_score: int):
        return NotImplemented


class SinglePlay(PlayManager):
    def __init__(self, banker_seat: int, logger):
        super().__init__(banker_seat, logger)
        self._banker_seat = banker_seat

    def _act0(self, action_cards: list[int], action_score: int):
        if self._card_counts[self._from_seat] == len(action_cards):
            winner = [self._banker_seat]
            loser = list(range(4))
            loser.remove(self._banker_seat)
            if self._from_seat != self._banker_seat:
                winner, loser = loser, winner
            self._logger.info(f'act0[game end] winner: {winner}, loser: {loser}')
            return {
                'from_seat': self._from_seat,
                'single_play_result': [winner, loser]
            }

        self._card_counts[self._from_seat] -= len(action_cards)
        self._scorer = self._from_seat
        self._score += action_score

        self.act = self._act1
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act0 --> act1  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act1(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act1[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act2
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act1[pass] --> act2  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act2(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act2[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act3
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act2[pass] --> act3  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act3(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act3[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act0
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        score, self._score = self._score, 0
        self._logger.info(f'act3[pass round end] --> act0  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': score
        }


class TeamPlay(PlayManager):
    def __init__(self, banker_seat: int, banker_card: list[int], teammates: list[int], logger):
        super().__init__(banker_seat, logger)
        self._banker_card = banker_card
        self._teammates = teammates
        self._banker_teammate = self._teammates[banker_seat]
        self._scores = [0] * 4
        self._play_over_seqs = []
        self._banker_card_played = False

    def _act0(self, action_cards: list[int], action_score: int):
        self._card_counts[self._from_seat] -= len(action_cards)
        self._scorer = self._from_seat
        self._score += action_score

        if not self._banker_card_played and self._from_seat == self._banker_teammate:
            self._banker_card_played = self._banker_card in action_cards

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            self._iter_seat = cycle([next(self._iter_seat), next(self._iter_seat), next(self._iter_seat)])
            self.act = self._act4
        else:
            self.act = self._act1

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act0 --> {self.act.__name__}  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act1(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act1[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act2
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act1[pass] --> act2  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act2(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act2[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act3
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act2[pass] --> act3  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act3(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act3[action] --> act0')
            return self._act0(action_cards, action_score)

        self.act = self._act0
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._scores[self._scorer] += self._score
        score, self._score = self._score, 0
        self._logger.info(f'act3[pass round end] --> act0  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': score
        }

    def _act4(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act4[action] --> act9')
            return self._act9(action_cards, action_score)

        if not self._banker_card_played or self._teammates[self._play_over_seqs[0]] == self._from_seat:
            self.act = self._act5
        else:
            self.act = self._act7
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act4[pass] --> {self.act.__name__}  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act5(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act5[action] --> act9')
            return self._act9(action_cards, action_score)

        self.act = self._act6
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act5[pass] --> act6  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act6(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act6[action] --> act9')
            return self._act9(action_cards, action_score)

        self.act = self._act9
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._scores[self._scorer] += self._score
        score, self._score = self._score, 0
        self._logger.info(f'act6[pass round end] --> act9  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': score
        }

    def _act7(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act7[action] --> act9')
            return self._act9(action_cards, action_score)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

        if self._teammates[self._play_over_seqs[0]] == self._from_seat:
            self.act = self._act9
            self._scores[self._scorer] += self._score
            score, self._score = self._score, 0
            self._logger.info(f'act7[pass round end] --> act9  from: {from_seat} -- next: {self._from_seat}')
            ret |= {
                'scorer': self._scorer,
                'score': score
            }
        else:
            self.act = self._act8
            self._logger.info(f'act7[pass] --> act8  from: {from_seat} -- next: {self._from_seat}')

        return ret

    def _act8(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act8[action] --> act9')
            return self._act9(action_cards, action_score)

        self.act = self._act9
        from_seat, _, self._from_seat = self._from_seat, next(self._iter_seat), next(self._iter_seat)
        self._scores[self._scorer] += self._score
        score, self._score = self._score, 0
        self._logger.info(f'act8[pass round end] --> act9  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': score
        }

    def _act9(self, action_cards: list[int], action_score: int):
        self._card_counts[self._from_seat] -= len(action_cards)
        self._scorer = self._from_seat
        self._score += action_score

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            if self._teammates[self._play_over_seqs[0]] == self._from_seat:
                self.act = self._act13
            else:
                self._iter_seat = cycle([next(self._iter_seat), next(self._iter_seat)])
                self.act = self._act10
        else:
            self.act = self._act5

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act9 --> {self.act.__name__}  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act10(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act10[action] --> act12')
            return self._act12(action_cards, action_score)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

        if self._teammates[self._play_over_seqs[1]] == self._from_seat:
            self.act = self._act12
            self._scores[self._scorer] += self._score
            score, self._score = self._score, 0
            self._logger.info(f'act10[pass round end] --> act12  from: {from_seat} -- next: {self._from_seat}')
            ret |= {
                'scorer': self._scorer,
                'score': score
            }
        else:
            self.act = self._act11
            self._logger.info(f'act10[pass] --> act11  from: {from_seat} -- next: {self._from_seat}')

        return ret

    def _act11(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._logger.info('act11[action] --> act12')
            return self._act12(action_cards, action_score)

        self.act = self._act12
        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._scores[self._scorer] += self._score
        score, self._score = self._score, 0
        self._logger.info(f'act11[pass round end] --> act12  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': score
        }

    def _act12(self, action_cards: list[int], action_score: int):
        self._card_counts[self._from_seat] -= len(action_cards)
        self._scorer = self._from_seat
        self._score += action_score

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            self.act = self._act14
        else:
            self.act = self._act11

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        self._logger.info(f'act12 --> {self.act.__name__}  from: {from_seat} -- next: {self._from_seat}')
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act13(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._card_counts[self._from_seat] -= len(action_cards)
            self._scorer = self._from_seat
            self._score += action_score

        self._scores[self._scorer] += self._score

        first, second = self._play_over_seqs
        third, fourth = self._from_seat, self._teammates[self._from_seat]
        players = [{
            'seat': seat,
            'score': self._scores[seat],
            'order': order
        } for seat, order in
            [(first, 0), (second, 1), (third, 2 if self._card_counts[third] == 0 else -1), (fourth, -1)]]

        winner = {
            'players': players[:2],
            'team_score': self._scores[first] + self._scores[second] + 80,
            'addition': 80
        }
        loser = {
            'players': players[2:],
            'team_score': self._scores[third] + self._scores[fourth] - 80,
            'addition': -80
        }
        if loser['team_score'] > winner['team_score']:
            winner, loser = loser, winner
        self._logger.info(f'act13[game end] winner: {winner}, loser: {loser}')
        return {
            'from_seat': self._from_seat,
            'scorer': self._scorer,
            'score': self._score,
            'team_play_result': [winner, loser]
        }

    def _act14(self, action_cards: list[int], action_score: int):
        if action_cards:
            self._card_counts[self._from_seat] -= len(action_cards)
            self._scorer = self._from_seat
            self._score += action_score
        self._scores[self._scorer] += self._score

        first, second, third = self._play_over_seqs
        fourth = self._from_seat
        players = [{
            'seat': seat,
            'score': self._scores[seat],
            'order': order
        } for seat, order in
            [(first, 0), (second, 1), (third, 2), (fourth, 3 if self._card_counts[fourth] == 0 else -1)]]

        if self._teammates[first] == third:  # 头游 三游
            winner = {
                'players': [players[0], players[2]],
                'team_score': self._scores[first] + self._scores[third] + 40,
                'addition': 40
            }
            loser = {
                'players': [players[1], players[3]],
                'team_score': self._scores[second] + self._scores[fourth] - 40,
                'addition': -40
            }
        else:  # 头游 尾游
            winner = {
                'players': [players[0], players[3]],
                'team_score': self._scores[first] + self._scores[fourth],
                'addition': 0
            }
            loser = {
                'players': [players[1], players[2]],
                'team_score': self._scores[second] + self._scores[third],
                'addition': 0
            }
        if loser['team_score'] > winner['team_score']:
            winner, loser = loser, winner
        self._logger.info(f'act14[game end] winner: {winner}, loser: {loser}')
        return {
            'from_seat': self._from_seat,
            'scorer': self._scorer,
            'score': self._score,
            'team_play_result': [winner, loser]
        }
