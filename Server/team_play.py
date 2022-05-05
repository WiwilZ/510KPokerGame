from itertools import cycle


class TeamPlay:
    def __init__(self, banker_seat: int, banker_card: list[int], teams: list[int], banker_teammate: int):
        self._banker_seat = banker_seat
        self._banker_card = banker_card
        self._teams = teams
        self._banker_teammate = banker_teammate
        self._iter_seat = cycle([(banker_seat + i) % 4 for i in range(4)])
        self._from_seat = next(self._iter_seat)
        self._card_counts = [26] * 4
        self._scores = [0] * 4
        self._scorer = None
        self._score = 0
        self._play_over_seqs = []
        self._banker_card_played = False
        self._pass_cnt = 0
        self._score_map = [0, 0, 5, 0, 0, 0, 0, 10, 0, 0, 10, 0, 0]
        self.act = self._act0

    def _act0(self, action_cards: list[int]):
        self._pass_cnt = 0
        self._card_counts[self._from_seat] -= len(action_cards)
        self._score += sum(self._score_map[i // 4] for i in action_cards)
        self._scorer = self._from_seat

        if not self._banker_card_played and self._from_seat == self._banker_teammate:
            self._banker_card_played = self._banker_card in action_cards

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            self._iter_seat = cycle([next(self._iter_seat), next(self._iter_seat), next(self._iter_seat)])
            self.act = self._act2
        else:
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
            self._scores[self._scorer] += self._score
            self._score = 0
            self.act = self._act0
        else:
            self._pass_cnt += 1
        return ret

    def _act2(self, action_cards: list[int]):
        if action_cards:
            return self._act3(action_cards)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }
        if self._pass_cnt == 1 and self._banker_card_played and self._teams[self._play_over_seqs[0]] == self._teams[
            self._from_seat]:
            ret |= {
                'scorer': self._scorer,
                'score': self._score
            }
            self._scores[self._scorer] += self._score
            self._score = 0
            self.act = self._act3
        elif self._pass_cnt == 2:
            ret |= {
                'scorer': self._scorer,
                'score': self._score
            }
            self._scores[self._scorer] += self._score
            self._score = 0
            self.act = self._act3
            last_seat = next(self._iter_seat)
            if self._teams[self._play_over_seqs[0]] == self._teams[last_seat]:
                self._from_seat = last_seat
            else:
                self._iter_seat = cycle([last_seat, from_seat, self._from_seat])
        else:
            self._pass_cnt += 1
        return ret

    def _act3(self, action_cards: list[int]):
        self._pass_cnt = 0
        self._card_counts[self._from_seat] -= len(action_cards)
        self._score += sum(self._score_map[i // 4] for i in action_cards)
        self._scorer = self._from_seat

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            if self._teams[self._play_over_seqs[0]] == self._teams[self._from_seat]:
                self.act = self._act8
            else:
                self._iter_seat = cycle([next(self._iter_seat), next(self._iter_seat)])
                self.act = self._act5
        else:
            self.act = self._act4

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act4(self, action_cards: list[int]):
        if action_cards:
            return self._act3(action_cards)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }
        if self._pass_cnt == 1:
            ret |= {
                'scorer': self._scorer,
                'score': self._score
            }
            self._scores[self._scorer] += self._score
            self._score = 0
            self.act = self._act3
        else:
            self._pass_cnt += 1
        return ret

    def _act5(self, action_cards: list[int]):
        if action_cards:
            return self._act6(action_cards)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }
        if self._teams[self._play_over_seqs[1]] == self._teams[self._from_seat]:
            ret |= {
                'scorer': self._scorer,
                'score': self._score
            }
            self._scores[self._scorer] += self._score
            self._score = 0
            self.act = self._act6
        else:
            self.act = self._act7
        return ret

    def _act6(self, action_cards: list[int]):
        self._card_counts[self._from_seat] -= len(action_cards)
        self._score += sum(self._score_map[i // 4] for i in action_cards)
        self._scorer = self._from_seat

        if self._card_counts[self._from_seat] == 0:
            self._play_over_seqs.append(self._from_seat)
            self.act = self._act8
        else:
            self.act = self._act7

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        return {
            'from_seat': from_seat,
            'next_seat': self._from_seat
        }

    def _act7(self, action_cards: list[int]):
        if action_cards:
            return self._act6(action_cards)

        from_seat, self._from_seat = self._from_seat, next(self._iter_seat)
        ret = {
            'from_seat': from_seat,
            'next_seat': self._from_seat,
            'scorer': self._scorer,
            'score': self._score
        }
        self._scores[self._scorer] += self._score
        self._score = 0
        self.act = self._act6
        return ret

    def _act8(self, action_cards: list[int]):
        if action_cards:
            self._card_counts[self._from_seat] -= len(action_cards)
            self._scorer = self._from_seat
            self._score += sum(self._score_map[i // 4] for i in action_cards)

        self._scores[self._scorer] += self._score

        result = [{
            'team_score': 0,
            'addition': 0,
            'players': []
        }, {
            'team_score': 0,
            'addition': 0,
            'players': []
        }]

        first_team_id = self._teams[self._play_over_seqs[0]]
        first_team, second_team = result[first_team_id], result[not first_team_id]
        if first_team_id == self._teams[self._play_over_seqs[1]]:  # 头游 二游
            first_team['team_score'] = first_team['addition'] = 80
            second_team['team_score'] = second_team['addition'] = -80
        elif first_team_id == self._teams[self._play_over_seqs[2]]:  # 头游 三游
            first_team['team_score'] = first_team['addition'] = 40
            second_team['team_score'] = second_team['addition'] = -40

        orders = {seat: order for order, seat in enumerate(self._play_over_seqs)}
        for seat, (team, score) in enumerate(zip(self._teams, self._scores)):
            result[team]['team_score'] += score
            result[team]['players'].append({
                'seat': seat,
                'score': score,
                'order': orders.get(seat)
            })

        cmp = result[0]['team_score'] - result[1]['team_score']
        if cmp < 0 or cmp == 0 and first_team_id != 0:
            result.reverse()

        for r in result:
            if r['players'][1]['order'] < r['players'][0]['order']:
                r['players'].reverse()

        return {
            'battle_type': 1,
            'result': result,
            'from_seat': self._from_seat,
            'scorer': self._scorer,
            'score': self._score
        }
