const { discreteRotate90d } = require("./");

describe("discreteRotate90d", () => {
  test("Full rotation on 0, 0", () => {
    const initialPoint = [10, 1];
    let point = initialPoint;

    point = discreteRotate90d(0, 0, point[0], point[1]);
    expect(point).toEqual([1, -10]);

    point = discreteRotate90d(0, 0, point[0], point[1]);
    expect(point).toEqual([-10, -1]);

    point = discreteRotate90d(0, 0, point[0], point[1]);
    expect(point).toEqual([-1, 10]);

    point = discreteRotate90d(0, 0, point[0], point[1]);
    expect(point).toEqual(initialPoint);
  });

  test("Full rotation A", () => {
    const center = [5, 5];
    const initialPoint = [8, 4];
    let point = initialPoint;

    point = discreteRotate90d(center[0], center[1], point[0], point[1]);
    expect(point).toEqual([4, 2]);

    point = discreteRotate90d(center[0], center[1], point[0], point[1]);
    expect(point).toEqual([2, 6]);

    point = discreteRotate90d(center[0], center[1], point[0], point[1]);
    expect(point).toEqual([6, 8]);

    point = discreteRotate90d(center[0], center[1], point[0], point[1]);
    expect(point).toEqual(initialPoint);
  });
});
