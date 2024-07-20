import { useEffect, useState } from "react";
import { useDeconstructLabels } from "./useDeconstructLabels";

export const useDeconstructNodes = (nodeWords: string[]) => {
  const labelsRegexp = /\:[\d\w\s\:]+?(?=[\{\)])/g;
  const propertiesRegexp = /\{.+\}/g;

  nodeWords.forEach((nodeWord) => {
    // 对labels和properties的处理, 这里利用正则表达式的贪心形式,确保每个labelsWord propetiesWord只有一个元素
    // 即所有label property组成的字符串
    // 对整体的字符串使用函数进行处理,返回每一个label property组成的数组
    let labels: string[] = [];
    const labelsWord: RegExpMatchArray | null = nodeWord.match(labelsRegexp);
    if (labelsWord) labels = useDeconstructLabels(labelsWord[0]);

    let properties: string[] = [];
    const propertiesWord: RegExpMatchArray | null =
      nodeWord.match(propertiesRegexp);
  });
};
