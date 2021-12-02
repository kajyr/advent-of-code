const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n");

const mid = (start, end) => start + Math.floor((end - start) / 2);

function partition(letter, [min, max]) {
  const half = mid(min, max);

  switch (letter) {
    case "F":
    case "L":
      return [min, half];

    case "B":
    case "R":
      return [half + 1, max];
  }

  throw `Wrong code? ${letter}`;
}

function getPos(rules, starting) {
  const r = rules.split("");
  let pos = starting;
  for (const instr of r) {
    pos = partition(instr, pos);
  }
  return pos[0];
}

let max = 0;
let filled = [];

for (line of list) {
  const row = getPos(line.substring(0, 7), [0, 127]);
  const pos = getPos(line.substring(7), [0, 7]);

  const id = row * 8 + pos;

  filled[id] = [row, pos];

  max = Math.max(max, id);
}

console.log("Part 1:", max);

for (let i = 0; i < max; i++) {
  if (filled[i]) {
    continue;
  }

  if (!filled[i - 1]) {
    continue;
  }

  if (!filled[i + 1]) {
    continue;
  }
  // check the one before
  console.log("before", filled[i - 1]);
  console.log("after", filled[i + 1]);
}
console.log(84 * 8 + 6);
