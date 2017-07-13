export const isTextWrapper = (type: string): type is 'textWrapper' => {
  return type === 'textWrapper';
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};

const whitelistedURLPatterns = [
  /^https?:\/\//im,
  /^ftps?:\/\//im,
  /^\/\//im,
  /^mailto:/im,
];

export const isSafeUrl = (url: string): boolean => {
  return whitelistedURLPatterns.some(p => p.test(url.trim()) === true);
};
