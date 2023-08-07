import { DiceRoll, RollValue, GameRoll } from "./gameTypes";

export function rollDice(): RollValue {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1) + min) as RollValue;
}

export function newGameRoll(): GameRoll {
  const rolls: RollValue[] = [];

  for (let i = 0; i < 5; i++) {
    rolls.push(rollDice());
  }

  return rolls.map<DiceRoll>((r) => ({
    value: r,
    isLocked: false,
  })) as GameRoll;
}

export function reroll(rolls: GameRoll): GameRoll {
  const newRolls = rolls.map((r) => ({ ...r })) as GameRoll;

  newRolls.forEach((roll) => {
    if (!roll.isLocked) {
      roll.value = rollDice();
    }
  });

  return newRolls;
}
