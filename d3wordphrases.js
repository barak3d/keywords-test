import * as fs from "fs";
import { D3WordcloucPhrases } from "./get_top_phrases.js";
const lib = new D3WordcloucPhrases();
const myArgs = process.argv.slice(2);
const inputFile = myArgs[0] || "./input.txt";
const outputFile = myArgs[1] || "rake_output.txt";
const input_text = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const input_stopwords = "";
let rows_of_string = input_text.split("\n");
let list_stopwords = input_stopwords.split("\n");

var word_count = lib.get_top_phrases(rows_of_string, 15, list_stopwords);

const resStr = JSON.stringify(word_count, true, 4);
fs.writeFileSync(outputFile, resStr, {
  encoding: "utf8",
});
console.log(resStr);
