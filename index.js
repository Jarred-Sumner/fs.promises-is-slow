const Benchmark = require("benchmark");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const util = require("util");
const promisifed = util.promisify(fs.readFile);

const bigFilepath = path.resolve(__dirname, "./big.file");

const suite = new Benchmark.Suite("fs");

suite
  .add(
    "readFileSync",
    (defer) => {
      fs.readFileSync(bigFilepath, "utf8");
      defer.resolve();
    },
    { defer: true }
  )
  .add(
    "readFile",
    (defer) => {
      fs.readFile(bigFilepath, (err, data) => {
        defer.resolve();
      });
    },
    { defer: true }
  )
  .add(
    "promises.readFile",
    (defer) => {
      fs.promises.readFile(bigFilepath).then(() => {
        defer.resolve();
      });
    },
    { defer: true }
  )
  .add(
    "readFile promisifed",
    (defer) => {
      promisifed(bigFilepath).then(() => {
        defer.resolve();
      });
    },
    { defer: true }
  )
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(
      "Fastest is " + chalk.green(this.filter("fastest").map("name"))
    );
    console.log("Slowest is " + chalk.red(this.filter("slowest").map("name")));
  })
  .run({ defer: true });
