import { Variable } from "../../types/variable";

type VariableBelong = "NODE" | "RELATION";
const deconstructVariable = (
  sentence: string,
  belong: VariableBelong,
  nodeKey: string,
): Variable | null => {
  const variableRegexp = /(?<=[\(\[])[\d\w]+(?=\:)/g;
  const variable = sentence.match(variableRegexp);
  if (!variable) return null;
  return {
    // TODO: type 的设计还需要考虑
    variableKey: `${variable[0]}-${sentence}`,
    name: variable[0],
    type: "Object",
    belongKey: nodeKey,
    belongType: belong,
  };
};
export default deconstructVariable;
