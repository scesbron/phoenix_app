import { reorder, move } from "./Lists";

it("should correctly reorder a list", () => {
  expect(reorder([0, 1, 2], 1, 2)).toEqual([0, 2, 1]);
});

it("shoudl correctly move an element from one list to another", () => {
  expect(move([1, 2, 3], [4, 5, 6], 1, 2)).toEqual([[1, 3], [4, 5, 2, 6]]);
});
