import { Node, NodeRange, NodeType } from '../';

export function liftTarget(range: NodeRange): number | undefined;

export function findWrapping(range: NodeRange, nodeType: NodeType, attrs?: { [key: string]: any }): { type: NodeType, attrs?: { [key: string]: any } }[] | null;

export function canSplit(doc: Node, pos: number, depth?: number, typesAfter?: ({ type: NodeType, attrs?: { [key: string]: any } } | null)[]): boolean;

export function canJoin(doc: Node, pos: number): boolean;

export function joinPoint(doc: Node, pos: number, dir?: number): number | null;

export function insertPoint(doc: Node, pos: number, nodeType: NodeType, attrs?: { [key: string]: any }): number | null;
