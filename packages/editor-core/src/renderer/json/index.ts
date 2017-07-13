import { Node as PMNode, Schema, Fragment } from '../../prosemirror';
import { Serializer } from '../serializer';
import { toJSON as mediaToJSON } from '../../schema/nodes/media';

export type JSONNode = {
  type: string,
  attrs?: object,
  content?: Array<JSONNode>,
  marks?: Array<any>,
  text?: string,
};

export type JSONDocNode = {
  version: number,
  type: 'doc',
  content: Array<JSONNode>,
};

const isMediaNode = (node: PMNode) => node.type.name === 'media';
const isParagraph = (node: PMNode) => node.type.name === 'paragraph';

const toJSON = (node: PMNode) : JSONNode => {
  const obj: JSONNode = { type: node.type.name };

  if (isMediaNode(node)) {
    obj.attrs = mediaToJSON(node).attrs;
  } else if (Object.keys(node.attrs).length) {
    obj.attrs = node.attrs;
  }

  if (node.isText) {
    obj.text = node.textContent;
  } else {
    node.content.forEach((child: PMNode) => {
      obj.content = obj.content || [];
      obj.content.push(toJSON(child));
    });
  }

  if (isParagraph(node)) {
    // Paragraph shall always has a content
    obj.content = obj.content || [];
  }

  if (node.marks.length) {
    obj.marks = node.marks.map(n => n.toJSON());
  }
  return obj;
};

export default class JSONSerializer implements Serializer<JSONDocNode> {
  serializeFragment(fragment: Fragment): JSONDocNode {
    const content: Array<JSONNode> = [];
    fragment.forEach(child => content.push(toJSON(child)));
    return {
      version: 1,
      type: 'doc',
      content,
    };
  }

  static fromSchema(schema: Schema<any, any>): JSONSerializer {
    return new JSONSerializer();
  }
}
