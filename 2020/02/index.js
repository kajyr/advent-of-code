const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

const list = input
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line) => {
    const [rule, pwd] = line.split(": ");
    const [min, max] = rule.match(/(\d+)/g);
    const letter = rule.charAt(rule.length - 1);
    return [min, max, letter, pwd];
  });

function count(str, letter) {
  const m = str.match(new RegExp(letter, "g"));
  return m ? m.length : 0;
}

const num = list.reduce((total, [min, max, letter, pwd]) => {
  const c = count(pwd, letter);

  if (c < min || c > max) {
    return total;
  }
  return total + 1;
}, 0);

console.log("Solution (part 1) is ", num);

// Part 2
const num2 = list.reduce((total, [a, b, letter, pwd]) => {
  const ch1 = pwd.charAt(a - 1);
  const ch2 = pwd.charAt(b - 1);

  if (ch1 !== ch2 && [ch1, ch2].includes(letter)) {
    return total + 1;
  }
  return total;
}, 0);

console.log("Solution (part 2) is ", num2);
