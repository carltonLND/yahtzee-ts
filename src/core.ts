import { DiceRoll, RollValue, GameScore } from "./gameTypes";
import { scoreAll } from "./score";

export function newGameScore(): GameScore {
  return {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    pair: undefined,
    "two-pairs": undefined,
    "three-of-a-kind": undefined,
    "four-of-a-kind": undefined,
    "small-straight": undefined,
    "large-straight": undefined,
    "full-house": undefined,
    yahtzee: undefined,
    chance: undefined,
  };
}

export function rollDice(): RollValue {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1) + min) as RollValue;
}

export function newGameRoll(): DiceRoll[] {
  const rolls: RollValue[] = [];

  for (let i = 0; i < 5; i++) {
    rolls.push(rollDice());
  }

  return rolls.map<DiceRoll>((r) => ({
    value: r,
    isLocked: false,
  }));
}

export function reroll(rolls: DiceRoll[]): DiceRoll[] {
  const newRolls = rolls.map((r) => ({ ...r }));

  newRolls.forEach((roll) => {
    if (!roll.isLocked) {
      roll.value = rollDice();
    }
  });

  return newRolls;
}

// EXAMPLE USE
// const gameState = {
//   roll: newGameRoll(),
//   score: newGameScore(),
// };
//
// const rollValues = gameState.roll.map((r) => r.value);
// console.log(scoreAll(rollValues, gameState.score));
