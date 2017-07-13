import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import textFormattingPlugin, { TextFormattingState } from '../../../src/plugins/text-formatting';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import ToolbarTextFormatting from '../../../src/ui/ToolbarTextFormatting';
import { doc, p, makeEditor } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('ToolbarTextFormatting', () => {
  const editor = (doc: any) => makeEditor<TextFormattingState>({
    doc,
    plugins: textFormattingPlugin(defaultSchema),
  });

  it('should render disabled ToolbarButtons if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextFormatting
        disabled={true}
        pluginState={pluginState}
        editorView={editorView}
      />
    );

    toolbarTextColor.find(ToolbarButton).forEach(node => {
      expect(node.prop('disabled')).to.equal(true);
    });
  });
});
