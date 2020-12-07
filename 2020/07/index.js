const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").trim();

function newOrConcat(list, item) {
  return list ? list.concat(item) : [item];
}

const MY_COLOR = "shiny gold";

const list = input
  .slice(0, -1) // remove last dot
  .replace(/bag[s]?/g, "")
  .split(".\n")
  .map((line) => line.replace(" contain ", "|").split("|"));

const p = list.reduce((acc, [color, containers]) => {
  const numberless = containers
    .replace(/\d/g, "")
    .split(",")
    .map((r) => r.trim());

  for (const rule of numberless) {
    acc[rule] = newOrConcat(acc[rule], color.trim());
  }

  return acc;
}, {});

function getContainers(color) {
  const containers = new Set(p[color]);

  let children = new Set();

  for (const c of containers) {
    getContainers(c).forEach(children.add, children);
  }

  return new Set([...containers, ...children]);
}

const part1 = getContainers(MY_COLOR);
console.log("Part 1: ", part1.size);

const p2 = list.reduce((acc, [color_s, containers_str]) => {
  const containers = containers_str.split(",").map((c) => c.trim());
  const color = color_s.trim();

  for (const c of containers) {
    const r = c.match(/(\d+\s)/);

    if (!r) {
      acc[color] = null;
    } else {
      acc[color] = newOrConcat(acc[color], {
        c: c.replace(r[0], ""),
        n: Number(r[0]),
      });
    }
  }

  return acc;
}, {});

function getContained(color, d) {
  const item = p2[color];

  if (!item) {
    return 0;
  }

  let s = 0;
  for (rule of item) {
    const { c, n } = rule;
    s += n * (getContained(c, `${d}\t`) + 1);
  }
  return s;
}

const part2 = getContained(MY_COLOR, "");

console.log("Part 2: ", part2);
