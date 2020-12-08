const { readFile } = require("../utils");

const input = readFile(__dirname);

const list = input.split("\n").map(Number);

const requiredSum = 2020;

function part1() {
  for (const i of list) {
    for (const j of list) {
      const s = i + j;
      if (s === requiredSum) {
        return i * j;
      }
    }
  }
}

function part2() {
  for (const i of list) {
    if (i === 0) {
      continue;
    }
    for (const j of list) {
      if (j === 0) {
        continue;
      }
      for (const t of list) {
        if (t === 0) {
          continue;
        }
        if (i + j + t === requiredSum) {
          return i * j * t;
        }
      }
    }
  }
}

console.log("First part: ", part1());
console.log("Second part: ", part2());
