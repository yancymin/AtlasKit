import { ReactWrapper } from 'enzyme';
/* Component structure:
  ak-mention-picker
   > ak-popup (optional)
     > ak-resourced-mention-list
       > ak-mention-list
         > ak-scrollable
           > ak-mention-item (0..n)
 */

export function getMentionItemById(component: ReactWrapper<any, any>, itemId: string) {
  return component.findWhere(n => n.name() === 'MentionItem' && n.prop('mention').id === itemId);
}

export function getSelectedMentionItem(component: ReactWrapper<any, any>) {
  return component.findWhere(n => n.name() === 'MentionItem' && n.prop('selected'));
}

export function isMentionItemSelected(component: ReactWrapper<any, any>, itemId: string) {
  const selectedItem = getSelectedMentionItem(component);
  return selectedItem.length && selectedItem.prop('mention').id === itemId;
}
