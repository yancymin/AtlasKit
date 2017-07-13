/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import {storiesOf, action} from '@kadira/storybook';
import {AppCardView} from '../src/app';
import {AppCardModel, AppCardDetails, AppCardBadge, AppCardLozenge, AppCardContext, AppCardAction, AppCardUser} from '../src/app/model';

const shortTitle = 'Sascha Reuter commented on a file: Desktop sidebar states.png';

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue
rutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
lobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis
magna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,
et vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula
consectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit
a, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,
quam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.
`;

const userJonBlower: AppCardUser = {icon: {
  url: 'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar',
  label: 'Jon Blower'
}};
const userJamesNewell: AppCardUser = {icon: {
  url: 'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar',
  label: 'James Newell'
}};
const userScottSimpson: AppCardUser = {icon: {
  url: 'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar',
  label: 'Scott Simpson'
}};
const userSaschaReuter: AppCardUser = {icon: {
  url: 'https://extranet.atlassian.com/download/attachments/2246873520/sreuter-57703-pp-1530510_4271148635152_5186589029777108540_n.jpg',
  label: 'Sascha Reuter'
}};

const modelWithShortTitle: AppCardModel = {
  title: {text: shortTitle}
};

const modelWithLoooongTitle: AppCardModel = {
  title: {text: loremIpsum}
};

const modelWithUserInTitle: AppCardModel = {
  ...modelWithShortTitle,
  title: {
    text: shortTitle,
    user: userSaschaReuter
  }
};

const modelWithCollapseToggle: AppCardModel = {
  ...modelWithShortTitle,
  collapsible: true
};

const preview = {url: 'https://image.ibb.co/ghKzoF/1a99566b0c8e0589ca327bb1efe0be5ca1419aa8.png'};
const modelWithPreview: AppCardModel = {
  ...modelWithShortTitle,
  preview
};

const modelWithTitleAndTextInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [
    {
      title: 'Modified',
      text: '10/5/2017 12:19pm'
    }
  ]
};

const storyImage = 'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png';
const modelWithIconInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [{icon: {url: storyImage, label: 'Issue type'}}]
};

const metaBadge: AppCardBadge = {
  value: 101,
  max: 99,
  appearance: 'important'
};
const modelWithBadgeInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [{badge: metaBadge}]
};

const metaLozenge: AppCardLozenge = {
  text: 'In Progress',
  appearance: 'inprogress'
};
const modelWithLozengeInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [{lozenge: metaLozenge}]
};

const metaUser = [userJamesNewell];
const modelWithUserInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [{users: metaUser}]
};

const modelWithDescription: AppCardModel = {
  ...modelWithShortTitle,
  description: {text: loremIpsum}
};

const modelWithTitleInDescription: AppCardModel = {
  ...modelWithShortTitle,
  description: {title: 'Lorem Ipsum', text: loremIpsum}
};

const metaUsers = [
  userJamesNewell,
  userJonBlower,
  userScottSimpson
];
const modelWithUsersInDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [{users: metaUsers}]
};

const lotsOfMeta: AppCardDetails[] = [
  {icon: {url: storyImage, label: 'Issue type'}, text: 'Story'},
  {badge: metaBadge},
  {lozenge: metaLozenge},
  {title: 'Watchers', users: metaUsers}
];
const modelWithLotsOfDetails: AppCardModel = {
  ...modelWithShortTitle,
  details: [...lotsOfMeta, ...lotsOfMeta, ...lotsOfMeta, {text: loremIpsum}]
};

const minimalContext: AppCardContext = {
  text: 'Design Home / ... / Media Cards Design'
};

const modelWithContext: AppCardModel = {
  ...modelWithShortTitle,
  context: {
    ...minimalContext
  }
};

const contextIcon = 'https://image.ibb.co/jSrC8F/f4b5e33d6b1d36556114a18b594768f41f32673e.png';
const modelWithIconInContext: AppCardModel = {
  ...modelWithShortTitle,
  context: {
    ...minimalContext,
    icon: {
      url: contextIcon,
      label: 'App name'
    }
  }
};

const contextLink = {url: 'https://confluence.atlassian.com/'};
const modelWithLinkInContext: AppCardModel = {
  ...modelWithShortTitle,
  context: {
    ...minimalContext,
    link: contextLink
  }
};

const primaryAction: AppCardAction = {
  title: 'View'
};
const detailsWithPrimaryAction: AppCardModel = {
  ...modelWithShortTitle,
  actions: [primaryAction]
};

const metaActions: AppCardAction[] = [
  primaryAction,
  {title: 'Open'},
  {title: 'Join'},
  {title: 'Reply'}
];
const detailsWithSecondaryActions: AppCardModel = {
  ...modelWithShortTitle,
  actions: metaActions
};

const background = {url: 'https://image.ibb.co/grZX8F/aabf3aedb97e60bf38525db46a87ac98323eb68d.png'};
const modelWithBackground: AppCardModel = {
  ...modelWithShortTitle,
  background,
};

const modelWithMostOfTheThings: AppCardModel = {
  collapsible: true,
  ...modelWithShortTitle,
  user: userSaschaReuter,
  description: {title: 'Can haz description', text: loremIpsum},
  details: [...lotsOfMeta, ...lotsOfMeta, ...lotsOfMeta],
  context: {
    ...minimalContext,
    icon: {url: contextIcon, label: 'foobar'},
    link: contextLink
  },
  actions: metaActions
};

const mostOfTheThingsWithPreview: AppCardModel = {
  ...modelWithMostOfTheThings,
  preview
};

const modelWithMostOfTheThingsAndWithBackground: AppCardModel = {
  ...modelWithMostOfTheThings,
  background
};

const confluenceActivityModel: AppCardModel = {
  title: {
    text: 'Sascha Reuter commented on a file: Desktop sidebar states.png',
    user: userSaschaReuter
  },
  description: {
    title: 'Desktop sidebar states.png',
    text: 'Does the consumer actually know what a card is? Should it be "file/link" or something instead?'
  },
  context: {
    icon: {url: contextIcon, label: 'Confluence'},
    text: 'Design Home / … / Media Cards Design'
  },
  actions: [
    {title: 'Reply'},
    {title: 'Other'}
  ]
};

const jiraIssueModel: AppCardModel = {
  title: {text: 'Document specifications for smart cards'},
  details: [
    {icon: {url: 'https://drive.google.com/open?id=0B1I77F_P5VV2ZmJzTzhqb2JkVkE', label: 'Issue type'}, text: 'Story'},
    {icon: {url: 'https://drive.google.com/open?id=0B1I77F_P5VV2ZmJzTzhqb2JkVkE', label: 'Priority'}, text: 'High'},
  ],
  context: {
    icon: {url: contextIcon, label: 'Jira'},
    text: 'DPM - 560'
  },
  actions: [
    {title: 'View'},
    {title: 'Other'}
  ]
};

const dropboxFileModel: AppCardModel = {
  title: {text: 'media_cards_v2.0_final.sketch'},
  details: [
    {title: 'Modified', text: '10/5/2017 12:19 PM'},
    {icon: {url: 'http://www.freeiconspng.com/uploads/links-icon-10.png', label: 'Members'}, text: '34 members'}
  ],
  context: {
    icon: {url: 'https://cfl.dropboxstatic.com/static/images/brand/glyph-vflK-Wlfk.png', label: 'Dropbox'},
    text: 'Dropbox'
  },
  actions: [
    {title: 'Download'},
    {title: 'Other'}
  ]
};

const trelloBoardModel: AppCardModel = {
  background: {url: 'https://dl.dropbox.com/s/8js2m5azvvfzpq2/background.jpg'},
  title: {text: 'Trello Community Nordics'},
  details: [
    {icon: {url: 'https://dl.dropbox.com/s/msppv8d4vrl7msj/icon_team.png', label: 'Wheel'}},
    {icon: {url: 'https://dl.dropbox.com/s/1341fwjpmjzucqk/icon_member.png', label: 'Members'}, text: '438'},
    {icon: {url: 'https://dl.dropbox.com/s/1341fwjpmjzucqk/icon_member.png', label: 'Stared'}, text: '1'},
    {icon: {url: 'https://dl.dropbox.com/s/mbqwsdc99jzj9pk/icon_activity.png', label: 'Updated'}, text: 'Apr 28'}
  ],
  context: {
    icon: {url: 'https://dl.dropbox.com/s/yrdlsc6usuwegym/icon.png', label: 'Trello'},
    text: 'Trello - Board'
  },
  actions: [
    {title: 'Join'},
    {title: 'Other'}
  ]
};

const trelloCardModel: AppCardModel = {
  title: {text: 'Media viewer - Inline comment dialog concept'},
  preview,
  details: [
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2MDdacTFrVkxpNXc', label: 'Watch'}},
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2UGxCZ0c2TmRNOVk', label: 'Updated at'}, text: 'Jun 15'},
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2Znh0TEh1Zm1ZRnc', label: 'Align'}},
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2SDhVOVlTak44Q2M', label: 'Comments'}, text: '2'},
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2WWl2NjNDc0RaNFk', label: 'Attachments'}, text: '1'},
    {icon: {url: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2Y2NkOTB0RDNEVGc', label: 'Tasks'}, text: '0/1'},
    {users: [
      userJonBlower,
      userScottSimpson,
      userJamesNewell,
    ]},
  ],
  context: {
    icon: {url: 'https://dl.dropbox.com/s/yrdlsc6usuwegym/icon.png', label: 'Trello'},
    text: 'Trello - Card in list Concepts'
  },
  actions: [
    {title: 'Open'},
    {title: 'Other'}
  ]
};

const handleClick = () => action('clicked on the card')();
const handleActionClick = (a: AppCardAction) => action('clicked on the action')(a.title, a);

const FixedWidthContainer = styled.div`
  width: 450px
  border: 1px dotted orange;
`;

const SectionWrapper = styled.div`
  padding: 1rem;
`;

const SectionTitle = styled.h1`
  font-size: 1.25rem;
`;

const SectionCard = styled.div`
  margin: 1rem 0;
`;

const Section = ({title, children}: {title?: string, children?: any}) => {
  return (
    <SectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      {React.Children.map(children, child => (
        <SectionCard>{child}</SectionCard>
      ))}
    </SectionWrapper>
  );
};

storiesOf('AppCardView', {})
  .add('Pieces', () => (
    <div>

      <Section>
        <AppCardView model={modelWithShortTitle}/>
      </Section>

      <Section title="With header">
        <AppCardView model={modelWithShortTitle}/>
        <AppCardView model={modelWithLoooongTitle}/>
        <AppCardView model={modelWithUserInTitle}/>
        <AppCardView model={modelWithCollapseToggle}/>
      </Section>

      <Section title="With preview">
        <AppCardView model={modelWithPreview}/>
        <AppCardView model={mostOfTheThingsWithPreview}/>
      </Section>

      <Section title="With description">
        <AppCardView model={modelWithDescription}/>
        <AppCardView model={modelWithTitleInDescription}/>
      </Section>

      <Section title="With details">
        <AppCardView model={modelWithTitleAndTextInDetails}/>
        <AppCardView model={modelWithIconInDetails}/>
        <AppCardView model={modelWithBadgeInDetails}/>
        <AppCardView model={modelWithLozengeInDetails}/>
        <AppCardView model={modelWithUserInDetails}/>
        <AppCardView model={modelWithUsersInDetails}/>
        <AppCardView model={modelWithLotsOfDetails}/>
      </Section>

      <Section title="With context">
        <AppCardView model={modelWithContext}/>
        <AppCardView model={modelWithIconInContext}/>
        <AppCardView model={modelWithLinkInContext}/>
      </Section>

      <Section title="With actions">
        <AppCardView model={detailsWithPrimaryAction}/>
        <AppCardView model={detailsWithSecondaryActions}/>
      </Section>

      <Section title="With background">
        <AppCardView model={modelWithBackground}/>
        <AppCardView model={modelWithMostOfTheThingsAndWithBackground}/>
      </Section>

      <Section title="With event handlers">
          <AppCardView
            model={modelWithShortTitle}
            onClick={handleClick}
            onActionClick={handleActionClick}
          />
          <AppCardView
            model={modelWithMostOfTheThings}
            onClick={handleClick}
            onActionClick={handleActionClick}
          />
      </Section>

      <FixedWidthContainer>
        <Section title="In a container">

          <AppCardView model={{title: {text: 'Short title'}}}/>
          <AppCardView model={{title: {text: 'Just long enough to wrap inside the container: blah blah blah'}}}/>
          <AppCardView model={{title: {text: `Super long title, longer than the card max-width: ${loremIpsum}`}}}/>

          <AppCardView model={{title: {text: 'Short description'}, description: {text: 'hi'}}}/>
          <AppCardView
            model={{
              title: {
                text: 'Just long enough to wrap inside the container description'
              },
              description: {
                text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
              }
            }}
          />
          <AppCardView model={{title: {text: `Super long description`}, description: {text: loremIpsum}}}/>

          <AppCardView model={modelWithLotsOfDetails}/>
          <AppCardView model={{preview, ...modelWithLotsOfDetails}}/>

        </Section>
      </FixedWidthContainer>

    </div>
  ))
  .add('Examples', () => (
    <div>

      <Section title="Confluence">
        <AppCardView model={confluenceActivityModel}/>
        <AppCardView model={confluenceActivityModel}/>
      </Section>


      <Section title="Jira">
        <AppCardView model={jiraIssueModel}/>
      </Section>

      <Section title="Dropbox">
        <AppCardView model={dropboxFileModel}/>
      </Section>

      <Section title="Trello">
        <AppCardView model={trelloBoardModel}/>
        <AppCardView model={trelloCardModel}/>
      </Section>

    </div>
  ))
;
