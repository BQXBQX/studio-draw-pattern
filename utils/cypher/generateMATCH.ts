import type { EdgeStore } from "../../types/edge";
import type { NodeStore } from "../../types/node";
type Direction = "TARGET" | "SOURCE";
const generateMATCH = (nodes: NodeStore[], edges: EdgeStore[]) => {
  let MATCHs: string[] = [];
  while (edges.length !== 0) {
    const startEdge = edges[0];
    let MATCH = startEdge.statement;
    let returnValue: any = null;
    // 遍历target节点
    returnValue = edgeNext(startEdge, MATCH, "TARGET", nodes, edges);
    if (returnValue) {
      while (returnValue !== null) {
        edges = returnValue.edges;
        MATCH = returnValue.MATCH;
        returnValue = nodeNext(
          returnValue.nextNode,
          returnValue.MATCH,
          "TARGET",
          nodes,
          returnValue.edges,
        );
      }
    }
    // 遍历source节点
    returnValue = edgeNext(startEdge, MATCH, "SOURCE", nodes, edges);

    if (returnValue !== null) {
      while (returnValue !== null) {
        edges = returnValue.edges;
        MATCH = returnValue.MATCH;

        returnValue = nodeNext(
          returnValue.nextNode,
          returnValue.MATCH,
          "SOURCE",
          nodes,
          returnValue.edges,
        );
      }
    }
    MATCHs.push("MATCH " + MATCH);
  }
  return MATCHs;
};

const deleteEdge = (edges: EdgeStore[], deleteEdge: EdgeStore): EdgeStore[] => {
  return edges.filter((edge) => edge !== deleteEdge);
};

const edgeNext = (
  edge: EdgeStore,
  MATCH: string,
  direction: Direction,
  nodes: NodeStore[],
  edges: EdgeStore[],
) => {
  if (edge === undefined) return null;
  const nextDirectionNode: string =
    direction === "TARGET" ? edge.targetNode : edge.sourceNode;
  const nextNode = nodes.find((node) => node.nodeKey === nextDirectionNode);
  if (nextNode) {
    direction === "TARGET"
      ? (MATCH += `->${nextNode?.statement}`)
      : (MATCH = `${nextNode.statement}->` + MATCH);
    edges = deleteEdge(edges, edge);
  } else {
    return null;
  }
  return { MATCH, edges, nextNode };
};

const nodeNext = (
  node: NodeStore,
  MATCH: string,
  direction: Direction,
  nodes: NodeStore[],
  edges: EdgeStore[],
) => {
  const nextDirectionRelationship: string[] =
    direction === "TARGET" ? node.outRelationship : node.inRelationship;

  if (nextDirectionRelationship.length !== 0) {
    const relationshipKeysArray = edges.map(
      (item, index) => item.relationshipKey,
    );
    nextDirectionRelationship.forEach((item) => {
      const isExist = relationshipKeysArray.find(
        (relationship) => relationship === item,
      );
      if (isExist === undefined) {
        return null;
      }
    });
    const nextEdge = edges.find(
      (item) => item.relationshipKey === nextDirectionRelationship[0],
    );
    edges = deleteEdge(edges, nextEdge!);
    direction === "TARGET"
      ? (MATCH += `->${nextEdge?.statement}`)
      : (MATCH = `${nextEdge?.statement}->` + MATCH);
    const returnEdgeValue = edgeNext(nextEdge!, MATCH, direction, nodes, edges);
    if (returnEdgeValue) {
      return returnEdgeValue;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export default generateMATCH;
