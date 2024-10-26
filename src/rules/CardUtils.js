import { AdjustValue } from "./Card.js";

const CardPattern = {
  MODE_SINGLE: 1, // "single"
  MODE_PAIR: 2, // "pair"
  MODE_THREE: 3, // "three"
  MODE_THREE_ONE: 4, // "three1"  8883
  MODE_THREE_TWE: 5, // "three2"   88833

  // 6, 8, 10, 5, 6   >= 5 Cards
  MODE_AIRPLANE_NONE: 6, // MODE_THREE + "s"  # 2*3  555666
  MODE_AIRPLANE_ONE: 7, // MODE_THREE_ONE + "s"  # 2*4  55576668
  MODE_AIRPLANE_TWE: 8, // MODE_THREE_TWE + "s"  # 2*5   5557766688
  MODE_AIRPLANE_SINGLE: 9, // "single_long"  # 6   345678
  MODE_AIRPLANE_PAIR: 10, // "pair_long"  # 6    334455

  MODE_BOMB: 11, // "bombs"  # 4   3333
  MODE_TWO_RED2: 12, // "king2"  # 2   22
  MODE_INVALID: -1, // "invalid"
};

function GetCardPattern(cards) {
  cards.sort((a, b) => b - a); // Sort in descending order

  const valueSet = new Set();
  for (const card of cards) {
    valueSet.add(AdjustValue(card));
  }

  const cnt = cards.length;
  const valueSetLen = valueSet.size;

  const outputResult = cards.join(" ");
  console.log(`Sorted order is ${outputResult}`);
  console.log(`Cards ${cnt}, categories ${valueSetLen}`);

  if (cnt === 1) {
    return CardPattern.MODE_SINGLE;
  } else if (cnt === 2 && valueSetLen === 1) {
    if (JSON.stringify(cards) === JSON.stringify([48, 48])) {
      return CardPattern.MODE_BOMB;
    } else {
      return CardPattern.MODE_PAIR;
    }
  } else if (cnt === 3 && valueSetLen === 1) {
    return CardPattern.MODE_THREE;
  } else if (cnt === 4) {
    if (valueSetLen === 2) {
      if (
        (Math.floor(cards[0] / 4) === Math.floor(cards[1] / 4) &&
          Math.floor(cards[1] / 4) === Math.floor(cards[2] / 4)) ||
        (Math.floor(cards[3] / 4) === Math.floor(cards[1] / 4) &&
          Math.floor(cards[1] / 4) === Math.floor(cards[2] / 4))
      ) {
        return CardPattern.MODE_THREE_ONE;
      } else {
        return CardPattern.MODE_INVALID;
      }
    } else if (valueSetLen === 1) {
      return CardPattern.MODE_BOMB;
    } else {
      return CardPattern.MODE_INVALID;
    }
  } else if (cnt === 5) {
    if (valueSetLen === 2) {
      if (
        (Math.floor(cards[0] / 4) === Math.floor(cards[1] / 4) &&
          Math.floor(cards[1] / 4) === Math.floor(cards[2] / 4) &&
          Math.floor(cards[4] / 4) === Math.floor(cards[3] / 4)) ||
        (Math.floor(cards[0] / 4) === Math.floor(cards[1] / 4) &&
          Math.floor(cards[2] / 4) === Math.floor(cards[3] / 4) &&
          Math.floor(cards[3] / 4) === Math.floor(cards[4] / 4))
      ) {
        return CardPattern.MODE_THREE_TWE;
      } else {
        return CardPattern.MODE_INVALID;
      }
    } else if (valueSetLen === 1) {
      return CardPattern.MODE_BOMB;
    } else if (valueSetLen === 5) {
      return CardPattern.MODE_SINGLE_LONG;
    } else {
      return CardPattern.MODE_INVALID;
    }
  } else if (cnt >= 6) {
    if (valueSetLen === cnt) {
      return CardPattern.MODE_SINGLE_LONG;
    }
    if (valueSetLen === 1) {
      return CardPattern.MODE_BOMB;
    }

    if (cnt % 2 === 0 && valueSetLen === cnt / 2) {
      // TODO more detail
      return CardPattern.MODE_PAIR_LONG;
    }
    if (cnt % 3 === 0 && valueSetLen === Math.floor(cnt / 3)) {
      return CardPattern.MODE_AIRPLANE_NONE;
    }

    if (
      cnt % 5 === 0 &&
      Math.floor(cnt / 5) <= valueSetLen &&
      valueSetLen <= Math.floor(cnt / 5) * 2
    ) {
      return CardPattern.MODE_AIRPLANE_TWE;
    }
    if (
      cnt % 4 === 0 &&
      Math.floor(cnt / 4) <= valueSetLen &&
      valueSetLen <= Math.floor(cnt / 4) * 2
    ) {
      return CardPattern.MODE_AIRPLANE_ONE;
    }

    return CardPattern.MODE_INVALID;
  } else {
    return CardPattern.MODE_INVALID;
  }
}

function IsShotValid(existCards, newCards) {}

export { CardPattern, GetCardPattern, IsShotValid };
