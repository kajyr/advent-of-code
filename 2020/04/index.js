const { readFile } = require("../utils");

const input = readFile(__dirname);

const list = input.split("\n\n").map((line) => line.split(/\s/));

const cid = /^cid:/;

const valid = list.reduce((total, passport) => {
  const full = passport.length === 8;
  const noCid = passport.length === 7 && !passport.some((e) => cid.test(e));

  if (full || noCid) {
    return total + 1;
  }

  return total;
}, 0);

console.log("Solution (part 1):", valid);

const between = (min, max) => (str) => {
  const n = Number(str);
  return n >= min && n <= max;
};

const rules = {
  byr: between(1920, 2002),
  iyr: between(2010, 2020),
  eyr: between(2020, 2030),
  hgt: (value) => {
    if (value.match(/cm$/)) {
      return between(150, 193)(value.replace("cm", ""));
    }
    if (value.match(/in$/)) {
      return between(59, 76)(value.replace("in", ""));
    }
  },
  hcl: (value) => !!value.match(/^#[0-9a-f]{6}$/),
  ecl: (value) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
  pid: (value) => !!value.match(/^[0-9]{9}$/),
  cid: () => true,
};

function validate(passport) {
  for (const data of passport) {
    const [field, value] = data.split(":");
    const isValid = rules[field](value);
    if (!isValid) {
      return false;
    }
  }
  return true;
}

const validPart2 = list.reduce((total, passport) => {
  const full = passport.length === 8;
  const noCid = passport.length === 7 && !passport.some((e) => cid.test(e));

  if ((full || noCid) && validate(passport)) {
    return total + 1;
  }

  return total;
}, 0);

console.log("Solution (part 2):", validPart2);
