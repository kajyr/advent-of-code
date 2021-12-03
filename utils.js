const fs = require("fs");
const path = require("path");

const readFile = (base, file = "input.txt") => {
  const fileName = process.argv[2] || file;
  return fs.readFileSync(path.join(base, fileName), "utf-8").trim();
};

/**
 * Returns some functions to treat strings as 2d fields
 * @param {number} width the width of the field
 */
function fieldFromStr(width) {
  /**
   * Returns the item in (x,y).
   * (0, 0) is top-left
   *
   * @param {string} str
   * @param {number} x
   * @param {number} y
   */
  function at(str, x, y) {
    if (x < 0 || y < 0 || x >= width || y >= rows(str)) {
      return null;
    }

    return str.charAt(width * y + x);
  }

  /**
   * Returns how many rows there are for a given width
   * @param {string} str
   */
  function rows(str) {
    return Math.ceil(str.length / width);
  }

  return { at, rows };
}

module.exports = {
  readFile,
  fieldFromStr,
};
