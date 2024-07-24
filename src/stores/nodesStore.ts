import { proxy } from "valtio";
import { Node } from "../types/node";

interface NodesState {
  nodes: Node[];
}

export const nodesState = proxy<NodesState>({
  nodes: [],
});

export const editNode = (node: Node) => {
  // 检测节点是否已经存在
  const isExist = nodesState.nodes.find(
    (item) => item.nodeKey === node.nodeKey,
  );
  if (isExist) {
    // 执行修改节点逻辑
    const editNode = node;
    const editNodeIndex = nodesState.nodes.findIndex(
      (item) => item.nodeKey === editNode.nodeKey,
    );
    nodesState.nodes[editNodeIndex] = editNode;
  }
  // 执行添加节点的逻辑
  else nodesState.nodes.push(node);
  console.log("添加节点");
};

export const deleteNode = (nodeKey: string) => {
  // 检测节点是否存在
  const isExist = nodesState.nodes.find((item) => item.nodeKey === nodeKey);
  if (!isExist) throw new Error("节点不存在,请不要删除");
  // 执行删除节点的逻辑
  nodesState.nodes = nodesState.nodes.filter(
    (item) => item.nodeKey !== nodeKey,
  );
};

export const clearNodes = () => {
  // 重置所有节点
  nodesState.nodes = [];
  console.log("清除所有节点");
};

// TODO:这里考虑每个节点的variable只有一个,如果可以是一个数组,后期再进行优化.
export const addVariableByKey = (nodeKey: string, variableName: string) => {
  const nodeIndex = nodesState.nodes.findIndex(
    (item) => item.nodeKey === nodeKey,
  );
  if (nodeIndex === -1)
    throw new Error("不存在当前节点, 请重新输入要输入的 varibale");
  nodesState.nodes[nodeIndex].variable = variableName;
};
