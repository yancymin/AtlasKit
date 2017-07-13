/* eslint-disable import/prefer-default-export */

export function getStorybookURL(component, version) {
  const v = version || component.version;
  return `https://aui-cdn.atlassian.com/atlaskit/stories/${component.packageName}/${v}/`;
}
