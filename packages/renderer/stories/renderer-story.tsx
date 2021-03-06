import { action, storiesOf } from '@kadira/storybook';
import { Mention } from '@atlaskit/mention';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import * as React from 'react';

import Renderer from '../src';
import Emoji from '../src/nodes/emoji';
import Paragraph from '../src/nodes/paragraph';
import HardBreak from '../src/nodes/hardBreak';
import Heading from '../src/nodes/heading';
import BulletList from '../src/nodes/bulletList';
import OrderedList from '../src/nodes/orderedList';
import ListItem from '../src/nodes/listItem';
import Blockquote from '../src/nodes/blockquote';
import Panel from '../src/nodes/panel';
import Rule from '../src/nodes/rule';
import Em from '../src/marks/em';
import Link from '../src/marks/link';
import Mono from '../src/marks/mono';
import Strike from '../src/marks/strike';
import Strong from '../src/marks/strong';
import Subsup from '../src/marks/subsup';
import Underline from '../src/marks/underline';
import Code from '../src/marks/code';
import CodeBlock from '../src/nodes/codeBlock';
import ApplicationCard from '../src/nodes/applicationCard';
import { name } from '../package.json';
import { document, evilburnsEmojiId, grinEmojiId, lorem } from './story-data';

const tokenProvider = StoryBookTokenProvider.tokenProvider;

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  }
});

const emojiProvider = emojiData.emojiStoryData.getEmojiResource();
const loadingEmojiProvider = new Promise(() => {});

const mediaProvider = Promise.resolve({
  viewContext: Promise.resolve({
    clientId: defaultClientId,
    serviceHost: defaultServiceHost,
    tokenProvider
  })
});

storiesOf(name, module)
  .add('renderer', () => (
    <Renderer
      document={document}
      emojiProvider={emojiProvider}
      mentionProvider={mentionProvider}
      mediaProvider={mediaProvider}
      eventHandlers={{
        mention: {
          onClick: action('onClick'),
          onMouseEnter: action('onMouseEnter'),
          onMouseLeave: action('onMouseLeave')
        },
        media: {
          onClick: action('media onClick')
        },
        applicationCard: {
          onClick: action('applicationCard onClick'),
          onActionClick: action('applicationCard onActionClick'),
        }
      }}
    />
  ))
  .add('renderer without providers', () => (
    <Renderer
      document={document}
    />
  ))
  .add('marks/em', () => (
    <Em>This is italic</Em>
  ))
  .add('marks/link', () => (
    <Link href="https://www.atlassian.com">This is a link</Link>
  ))
  .add('marks/mono', () => (
    <Mono>This is monospace</Mono>
  ))
  .add('marks/strike', () => (
    <Strike>This is strike-through</Strike>
  ))
  .add('marks/strong', () => (
    <Strong>This is strong</Strong>
  ))
  .add('marks/subsup', () => (
    <div>
      <Subsup type="sub">This is sub</Subsup>
      <Subsup type="sup">This is sup</Subsup>
    </div>
  ))
  .add('marks/underline', () => (
    <Underline>This is underlined</Underline>
  ))
  .add('marks/code', () => (
    <Code text="This is code"/>
  ))
  .add('nodes/codeBlock', () => (
    <CodeBlock
      text={
        `if (type) {
  switch (NodeType[type]) {
    case NodeType.codeBlock:
      const { text } = node;
      if (text) {
        const { attrs } = node;
        return {
          text,
          type,
          attrs
        }
      }
      break;
    default:
      return {};
  }
}`
      }
      language="javascript"
    />
  ))
  .add('nodes/hardBreak', () => (
    <div>Some text with that<HardBreak />breaks on multiple lines</div>
  ))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" />
  ))
  .add('nodes/emoji', () => {
    // tslint:disable-next-line:variable-name
    const Sample = (props: any) => (
      <span>
        Example emoji:&nbsp;
        <Emoji emojiId={evilburnsEmojiId} emojiProvider={props.emojiProvider} />
        <Emoji emojiId={grinEmojiId} emojiProvider={props.emojiProvider} />
        <Emoji emojiId={{ shortName: ':nope:' }} emojiProvider={props.emojiProvider ? loadingEmojiProvider : undefined} />
      </span>
    );
    const sampleStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      paddingRight: '10px',
      width: '45%',
    };
    return (
      <div>
        <p>
          This story shows emoji in various contexts, the line height between the left and
          right columns should be consistent if the emoji do not impact the line height.
        </p>
        <hr/>
        <div style={sampleStyle}>
          <Paragraph><Sample emojiProvider={emojiProvider} /></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample emojiProvider={emojiProvider} /> {lorem}</Paragraph>
          <hr/>
          <h1><Sample emojiProvider={emojiProvider} /></h1>
          <hr/>
          <h2><Sample emojiProvider={emojiProvider} /></h2>
          <hr/>
          <h3><Sample emojiProvider={emojiProvider} /></h3>
          <hr/>
          <h4><Sample emojiProvider={emojiProvider} /></h4>
          <hr/>
          <h5><Sample emojiProvider={emojiProvider} /></h5>
          <hr/>
          <h6><Sample emojiProvider={emojiProvider} /></h6>
          <hr/>
        </div>
        <div style={sampleStyle}>
          <Paragraph><Sample/></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample/> {lorem}</Paragraph>
          <hr/>
          <h1><Sample/></h1>
          <hr/>
          <h2><Sample/></h2>
          <hr/>
          <h3><Sample/></h3>
          <hr/>
          <h4><Sample/></h4>
          <hr/>
          <h5><Sample/></h5>
          <hr/>
          <h6><Sample/></h6>
          <hr/>
        </div>
      </div>
    );
  })
  .add('nodes/paragraph', () => (
    <Paragraph>This is a paragraph</Paragraph>
  ))
  .add('nodes/heading', () => (
    <div>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ))
  .add('nodes/bulletList', () => (
    <BulletList>
      <ListItem>Depth 1: Item 1</ListItem>
      <ListItem>Depth 1: Item 2</ListItem>
      <ListItem>
        <p>Depth 1: Item 3</p>
        <BulletList>
          <ListItem>Depth 2: Item 1</ListItem>
          <ListItem>Depth 2: Item 2</ListItem>
          <ListItem>
            <p>Depth 2: Item 2</p>
            <BulletList>
              <ListItem>Depth 3: Item 1</ListItem>
              <ListItem>Depth 1: Item 2</ListItem>
              <ListItem>
                <p>Depth 3: Item 3</p>
                <BulletList>
                  <ListItem>Depth 4: Item 1</ListItem>
                  <ListItem>Depth 4: Item 2</ListItem>
                  <ListItem>Depth 4: Item 3</ListItem>
                </BulletList>
              </ListItem>
            </BulletList>
          </ListItem>
        </BulletList>
      </ListItem>
    </BulletList>
  ))
  .add('nodes/orderedList', () => (
    <OrderedList>
      <ListItem>Depth 1: Item 1</ListItem>
      <ListItem>Depth 1: Item 2</ListItem>
      <ListItem>
        <p>Depth 1: Item 3</p>
        <OrderedList>
          <ListItem>Depth 2: Item 1</ListItem>
          <ListItem>Depth 2: Item 2</ListItem>
          <ListItem>
            <p>Depth 2: Item 3</p>
            <OrderedList>
              <ListItem>Depth 3: Item 1</ListItem>
              <ListItem>Depth 3: Item 2</ListItem>
              <ListItem>
                <p>Depth 3: Item 3</p>
                <OrderedList>
                  <ListItem>Depth 4: Item 1</ListItem>
                  <ListItem>Depth 4: Item 2</ListItem>
                  <ListItem>
                    <p>Depth 4: Item 3</p>
                    <OrderedList>
                      <ListItem>Depth 5: Item 1</ListItem>
                      <ListItem>Depth 5: Item 2</ListItem>
                      <ListItem>
                        <p>Depth 5: Item 3</p>
                        <OrderedList>
                          <ListItem>Depth 6: Item 1</ListItem>
                          <ListItem>Depth 6: Item 2</ListItem>
                          <ListItem>
                            <p>Depth 6: Item 3</p>
                            <OrderedList>
                              <ListItem>Depth 7: Item 1</ListItem>
                              <ListItem>Depth 7: Item 2</ListItem>
                              <ListItem>
                                <p>Depth 7: Item 3</p>
                                <OrderedList>
                                  <ListItem>Depth 8: Item 1</ListItem>
                                  <ListItem>Depth 8: Item 2</ListItem>
                                  <ListItem>
                                    <p>Depth 8: Item 3</p>
                                    <OrderedList>
                                      <ListItem>Depth 9: Item 1</ListItem>
                                      <ListItem>Depth 9: Item 2</ListItem>
                                      <ListItem>
                                        <p>Depth 9: Item 3</p>
                                        <OrderedList>
                                          <ListItem>Depth 10: Item 1</ListItem>
                                          <ListItem>Depth 10: Item 2</ListItem>
                                          <ListItem>
                                            <p>Depth 10: Item 3</p>
                                          </ListItem>
                                        </OrderedList>
                                      </ListItem>
                                    </OrderedList>
                                  </ListItem>
                                </OrderedList>
                              </ListItem>
                            </OrderedList>
                          </ListItem>
                        </OrderedList>
                      </ListItem>
                    </OrderedList>
                  </ListItem>
                </OrderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </ListItem>
    </OrderedList>
  ))
  .add('nodes/blockquote', () => (
    <Blockquote>Blockquote</Blockquote>
  ))
  .add('nodes/panel', () => (
    <div>
      <Panel type="info">This is a info panel</Panel>
      <Panel type="note">This is a note panel</Panel>
      <Panel type="tip">This is a tip panel</Panel>
      <Panel type="warning">This is a warning panel</Panel>
    </div>
  ))
  .add('nodes/rule', () => (
    <Rule />
  ))
  .add('nodes/applicationCard', () => (
    <div>
      <ApplicationCard
        onClick={action('ApplicationCard onClick')}
        onActionClick={action('ApplicationCard onActionClick')}
        model={{text: '', link: { url: 'http://atlassian.com' }, 'title':{'text':'Sascha Reuter commented on a file: Desktop sidebar states.png'}}}
      />
      <div style={{ margin: '10px 0'}} />
      <ApplicationCard
        onClick={action('ApplicationCard onClick')}
        onActionClick={action('ApplicationCard onActionClick')}
        model={{text: '', link: { url: 'http://atlassian.com' }, 'collapsible':true,'title':{'text':'Sascha Reuter commented on a file: Desktop sidebar states.png'},'user':{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2246873520/sreuter-57703-pp-1530510_4271148635152_5186589029777108540_n.jpg','label':'Sascha Reuter'}},'description':{'title':'Can haz description','text':'\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue\nrutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris\nlobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis\nmagna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,\net vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula\nconsectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit\na, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,\nquam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.\n'},'details':[{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]},{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]},{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]}],'context':{'text':'Design Home / ... / Media Cards Design','icon':{'url':'https://image.ibb.co/jSrC8F/f4b5e33d6b1d36556114a18b594768f41f32673e.png','label':'foobar'},'link':{'url':'https://confluence.atlassian.com/'}},'actions':[{'title':'View'},{'title':'Open'},{'title':'Join'},{'title':'Reply'}],'preview':{'url':'https://image.ibb.co/ghKzoF/1a99566b0c8e0589ca327bb1efe0be5ca1419aa8.png'}}}
      />
      <div style={{ margin: '10px 0'}} />
      <ApplicationCard
        onClick={action('ApplicationCard onClick')}
        onActionClick={action('ApplicationCard onActionClick')}
        model={{text: '', link: { url: 'http://atlassian.com' }, 'collapsible':true,'title':{'text':'Sascha Reuter commented on a file: Desktop sidebar states.png'},'user':{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2246873520/sreuter-57703-pp-1530510_4271148635152_5186589029777108540_n.jpg','label':'Sascha Reuter'}},'description':{'title':'Can haz description','text':'\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue\nrutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris\nlobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis\nmagna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,\net vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula\nconsectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit\na, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,\nquam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.\n'},'details':[{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]},{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]},{'icon':{'url':'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png','label':'Issue type'},'text':'Story'},{'badge':{'value':101,'max':99,'appearance':'important'}},{'lozenge':{'text':'In Progress','appearance':'inprogress'}},{'title':'Watchers','users':[{'icon':{'url':'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar','label':'James Newell'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar','label':'Jon Blower'}},{'icon':{'url':'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar','label':'Scott Simpson'}}]}],'context':{'text':'Design Home / ... / Media Cards Design','icon':{'url':'https://image.ibb.co/jSrC8F/f4b5e33d6b1d36556114a18b594768f41f32673e.png','label':'foobar'},'link':{'url':'https://confluence.atlassian.com/'}},'actions':[{'title':'View'},{'title':'Open'},{'title':'Join'},{'title':'Reply'}],'background':{'url':'https://image.ibb.co/grZX8F/aabf3aedb97e60bf38525db46a87ac98323eb68d.png'}}}
      />
    </div>
  ))
  ;
