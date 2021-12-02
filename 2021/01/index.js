const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n").map(Number);

let count = 0;

for (let i = 0; i < list.length; i++) {
  const curr = list[i];
  const prev = i > 0 ? list[i - 1] : curr;

  if (curr > prev) {
    count++;
  }
}

let count2 = 0;

function getSlidingSum(list, i) {
  const n0 = list[i];
  const n1 = list[i + 1] || 0;
  const n2 = list[i + 2] || 0;

  return n0 + n1 + n2;
}

for (let i = 0; i < list.length - 2; i++) {
  const cur = getSlidingSum(list, i);
  const next = getSlidingSum(list, i + 1);
  if (next > cur) {
    count2++;
  }
}

console.log("Part 1:", count);
console.log("Part 2:", count2);
