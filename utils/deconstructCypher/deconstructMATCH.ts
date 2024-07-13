import { Node } from "../../types/node";
import deconstructEdge from "./deconstructEdge";
import deconstructNode from "./deconstructNode";
import deconstructVariable from "./deconstructVariable";

const deconstructMATCH = async (query: string) => {
  const str = query;
  const nodeRegexp = /\(.+?\)/g;
  const pathRegexp = /\<?-\[.+?\]-\>?/g;
  const nodes: RegExpMatchArray | null = str.match(nodeRegexp);
  const paths: RegExpMatchArray | null = str.match(pathRegexp);
  let nodesJSON: Node[] = deconstructNode(nodes);
  const returnEdge = deconstructEdge(nodesJSON, paths);
  const edgesJSON = returnEdge.returnEdges;
  nodesJSON = returnEdge.nodes;
  // console.log(nodesJSON);
  const totalJSON = JSON.stringify({
    nodes: nodesJSON,
    relations: edgesJSON,
    variables: [],
  });
  return totalJSON;
};

export default deconstructMATCH;
