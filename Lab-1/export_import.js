const library = {
  version: "1.0.0",
  utils: {
    greet: (name) => `Hello, ${name}!`,
    square: (n) => n * n,
  },
  calc: {
    sum: (arr) => arr.reduce((a, b) => a + b, 0),
    avg: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length,
  }
};

exports.library = library;

const { library: lib } = require("./export_import");

console.log("Library Version:", lib.version);
console.log(lib.utils.greet("Lakshay"));
console.log("Square of 7:", lib.utils.square(7));
console.log("Sum:", lib.calc.sum([1, 2, 3, 4]));
console.log("Average:", lib.calc.avg([10, 20, 30]));
