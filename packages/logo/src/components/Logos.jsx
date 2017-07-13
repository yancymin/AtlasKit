import React from 'react';
import AtlassianLogoText from '../logos/atlassian.svg';
import BitbucketLogoText from '../logos/bitbucket.svg';
import ConfluenceLogoText from '../logos/confluence.svg';
import HipchatLogoText from '../logos/hipchat.svg';
import JiraLogoText from '../logos/jira.svg';
import Logo from './LogoBase';
import {
  atlassianTypeOffset,
  bitbucketTypeOffset,
  confluenceTypeOffset,
  hipchatTypeOffset,
  jiraTypeOffset,
} from '../styled/typeOffsetRatios';

const AtlassianLogo = props => (
  <Logo {...props} typeOffsetRatio={atlassianTypeOffset} >
    <AtlassianLogoText />
  </Logo>
);

const BitbucketLogo = props => (
  <Logo {...props} typeOffsetRatio={bitbucketTypeOffset} >
    <BitbucketLogoText />
  </Logo>
);

const ConfluenceLogo = props => (
  <Logo {...props} typeOffsetRatio={confluenceTypeOffset} >
    <ConfluenceLogoText />
  </Logo>
);

const HipchatLogo = props => (
  <Logo {...props} typeOffsetRatio={hipchatTypeOffset} >
    <HipchatLogoText />
  </Logo>
);

const JiraLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraTypeOffset} >
    <JiraLogoText />
  </Logo>
);

export default AtlassianLogo;
export { AtlassianLogo, BitbucketLogo, ConfluenceLogo, HipchatLogo, JiraLogo };
