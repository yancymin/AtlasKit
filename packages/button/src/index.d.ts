import { Component, ReactElement } from 'react';

interface Props {
  appearance?: 'primary' | 'default' | 'subtle' | 'link' | 'subtle-link';
  shouldFitContainer?: boolean;
  type?: 'button' | 'submit';
  href?: string;
  target?: string;
  form?: string;
  isDisabled?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  isSelected?: boolean;
  theme?: 'default' | 'dark';
  iconBefore?: ReactElement<any>;
  iconAfter?: ReactElement<any>;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  ariaHaspopup?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  id?: string;
}

export default class extends Component<Props, {}> {}
