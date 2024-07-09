export interface Edge {
  relationshipKey: string;
  type: string;
  targetNode: string;
  sourceNode: string;
}

export interface EdgeStore {
  statement: string;
  targetNode: string;
  sourceNode: string;
}
