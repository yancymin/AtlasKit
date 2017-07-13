const HAS_BASE64_FILE_SUPPORT =
  typeof File !== 'undefined' &&
  typeof FileReader !== 'undefined' &&
  typeof FileList !== 'undefined' &&
  typeof Blob !== 'undefined';

const getPasteFiles = (clipboardData: DataTransfer) => {
  if (!clipboardData) {
    return [];
  }

  const items = Array.prototype.reduce.call(clipboardData.items || [], (filesArr: File[], item: DataTransferItem) => {
    if (item.kind === 'file') {
      filesArr.push(item.getAsFile() as File);
    }

    return filesArr;
  }, []);

  return [
    ...items,
    ...Array.prototype.slice.call(clipboardData.files || [], 0)
  ];
};

export class Converter {
  HAS_BASE64_FILE_SUPPORT = HAS_BASE64_FILE_SUPPORT;
  supportedTypes: string[];
  maxFileSizeInBytes: number;

  constructor(
    supportedTypes: string[],
    maxFileSizeInBytes: number
  ) {
    this.supportedTypes = supportedTypes;
    this.maxFileSizeInBytes = maxFileSizeInBytes;
  }

  convert(
    files: File[],
    fn = (base64src: string) => { },
    errFn = (file: File) => { }
  ) {
    if (files && files[0]) {
      files.forEach((
        file: File
      ) => {
        const mimeType = file.type;
        if (
          file.size > this.maxFileSizeInBytes ||
          !this.supportedTypes.some((fileType) => mimeType.indexOf(fileType) !== -1)
        ) {
          errFn(file);
        }

        const reader = new FileReader();
        reader.onerror = (e: Event) => {
          errFn(file);
        };

        const onLoadBinaryString = (readerEvt) => {
          const binarySrc: string = btoa(readerEvt.target.result);
          fn(`data:${mimeType};base64,${binarySrc}`);
        };

        const onLoadDataUrl = (readerEvt) => {
          fn(readerEvt.target.result);
        };

        if ('readAsDataURL' in reader) {
          reader.onload = onLoadDataUrl;
          reader.readAsDataURL(file);
        } else {
          reader.onload = onLoadBinaryString;
          reader.readAsBinaryString(file);
        }
      });
    }
  }
}

export type convertedHandlerCallback = (imageAttrs: any) => void;

export function dropHandler(
  converter: Converter,
  e: DragEvent,
  fn: convertedHandlerCallback
): boolean {
  if (
    !converter.HAS_BASE64_FILE_SUPPORT ||
    !(
      e.dataTransfer &&
      e.dataTransfer.files &&
      e.dataTransfer.files.length
    )
  ) {
    return false;
  }

  const files = Array.prototype.slice.call(e.dataTransfer.files);

  converter.convert(files, (src: string) => fn({ src }));

  return true;
}

export function pasteHandler(
  converter: Converter,
  e: ClipboardEvent,
  fn: convertedHandlerCallback
): boolean {
  const pastedFiles = getPasteFiles(e.clipboardData);

  if (
    !converter.HAS_BASE64_FILE_SUPPORT ||
    !pastedFiles.length
  ) {
    return false;
  }

  if (pastedFiles.length) {
    converter.convert(pastedFiles, (
      src: string
    ) => { fn({ src }); });

    return true;
  }

  return false;
}
