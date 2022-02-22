const fs = require("fs");
var rake = require("rake-modified").default;
const data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });
const res = rake(
    data
);

const resStr = JSON.stringify(res, true, 4);
fs.writeFileSync("rake_output.txt",
resStr,
    {
      encoding: "utf8",
    });
console.log(resStr);
