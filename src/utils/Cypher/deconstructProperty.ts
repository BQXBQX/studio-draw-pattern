import { Property } from "../../types/property";

export const deconstructProperty = (propertiesWord: string): Property[] => {
  const propertyRegexp = /(?<=[\{\,]).+?(?=[\,\}])/gi;
  const nameRegexp = /.+?(?=\:)/gi;
  const numberRegexp = /(?<=\:\s*)\d+?/;
  const stringRegexp = /(?<=\:\s*[\'\"]).+?(?=[\'\"])/gi;
  const propertyWords: RegExpMatchArray | null =
    propertiesWord.match(propertyRegexp);
  if (!propertyWords)
    throw new Error(
      `当前输入的properties语句没有property, 请检查输入, 当前输入值为${propertyWords}`,
    );
  const properties: Property[] = [];
  propertyWords.forEach((propertyWord) => {
    const name = propertyWord.match(nameRegexp);
    const number = propertyWord.match(numberRegexp);
    const string = propertyWord.match(stringRegexp);
    if (name && (number || string)) {
      properties.push({
        name: name[0],
        value: string ? String(string[0]) : Number(number![0]),
        type: string ? "string" : "number",
      });
    }
  });
  return properties;
};
