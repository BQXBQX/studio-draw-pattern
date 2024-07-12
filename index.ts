// import data from "./examples/example-book.json";
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

import deconstructMATCH from "./utils/deconstructCypher/deconstructMATCH";

//
deconstructMATCH(
  "MATCH (:Person {name: 'Anna'})-[r:KNOWS WHERE r.since < 2020]->(friend:Person)",
);
