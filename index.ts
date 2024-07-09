import data from "./examples/example-movie.json";
import type { EdgeStore } from "./types/edge";
import type { NodeStore } from "./types/node";
import generateEdge from "./utils/cypher/generateEdge";
import generateMATCH from "./utils/cypher/generateMATCH";
import generateNode from "./utils/cypher/generateNode";
let nodesArray: NodeStore[] = [];
let edgesArray: EdgeStore[] = [];
let MATCHs: string[] = [];
nodesArray = generateNode(data.nodes, data.variables);
edgesArray = generateEdge(data.relationship);
MATCHs = generateMATCH(nodesArray, edgesArray);
const language = MATCHs.join("\n");
console.log(language);
