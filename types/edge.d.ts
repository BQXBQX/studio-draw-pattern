export interface Edge {
  relationshipKey: string;
  type: string;
  targetNode: string;
  sourceNode: string;
}

export interface EdgeStore {
  relationshipKey: string;
  statement: string;
  targetNode: string;
  sourceNode: string;
}
