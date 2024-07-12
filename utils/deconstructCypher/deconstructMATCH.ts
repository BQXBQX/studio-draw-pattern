import { Node } from "../../types/node";
import deconstructEdge from "./deconstructEdge";
import deconstructNode from "./deconstructNode";
import deconstructVariable from "./deconstructVariable";

const deconstructMATCH = async (query: string) => {
  const str =
    "MATCH (:Person:Director:Woman:Mather {name: 'Anna',age:34,sex:'woman'})-[:KNOWS]->(:Person)-[:FATHER]->(:Person)";
  const nodeRegexp = /\(.+?\)/g;
  const pathRegexp = /\<?-\[.+?\]-\>?/g;
  const nodes: RegExpMatchArray | null = str.match(nodeRegexp);
  const paths: RegExpMatchArray | null = str.match(pathRegexp);
  let nodesJSON: Node[] = deconstructNode(nodes);
  const returnEdge = deconstructEdge(nodesJSON, paths);
  const edgesJSON = returnEdge.returnEdges;
  nodesJSON = returnEdge.nodes;
  const totalJSON = JSON.stringify({
    nodes: nodesJSON,
    relations: edgesJSON,
  });
  console.log(totalJSON);

  await Bun.write("../../examples/example-test.json", totalJSON);
};

export default deconstructMATCH;
