import {
  akColorB400,
  akColorN0,
  akColorN20,
  akColorB200,
  akColorN40,
  akColorN50,
  akColorN600,
} from '@atlaskit/util-shared-styles';

export function getInputBackground({ isChecked, isDisabled, isHovered, isPressed }) {
  let background = akColorN40;

  if (isHovered) background = akColorN50;
  if (isPressed) background = akColorB200;
  if (isChecked) background = akColorB400;
  if (isDisabled) background = akColorN20;
  if (isChecked && isDisabled) background = akColorN600;

  return background;
}

export function getInputFill({ isChecked }) {
  return isChecked ? akColorN0 : 'transparent';
}
