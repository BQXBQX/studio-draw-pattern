import { Edge } from "../../types/edge";
import { Property } from "../../types/property";
import { deconstructProperties } from "./deconstructProperties";

export const deconstructEdges = (edgeWords: string[]) => {
  const edgeRegexp = /\[.*?\]/gi;
  const typeRegexp = /(?<=\:)[\d\w\s\:]+?(?=[\{\]])/g;
  const propertiesRegexp = /\{.+\}/g;
  const nextRegexp = /(?<=\[.*?\])->(?=\(.*?\))/g;

  edgeWords.forEach((item, index) => {
    let type: string = "";
    let properties: Property[] = [];
    const edgeWord = item.match(edgeRegexp);
    if (edgeWord) {
      // 处理Type
      const typeTemp: RegExpMatchArray | null = edgeWord[0].match(typeRegexp);
      if (typeTemp) type = typeTemp[0];

      // 处理property
      const propertiesWord: RegExpMatchArray | null =
        edgeWord[0].match(propertiesRegexp);
      if (propertiesWord) properties = deconstructProperties(propertiesWord[0]);
    }

    const isNext: boolean = item.match(nextRegexp) ? true : false;
    const edgeKey = `${edgeWord}-${index}`;
    // const newEdge: Edge = {
    //   edgeKey: edgeKey,
    //   type: type,
    //   properties: properties,
    // };

    // console.log(newEdge);
  });
};
