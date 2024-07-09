import type { Property } from "./property";

export interface Node {
  nodeKey: string;
  labels?: string[];
  properties?: Property[];
  variables?: string[];
  inRelationship: string[];
  outRelationship: string[];
}
export interface NodeStore {
  statement: string;
  inRelationship: string[];
  outRelationship: string[];
}
