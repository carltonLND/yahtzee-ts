export type RollValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface DiceRoll {
  value: RollValue;
  isLocked: boolean;
}

export type GameRoll = [DiceRoll, DiceRoll, DiceRoll, DiceRoll, DiceRoll];

export type RollResult = [
  RollValue,
  RollValue,
  RollValue,
  RollValue,
  RollValue,
];

export type Category =
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives"
  | "sixes"
  | "pair"
  | "two-pairs"
  | "three-of-a-kind"
  | "four-of-a-kind"
  | "small-straight"
  | "large-straight"
  | "full-house"
  | "yahtzee"
  | "chance";

export type GameScore = {
  [category in Category]: number | undefined;
};
