import { nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { hipchatSchema as schema } from '@atlaskit/editor-core';

export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const br = schema.node(schema.nodes.hardBreak);
