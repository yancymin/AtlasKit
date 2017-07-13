import { dom, Fragment, Schema, Node as PMNode, NodeSpec, MarkSpec, DOMSerializer, DOMParser } from '../';

export const fromHTML = (html: string, schema: Schema<NodeSpec, MarkSpec>): PMNode => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return DOMParser.fromSchema(schema).parse(el);
};

export const toDOM = (node: PMNode, schema: Schema<NodeSpec, MarkSpec>): dom.Node => {
  const serializer = DOMSerializer.fromSchema(schema);
  return serializer.serializeFragment(Fragment.from(node));
};

export const toHTML = (node: PMNode, schema: Schema<NodeSpec, MarkSpec>): string => {
  const el = document.createElement('div');
  el.appendChild(toDOM(node, schema));
  return el.innerHTML;
};
