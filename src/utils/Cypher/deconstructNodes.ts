import { deconstructLabels } from "./deconstructLabels";
import { deconstructProperty } from "./deconstructProperty";
import { Property } from "../../types/property";
import { Node } from "../../types/node";
import { editNode } from "../../stores/nodesStore";

export const deconstructNodes = (nodeWords: string[]) => {
  const labelsRegexp = /\:[\d\w\s\:]+?(?=[\{\)])/g;
  const propertiesRegexp = /\{.+\}/g;

  nodeWords.forEach((nodeWord, index) => {
    // 对labels和properties的处理, 这里利用正则表达式的贪心形式,确保每个labelsWord propetiesWord只有一个元素
    // 即所有label property组成的字符串
    // 对整体的字符串使用函数进行处理,返回每一个label property
    let labels: string[] = [];
    const labelsWord: RegExpMatchArray | null = nodeWord.match(labelsRegexp);
    if (labelsWord) labels = deconstructLabels(labelsWord[0]);

    let properties: Property[] = [];
    const propertiesWord: RegExpMatchArray | null =
      nodeWord.match(propertiesRegexp);
    if (propertiesWord) properties = deconstructProperty(propertiesWord[0]);

    const newNode: Node = {
      nodeKey: `${nodeWord}-${index}`,
      inRelations: [],
      outRelations: [],
      labels: labels,
      properties: properties,
    };

    editNode(newNode);
  });
};
