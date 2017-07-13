import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkInlineDialog from '@atlaskit/inline-dialog';

import AkNavigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerNavigationNested,
} from '../../../src/index';
import HtmlPage from '../HtmlPage';

export default class NestedNavigationWithInlineDialog extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
  }

  state = {
    isOpen: false,
    text: 'memes',
  }

  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    this.setState({ isOpen: true });
    window.setTimeout(() => {
      this.setState({ text: 'fresh memes' });
    }, 1000);
  }
  /* eslint-enable react/no-did-mount-set-state */

  render() {
    const dialoggo = (
      <AkInlineDialog
        content={<div>{'oh shit it\'s more memes'}</div>}
        isOpen={this.state.isOpen}
        position="right top"
      >
        <div>dio mio</div>
      </AkInlineDialog>
    );

    return (
      <HtmlPage>
        <AkNavigation
          containerAppearance="global"
          containerHeaderComponent={() => <div>seize the memes</div>}
        >
          <AkContainerNavigationNested
            stack={[
              [
                (<AkNavigationItemGroup apperance="container" key="key">
                  <a>
                    <AkNavigationItem
                      text={this.state.text}
                      action={dialoggo}
                    />
                  </a>
                </AkNavigationItemGroup>),
              ],
            ]}
          />
        </AkNavigation>
      </HtmlPage>
    );
  }
}
