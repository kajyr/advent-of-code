const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n").map((line) => line.split(" "));
const result = list.reduce(
  (acc, [dir, a]) => {
    const amount = Number(a);
    switch (dir) {
      case "forward":
        acc.x += amount;
        break;
      case "down":
        acc.depth += amount;
        break;
      case "up":
        acc.depth -= amount;
        break;
    }
    return acc;
  },
  { x: 0, depth: 0 }
);

const result2 = list.reduce(
  (acc, [dir, a]) => {
    const amount = Number(a);
    switch (dir) {
      case "forward":
        acc.x += amount;
        acc.depth += acc.aim * amount;
        break;
      case "down":
        acc.aim += amount;
        break;
      case "up":
        acc.aim -= amount;
        break;
    }
    return acc;
  },
  { x: 0, depth: 0, aim: 0 }
);

console.log("Part 1:", result.x * result.depth);
console.log("Part 2:", result2.x * result2.depth);
