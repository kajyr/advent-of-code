const { readFile } = require("../../utils");

const input = readFile(__dirname);

const list = input.split("\n");
const lineLength = list[0].length;

/**
 * finds gamma and epsilon
 */
function findGE(list) {
  const cutoff = list.length / 2;
  const count = list.reduce((acc, cur) => {
    for (let x = 0; x < cur.length; x++) {
      const c = cur.charAt(x);
      if (c === "1") {
        acc[x] = (acc[x] || 0) + 1;
      }
    }
    return acc;
  }, []);
  let gamma = "";
  let epsilon = "";

  for (let x = 0; x < count.length; x++) {
    gamma += count[x] >= cutoff ? "1" : "0";
    epsilon += count[x] >= cutoff ? "0" : "1";
  }
  return [gamma, epsilon];
}

function partition(list, condition) {
  return list.reduce(
    (result, element) => {
      result[condition(element) ? 0 : 1].push(element);
      return result;
    },
    [[], []]
  );
}

const [gamma, epsilon] = findGE(list);

const gamma10 = parseInt(gamma, 2);
const epsilon10 = parseInt(epsilon, 2);

console.log("Part 1:", gamma10 * epsilon10);

// part 2
let o2RatingList = list;
for (let x = 0; x < lineLength; x++) {
  const [gamma] = findGE(o2RatingList);

  [o2RatingList] = partition(
    o2RatingList,
    (element) => element.charAt(x) === gamma.charAt(x)
  );
  if (o2RatingList.length === 1) {
    break;
  }
}

let co2ScrubberList = list;
for (let x = 0; x < lineLength; x++) {
  const [, epsilon] = findGE(co2ScrubberList);

  [co2ScrubberList] = partition(
    co2ScrubberList,
    (element) => element.charAt(x) === epsilon.charAt(x)
  );
  if (co2ScrubberList.length === 1) {
    break;
  }
}

const o2Rating = parseInt(o2RatingList[0], 2);
const co2Rating = parseInt(co2ScrubberList[0], 2);

console.log("Part 2:", o2Rating * co2Rating);
