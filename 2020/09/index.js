const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n").map(Number);
const RANGE = 25;

function getPreambleForPos(list, num) {
  return list.slice(num - RANGE, num);
}

function findIfSums(num, list) {
  let sums = false;
  for (let x = 0; x < list.length; x++) {
    for (let y = x + 1; y < list.length; y++) {
      if (list[x] + list[y] === num) {
        sums = true;
      }
    }
  }

  return sums;
}

function part1(list, range) {
  for (let i = range; i < list.length; i++) {
    const num = list[i];
    const pre = getPreambleForPos(list, i);
    const sums = findIfSums(num, pre);

    if (!sums) {
      return num;
    }
  }
}

function part2(list, number) {
  let seq = [];
  let sum = 0;

  loop1: for (let x = 0; x < list.length; x++) {
    for (let y = x; y < list.length - 15; y++) {
      const n = list[y];
      const thisSum = sum + n;

      if (thisSum > number) {
        seq = [];
        sum = 0;
        continue loop1;
      }

      seq.push(n);
      sum = thisSum;

      if (thisSum === number) {
        return seq;
      }
    }
  }
}

const number = part1(list, RANGE);
const p = part2(list, number);
const min = Math.min(...p);
const max = Math.max(...p);
console.log("Part 1:", number);
console.log("Part 2:", min + max);

// https://www.youtube.com/watch?v=BG7QTDaWQKY
