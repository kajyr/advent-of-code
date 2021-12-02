const { readFile, fieldFromStr } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n");
const width = list[0].length;
const { at, rows } = fieldFromStr(width);
const initial = list.join("");
const numRows = rows(initial);

function occupiedAround(state, x, y) {
  const TL = at(state, x - 1, y - 1);
  const T = at(state, x, y - 1);
  const TR = at(state, x + 1, y - 1);

  const L = at(state, x - 1, y);
  const R = at(state, x + 1, y);

  const BL = at(state, x - 1, y + 1);
  const B = at(state, x, y + 1);
  const BR = at(state, x + 1, y + 1);

  return [TL, T, TR, L, R, BL, B, BR].filter((p) => p && p === "#").length;
}

function step(state, countOccupiedFn, maxOccupied) {
  let newState = "";

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < width; x++) {
      const place = at(state, x, y);

      const countOccupied = countOccupiedFn(state, x, y);

      if (place === "L" && countOccupied === 0) {
        newState = newState + "#";
      } else if (place === "#" && countOccupied >= maxOccupied) {
        newState = newState + "L";
      } else {
        newState = newState + place;
      }
    }
  }
  return newState;
}

function loop(initial, countOccupiedFn, maxOccupied) {
  let prev,
    state = initial,
    i = 0;

  while (prev !== state) {
    i++;
    prev = state;
    state = step(state, countOccupiedFn, maxOccupied);
  }
  console.log("Iterations:", i);
  return countOccupied(state);
}

const countOccupied = (state) => (state.match(/#/g) || []).length;

function lineOccupied(state, sx, sy, fx, fy) {
  return (fx, fy) => {
    let x = fx(sx);
    let y = fy(sy);
    let c = at(state, x, y);

    while (c) {
      c = at(state, x, y);
      if (c === "#") {
        return 1;
      }
      if (c === "L") {
        return 0;
      }
      x = fx(x);
      y = fy(y);
    }
    return 0;
  };
}

function occupied2(state, x, y) {
  const lo = lineOccupied(state, x, y);
  const TL = lo(
    (x) => x - 1,
    (y) => y - 1
  );

  const T = lo(
    (x) => x,
    (y) => y - 1
  );

  const TR = lo(
    (x) => x + 1,
    (y) => y - 1
  );

  const L = lo(
    (x) => x - 1,
    (y) => y
  );
  const R = lo(
    (x) => x + 1,
    (y) => y
  );

  const BL = lo(
    (x) => x - 1,
    (y) => y + 1
  );

  const B = lo(
    (x) => x,
    (y) => y + 1
  );

  const BR = lo(
    (x) => x + 1,
    (y) => y + 1
  );

  return [TL, T, TR, L, R, BL, B, BR].reduce((a, b) => a + b, 0);
}

if (require.main === module) {
  console.log("Part 1: ", loop(initial, occupiedAround, 4));
  console.log("Part 2: ", loop(initial, occupied2, 5));
}
