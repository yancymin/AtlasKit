import { NodeSpec } from '../../';

const name = 'confluenceJiraIssue';

export const confluenceJiraIssue = {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    issueKey: { default: null },
    macroId: { default: null },
    schemaVersion: { default: null },
    server: { default: null },
    serverId: { default: null },
  },
  parseDOM: [{
    tag: `span[data-node-type="${name}"]`,
    getAttrs: (dom: HTMLElement) => ({
      issueKey: dom.textContent,
      macroId: dom.dataset.macroId,
      schemaVersion: dom.dataset.schemaVersion,
      server: dom.dataset.server,
      serverId: dom.dataset.serverId,
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'data-node-type': name,
      'data-macro-id': node.attrs.macroId,
      'data-schema-version': node.attrs.schemaVersion,
      'data-server': node.attrs.server,
      'data-server-id': node.attrs.serverId,
      'data-jira-issue': node.attrs.issueKey,
    };

    return ['span', attrs, node.attrs.issueKey];
  }
} as NodeSpec;
