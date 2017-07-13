import {
  Mark as PMMark,
  MarkSpec,
  NodeSpec,
  Schema
} from '../prosemirror';

export interface Doc {
  version: 1;
  type: 'doc';
  content: Node[];
}

export interface Node {
  type: string;
  attrs?: any;
  content?: Node[];
  marks?: Mark[];
  text?: string;
}

export interface Mark {
  type: string;
  attrs?: any;
}

export interface MarkSimple {
  type: {
    name: string
  };
  attrs?: any;
}

import { defaultSchema } from '../schema';

/*
 * It's important that this order follows the marks rank defined here:
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Rank
 */
export const markOrder = [
  'link',
  'em',
  'strong',
  'strike',
  'subsup',
  'underline',
  'code',
];

const whitelistedURLPatterns = [
  /^https?:\/\//im,
  /^ftps?:\/\//im,
  /^\//im,
  /^mailto:/im,
  /^skype:/im,
  /^callto:/im,
  /^facetime:/im,
  /^git:/im,
  /^irc6?:/im,
  /^news:/im,
  /^nntp:/im,
  /^feed:/im,
  /^cvs:/im,
  /^svn:/im,
  /^mvn:/im,
  /^ssh:/im,
  /^scp:\/\//im,
  /^sftp:\/\//im,
  /^itms:/im,
  /^notes:/im,
  /^smb:/im,
  /^hipchat:\/\//im,
  /^sourcetree:/im,
  /^urn:/im,
  /^tel:/im,
  /^xmpp:/im,
  /^telnet:/im,
  /^vnc:/im,
  /^rdp:/im,
  /^whatsapp:/im,
  /^slack:/im,
  /^sips?:/im,
  /^magnet:/im,
];

export const isSafeUrl = (url: string): boolean => {
  return whitelistedURLPatterns.some(p => p.test(url.trim()) === true);
};

export const isSubSupType = (type: string): type is 'sub' | 'sup' => {
  return type === 'sub' || type === 'sup';
};

/*
 * Sorts mark by the predfined order above
 */
export const getMarksByOrder = (marks: PMMark[] ) => {
  return [...marks].sort((a, b) => markOrder.indexOf(a.type.name) - markOrder.indexOf(b.type.name));
};

/*
 * Check if two marks are the same by comparing type and attrs
 */
export const isSameMark = (mark: PMMark | null, otherMark: PMMark | null) => {
  if (!mark || !otherMark) {
    return false;
  }

  return mark.eq(otherMark);
};

export const getValidDocument = (doc: Doc, schema: Schema<NodeSpec, MarkSpec> = defaultSchema): Doc | null => {

  const node = getValidNode(doc as Node, schema);

  if (node.type === 'doc') {
    return node as Doc;
  }

  return null;
};

export const getValidContent = (content: Node[], schema: Schema<NodeSpec, MarkSpec> = defaultSchema): Node[] => {
  return content.map(node => getValidNode(node, schema));
};

const flattenUnknownBlockTree = (node: Node, schema: Schema<NodeSpec, MarkSpec> = defaultSchema): Node[] => {
  const output: Node[] = [];
  let isPrevLeafNode = false;

  for (let i = 0; i < node.content!.length; i++) {
    const childNode = node.content![i];
    const isLeafNode = !(childNode.content && childNode.content.length);

    if (i > 0) {
      if (isPrevLeafNode) {
        output.push({ type: 'text', text: ' ' } as Node);
      } else {
        output.push({ type: 'hardBreak' } as Node);
      }
    }

    if (isLeafNode) {
      output.push(getValidNode(childNode, schema));
    } else {
      output.push(...flattenUnknownBlockTree(childNode, schema));
    }

    isPrevLeafNode = isLeafNode;
  }

  return output;
};

/**
 * Sanitize unknown node tree
 *
 * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-ImplementationdetailsforHCNGwebrenderer
 */
export const getValidUnknownNode = (node: Node): Node => {
  const {
    attrs = {},
    content,
    text,
    type,
  } = node;

  if (!content || !content.length) {
    const unknownInlineNode: Node = {
      type: 'text',
      text: text || attrs.text || `[${type}]`,
    };

    if (attrs.textUrl) {
      unknownInlineNode.marks = [{
        type: 'link',
        attrs: {
          href: attrs.textUrl,
        },
      } as Mark];
    }

    return unknownInlineNode;
  }

  /*
   * Find leaf nodes and join them. If leaf nodes' parent node is the same node
   * join with a blank space, otherwise they are children of different branches, i.e.
   * we need to join them with a hardBreak node
   */
  return {
    type: 'unknownBlock',
    content: flattenUnknownBlockTree(node),
  };
};

/*
 * This method will validate a Node according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Nodes
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return 'unknown'
 *
 */
export const getValidNode = (node: Node, schema: Schema<NodeSpec, MarkSpec> = defaultSchema): Node => {
  const { attrs, text, type } = node;
  let { content } = node;

  if (content) {
    content = getValidContent(content, schema);
  }

  // If node type doesn't exist in schema, make it an unknow node
  if (!schema.nodes[type]) {
    return getValidUnknownNode(node);
  }

  if (type) {
    switch (type) {
      case 'applicationCard': {
        if (!attrs) { break; }
        const { text, link, background, preview, title, description, details } = attrs;
        if (!text || !title || !title.text) { break; }
        if (
          (link && !link.url) ||
          (background && !background.url) ||
          (preview && !preview.url) ||
          (description && !description.text)) { break; }
        if (details && !Array.isArray(details)) { break; }

        if (details && details.some(meta => {
          const { badge, lozenge, users } = meta;
          if (badge && !badge.value) { return true; }
          if (lozenge && !lozenge.text) { return true; }
          if (users && !Array.isArray(users)) { return true; }

          if (users && users.some(user => {
            if (!user.icon) {
              return true;
            }
          })) { return true; }
        })) { break; }

        return {
          type,
          text,
          attrs
        };
      }
      case 'doc': {
        const { version } = node as Doc;
        if (version && content && content.length) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'codeBlock': {
        if (attrs && attrs.language) {
          return {
            type,
            attrs,
            content
          };
        }
        break;
      }
      case 'emoji': {
        if (attrs && attrs.shortName) {
          return {
            type,
            attrs
          };
        }
        break;
      }
      case 'hardBreak': {
        return {
          type
        };
      }
      case 'media': {
        let mediaId = '';
        let mediaType = '';
        let mediaCollection = [];
        if (attrs) {
          const { id, collection, type } = attrs;
          mediaId = id;
          mediaType = type;
          mediaCollection = collection;
        }
        if (mediaId && mediaType && mediaCollection.length) {
          return {
            type,
            attrs: {
              type: mediaType,
              id: mediaId,
              collection: mediaCollection
            }
          };
        }
        break;
      }
      case 'mediaGroup': {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'mention': {
        let mentionText = '';
        let mentionId;
        let mentionAccess;
        if (attrs) {
          const { text, displayName, id, accessLevel } = attrs;
          mentionText = text || displayName;
          mentionId = id;
          mentionAccess = accessLevel;
        }

        if (!mentionText) {
          mentionText = text || '@unknown';
        }

        if (mentionText && mentionId) {
          const mentionNode = {
            type,
            attrs: {
              id: mentionId,
              text: mentionText
            }
          };
          if (mentionAccess) {
            mentionNode.attrs['accessLevel'] = mentionAccess;
          }

          return mentionNode;
        }
        break;
      }
      case 'paragraph': {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case 'rule': {
        return {
          type,
        };
      }
      case 'text': {
        let { marks } = node;
        if (text) {
          if (marks) {
            marks = marks.reduce((acc, mark ) => {
              const validMark = getValidMark(mark);
              if (validMark) {
                acc.push(validMark);
              }

              return acc;
            }, [] as Mark[]);
          }
          return marks ? { type, text, marks: marks } : { type, text };
        }
        break;
      }
      case 'heading': {
        if (attrs && content) {
          const { level } = attrs;
          const between = (x, a, b) => x >= a && x <= b;
          if (level && between(level, 1, 6)) {
            return {
              type,
              content,
              attrs: {
                level
              },
            };
          }
        }
        break;
      }
      case 'bulletList': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'orderedList': {
        if (content) {
          return {
            type,
            content,
            attrs: {
              order: attrs && attrs.order
            },
          };
        }
        break;
      }
      case 'listItem': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'blockquote': {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case 'panel': {
        const types = ['info', 'note', 'tip', 'warning'];
        if (attrs && content) {
          const { panelType } = attrs;
          if (types.indexOf(panelType) > -1) {
            return {
              type,
              attrs: { panelType },
              content,
            };
          }
        }
        break;
      }
    }
  }

  return getValidUnknownNode(node);
};

/*
 * This method will validate a Mark according to the spec defined here
 * https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-Marks
 *
 * This is also the place to handle backwards compatibility.
 *
 * If a node is not recognized or is missing required attributes, we should return null
 *
 */
export const getValidMark = (mark: Mark): Mark | null => {
  const { attrs, type } = mark;

  if (type) {
    switch (type) {
      case 'code': {
        return {
          type,
        };
      }
      case 'em': {
        return {
          type,
        };
      }
      case 'link': {
        if (attrs) {
          const { href, url } = attrs;
          let linkHref = href || url;

          if (linkHref.indexOf(':') === -1) {
            linkHref = `http://${linkHref}`;
          }

          if (linkHref && isSafeUrl(linkHref)) {
            return {
              type,
              attrs: {
                href: linkHref
              }
            };
          }
        }
        break;
      }
      case 'strike': {
        return {
          type,
        };
      }
      case 'strong': {
        return {
          type,
        };
      }
      case 'subsup': {
        if (attrs && attrs['type']) {
          const subSupType = attrs['type'];
          if (isSubSupType(subSupType)) {
            return {
              type,
              attrs: {
                type: subSupType
              }
            };
          }
        }
        break;
      }
      case 'underline': {
        return {
          type,
        };
      }
    }
  }

  return null;
};
