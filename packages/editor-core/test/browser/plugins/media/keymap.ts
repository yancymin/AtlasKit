import * as chai from 'chai';
import { expect } from 'chai';
import {
  MediaPluginState,
  mediaPluginFactory,
  ProviderFactory,
} from '../../../../src';
import {
  chaiPlugin,
  doc,
  makeEditor,
  p,
  sendKeyToPm,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('media - keymaps', () => {
  const providerFactory = new ProviderFactory();

  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    plugins: [
      ...mediaPluginFactory(defaultSchema, { providerFactory, uploadErrorHandler }),
    ],
    schema: defaultSchema
  });

  after(() => {
    providerFactory.destroy();
  });

  describe('Mod-z keypress', () => {
    it('does not detect links', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')));

      sendKeyToPm(editorView, 'Mod-z');

      expect(pluginState.ignoreLinks).to.equal(true);
    });
  });
});
