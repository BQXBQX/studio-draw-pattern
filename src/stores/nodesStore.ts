import { proxy } from "valtio";
import { Node } from "../types/node";

interface NodesState {
  nodes: Node[];
}

export const nodesState = proxy<NodesState>({
  nodes: [],
});

export const addNode = (node: Node) => {
  // 检测节点是否已经存在
  const isExist = nodesState.nodes.find(
    (item) => item.nodeKey === node.nodeKey,
  );
  if (isExist) throw new Error("节点已经存在,请勿重复添加");
  // 执行添加节点的逻辑
  nodesState.nodes.push(node);
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
};

export const changeNode = (changeNode: Node) => {
  //  检查节点是否存在
  const isExist = nodesState.nodes.find(
    (item) => item.nodeKey === changeNode.nodeKey,
  );
  if (!isExist) throw new Error("节点不存在, 无法修改");
  // 执行修改节点逻辑
  const changeNodeIndex = nodesState.nodes.findIndex(
    (item) => item.nodeKey === changeNode.nodeKey,
  );
  nodesState.nodes[changeNodeIndex] = changeNode;
};
