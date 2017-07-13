import { name } from '../../../../package.json';
import { expect } from 'chai';
import { sortByRank, fixExcludes, createPMPlugins } from '../../../../src/editor/create-editor/create-editor';

describe(name, () => {
  describe('create-editor', () => {
    describe('#sortByRank', () => {
      it('should correctly sort object with rank property', () => {
        const list = [
          { rank: 10 },
          { rank: 1 },
          { rank: 1000 },
          { rank: 30 },
          { rank: 100 },
          { rank: 40 }
        ];

        const result = [
          { rank: 1 },
          { rank: 10 },
          { rank: 30 },
          { rank: 40 },
          { rank: 100 },
          { rank: 1000 }
        ];

        list.sort(sortByRank);

        expect(list.sort(sortByRank)).to.deep.eq(result);
      });
    });

    describe('#fixExcludes', () => {
      it('should remove all unused marks from exclude', () => {
        const marks = {
          link: {
            excludes: 'code underline'
          },
          code: {
            excludes: 'link'
          }
        };
        const result  = {
          link: {
            excludes: 'code'
          },
          code: {
            excludes: 'link'
          }
        };

        expect(fixExcludes(marks)).to.deep.eq(result);
      });
    });

    describe('#createPMPlugins', () => {
      it('should not add plugin if its factory returns falsy value', () => {
        const editorConfig = {
          pmPlugins: [
            { rank: 0, plugin: () => false },
            { rank: 100, plugin: () => true }
          ]
        };
        expect(createPMPlugins(editorConfig as any, {} as any, {} as any, {} as any, {} as any).length).to.eq(1);
      });
    });
  });
});
