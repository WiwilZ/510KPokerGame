def ascending(cards):
    cards.sort(key=lambda x: (x + 11) % 13)
    return cards


def descending(cards):
    cards.sort(key=lambda x: (x + 11) % 13, reverse=True)
    return cards


score_map = [0, 0, 0, 0, 5, 0, 0, 0, 0, 10, 0, 0, 10]
