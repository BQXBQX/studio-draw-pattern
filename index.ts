import data from "./examples/example-movie.json";
import generateNode from "./utils/cypher/generateNode";
const nodesArray = [];
generateNode(data.nodes);
