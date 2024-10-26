function AdjustValue(card) {
  return Math.floor(card / 4);
}

function SingleCardCompare(card1, card2) {
  return AdjustValue(card1) - AdjustValue(card2);
}

export { AdjustValue, SingleCardCompare };
