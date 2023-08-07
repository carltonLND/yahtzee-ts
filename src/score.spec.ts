import {
  scorePair,
  scoreRound,
  scoreSum,
  scoreNumOfKind,
  scoreTwoPairs,
  scoreSmallStraight,
  scoreLargeStraight,
  scoreFullHouse,
  scoreYahtzee,
  scoreChance,
} from "./score";

// Round scoring switch function tests

test("correctly scores for sum categories", () => {
  expect(scoreRound([1, 1, 2, 2, 2], "ones")).toBe(2);
  expect(scoreRound([1, 1, 2, 2, 2], "twos")).toBe(6);
  expect(scoreRound([1, 3, 3, 3, 2], "threes")).toBe(9);
  expect(scoreRound([1, 1, 2, 4, 2], "fours")).toBe(4);
  expect(scoreRound([1, 1, 2, 2, 2], "fives")).toBe(0);
  expect(scoreRound([1, 6, 2, 6, 2], "sixes")).toBe(12);
});

test("correctly scores pair category", () => {
  expect(scoreRound([3, 3, 5, 5, 1], "pair")).toBe(10);
  expect(scoreRound([3, 2, 4, 5, 1], "pair")).toBe(0);
});

test("correctly score two pairs category", () => {
  expect(scoreRound([2, 2, 4, 5, 4], "two-pairs")).toBe(12);
  expect(scoreRound([2, 1, 4, 5, 4], "two-pairs")).toBe(0);
});

test("correctly scores 3 of a kind category", () => {
  expect(scoreRound([2, 2, 3, 3, 2], "three-of-a-kind")).toBe(6);
  expect(scoreRound([2, 2, 3, 3, 1], "three-of-a-kind")).toBe(0);
});

test("correctly scores 4 of a kind category", () => {
  expect(scoreRound([2, 2, 3, 2, 2], "four-of-a-kind")).toBe(8);
  expect(scoreRound([2, 2, 3, 3, 1], "four-of-a-kind")).toBe(0);
});

test("correctly scores a small straight category", () => {
  expect(scoreRound([1, 2, 3, 4, 5], "small-straight")).toBe(15);
  expect(scoreRound([1, 1, 3, 4, 5], "small-straight")).toBe(0);
});

test("correctly scores a large straight category", () => {
  expect(scoreRound([2, 3, 4, 5, 6], "large-straight")).toBe(20);
  expect(scoreRound([2, 2, 4, 5, 6], "large-straight")).toBe(0);
});

test("correctly scores a full house category", () => {
  expect(scoreRound([5, 5, 6, 6, 6], "full-house")).toBe(28);
  expect(scoreRound([6, 6, 6, 6, 6], "full-house")).toBe(0);
});

test("correctly scores a yahtzee category", () => {
  expect(scoreRound([6, 6, 6, 6, 6], "yahtzee")).toBe(50);
  expect(scoreRound([1, 6, 6, 6, 6], "yahtzee")).toBe(0);
});

test("correctly scores a chance category", () => {
  expect(scoreRound([5, 5, 5, 5, 5], "chance")).toBe(25);
  expect(scoreRound([1, 1, 1, 1, 5], "chance")).toBe(9);
});

// Scoring function tests

test("sums roll containing 3s", () => {
  expect(scoreSum([1, 3, 4, 3, 3], 3)).toBe(9);
});

test("finds and sums pair correctly", () => {
  expect(scorePair([1, 1, 4, 4, 5])).toBe(8);
});

test("returns 0 if no pairs", () => {
  expect(scorePair([1, 2, 3, 4, 5])).toBe(0);
});

test("sums two pairs", () => {
  expect(scoreTwoPairs([1, 1, 5, 5, 2])).toBe(12);
  expect(scoreTwoPairs([1, 1, 1, 1, 2])).toBe(4);
});

test("returns 0 if no two pairs", () => {
  expect(scoreTwoPairs([1, 1, 3, 4, 5])).toBe(0);
  expect(scoreTwoPairs([1, 2, 3, 4, 5])).toBe(0);
});

test("allows 2 pairs of the same number", () => {
  expect(scoreTwoPairs([1, 1, 1, 1, 5])).toBe(4);
});

test("identifies and sums 3 of a kind", () => {
  expect(scoreNumOfKind([3, 3, 4, 3, 4], 3)).toBe(9);
  expect(scoreNumOfKind([3, 3, 3, 3, 3], 3)).toBe(9);
});

test("return 0 if no 3 of a kind", () => {
  expect(scoreNumOfKind([1, 2, 3, 3, 4], 3)).toBe(0);
});

test("identifies and sums 4 of a kind", () => {
  expect(scoreNumOfKind([4, 4, 4, 3, 4], 4)).toBe(16);
  expect(scoreNumOfKind([3, 3, 3, 3, 3], 4)).toBe(12);
});

test("return 0 if no 4 of a kind", () => {
  expect(scoreNumOfKind([1, 2, 3, 3, 4], 4)).toBe(0);
});

test("identifies a small straight and returns 15 (sum of nums)", () => {
  expect(scoreSmallStraight([1, 2, 3, 4, 5])).toBe(15);
});

test("return 0 if not a small straight", () => {
  expect(scoreSmallStraight([1, 2, 3, 4, 4])).toBe(0);
  expect(scoreSmallStraight([2, 3, 4, 5, 6])).toBe(0);
});

test("identifies a large straight and returns 20 (sum of nums)", () => {
  expect(scoreLargeStraight([2, 3, 4, 5, 6])).toBe(20);
});

test("return 0 if not a large straight", () => {
  expect(scoreLargeStraight([2, 3, 4, 5, 4])).toBe(0);
  expect(scoreLargeStraight([1, 2, 3, 4, 5])).toBe(0);
});

test("identifies valid full house and return sum of all nums", () => {
  expect(scoreFullHouse([2, 2, 5, 5, 5])).toBe(19);
});

test("returns 0 if not a valid full house", () => {
  expect(scoreFullHouse([2, 5, 5, 5, 5])).toBe(0);
  expect(scoreFullHouse([5, 5, 5, 5, 5])).toBe(0);
});

test("identifies valid yahtzee and returns 50", () => {
  expect(scoreYahtzee([1, 1, 1, 1, 1])).toBe(50);
  expect(scoreYahtzee([6, 6, 6, 6, 6])).toBe(50);
});

test("returns 0 if not a valid yahtzee", () => {
  expect(scoreYahtzee([1, 1, 1, 1, 4])).toBe(0);
});

test("returns the sum of nums for chance", () => {
  expect(scoreChance([5, 5, 5, 5, 5])).toBe(25);
});
