import { RollResult } from "./gameTypes";

type RollOccurrences = Map<number, number>;

export function countOccurrences(rolls: RollResult): RollOccurrences {
  const rollOccurrences = new Map<number, number>();

  rolls.forEach((roll) => {
    const numOccurrences = rollOccurrences.get(roll);
    rollOccurrences.set(
      roll,
      numOccurrences === undefined ? 1 : numOccurrences + 1,
    );
  });

  return rollOccurrences;
}

export function getPairs(rollOccurrences: RollOccurrences): number[] {
  return [...rollOccurrences]
    .filter(([, numOccurrences]) => numOccurrences > 1)
    .map(([roll]) => roll);
}
