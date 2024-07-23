import { useEffect } from "react";
import { deconstructMATCH } from "../../utils/Cypher/deconstructMATCH";
import { clearNodes } from "../../stores/nodesStore";

// 希望传入的cypherWord是一个状态, 而不是一个简单的变量
export const useDeconstructCypher = (cypherWord: string) => {
  useEffect(() => {
    clearNodes();
    deconstructMATCH(cypherWord);
  }, [cypherWord]);
};
