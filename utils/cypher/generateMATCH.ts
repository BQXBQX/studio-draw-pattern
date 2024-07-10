import type { Edge } from "../../types/edge";
import type { Node } from "../../types/node";
import hasIntersection from "../public_functions/hasIntersection";

interface ReturnValueProps {
  MATCH: string;
  edges: Edge[];
  nextNode: Node;
}

type Direction = "TARGET" | "SOURCE";

const generateMATCH = (nodes: Node[], edges: Edge[]): string[] => {
  let MATCHs: string[] = [];
  while (edges.length !== 0) {
    const startEdge = edges[0];
    let MATCH: string = startEdge.statement!;
    // 进行targetNode进行遍历
    ({ edges, MATCH } = ergodicNode(startEdge, MATCH, "TARGET", nodes, edges));
    // 进行sourceNode进行遍历
    ({ edges, MATCH } = ergodicNode(startEdge, MATCH, "SOURCE", nodes, edges));
    MATCHs.push("MATCH " + MATCH);
  }
  return MATCHs;
};

// 对edge的target&source方向进行遍历
const ergodicNode = (
  edge: Edge,
  MATCH: string,
  direction: Direction,
  nodes: Node[],
  edges: Edge[],
) => {
  let returnValue: ReturnValueProps | null = edgeNext(
    edge,
    MATCH,
    direction,
    nodes,
    edges,
  );
  while (returnValue !== null) {
    edges = returnValue.edges;
    MATCH = returnValue.MATCH;
    returnValue = nodeNext(
      returnValue.nextNode,
      returnValue.MATCH,
      direction,
      nodes,
      returnValue.edges,
    );
  }
  return { edges, MATCH };
};

const deleteEdge = (edges: Edge[], deleteEdge: Edge): Edge[] => {
  return edges.filter((edge) => edge !== deleteEdge);
};

const edgeNext = (
  edge: Edge,
  MATCH: string,
  direction: Direction,
  nodes: Node[],
  edges: Edge[],
): ReturnValueProps | null => {
  // 拿到当前边界的targe或者source节点
  const nextDirectionNode: string =
    direction === "TARGET" ? edge.targetNode : edge.sourceNode;
  const nextNode = nodes.find((node) => node.nodeKey === nextDirectionNode);
  if (nextNode) {
    // 进行字符串拼接
    direction === "TARGET"
      ? (MATCH += `->${nextNode?.statement}`)
      : (MATCH = `${nextNode.statement}->` + MATCH);
    edges = deleteEdge(edges, edge);
  } else return null;
  return { MATCH, edges, nextNode };
};

const nodeNext = (
  node: Node,
  MATCH: string,
  direction: Direction,
  nodes: Node[],
  edges: Edge[],
) => {
  const nextDirectionRelations: string[] =
    direction === "TARGET" ? node.outRelations : node.inRelations;
  // 判断当前节点是否还有relations
  if (nextDirectionRelations.length !== 0) {
    const relationsKeysArray: string[] = edges.map(
      (item, index) => item.relationKey,
    );
    // 判断两个数组是否有交集
    const intersectionEdges: string[] = hasIntersection(
      relationsKeysArray,
      nextDirectionRelations,
    );
    // 如果两个数组的交集数组的长度为0 那么直接返回null
    if (intersectionEdges.length === 0) return null;
    const nextEdge: Edge = edges.find(
      (item) => item.relationKey === intersectionEdges[0],
    ) as Edge;

    edges = deleteEdge(edges, nextEdge!);
    // 进行字符串拼接
    direction === "TARGET"
      ? (MATCH += `->${nextEdge?.statement}`)
      : (MATCH = `${nextEdge?.statement}->` + MATCH);
    // 调用degeNext再次进行拼接
    const returnEdgeValue = edgeNext(nextEdge, MATCH, direction, nodes, edges);
    return returnEdgeValue;
  } else return null;
};
export default generateMATCH;
