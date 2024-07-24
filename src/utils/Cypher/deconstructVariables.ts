import { addVariableByKey } from "../../stores/nodesStore";

type VariableBelong = "NODE" | "RELATION";
export const deconstructVariables = (
  word: string,
  belong: VariableBelong,
  key: string,
) => {
  // TODO: 后期讨论varibales能否为一个数组
  const variablesRegexp = /(?<=[\(\[])[\d\w]+(?=[\:\)\]\{])/gi;
  const variables = word.match(variablesRegexp);
  variables && addVariableByKey(key, variables[0]);
};
