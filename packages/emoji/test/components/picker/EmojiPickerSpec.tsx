import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';
import AkButton from '@atlaskit/button';

import { createPngFile, newEmojiRepository, getEmojiResourcePromise, getNonUploadingEmojiResourcePromise, mediaEmoji, pngDataURL, pngFileUploadData } from '../../TestData';

import { customCategory } from '../../../src/constants';
import * as commonStyles from '../../../src/components/common/styles';

import Emoji from '../../../src/components/common/Emoji';
import EmojiPlaceholder from '../../../src/components/common/EmojiPlaceholder';
import EmojiPreview from '../../../src/components/common/EmojiPreview';
import FileChooser from '../../../src/components/common/FileChooser';

import CategorySelector from '../../../src/components/picker/CategorySelector';
import EmojiPicker, { Props } from '../../../src/components/picker/EmojiPicker';
import EmojiPickerFooter from '../../../src/components/picker/EmojiPickerFooter';
import EmojiPickerList from '../../../src/components/picker/EmojiPickerList';
import EmojiPickerListSearch from '../../../src/components/picker/EmojiPickerListSearch';
import { addEmojiClassName } from '../../../src/components/picker/EmojiPickerUploadPrompts';
import EmojiPickerCategoryHeading from '../../../src/components/picker/EmojiPickerCategoryHeading';
import EmojiPickerEmojiRow from '../../../src/components/picker/EmojiPickerEmojiRow';
import { UploadPromptMessage } from '../../../src/components/picker/EmojiPickerUploadPrompts';


import { OptionalEmojiDescription } from '../../../src/types';

function setupPicker(props?: Props): ReactWrapper<any, any> {
  const pickerProps = {
    ...props
  };

  if (props && !props.emojiProvider || !props) {
    pickerProps.emojiProvider = getEmojiResourcePromise();
  }

  return mount(
    <EmojiPicker
      {...pickerProps}
    />
  );
}

const leftClick = {
  button: 0,
};

const allEmojis = newEmojiRepository().all().emojis;

const findEmoji = list => list.find(Emoji);
const emojisVisible = (list) => findEmoji(list).length > 0;

const nodeIsCategory = (category: string, n) =>
  n.is(EmojiPickerCategoryHeading) && n.prop('title').toLocaleLowerCase() === category.toLocaleLowerCase();

const findCategoryHeading = (category: string, component) =>
  component.find(EmojiPickerCategoryHeading).filterWhere(n => nodeIsCategory(category, n));

const findAllVirtualRows = (component) =>
  component.findWhere(n =>
    n.is(EmojiPickerListSearch) ||
    n.is(EmojiPickerCategoryHeading) ||
    n.is(EmojiPickerEmojiRow) ||
    n.is(UploadPromptMessage)
    // ignore spinner
  );

const emojiRowsVisibleInCategory = (category: string, component) => {
  const rows = findAllVirtualRows(component);
  let foundStart = false;
  let foundEnd = false;
  return rows.filterWhere(n => {
    if (foundEnd) {
      return false;
    }

    if (foundStart) {
      if (!n.is(EmojiPickerEmojiRow)) {
        foundEnd = true;
        return false;
      }
      return true;
    }

    if (nodeIsCategory(category, n)) {
      foundStart = true;
    }

    return false;
  });
};

const getCategoryButton = (category: string, picker) => {
  const categorySelector = picker.find(CategorySelector);
  return categorySelector.findWhere(n => (
    n.name() === 'button' && n.prop('title').toLocaleLowerCase() === category.toLocaleLowerCase()
  ));
};

const categoryVisible = (category: string, component) => {
  const categoryHeadings = component.find(EmojiPickerCategoryHeading);
  const matchingHeading = categoryHeadings.filterWhere(n => nodeIsCategory(category, n));
  return matchingHeading.length > 0;
};

const showCategory = (category: string, component): Promise<any> => {
  const categoryButton = getCategoryButton(category, component);
  expect(categoryButton.length, `Category "${category}" button`).to.equal(1);

  const list = component.find(EmojiPickerList);

  return waitUntil(() => emojisVisible(list)).then(() => {
    categoryButton.simulate('click', leftClick);
    return waitUntil(() => categoryVisible(category, list));
  });
};

const findSearchInput = (component) => component.find(EmojiPickerListSearch).findWhere(component => component.name() === 'input');
const searchInputVisible = (component) => findSearchInput(component).length > 0;

describe('<EmojiPicker />', () => {
  describe('display', () => {
    it('should display first set of emoji in viewport by default', () => {
      const component = setupPicker();
      const list = component.find(EmojiPickerList);

      return waitUntil(() => emojisVisible(list)).then(() => {
        const emojis = findEmoji(list);
        const emojiProp = emojis.at(0).prop('emoji');
        expect(emojiProp.id, 'First emoji displayed').to.equal(allEmojis[0].id);
        const lastEmojiProp = emojis.at(emojis.length - 1).prop('emoji');
        expect(lastEmojiProp.id, 'Last displayed emoji in same order as source data').to.equal(allEmojis[emojis.length - 1].id);
      });
    });

    it('should display all categories', () => {
      const component = setupPicker();
      const categorySelector = component.find(CategorySelector);
      const buttons = categorySelector.find('button');
      const expectedCategories = CategorySelector.defaultProps.categories;

      expect(buttons.length, 'Number of category buttons').to.equal(expectedCategories.length);
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons.at(i);
        expect(button.text(), `Button #${i} (${button.text()})`).to.equal(expectedCategories[i].name);
      }
    });

    it('should empty preview by default', () => {
      const component = setupPicker();
      const footer = component.find(EmojiPickerFooter);
      const previewEmoji = footer.find(Emoji);

      expect(previewEmoji.length, 'No emoji preview by default').to.equal(0);
    });

    it('media emoji should render placeholder while loading', () => {
      const component = setupPicker();

      showCategory(customCategory, component).then(() => {
        const list = component.find(EmojiPickerList);

        const customHeading = findCategoryHeading(customCategory, list);
        expect(customHeading.length, 'Custom category heading found').to.equal(1);
        expect(customHeading.prop('title'), 'Custom category title').to.equal(customCategory);
        const customEmojiRows = emojiRowsVisibleInCategory(customCategory, component);
        const placeholders = customEmojiRows.find(EmojiPlaceholder);
        expect(placeholders.length, 'EmojiPlaceholder visible').to.equal(1);
        const props = placeholders.get(0).props;
        expect(props.shortName, 'short name').to.equals(mediaEmoji.shortName);
      });
    });
  });

  describe('hover', () => {
    it('should update preview on hover', () => {
      const hoverOffset = 5;
      const component = setupPicker();
      const footer = component.find(EmojiPickerFooter);
      const list = component.find(EmojiPickerList);

      return waitUntil(() => emojisVisible(list)).then(() => {
        const hoverButton = list.find(Emoji).at(hoverOffset);
        hoverButton.simulate('mousemove');
        const previewEmoji = footer.find(Emoji);
        expect(previewEmoji.length, 'Emoji preview after hover').to.equal(1);
        const emojiProps = previewEmoji.prop('emoji');
        expect(emojiProps.id, 'First emoji displayed').to.equal(allEmojis[hoverOffset].id);
      });
    });
  });

  describe('category', () => {
    it('selecting category should show that category', () => {
      const component = setupPicker();
      const list = component.find(EmojiPickerList);
      expect(list.prop('selectedCategory'), 'Flags category not yet selected').to.not.equal('FLAGS');

      return waitUntil(() => emojisVisible(list)).then(() => {
        expect(categoryVisible('flags', component), 'Flag category not rendered as not in view').to.equal(false);

        return showCategory('flags', component);
      }).then(() => {
        return waitUntil(() => list.prop('selectedCategory') === 'FLAGS' && categoryVisible('flags', component)).then(() => {
          expect(list.prop('selectedCategory'), 'Flags category selected').to.equal('FLAGS');
        });
      });
    });

    it('selecting custom category - should show preview with media first emoji loading', () => {
      const component = setupPicker();
      const list = component.find(EmojiPickerList);
      expect(list.prop('selectedCategory'), 'Custom category not yet selected').to.not.equal(customCategory);

      return waitUntil(() => emojisVisible(list)).then(() => {
        expect(categoryVisible(customCategory, component), 'Custom category not rendered as not in view').to.equal(false);

        return showCategory(customCategory, component);
      }).then(() => {
        return waitUntil(() => list.prop('selectedCategory') === customCategory && categoryVisible(customCategory, component)).then(() => {
          expect(list.prop('selectedCategory'), 'Custom category selected').to.equal(customCategory);
        });
      });
    });
  });

  describe('selection', () => {
    it('selecting emoji should trigger onSelection', () => {
      let selection: OptionalEmojiDescription;
      const clickOffset = 10;
      const component = setupPicker({
        onSelection: (emojiId, emoji) => { selection = emoji; },
      } as Props);
      const list = component.find(EmojiPickerList);
      const hoverButton = () => list.find(Emoji).at(clickOffset);
      return waitUntil(() => hoverButton().exists()).then(() => {
        hoverButton().simulate('mousedown', leftClick);
        return waitUntil(() => !!selection).then(() => {
          expect(selection, 'Selected emoji defined').to.not.equal(undefined);
          if (selection) {
            expect(selection.id, 'Selected emoji id').to.equal(allEmojis[clickOffset].id);
          }
        });
      });
    });
  });

  describe('search', () => {
    it('searching for al should match emoji via description', () => {
      const component = setupPicker();

      return waitUntil(() => searchInputVisible(component))
      .then(() => {
        // click search
        const searchInput = findSearchInput(component);
        searchInput.simulate('focus');
        // type "al"
        searchInput.simulate('change', {
          target: {
            value: 'al',
          }
        });

        const list = component.find(EmojiPickerList);
        return waitUntil(() => findEmoji(list).length === 2);
      }).then(() => {
        const list = component.find(EmojiPickerList);
        const emojis = list.find(Emoji);
        expect(emojis.length, 'Two matching emoji').to.equal(2);
        expect(emojis.at(0).prop('emoji').shortName, 'Albania emoji displayed').to.equal(':flag_al:');
        expect(emojis.at(1).prop('emoji').shortName, 'Algeria emoji displayed').to.equal(':flag_dz:');
      });
    });

    it('searching for red car should match emoji via shortName', () => {
      const component = setupPicker();

      return waitUntil(() => searchInputVisible(component))
      .then(() => {
        // click search
        const searchInput = findSearchInput(component);
        searchInput.simulate('focus');
        // type "red car"
        searchInput.simulate('change', {
          target: {
            value: 'red car',
          }
        });

        const list = component.find(EmojiPickerList);
        return waitUntil(() => findEmoji(list).length === 1);
      }).then(() => {
        const list = component.find(EmojiPickerList);
        const emojis = list.find(Emoji);
        expect(emojis.length, 'One matching emoji').to.equal(1);
        const emojiDescription = emojis.at(0).prop('emoji');
        expect(emojiDescription.name, 'Automobile emoji displayed').to.equal('automobile');
        expect(emojiDescription.shortName, 'Automobile emoji displayed').to.equal(':red_car:');
      });
    });
  });

  describe('upload', () => {
    const findCustomSection = (component => component.findWhere(wrapper => (
      wrapper.type() === EmojiPickerCategoryHeading && wrapper.prop('title') === customCategory
    )));
    const customSectionVisible = (component): boolean => component.findWhere(findCustomSection).length > 0;

    const findStartEmojiUpload = (component) => component.find(`.${addEmojiClassName}`);
    const startEmojiUploadVisible = (component): boolean => findStartEmojiUpload(component).length > 0;

    const findEmojiNameInput = (component) => component.find(`.${commonStyles.uploadChooseFileEmojiName} input`);
    const emojiNameInputVisible = (component): boolean => findEmojiNameInput(component).length > 0;
    const emojiNameInputHasAValue = (component): boolean => emojiNameInputVisible(component) && findEmojiNameInput(component).prop('value');

    const uploadAddRowSelector = `.${commonStyles.uploadAddRow}`;
    const findAddEmojiButton = (component) => component.find(uploadAddRowSelector).find(AkButton).at(0);
    const addEmojiButtonVisible = (component) => findAddEmojiButton(component).length > 0;
    const findCancelLink = (component) => component.find(uploadAddRowSelector).find(AkButton).at(1);

    const findUploadPreview = (component) => component.find(`.${commonStyles.uploadPreview}`);

    const findEmojiWithId = (component, id) => component.find(EmojiPickerList).find(Emoji).filterWhere(emoji => emoji.prop('emoji').id === id);
    const emojiWithIdVisible = (component, id) => findEmojiWithId(component, id).length > 0;

    const findPreview = (component) => component.find(EmojiPreview);
    const previewVisible = (component) => findPreview(component).length > 0;

    const findUploadError = (component) => component.find(`.${commonStyles.uploadError}`);
    const uploadErrorVisible = (component) => findUploadError(component).length > 0;

    it('Non-uploading EmojiResource - no upload UI', () => {
      const emojiProvider = getNonUploadingEmojiResourcePromise();
      const component = setupPicker({ emojiProvider });
      return waitUntil(() => customSectionVisible(component)).then(() => {
        const addEmoji = findStartEmojiUpload(component);
        expect(addEmoji.length, 'Emoji option').to.equal(0);
      });
    });

    it('UploadingEmojiResource - "without media token" - no upload UI', () => {
      const component = setupPicker();
      return waitUntil(() => customSectionVisible(component)).then(() => {
        const addEmoji = findStartEmojiUpload(component);
        expect(addEmoji.length, 'Emoji option').to.equal(0);
      });
    });

    it('UploadingEmojiResource - "with media token" - upload UI', () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = setupPicker({ emojiProvider });
      return showCategory(customCategory, component).then(() =>
        waitUntil(() => startEmojiUploadVisible(component))
      ).then(() => {
        const addEmoji = findStartEmojiUpload(component);
        expect(addEmoji.length, 'Emoji upload option').to.equal(1);
      });
    });

    it('Upload main flow interaction', () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = setupPicker({ emojiProvider });
      return emojiProvider.then(provider => {
        return showCategory(customCategory, component)
        .then(() => waitUntil(() => startEmojiUploadVisible(component))
        ).then(() => {
          // click add
          const addEmoji = findStartEmojiUpload(component);
          addEmoji.simulate('click');
          return waitUntil(() => emojiNameInputVisible(component));
        }).then(() => {
          // type name
          const nameInput = findEmojiNameInput(component);
          nameInput.simulate('focus');
          nameInput.simulate('change', {
            target: {
              value: ':cheese burger:',
            }
          });
          expect(nameInput.prop('value'), 'emoji name filtered').to.equal('cheese_burger');

          // choose file
          const fileChooser = component.find(FileChooser);
          const fileOnChange = fileChooser.prop('onChange');
          expect(fileOnChange, 'FileChooser exists with onChange prop').to.not.equal(undefined);
          if (fileOnChange) {
            fileOnChange({
              target: {
                files: [
                  createPngFile(),
                ]
              }
            } as React.ChangeEvent<any>);
          }
          return waitUntil(() => addEmojiButtonVisible(component));
        }).then(() => {
          // upload preview shown
          const uploadPreview = findUploadPreview(component);
          expect(uploadPreview.length, 'Upload preview visible').to.equal(1);
          const previewEmoji = uploadPreview.find(Emoji);
          expect(previewEmoji.length, 'Preview emoji inside preview').to.equal(1);
          const emoji = previewEmoji.prop('emoji');
          expect(emoji.shortName).to.equal(':cheese_burger:');
          expect(emoji.representation.imagePath).to.equal(pngDataURL);

          // add emoji
          const addEmojiButton = findAddEmojiButton(component);
          addEmojiButton.simulate('click');

          // wait for upload
          return waitUntil(() => provider.getUploads().length > 0);
        }).then(() => {
          // upload called on provider
          const uploads = provider.getUploads();
          expect(uploads.length, 'One upload occurred').to.equal(1);
          const upload = uploads[0];
          expect(upload.upload).to.deep.equal({
            name: 'Cheese burger',
            shortName: ':cheese_burger:',
            ...pngFileUploadData,
            width: 0, // jsdom fallbacks to width attribute
            height: 0, // jsdom fallbacks to height attribute
          });

          const newEmojiDescription = upload.emoji;
          return waitUntil(() => emojiWithIdVisible(component, newEmojiDescription.id));
        }).then(() => {
          // new emoji in view
          const newEmojiDescription = provider.getUploads()[0].emoji;
          const emoji = findEmojiWithId(component, newEmojiDescription.id);
          expect(emoji.length, 'Emoji found').to.equal(1);

          const { name, shortName, fallback } = emoji.prop('emoji');
          expect(name, 'name').to.equal('Cheese burger');
          expect(shortName, 'shortName').to.equal(':cheese_burger:');
          expect(fallback, 'fallback').to.equal(':cheese_burger:');

          return waitUntil(() => previewVisible(component));
        }).then(() => {
          // preview is back with new emoji shown by default
          const preview = findPreview(component);
          expect(preview.length, 'Single preview visible').to.equal(1);

          const previewEmoji = preview.find(Emoji);
          expect(previewEmoji.length, 'Emoji shown in preview').to.equal(1);

          const { name, shortName, fallback } = previewEmoji.prop('emoji');
          expect(name, 'name').to.equal('Cheese burger');
          expect(shortName, 'shortName').to.equal(':cheese_burger:');
          expect(fallback, 'fallback').to.equal(':cheese_burger:');
        });
      });
    });

    it('Upload after searching', () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = setupPicker({ emojiProvider });
      return emojiProvider.then(provider => {
        return waitUntil(() => searchInputVisible(component))
        .then(() => {
          // click search
          const searchInput = findSearchInput(component);
          searchInput.simulate('focus');
          // type "cheese burger"
          searchInput.simulate('change', {
            target: {
              value: 'cheese burger',
            }
          });

          // Wait for no matches
          return waitUntil(() => findEmoji(component).length === 0 && startEmojiUploadVisible(component));
        }).then(() => {
          // click add
          const addEmoji = findStartEmojiUpload(component).first();
          addEmoji.simulate('click');

          return waitUntil(() => emojiNameInputHasAValue(component));
        }).then(() => {
          // name is "cheese_burger" (from search)
          const nameInput = findEmojiNameInput(component);
          expect(nameInput.prop('value'), 'emoji name corresponds to search').to.equal('cheese_burger');

          // choose file
          const fileChooser = component.find(FileChooser);
          const fileOnChange = fileChooser.prop('onChange');
          expect(fileOnChange, 'FileChooser exists with onChange prop').to.not.equal(undefined);
          if (fileOnChange) {
            fileOnChange({
              target: {
                files: [
                  createPngFile(),
                ]
              }
            } as React.ChangeEvent<any>);
          }
          return waitUntil(() => addEmojiButtonVisible(component));
        }).then(() => {
          // upload preview shown
          const uploadPreview = findUploadPreview(component);
          expect(uploadPreview.length, 'Upload preview visible').to.equal(1);
          const previewEmoji = uploadPreview.find(Emoji);
          expect(previewEmoji.length, 'Preview emoji inside preview').to.equal(1);
          const emoji = previewEmoji.prop('emoji');
          expect(emoji.shortName).to.equal(':cheese_burger:');
          expect(emoji.representation.imagePath).to.equal(pngDataURL);

          // add emoji
          const addEmojiButton = findAddEmojiButton(component);
          addEmojiButton.simulate('click');

          // wait for upload
          return waitUntil(() => provider.getUploads().length > 0);
        }).then(() => {
          // upload called on provider
          const uploads = provider.getUploads();
          expect(uploads.length, 'One upload occurred').to.equal(1);
          const upload = uploads[0];
          expect(upload.upload).to.deep.equal({
            name: 'Cheese burger',
            shortName: ':cheese_burger:',
            ...pngFileUploadData,
            width: 0, // jsdom fallbacks to width attribute
            height: 0, // jsdom fallbacks to height attribute
          });

          const newEmojiDescription = upload.emoji;
          return waitUntil(() => emojiWithIdVisible(component, newEmojiDescription.id));
        }).then(() => {
          // new emoji in view
          const newEmojiDescription = provider.getUploads()[0].emoji;
          const emoji = findEmojiWithId(component, newEmojiDescription.id);
          expect(emoji.length, 'Emoji found').to.equal(1);

          const { name, shortName, fallback } = emoji.prop('emoji');
          expect(name, 'name').to.equal('Cheese burger');
          expect(shortName, 'shortName').to.equal(':cheese_burger:');
          expect(fallback, 'fallback').to.equal(':cheese_burger:');

          return waitUntil(() => previewVisible(component));
        }).then(() => {
          // preview is back with new emoji shown by default
          const preview = findPreview(component);
          expect(preview.length, 'Single preview visible').to.equal(1);

          const previewEmoji = preview.find(Emoji);
          expect(previewEmoji.length, 'Emoji shown in preview').to.equal(1);

          const { name, shortName, fallback } = previewEmoji.prop('emoji');
          expect(name, 'name').to.equal('Cheese burger');
          expect(shortName, 'shortName').to.equal(':cheese_burger:');
          expect(fallback, 'fallback').to.equal(':cheese_burger:');
        });
      });
    });

    it('Upload cancel interaction', () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true });
      const component = setupPicker({ emojiProvider });
      return emojiProvider.then(provider => {
        return showCategory(customCategory, component)
        .then(() => waitUntil(() => startEmojiUploadVisible(component)))
        .then(() => {
          // click add
          const addEmoji = findStartEmojiUpload(component);
          addEmoji.simulate('click');
          return waitUntil(() => emojiNameInputVisible(component));
        }).then(() => {
          // type name
          const nameInput = findEmojiNameInput(component);
          nameInput.simulate('focus');
          nameInput.simulate('change', {
            target: {
              value: ':cheese burger:',
            }
          });
          expect(nameInput.prop('value'), 'emoji name filtered').to.equal('cheese_burger');

          // choose file
          const fileChooser = component.find(FileChooser);
          const fileOnChange = fileChooser.prop('onChange');
          expect(fileOnChange, 'FileChooser exists with onChange prop').to.not.equal(undefined);
          if (fileOnChange) {
            fileOnChange({
              target: {
                files: [
                  createPngFile(),
                ]
              }
            } as React.ChangeEvent<any>);
          }
          return waitUntil(() => addEmojiButtonVisible(component));
        }).then(() => {
          // upload preview shown
          const uploadPreview = findUploadPreview(component);
          expect(uploadPreview.length, 'Upload preview visible').to.equal(1);
          const previewEmoji = uploadPreview.find(Emoji);
          expect(previewEmoji.length, 'Preview emoji inside preview').to.equal(1);
          const emoji = previewEmoji.prop('emoji');
          expect(emoji.shortName).to.equal(':cheese_burger:');
          expect(emoji.representation.imagePath).to.equal(pngDataURL);

          // cancel
          const cancelLink = findCancelLink(component);
          cancelLink.simulate('click');

          // wait for preview to return
          return waitUntil(() => previewVisible(component));
        }).then(() => {
          // preview is back with new emoji shown by default
          const preview = findPreview(component);
          expect(preview.length, 'Single preview visible').to.equal(1);

          const previewEmoji = preview.find(Emoji);
          expect(previewEmoji.length, 'No emoji shown in preview').to.equal(0);

          // No uploads occured
          const uploads = provider.getUploads();
          expect(uploads.length, 'No uploads occurred').to.equal(0);
        });
      });
    });

    it('Upload error interaction', () => {
      const emojiProvider = getEmojiResourcePromise({ uploadSupported: true, uploadError: 'bad times' });
      const component = setupPicker({ emojiProvider });
      return emojiProvider.then(provider => {
        return showCategory(customCategory, component)
        .then(() => waitUntil(() => startEmojiUploadVisible(component)))
        .then(() => {
          // click add
          const addEmoji = findStartEmojiUpload(component);
          addEmoji.simulate('click');
          return waitUntil(() => emojiNameInputVisible(component));
        }).then(() => {
          // type name
          const nameInput = findEmojiNameInput(component);
          nameInput.simulate('focus');
          nameInput.simulate('change', {
            target: {
              value: ':cheese burger:',
            }
          });
          expect(nameInput.prop('value'), 'emoji name filtered').to.equal('cheese_burger');

          // choose file
          const fileChooser = component.find(FileChooser);
          const fileOnChange = fileChooser.prop('onChange');
          expect(fileOnChange, 'FileChooser exists with onChange prop').to.not.equal(undefined);
          if (fileOnChange) {
            fileOnChange({
              target: {
                files: [
                  createPngFile(),
                ]
              }
            } as React.ChangeEvent<any>);
          }
          return waitUntil(() => addEmojiButtonVisible(component));
        }).then(() => {
          // upload preview shown
          const uploadPreview = findUploadPreview(component);
          expect(uploadPreview.length, 'Upload preview visible').to.equal(1);
          const previewEmoji = uploadPreview.find(Emoji);
          expect(previewEmoji.length, 'Preview emoji inside preview').to.equal(1);
          const emoji = previewEmoji.prop('emoji');
          expect(emoji.shortName).to.equal(':cheese_burger:');
          expect(emoji.representation.imagePath).to.equal(pngDataURL);

          // add emoji
          const addEmojiButton = findAddEmojiButton(component);
          addEmojiButton.simulate('click');

          // wait for error
          return waitUntil(() => uploadErrorVisible(component));
        }).then(() => {
          // Check error displayed
          const uploadError = findUploadError(component);
          expect(uploadError.length, 'Upload error displayed').to.equal(1);

          // upload not called on provider
          const uploads = provider.getUploads();
          expect(uploads.length, 'No upload occurred').to.equal(0);

          // cancel
          const cancelLink = findCancelLink(component);
          cancelLink.simulate('click');

          // wait for preview to return
          return waitUntil(() => previewVisible(component));
        }).then(() => {
          // preview is back with new emoji shown by default
          const preview = findPreview(component);
          expect(preview.length, 'Single preview visible').to.equal(1);

          const previewEmoji = preview.find(Emoji);
          expect(previewEmoji.length, 'No emoji shown in preview').to.equal(0);

          // No uploads occured
          const uploads = provider.getUploads();
          expect(uploads.length, 'No uploads occurred').to.equal(0);
        });
      });
    });
  });
});
