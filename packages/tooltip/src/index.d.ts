import { Component, PureComponent, ReactNode } from 'react';

interface PropsSimpleTooltip {
  description?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
}

interface PropsExtendedTooltip {
  description?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
  visible?: boolean;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export default class AKTooltip extends Component<PropsSimpleTooltip, {}> {}
export class Tooltip extends PureComponent<PropsExtendedTooltip, {}> {}
