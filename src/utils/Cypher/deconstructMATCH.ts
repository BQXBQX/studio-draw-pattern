import { deconstructEdges } from "./deconstructEdges";
import { deconstructNodes } from "./deconstructNodes";

export const deconstructMATCH = (matchWord: string) => {
  const nodesRegexp = /\(.+?\)/gi;

  const nodeWords: string[] | null = matchWord.match(nodesRegexp);
  // 如果该Match语句没有节点,直接报错
  if (!nodeWords)
    throw new Error(`该句子没有节点,请检查输入值, 当前输入值为 ${matchWord}`);
  deconstructNodes(nodeWords);

  const edgeWords = searchAllEdge(matchWord);
  deconstructEdges(edgeWords);
};

const searchAllEdge = (matchWord: string): string[] => {
  const edgesRegexp =
    /\([\d\w:,\s\{\}'"-]*\)-\[[\d\w:,\s\{\}'"-]*\]->\([\d\w:,\s\{\}'"-]*\)/gi;

  let edgeWords = [];
  let edge;

  while ((edge = edgesRegexp.exec(matchWord)) !== null) {
    edgeWords.push(edge[0]);
    edgesRegexp.lastIndex = edge.index + 1; // 移动到下一个字符，确保找到重叠的匹配项
  }

  return edgeWords;
};
