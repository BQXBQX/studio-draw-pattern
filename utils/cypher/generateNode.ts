import type { Node, NodeStore } from "../../types/node";
import type { Variable } from "../../types/variable";

const generateNode = (nodes: Node[], variables: Variable[]): NodeStore[] => {
  let returnNodes: NodeStore[] = [];
  nodes.forEach((node, index) => {
    let statement: string = "";
    variables.find((variable) => {
      if (node.variables && variable.variableKey === node.variables[0]) {
        // TODO: 这里只完成了每个node只有一个variable的情况
        statement = statement + String(variable.name);
      }
    });
    node.labels?.forEach((label, index) => {
      statement = statement + `:${label}`;
    });
    let propertyArray: string[] = [];
    node.properties?.forEach((property, index) => {
      let propertyStatement: string = "";
      propertyStatement += property.name;
      // 当value为字符串时需要在value的两边加上引号""
      if (typeof property.value === "number") {
        propertyStatement += `:${property.value}`;
      } else {
        propertyStatement += `:"${property.value}"`;
      }
      propertyArray.push(propertyStatement);
    });
    statement =
      "(" + statement + " {" + `${propertyArray.join(",")}` + "}" + ")";
    returnNodes.push({
      nodeKey: node.nodeKey,
      statement: statement,
      inRelationship: node.inRelationship,
      outRelationship: node.outRelationship,
    });
  });
  return returnNodes;
};
export default generateNode;
