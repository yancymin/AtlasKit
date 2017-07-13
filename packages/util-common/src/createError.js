export default function createError(propName, componentName, message) {
  return new Error(
    `Invalid prop \`${propName}\` supplied to` +
    ` \`${componentName}\`. ${message}`
  );
}
