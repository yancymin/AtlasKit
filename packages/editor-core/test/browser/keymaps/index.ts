import { expect } from 'chai';
import { browser } from '../../../src';
import * as keymaps from '../../../src/keymaps';

describe('keymaps', () => {
  const keymap = {
    description: 'A keymap',
    windows: 'Ctrl-Shift-Alt-K',
    mac: 'Cmd-Shift-Alt-K',
    common: 'Mod-Shift-Alt-K'
  };

  if (browser.mac) {
    context('when on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).to.eq('A keymap (⌘-⇧-⌥-K)');
        });
      });

      describe('findKeymapByDescription', () => {
        context('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('Bold')).to.eq(keymaps.toggleBold);
          });
        });

        context('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).to.equal(undefined);
          });
        });
      });

      describe('findShortcutByDescription', () => {
        context('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShortcutByDescription('heading 1')).to.eq('Cmd-Alt-1');
          });
        });

        context('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShortcutByDescription('random')).to.equal(undefined);
          });
        });
      });
    });
  } else {
    context('when not on a mac', () => {
      describe('tooltip', () => {
        it('returns tooltip', () => {
          expect(keymaps.tooltip(keymap)).to.eq('A keymap (Ctrl-Shift-Alt-K)');
        });
      });

      describe('findKeymapByDescription', () => {
        context('keymap is found', () => {
          it('returns matched keymap', () => {
            expect(keymaps.findKeymapByDescription('Bold')).to.eq(keymaps.toggleBold);
          });
        });

        context('key map is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findKeymapByDescription('random')).to.equal(undefined);
          });
        });
      });

      describe('findShortcutByDescription', () => {
        context('shortcut is found', () => {
          it('returns matched shortcut', () => {
            expect(keymaps.findShortcutByDescription('heading 1')).to.eq('Ctrl-1');
          });
        });

        context('shortcut is not found', () => {
          it('returns undefined', () => {
            expect(keymaps.findShortcutByDescription('random')).to.equal(undefined);
          });
        });
      });
    });
  }
});
