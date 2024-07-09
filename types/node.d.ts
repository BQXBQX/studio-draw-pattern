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
  nodeKey: string;
  statement: string;
  inRelationship: string[];
  outRelationship: string[];
}
