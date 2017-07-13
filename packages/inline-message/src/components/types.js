// @flow
// Icons

import type { ___Icon } from '@atlaskit/icon';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

// Colours
import { akColorB400, akColorG300, akColorP300, akColorR300, akColorY300 } from '@atlaskit/util-shared-styles';

type IconSize = 'small' | 'medium' | 'large' | 'xlarge'

type IconType = {
  iconColor: string,
  iconSize: IconSize,
  icon: ___Icon,
};

type IconTypeMap = {|
  'connectivity': IconType,
  'confirmation': IconType,
  'info': IconType,
  'warning': IconType,
  'error': IconType
|};

const typesMapping: IconTypeMap = {
  connectivity: {
    icon: WarningIcon,
    iconColor: akColorB400,
    iconSize: 'medium',
  },
  confirmation: {
    icon: CheckCircleIcon,
    iconColor: akColorG300,
    iconSize: 'small',
  },
  info: {
    icon: WarningIcon,
    iconColor: akColorP300,
    iconSize: 'medium',
  },
  warning: {
    icon: WarningIcon,
    iconColor: akColorY300,
    iconSize: 'medium',
  },
  error: {
    icon: WarningIcon,
    iconColor: akColorR300,
    iconSize: 'medium',
  },
};

export default typesMapping;

export const types = Object.keys(typesMapping);

export const defaultType = 'connectivity';
