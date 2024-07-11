import type { Node } from "../../types/node";
import type { Variable } from "../../types/variable";

const generateNode = (nodes: Node[], variables: Variable[]): Node[] => {
  let returnNodes: Node[] = [];
  nodes.forEach((node, index) => {
    let statement: string = "";
    //  检测当前节点是否有variable,同时拿到variable的name
    const currentVariable = variables.find(
      (variable) => node.variables && variable.variableKey === node.variables,
    );
    if (currentVariable?.name) statement += currentVariable.name;
    // 拿到当前节点的所有的label
    node.labels?.forEach((label, index) => {
      statement = statement + `:${label}`;
    });
    // 拿到当前节点的所有的property
    let propertiesArray: string[] = [];
    node.properties?.forEach((property, index) => {
      let propertyStatement: string = "";
      propertyStatement += property.name;
      // 当value为字符串时需要在value的两边加上引号""
      if (typeof property.value === "number") {
        propertyStatement += `:${property.value}`;
        // 当value为数字类型时value的两边直接引用不用引号""
      } else {
        propertyStatement += `:"${property.value}"`;
      }
      propertiesArray.push(propertyStatement);
    });
    // 将所有的字符串拼接获得当前的节点的字段
    statement =
      "(" + statement + " {" + `${propertiesArray.join(",")}` + "}" + ")";
    returnNodes.push({
      ...node,
      statement: statement,
    });
  });
  return returnNodes;
};
export default generateNode;
