const { readFile } = require("../utils");

function listWithout(list, index, count) {
  if (index + count > list.length) {
    return null;
  }
  const ret = list.slice();
  ret.splice(index, count);
  return ret;
}

function validAt(list, pos) {
  if (pos === list.length) {
    // se pos è l'ultimo va bene
    return true;
  }

  const prev = pos === 0 ? 0 : list[pos - 1];
  const r = list[pos] - prev <= 3;
  return r;
}

function permutationsAt(list, pos) {
  const senzaUno = pos < list.length - 1 && listWithout(list, pos, 1);
  const senzaDue = pos < list.length - 2 && listWithout(list, pos, 2);
  const senzaTre = pos < list.length - 3 && listWithout(list, pos, 3);

  // la lista devo includerla perchè è una permutazione della generazione prima
  const lists = [list, senzaUno, senzaDue, senzaTre].filter(
    (l) => !!l && l.length > 0
  );
  return lists;
}

function gl(list, pos) {
  if (list.length === 1) {
    return [list];
  }
  let sum = 0;

  if (list[pos + 1] - list[pos] === 3) {
    return gl(list, pos + 1);
  }

  const lists = permutationsAt(list, pos);

  for (l of lists) {
    if (validAt(l, pos)) {
      if (pos + 1 < list.length) {
        sum = sum + gl(l, pos + 1);
      } else {
        sum++;
      }
    }
  }
  return sum;
}

if (require.main === module) {
  const input = readFile(__dirname);

  const list = input
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);

  //  const list = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4].sort((a, b) => a - b);

  //const list = [1, 2];
  //const list = [1, 2, 3];
  //const list = [1, 3, 4, 6, 7];
  //const list = [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];

  const diffs = [0, 1, 0, 1];

  for (let i = 1; i < list.length; i++) {
    diffs[list[i] - list[i - 1]]++;
  }
  console.log("Part 1", diffs[1] * diffs[3]);

  const glu = gl(list, 0);
  console.log("last", list[list.length - 1] + 3);

  console.log("Part 2", glu);
}

module.exports = { listWithout, validAt, permutationsAt };
