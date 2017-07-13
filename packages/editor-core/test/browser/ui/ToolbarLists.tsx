import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import listsPlugins, { ListsState } from '../../../src/plugins/lists';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import ToolbarLists from '../../../src/ui/ToolbarLists';
import { doc, p, makeEditor } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('ToolbarLists', () => {
  const editor = (doc: any) => makeEditor<ListsState>({
    doc,
    plugins: listsPlugins(defaultSchema),
  });

  it('should render disabled ToolbarButtons if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarLists = mount(
      <ToolbarLists
        disabled={true}
        pluginState={pluginState}
        editorView={editorView}
      />
    );

    toolbarLists.find(ToolbarButton).forEach(node => {
      expect(node.prop('disabled')).to.equal(true);
    });
  });
});
