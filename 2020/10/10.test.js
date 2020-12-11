const { listWithout, validAt, permutationsAt } = require("./");

describe("listWithout", () => {
  test("basics", () => {
    expect(listWithout([10, 20, 30, 40], 1, 2)).toEqual([10, 40]);
    expect(listWithout([1, 2, 6, 7, 8], 2, 3)).toEqual([1, 2]);
  });
  test("2 elems", () => {
    // non ne posso togliere due, sarebbe come toglierne uno
    expect(listWithout([1, 2], 1, 2)).toEqual(null);
  });
  test("Out of boundary", () => {
    // Out of boundary
    expect(listWithout([10], 2, 2)).toBe(null);
    expect(listWithout([10, 11], 1, 3)).toBe(null);
  });
});

describe("validAt", () => {
  test("basics", () => {
    const list = [1, 2, 6, 7];
    expect(validAt(list, 0)).toBe(true);
    expect(validAt(list, 2)).toBe(false);
  });

  test("first value is checked against 0", () => {
    const list = [6, 7];
    expect(validAt(list, 0)).toBe(false);
  });

  test("only one value", () => {
    // true because 0 --> 2 <= 3
    expect(validAt([2], 0)).toBe(true);
    // false because 0 --> 6 > 3
    expect(validAt([6], 0)).toBe(false);
    // true because 6 --> 9 <= 3
    expect(validAt([6], 1)).toBe(true);
  });

  test("Out of boundary", () => {
    const list = [1, 2, 6, 7];
    // Out of boundary
    expect(validAt(list, 10)).toBe(false);
  });
});

describe("permutationsAt", () => {
  test("basics", () => {
    const list = [1, 2, 6, 7, 8];
    expect(permutationsAt(list, 0)).toEqual([
      [1, 2, 6, 7, 8],
      [2, 6, 7, 8],
      [6, 7, 8],
      [7, 8],
    ]);

    expect(permutationsAt(list, 2)).toEqual([
      [1, 2, 6, 7, 8],
      [1, 2, 7, 8],
      [1, 2, 8],
    ]);
  });

  // Last element cannot be cut,
  // because it will always be at distance 3 from the end
  // so the previous would never suffice
  test("last element", () => {
    const list = [1, 2, 6, 7, 8];
    expect(permutationsAt(list, 4)).toEqual([[1, 2, 6, 7, 8]]);
  });

  test("2 elem", () => {
    const list = [1, 2];
    expect(permutationsAt(list, 0)).toEqual([[1, 2], [2]]);
    expect(permutationsAt(list, 1)).toEqual([[1, 2]]);
  });

  test("boh", () => {
    const list = [1, 2, 3];
    expect(permutationsAt(list, 1)).toEqual([
      [1, 2, 3],
      [1, 3],
    ]);
  });

  /*  test("Out of boundary", () => {
    const list = [1, 2, 6, 7];
    // Out of boundary
    expect(validAt(list, 10)).toBe(false);
  }); */
});
