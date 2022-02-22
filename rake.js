const fs = require("fs");
var rake = require("rake-modified").default;
const myArgs = process.argv.slice(2);
const inputFile = myArgs[0] || "./input.txt";
const outputFile = myArgs[1] || "rake_output.txt";
const data = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const res = rake(
    data
);

const resStr = JSON.stringify(res, true, 4);
fs.writeFileSync(outputFile,
resStr,
    {
      encoding: "utf8",
    });
console.log(resStr);
