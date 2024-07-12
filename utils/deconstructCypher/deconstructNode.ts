import { Node } from "../../types/node";
import { Property } from "../../types/property";
import deconstructVariable from "./deconstructVariable";

const deconstructNode = (nodes: RegExpMatchArray | null): Node[] => {
  if (nodes === null) return [];
  const returnNodes: Node[] = [];
  const labelsRegexp = /\:[\d\w\s\:]+?(?=[\{\)])/g;
  const labelRegexp = /(?<=\:)[\d\w]+/g;
  const propertiesRegexp = /\{.+\}/g;
  const propertyRegexp = /(?<=[\,\{]).+?(?=[\,\}])/g;
  const propertyNameRegexp = /.+?(?=\:)/g;
  const propertyNumberRegexp = /(?<=\:\s?)\d+/g;
  const propertyStringRegexp = /(?<=\:\s?[\"\']).+(?=[\"\'])/g;
  nodes.forEach((node, nodeIndex) => {
    returnNodes.push({
      nodeKey: `${node}-${nodeIndex}`,
      inRelations: [],
      outRelations: [],
    });
    // deconstruct labels
    const labels = node.match(labelsRegexp);
    let labelsArray: RegExpMatchArray | null = null;
    if (labels) labelsArray = labels![0].match(labelRegexp);
    labelsArray?.length !== 0 &&
      (returnNodes[nodeIndex].labels = labelsArray as string[]);
    // deconstruct properties
    const properties = node.match(propertiesRegexp);
    let propertiesArray: RegExpMatchArray | null = null;
    if (properties) propertiesArray = properties[0].match(propertyRegexp);
    let propertyArray: Property[] = [];
    propertiesArray?.forEach((item, propertyIndex) => {
      const propertyName = item.match(propertyNameRegexp);
      const propertyNumberValue = item.match(propertyNumberRegexp);
      const propertyStringValue = item.match(propertyStringRegexp);

      if (propertyName && (propertyNumberValue || propertyStringValue)) {
        propertyArray.push({
          name: propertyName[0],
          value: propertyStringValue
            ? String(propertyStringValue[0])
            : Number(propertyNumberValue![0]),
          type: propertyStringValue ? "string" : "number",
        });
      }
    });
    propertyArray.length && (returnNodes[nodeIndex].properties = propertyArray);
    // deconstruct variable
    const variable = deconstructVariable(
      node,
      "NODE",
      returnNodes[nodeIndex].nodeKey,
    );
    variable && (returnNodes[nodeIndex].variables = variable.variableKey);
  });
  return returnNodes;
};

export default deconstructNode;
