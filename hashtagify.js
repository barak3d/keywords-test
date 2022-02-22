const fs = require("fs");
const hashtagify = require("hashtagify");

hashtagify.doFollowedByNumber = false;

function getHashTags(text) {
  var title = text;
  var content = text;
  var vocabulary = [];
  var textWithHashtags = hashtagify(title, content, vocabulary);
  const hashes = extractHashTagsFromText(textWithHashtags);

  return hashes;
}

function extractHashTagsFromText(inputText) {
  var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  var matches = [];
  var match;
  while ((match = regex.exec(inputText))) {
    matches.push(match[1]);
  }

  return [...new Set(matches)];
}
const myArgs = process.argv.slice(2);
const inputFile = myArgs[0] || "./input.txt";
const outputFile = myArgs[1] || "hashtagify_output.txt";
const data = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const res = getHashTags(data);

const resStr = JSON.stringify(res, true, 4);
fs.writeFileSync(outputFile, resStr, {
  encoding: "utf8",
});
console.log(resStr);
