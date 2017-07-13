module.exports = `import { PureComponent } from 'react';

type State = {};
type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  onClick?: (e: MouseEvent) => void;
};

export default class extends PureComponent<Props, State> {}`;
