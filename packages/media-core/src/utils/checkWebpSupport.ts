/**
 * Checks if Webp support is enabled in the browser.
 * We know that creating a new image in memory and checking its height,
 * later on we cache this value forever.
 */
let isSupported;

export const checkWebpSupport = () : Promise<boolean> => {
  if (isSupported !== undefined) { return Promise.resolve(isSupported); }

  return new Promise((resolve) => {
    const img = new Image();

    img.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    img.onload = img.onerror = () => {
      isSupported = img.height === 2;

      resolve(isSupported);
    };
  });
};
