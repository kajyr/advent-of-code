const fs = require("fs");
const path = require("path");

const readFile = (base, file = "input.txt") =>
  fs.readFileSync(path.join(base, file), "utf-8").trim();

module.exports = {
  readFile,
};
