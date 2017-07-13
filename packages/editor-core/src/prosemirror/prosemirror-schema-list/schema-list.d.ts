import { EditorState, NodeSpec, NodeType, Transaction } from '../';
import OrderedMap = require('orderedmap');

export const orderedList: NodeSpec;

export const bulletList: NodeSpec;

export const listItem: NodeSpec;

export function addListNodes(nodes: OrderedMap<any>, itemContent: string, listGroup?: string): OrderedMap<any>;

export function wrapInList(nodeType: NodeType, attrs?: { [key: string]: any }): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function splitListItem(nodeType: NodeType): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function liftListItem(nodeType: NodeType): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function sinkListItem(nodeType: NodeType): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;
