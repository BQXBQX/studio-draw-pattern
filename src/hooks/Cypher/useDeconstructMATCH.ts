import { useDeconstructNodes } from "./useDeconstructNodes";

export const useDeconstructMATCH = (matchWord: string) => {
  const nodesRegexp = /\(.+?\)/gi;
  const nodeWords: string[] | null = matchWord.match(nodesRegexp);
  // 如果该Match语句没有节点,直接报错
  if (!nodeWords) throw new Error("该句子没有节点,请重新输入");
  useDeconstructNodes(nodeWords);
};
