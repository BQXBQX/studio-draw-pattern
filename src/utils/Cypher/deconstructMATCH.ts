import { deconstructNodes } from "./deconstructNodes";

export const deconstructMATCH = (matchWord: string) => {
  const nodesRegexp = /\(.+?\)/gi;
  const nodeWords: string[] | null = matchWord.match(nodesRegexp);
  // 如果该Match语句没有节点,直接报错
  if (!nodeWords)
    throw new Error(`该句子没有节点,请检查输入值, 当前输入值为 ${matchWord}`);
  deconstructNodes(nodeWords);
};
