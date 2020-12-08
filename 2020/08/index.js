const { readFile } = require("../utils");

const input = readFile(__dirname);

const list = input.split("\n").map((line) => {
  const [istr, val] = line.split(" ");
  return { istr, val: Number(val) };
});

const copy = (list) => JSON.parse(JSON.stringify(list));
const other = (istr) => (istr === "jmp" ? "nop" : "jmp");

function runLine(line, acc, pos) {
  const { istr, val } = line;

  switch (istr) {
    case "acc":
      acc += val;
      pos++;
      break;
    case "jmp":
      pos += val;
      break;
    default:
      pos++;
  }
  return [acc, pos];
}

function run(list, startAcc, startPos) {
  let acc = startAcc;
  let pos = startPos;

  while (pos < list.length && !list[pos].visited) {
    const line = list[pos];
    [acc, pos] = runLine(line, acc, pos);
    line.visited = true;
  }

  return [acc, pos === list.length];
}

function switchLine(list, pos) {
  const newList = copy(list);
  newList[pos] = { istr: other(list[pos].istr), val: list[pos].val };
  return newList;
}

function fork(list, startAcc, startPos) {
  let acc = startAcc;
  let pos = startPos;

  while (pos < list.length && !list[pos].visited) {
    const line = list[pos];

    if (["jmp", "nop"].includes(line.istr)) {
      const forked = run(switchLine(list, pos), acc, pos);

      if (forked[1]) {
        return forked;
      }
    }

    [acc, pos] = runLine(line, acc, pos);
    line.visited = true;
  }
  return acc;
}

const [part1] = run(copy(list), 0, 0);
const [part2] = fork(copy(list), 0, 0);

console.log("Part 1:", part1);
console.log("Part 2:", part2);
