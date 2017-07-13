import * as React from 'react';
import { PureComponent } from 'react';
import {
  ProsemirrorGetPosHandler,
  ReactComponentConstructor,
} from './';
import { ReactNodeViewComponents } from '../factory';
import { ReactNodeViewState } from '../../plugins';
import ProviderFactory from '../../providerFactory';
import {
  EditorView,
  Node as PMNode,
  NodeSelection,
} from '../../prosemirror';

interface Props {
  components: ReactNodeViewComponents;
  getPos: ProsemirrorGetPosHandler;
  node: PMNode;
  pluginState: ReactNodeViewState;
  providerFactory: ProviderFactory;
  view: EditorView;
}

interface State {
  selected: boolean;
}

// tslint:disable-next-line:variable-name
export default function wrapComponentWithClickArea(ReactComponent: ReactComponentConstructor): ReactComponentConstructor {
  return class WrapperClickArea extends PureComponent<Props, State> {
    state: State = { selected: false };

    componentDidMount() {
      const { pluginState } = this.props;
      pluginState.subscribe(this.handleDocumentSelectionChange);
    }

    componentWillUnmount() {
      const { pluginState } = this.props;
      pluginState.unsubscribe(this.handleDocumentSelectionChange);
    }

    render() {
      return (
        <div onClick={this.onClick}>
          <ReactComponent
            {...this.props}
            selected={this.state.selected}
          />
        </div>
      );
    }

    private handleDocumentSelectionChange = (anchorPos: number, headPos: number) => {
      const { getPos } = this.props;
      const nodePos = getPos();

      this.setState({
        selected: nodePos >= anchorPos && nodePos < headPos
      });
    }

    private onClick = () => {
      const { getPos, view } = this.props;
      const { doc, tr } = view.state;
      const pos = doc.resolve(getPos());
      const selection = new NodeSelection(pos);

      view.dispatch(tr.setSelection(selection));
    }
  };
}
