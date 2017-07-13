import React, { PureComponent } from 'react';
import styled from 'styled-components';

import ActivityIcon from '@atlaskit/icon/glyph/activity';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import AddIcon from '@atlaskit/icon/glyph/add';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down';
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightLongIcon from '@atlaskit/icon/glyph/arrow-right-long';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';

import { size } from '@atlaskit/icon';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
`;

const IconWrapper = styled.span`
  margin: 5px;
`;

const demoIcons = [
  ActivityIcon,
  AddCircleIcon,
  AddItemIcon,
  AddIcon,
  AddonIcon,
  AppSwitcherIcon,
  ArrowDownIcon,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightLongIcon,
  ArrowRightIcon,
  ArrowUpIcon,
];

class IconSizeExample extends PureComponent {
  state = {
    size: size.medium,
  }

  updateSize = s => this.setState({ size: s })

  renderButtons = () => Object.values(size)
      .map(s => (
        <Button
          isSelected={s === this.state.size}
          key={s}
          onClick={() => this.updateSize(s)}
        >
          {s}
        </Button>
      ))

  render() {
    return (
      <div>
        <ButtonGroup>
          {this.renderButtons()}
        </ButtonGroup>
        <IconRow>
          {demoIcons.map((Icon, i) => (
            <IconWrapper key={i}>
              <Icon
                label={`Icon ${i}`}
                size={this.state.size}
              />
            </IconWrapper>
          ))}
        </IconRow>
      </div>
    );
  }
}

export default IconSizeExample;
