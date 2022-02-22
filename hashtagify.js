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
const data = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" });
const res = getHashTags(data);

const resStr = JSON.stringify(res, true, 4);
fs.writeFileSync("hashtagify_output.txt", resStr, {
  encoding: "utf8",
});
console.log(resStr);
