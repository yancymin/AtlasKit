import { base64fileconverter } from '../../src/test-helper';

const { Converter, dropHandler, pasteHandler } = base64fileconverter;
const converter = new Converter(['jpg', 'jpeg', 'png', 'gif', 'svg'], 10000000);

const imageUploadHandler = (e: any, fn: any) => {
  if (e && e.type === 'paste') {
    pasteHandler(converter, e, fn);
  } else if (e && e.type === 'drop') {
    dropHandler(converter, e, fn);
  } else {
    // we cannot trigger a real file viewer from here
    // so we just simulate a succesful image upload and insert an image
    fn({
      src: 'https://design.atlassian.com/images/brand/logo-21.png'
    });
  }
};

export default imageUploadHandler;
