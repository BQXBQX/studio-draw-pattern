import { Edge } from "../../types/edge";
import { Node } from "../../types/node";

const deconstructEdge = (nodes: Node[], edges: RegExpMatchArray | null) => {
  const typeRegexp = /(?<=\:)[\d\w\s]+?(?=[\{\]\s])/g;
  const nextRegexp = />$/g;
  let returnEdges: Edge[] = [];
  edges?.forEach((edge, edgeIndex) => {
    const type = edge.match(typeRegexp);
    let targetNode: Node = nodes[edgeIndex];
    let sourceNode: Node = nodes[edgeIndex + 1];
    if (edge.match(nextRegexp)) {
      targetNode = nodes[edgeIndex + 1];
      sourceNode = nodes[edgeIndex];
    }
    // TODO:type will be null
    returnEdges.push({
      relationKey: `${edge}+${edgeIndex}`,
      targetNode: targetNode.nodeKey,
      sourceNode: sourceNode.nodeKey,
      type: type![0],
    });
  });

  returnEdges.forEach((item) => {
    const sourceNode = nodes.findIndex(
      (node) => node.nodeKey === item.sourceNode,
    );
    const targetNode = nodes.findIndex(
      (node) => node.nodeKey === item.targetNode,
    );
    nodes[sourceNode].outRelations.push(item.relationKey);
    nodes[targetNode].inRelations.push(item.relationKey);
  });
  return { returnEdges, nodes };
};

export default deconstructEdge;
