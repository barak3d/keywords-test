import * as fs from "fs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import { D3WordcloucPhrases } from "./get_top_phrases.js";

tf.setBackend("cpu");
const myArgs = process.argv.slice(2);
const keywordLib = myArgs[0] || "d3word";
const inputFile = myArgs[1] || "./input.txt";
const outputFile = myArgs[2] || "use_output.txt";
const input_text = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const lib = new D3WordcloucPhrases();
import r from "rake-modified";
const rake = r.default;
let phrases;
if (keywordLib === "rake") {
  const res = rake(input_text);
  phrases = Object.keys(res);
  console.log("Rake", res);
} else {
  let rows_of_string = input_text.split("\n");
  let list_stopwords = "";
  var word_count = lib.get_top_phrases(rows_of_string, 50, list_stopwords);
  console.log("D3 Word count", word_count);
  phrases = Object.keys(word_count);
}

let result = [];
use.load().then(async (model) => {
  const sentences = [input_text];
  const embeddings = await model.embed(sentences);
  for (let i = 0; i < phrases.length; i++) {
    const phrase = phrases[i];
    const phraseEmbedding = await model.embed(phrase);
    const distance = similarity(
      embeddings.arraySync()[0],
      phraseEmbedding.arraySync()[0]
    );
    const p = {};
    p[phrase] = distance;
    result.push(p);
  }
  result = result.sort((a, b) => b.distance - a.distance).splice(0, 10);
  const resStr = JSON.stringify(result, true, 4);
  console.log("top 10 results by distance", resStr);
  fs.writeFileSync(outputFile, resStr, {
    encoding: "utf8",
  });
});

function similarity(v1, v2) {
  let dot = 0.0;
  let norm1 = 0.0;
  let norm2 = 0.0;
  for (let x = 0; x < v1.length; x++) {
    dot += v1[x] * v2[x];
    norm1 += Math.pow(v1[x], 2);
    norm2 += Math.pow(v2[x], 2);
  }
  return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
}
