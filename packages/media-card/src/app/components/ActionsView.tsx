/* tslint:disable:variable-name */
import * as React from 'react';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import MeatballIcon from '@atlaskit/icon/glyph/more';
import {AppCardAction} from '../model';
import {Actions, ActionsMenu} from '../styled/ActionsView';

// hack to get around lack of event in typings for @atlaskit/button
const UntypedButton = Button as any;

export interface ActionsViewProps {
  actions: AppCardAction[];
  isInversed: boolean;
  onActionClick?: (action: AppCardAction) => void;
}

export class ActionsView extends React.Component<ActionsViewProps, {}> {

  get primaryAction(): AppCardAction | undefined {
    const {actions} = this.props;
    return actions && actions[0];
  }

  get secondaryActions(): AppCardAction[] {
    const {actions} = this.props;
    return actions && actions.slice(1) || [];
  }

  handlePrimaryAction = (event: any) => {
    const {onActionClick} = this.props;
    const primaryAction = this.primaryAction;

    // allow the user to click the button but prevent the event bubling up and being handled by the
    // card onClick event
    event.stopPropagation();

    if (onActionClick && primaryAction) {
      onActionClick(primaryAction);
    }

  }

  handleSecondaryAction = ({item}) => {
    const {onActionClick} = this.props;
    const secondaryAction = item.action;
    if (onActionClick && secondaryAction) {
      onActionClick(secondaryAction);
    }
  }

  handleMeatballsClick(event) {
    event.stopPropagation();
  }

  render(): JSX.Element {
    const {isInversed} = this.props;
    const {primaryAction, secondaryActions} = this;
    const theme = isInversed && 'dark' || 'default';
    return (
      <Actions>
        {primaryAction
          ? <UntypedButton onClick={this.handlePrimaryAction} theme={theme}>{primaryAction.title}</UntypedButton>
          : null
        }
        {secondaryActions.length
          ? (
            <ActionsMenu onClick={this.handleMeatballsClick}>
              {/* FIXME: dropdown trigger is 1px larger cause display: flex-inline on the trigger and wrapped in divs from popper - need to change something upstream */}
              <DropdownMenu
                items={[{
                  items: secondaryActions.map(action => ({
                    content: action.title,
                    action
                  }))
                }]}
                onItemActivated={this.handleSecondaryAction}
              >
                <Button appearance="subtle" iconBefore={<MeatballIcon label="actions" size="medium"/>} theme={theme}/>
              </DropdownMenu>
            </ActionsMenu>
          )
          : null
        }
      </Actions>
    );
  }

}
