const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n");

function countTrees(list, slopeRight, slopeDown = 1) {
  let posX = 0;
  let count = 0;
  for (let i = posX; i < list.length; i += slopeDown) {
    const row = list[i];
    const pos = row.charAt(posX % row.length);
    posX += slopeRight;
    if (pos === "#") {
      count++;
    }
  }

  return count;
}

const r1d1 = countTrees(list, 1, 1);
const r3d1 = countTrees(list, 3, 1);
const r5d1 = countTrees(list, 5, 1);
const r7d1 = countTrees(list, 7, 1);
const r1d2 = countTrees(list, 1, 2);

console.log(r1d1, r3d1, r5d1, r7d1, r1d2);

console.log("Solution (part 1):", r3d1);
console.log("Solution (part 2):", r1d1 * r3d1 * r5d1 * r7d1 * r1d2);
