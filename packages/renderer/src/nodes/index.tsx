import * as React from 'react';
import { Mention, ResourcedMention } from '@atlaskit/mention';
import { EventHandlers, ServicesConfig } from '../config';
import Doc from './doc';
import Paragraph from './paragraph';
import Emoji from './emoji';
import Hardbreak from './hardBreak';
import MediaGroup from './mediaGroup';
import CodeBlock from './codeBlock';
import Media, { MediaNode } from './media';
import Heading, { HeadingLevel } from './heading';
import BulletList from './bulletList';
import OrderedList from './orderedList';
import ListItem from './listItem';
import Blockquote from './blockquote';
import Panel, { PanelType } from './panel';
import Rule from './rule';
import ApplicationCard from './applicationCard';
import {
  mergeTextNodes,
  renderTextNodes,
  stringifyTextNodes,
  TextNode,
} from './text';

export interface Renderable {
  version?: number;
  type: string;
  content?: Renderable[];
  text?: string;
  attrs?: {
    text?: string;
    [key: string]: any;
  };
}

enum NodeType {
  codeBlock,
  doc,
  emoji,
  hardBreak,
  media,
  mediaGroup,
  mention,
  paragraph,
  textWrapper,
  text,
  heading,
  bulletList,
  orderedList,
  listItem,
  blockquote,
  panel,
  rule,
  applicationCard,
  unknown
}

export const getValidNode = (node: Renderable | TextNode): Renderable | TextNode => {
  const { attrs, content, text, type } = node;

  if (type) {
    switch (NodeType[type]) {
      case NodeType.codeBlock: {
        if (content) {
          const {attrs} = node;
          return {
            content,
            type,
            attrs
          };
        }
        break;
      }
      case NodeType.doc: {
        const { version } = node;
        if (version && content && content.length) {
          return {
            type,
            version,
            content
          };
        }
        break;
      }
      case NodeType.emoji: {
        const { attrs } = node;
        if (attrs && attrs.shortName) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case NodeType.hardBreak:
        return {
          type
        };
      case NodeType.media:
        let mediaId = '';
        let mediaType = '';
        let mediaCollection = '';
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
      case NodeType.mediaGroup:
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      case NodeType.mention: {
        const { attrs, text } = node;
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
      case NodeType.paragraph: {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case NodeType.textWrapper: {
        const { content } = node;
        if (content && content.length) {
          return {
            type,
            content
          };
        }
        break;
      }
      case NodeType.text: {
        const { marks } = node as TextNode;
        if (text) {
          return {
            type,
            text,
            marks: marks || []
          };
        }
        break;
      }
      case NodeType.heading: {
        if (attrs && content) {
          const { level } = attrs;
          const between = (x, a, b) => x >= a && x <= b;
          if (level && between(level, 1, 6)) {
            return {
              type,
              attrs: { level },
              content,
            };
          }
        }
        break;
      }
      case NodeType.bulletList: {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case NodeType.orderedList: {
        if (content) {
          return {
            type,
            attrs: {
              order: attrs && attrs.order
            },
            content,
          };
        }
        break;
      }
      case NodeType.listItem: {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case NodeType.blockquote: {
        if (content) {
          return {
            type,
            content,
          };
        }
        break;
      }
      case NodeType.panel: {
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
      case NodeType.rule: {
        return { type };
      }
      case NodeType.applicationCard: {
        return { type, attrs };
      }
    }
  }

  return {
    type: NodeType[NodeType.unknown],
    text,
    attrs,
    content
  };

};

export const renderNode = (node: Renderable, servicesConfig?: ServicesConfig, eventHandlers?: EventHandlers, index: number = 0) => {
  const validNode = getValidNode(node);
  const nodeContent = mergeTextNodes(validNode.content || []);
  const key = `${validNode.type}-${index}`;

  switch (NodeType[validNode.type]) {
    case NodeType.codeBlock:
      const { attrs } = validNode;
      return <CodeBlock key={key} text={stringifyTextNodes(validNode.content)} language={attrs!.language as string} />;
    case NodeType.doc:
      return <Doc key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Doc>;
    case NodeType.emoji: {
      const { shortName, id, text } = validNode.attrs as { shortName: string, id?: string, text?: string };
      const emojiId = {
        shortName,
        id,
        fallback: text || shortName,
      };
      const emojiProvider = servicesConfig && servicesConfig.getEmojiProvider && servicesConfig.getEmojiProvider();
      return <Emoji key={key} emojiId={emojiId} emojiProvider={emojiProvider} />;
    }
    case NodeType.hardBreak:
      return <Hardbreak key={key} />;
    case NodeType.mediaGroup:
      return (
        <MediaGroup key={key}>
          {nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}
        </MediaGroup>);
    case NodeType.media:
      let provider;
      if (servicesConfig && servicesConfig.getMediaProvider) {
        provider = servicesConfig.getMediaProvider();
      }
      const { media } = eventHandlers || { media: {} };
      const { onClick } = media || { onClick: () => {} };
      return (
        <Media
          key={key}
          mediaProvider={provider}
          item={validNode as MediaNode}
          onClick={onClick}
        />);
    case NodeType.mention: {
      const { attrs } = validNode;
      const { id, text, accessLevel } = attrs as { id: string, text: string, accessLevel?: string };
      const { mention } = eventHandlers || { mention: {} };
      const { onClick, onMouseEnter, onMouseLeave } = mention || { onClick: () => {}, onMouseEnter: () => {}, onMouseLeave: () => {}};

      if (servicesConfig && servicesConfig.getMentionProvider) {
        return (
          <ResourcedMention
            key={key}
            id={id}
            text={text}
            accessLevel={accessLevel}
            mentionProvider={servicesConfig.getMentionProvider()}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />);
      }

      return (
        <Mention
          key={key}
          id={id}
          text={text}
          accessLevel={accessLevel}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />);
    }
    case NodeType.paragraph:
      return <Paragraph key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Paragraph>;
    case NodeType.textWrapper:
      return renderTextNodes(validNode.content as TextNode[]);
    case NodeType.text:
      return renderTextNodes([validNode as TextNode]);
    case NodeType.heading:
      const { level } = validNode.attrs as { level: HeadingLevel };
      return <Heading key={key} level={level}>{renderTextNodes(validNode.content as TextNode[])}</Heading>;
    case NodeType.bulletList:
      return <BulletList key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</BulletList>;
    case NodeType.orderedList:
      const optionalProps = {};
      if (validNode.attrs && validNode.attrs.order) {
        optionalProps['start'] = validNode.attrs.order;
      }
      return <OrderedList key={key} {...optionalProps}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</OrderedList>;
    case NodeType.listItem:
      return <ListItem key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</ListItem>;
    case NodeType.blockquote:
      return <Blockquote key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Blockquote>;
    case NodeType.panel:
      const { panelType } = validNode.attrs as { panelType: PanelType };
      return <Panel key={key} type={panelType}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Panel>;
    case NodeType.rule:
      return <Rule />;
    case NodeType.applicationCard:
      const { applicationCard } = eventHandlers || { applicationCard: {} };
      const { onClick: onCardClick, onActionClick } = applicationCard || { onClick: () => {}, onActionClick: () => {} };

      return <ApplicationCard
        onClick={onCardClick}
        onActionClick={onActionClick}
        model={validNode.attrs as any}
      />;
    default: {
      // Try render text of unkown node
      if (validNode.attrs && validNode.attrs.text) {
        return validNode.attrs.text;
      } else if (nodeContent.length) {
        // If we have an unknown, block-level node with text content, default to a paragraph with text
        return <span key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</span>;
      } else if (validNode.text) {
        return validNode.text;
      }

      // Node is unkown or invalid and can't be rendered
      if (NodeType[node.type] === NodeType.doc) {
        return <div>Unknown document</div>;
      }

      if (NodeType[node.type]) {
        return `Unknown format: "${node.type}"`;
      }

      return `Unknown type: "${node.type}"`;
    }
  }
};
