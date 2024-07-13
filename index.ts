#! /usr/bin/env bun

import { Command } from "commander";
const program = new Command();
program
  .name("GenerateQuery")
  .version("0.01")
  .description("generate Cypher&Gremlin with GPE");

program
  .command("split")
  .description("Split a string into substrings and display as an array")
  .argument("<string>", "string to split")
  .option("--first", "display just the first substring")
  .option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();

// import data from "./examples/example-test.json";

// import type { Edge } from "./types/edge";
// import type { Node } from "./types/node";
// import generateEdge from "./utils/cypher/generateEdge";
// import generateMATCH from "./utils/cypher/generateMATCH";
// import generateNode from "./utils/cypher/generateNode";
// let nodesArray: Node[] = [];
// let edgesArray: Edge[] = [];
// let laguages: string[] = [];
// let MATCHs: string[] = [];
// // 生成相关的node节点
// nodesArray = generateNode(data.nodes, data.variables);
// edgesArray = generateEdge(data.relations);
// MATCHs = generateMATCH(nodesArray, edgesArray, data.variables);
// const language = MATCHs.join("\n");
// console.log(language);

// import deconstructMATCH from "./utils/deconstructCypher/deconstructMATCH";
//
// //
// deconstructMATCH(
//   "MATCH (:Person {name: 'Anna'})-[r:KNOWS WHERE r.since < 2020]->(friend:Person)",
// );
