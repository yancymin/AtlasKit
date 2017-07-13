import { PureComponent } from 'react';
import ProviderFactory from './';

export interface Providers {
  [key: string]: Promise<any>;
}

export interface Props {
  providerFactory: ProviderFactory;
  providers: string[];
  renderNode: (providers: Providers) => JSX.Element;
}

export class WithProviders extends PureComponent<Props, { providers: any }> {

  constructor(props) {
    super(props);

    const providers = {};
    this.props.providers.forEach(name => {
      providers[name] = undefined;
    });

    this.state = {
      providers
    };
  }

  componentWillMount() {
    const { providers, providerFactory } = this.props;

    providers.forEach(name => {
      providerFactory.subscribe(name, this.handleProvider);
    });
  }

  componentWillUnmount() {
    const { providers, providerFactory } = this.props;

    providers.forEach(name => {
      providerFactory.unsubscribe(name, this.handleProvider);
    });
  }

  handleProvider = (name: string, provider?: Promise<any>) => {
    const { providers } = this.state;

    this.setState({
      providers: {
        ...providers,
        [name]: provider
      }
    });
  }

  render() {
    const { state, props } = this;
    const { renderNode } = props;

    return renderNode(state.providers);
  }
}
