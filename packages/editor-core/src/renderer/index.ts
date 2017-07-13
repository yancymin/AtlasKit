import {
  MarkSpec,
  NodeSpec,
  Schema,
} from '../prosemirror';

import {
  getValidDocument,
} from './validator';

import { Serializer } from './serializer';
import { defaultSchema } from '../schema';

export { default as ReactSerializer } from './react';
export { default as TextSerializer } from './text';
export { default as JSONSerializer } from './json';
export { MarkdownSerializer as RendererMarkdownSerializer } from './markdown';
export { default as ReactRenderer } from '../ui/Renderer';

export const renderDocument = <T>(doc: any, serializer: Serializer<T>, schema: Schema<NodeSpec, MarkSpec> = defaultSchema): T | null => {
  const validDoc = getValidDocument(doc, schema);

  if (!validDoc) {
    return null;
  }

  const node = schema.nodeFromJSON(validDoc);
  return serializer.serializeFragment(node.content);
};

export { Serializer };
