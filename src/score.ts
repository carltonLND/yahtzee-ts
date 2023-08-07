import { RollResult, Category, RollValue } from "./gameTypes";
import { countOccurrences, getPairs } from "./utils";

export function scoreRound(rolls: RollResult, category: Category): number {
  switch (category) {
    case "ones":
      return scoreSum(rolls, 1);
    case "twos":
      return scoreSum(rolls, 2);
    case "threes":
      return scoreSum(rolls, 3);
    case "fours":
      return scoreSum(rolls, 4);
    case "fives":
      return scoreSum(rolls, 5);
    case "sixes":
      return scoreSum(rolls, 6);
    case "pair":
      return scorePair(rolls);
    case "two-pairs":
      return scoreTwoPairs(rolls);
    case "three-of-a-kind":
      return scoreNumOfKind(rolls, 3);
    case "four-of-a-kind":
      return scoreNumOfKind(rolls, 4);
    case "small-straight":
      return scoreSmallStraight(rolls);
    case "large-straight":
      return scoreLargeStraight(rolls);
    case "full-house":
      return scoreFullHouse(rolls);
    case "yahtzee":
      return scoreYahtzee(rolls);
    case "chance":
      return scoreChance(rolls);
    default: {
      const _never: never = category;
      throw new Error(`Category "${JSON.stringify(_never)}" Not Implemented!`);
    }
  }
}

export function scoreSum(rolls: RollResult, num: RollValue): number {
  return rolls.reduce((acc, curr) => acc + (curr === num ? curr : 0), 0);
}

export function scorePair(rolls: RollResult): number {
  const pairs = getPairs(countOccurrences(rolls));
  return pairs.length === 0 ? 0 : Math.max(...pairs) * 2;
}

export function scoreTwoPairs(rolls: RollResult): number {
  const occurrences = countOccurrences(rolls);

  for (const [roll, count] of occurrences.entries()) {
    if (count >= 4) {
      return roll * 4;
    }
  }

  const pairs = getPairs(occurrences);
  return pairs.length < 2 ? 0 : pairs.reduce((prev, curr) => prev + curr) * 2;
}

export function scoreNumOfKind(rolls: RollResult, num: number): number {
  const occurrences = countOccurrences(rolls);

  for (const [roll, count] of occurrences.entries()) {
    if (count >= num) {
      return roll * num;
    }
  }

  return 0;
}

export function scoreSmallStraight(rolls: RollResult): number {
  return JSON.stringify(rolls) === "[1,2,3,4,5]" ? 15 : 0;
}

export function scoreLargeStraight(rolls: RollResult): number {
  return JSON.stringify(rolls) === "[2,3,4,5,6]" ? 20 : 0;
}

export function scoreFullHouse(rolls: RollResult): number {
  const rollCounts = [...countOccurrences(rolls).values()];
  return rollCounts.length === 2 && rollCounts.every((count) => count > 1)
    ? rolls.reduce((acc, curr) => acc + curr, 0)
    : 0;
}

export function scoreYahtzee(rolls: RollResult): number {
  return new Set(rolls).size === 1 ? 50 : 0;
}

export function scoreChance(rolls: RollResult): number {
  return rolls.reduce((acc, curr) => acc + curr, 0);
}
