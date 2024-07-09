import type { Edge } from "../../types/edge";

const generateEdge = (edges: Edge[]): Edge[] => {
  let returnEdges: Edge[] = [];
  edges.forEach((edge, index) => {
    // 拿到所有的relations的type并且进行字符串拼接
    // TODO: 没有考虑到relation有variable的情况,后期需要考虑
    const statement: string = `[:${edge.type}]`;
    returnEdges.push({
      ...edge,
      statement: statement,
    });
  });
  return returnEdges;
};

export default generateEdge;
