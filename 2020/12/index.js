const { readFile } = require("../utils");

const input = readFile(__dirname);
const list = input.split("\n");

const splitLine = (line) => {
  const action = line.charAt(0);
  const val = Number(line.substring(1));
  return [action, val];
};

const directions = ["N", "E", "S", "W"];
const facing = (dirIdx) => directions[dirIdx];

function rotate(current, dir, degrees) {
  let steps = degrees / 90;
  if (dir === "L") {
    steps = 4 - steps;
  }
  const next = (current + steps) % 4;
  return next;
}

function part1(list) {
  let east = 0;
  let nord = 0;

  let findex = 1;

  for (line of list) {
    let [action, val] = splitLine(line);
    const dir = facing(findex);

    if (action === "F") {
      action = dir;
    }

    switch (action) {
      case "N":
        nord += val;
        break;
      case "S":
        nord -= val;
        break;
      case "E":
        east += val;
        break;
      case "W":
        east -= val;
        break;
      case "R":
      case "L":
        findex = rotate(findex, action, val);
        break;
    }
  }

  return Math.abs(east) + Math.abs(nord);
}

/**
 * Rotate a point around the center of 90deg.
 */
function discreteRotate90d(cX, cY, pX, pY) {
  const dX = pX - cX;
  const dY = pY - cY;

  return [cX + dY, cY + dX * -1];
}

function rotate2(dir, degrees, bE, bN) {
  let steps = degrees / 90;
  if (dir === "L") {
    steps = 4 - steps;
  }
  let p = [bE, bN];
  for (let i = 0; i < steps; i++) {
    p = discreteRotate90d(0, 0, p[0], p[1]);
  }
  return p;
}

function part2(list) {
  let beaconE = 10;
  let beaconN = 1;

  let east = 0;
  let nord = 0;

  for (line of list) {
    let [action, val] = splitLine(line);

    switch (action) {
      case "N":
        beaconN += val;
        break;
      case "S":
        beaconN -= val;
        break;
      case "E":
        beaconE += val;
        break;
      case "W":
        beaconE -= val;
        break;
      case "R":
      case "L":
        [beaconE, beaconN] = rotate2(action, val, beaconE, beaconN);
        break;
      case "F":
        east += val * beaconE;
        nord += val * beaconN;
    }

    // console.log(line, east, nord, beaconE, beaconN);
  }

  return Math.abs(east) + Math.abs(nord);
}

if (require.main === module) {
  console.log("Part 1: ", part1(list)); // 1106
  console.log("Part 2: ", part2(list)); // 107281
}

module.exports = {
  discreteRotate90d,
};
