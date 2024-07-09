import type { Edge, EdgeStore } from "../../types/edge";

const generateEdge = (edges: Edge[]): EdgeStore[] => {
  let returnEdges: EdgeStore[] = [];
  edges.forEach((edge, index) => {
    const statement: string = `[:${edge.type}]`;
    returnEdges.push({
      statement: statement,
      sourceNode: edge.sourceNode,
      targetNode: edge.targetNode,
    });
  });
  return returnEdges;
};

export default generateEdge;
