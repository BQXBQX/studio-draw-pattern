import { Node } from "../../types/node";
import deconstructNode from "./deconstructNode";

const deconstructMATCH = (query: string) => {
  const str =
    "MATCH (:Person:Director:Woman:Mather {name: 'Anna',age:34,sex:'woman'})-[:KNOWS]->(friend:Person)-[:FATHER]->(:Person)";
  const nodeRegexp = /\(.+?\)/g;
  const pathRegexp = /\<?-\[.+?\]-\>?/g;
  const nodes: RegExpMatchArray | null = str.match(nodeRegexp);
  const paths: RegExpMatchArray | null = str.match(pathRegexp);
  const nodesJSON: Node[] = deconstructNode(nodes);
  console.log(nodesJSON);
};

export default deconstructMATCH;
