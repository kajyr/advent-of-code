const { readFile } = require("../utils");

const input = readFile(__dirname);

const list = input.split("\n\n");

let p1 = 0,
  p2 = 0;

for (const group of list) {
  const yes = new Set(group.replace(/\s/g, "").split(""));
  p1 += yes.size;

  const ppl = group.split("\n");

  const [example, ...rest] = ppl;

  const letters = example.split("");
  if (rest.length === 0) {
    p2 += letters.length;
  }

  for (const letter of letters) {
    if (rest.every((p) => p.indexOf(letter) >= 0)) {
      p2 += 1;
    }
  }
}

console.log("Part1:", p1);
console.log("Part2:", p2);
