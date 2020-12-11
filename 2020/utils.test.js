const { fieldFromStr } = require("./utils");

describe("fieldFromStr.at", () => {
  const str = "012345678";
  const { at } = fieldFromStr(3);

  // 0 1 2
  // 3 4 5
  // 6 7 8

  test("First row", () => {
    expect(at(str, 0, 0)).toBe("0");
    expect(at(str, 1, 0)).toBe("1");
    expect(at(str, 2, 0)).toBe("2");
    expect(at(str, 3, 0)).toBe(null);
  });

  test("First column", () => {
    expect(at(str, 0, 0)).toBe("0");
    expect(at(str, 0, 1)).toBe("3");
    expect(at(str, 0, 2)).toBe("6");
    expect(at(str, 0, 3)).toBe(null);
  });

  test("Other of boundaries", () => {
    expect(at(str, -1, 0)).toBe(null);
    expect(at(str, 2, -1)).toBe(null);
    expect(at(str, 40, 0)).toBe(null);
    expect(at(str, 0, 30)).toBe(null);
  });
});

describe("fieldFromStr.rows", () => {
  test("Returns a generic char", () => {
    const str = "0123456789ABC";

    // 0 1 2
    // 3 4 5
    // 6 7 8
    // 9 A B
    // C _ _
    expect(fieldFromStr(3).rows(str)).toBe(5);

    // 0 1 2 3 4
    // 5 6 7 8 9
    // A B C _ _
    expect(fieldFromStr(5).rows(str)).toBe(3);
  });
});
