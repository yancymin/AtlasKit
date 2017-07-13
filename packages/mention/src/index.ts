import MentionResource, { AbstractMentionResource, MentionProvider } from './api/MentionResource';
import PresenceResource, { PresenceProvider, AbstractPresenceResource } from './api/PresenceResource';
import MentionItem from './components/MentionItem';
import MentionList from './components/MentionList';
import ResourcedMentionList from './components/ResourcedMentionList';
import MentionPicker from './components/MentionPicker';
import Mention from './components/Mention';
import ResourcedMention from './components/Mention/ResourcedMention';
import { MentionDescription, isSpecialMention } from './types';
import { SearchIndex } from './util/searchIndex';

export {
  // Classes
  MentionResource,
  PresenceResource,
  AbstractMentionResource,
  AbstractPresenceResource,
  SearchIndex,
  // Interfaces
  MentionProvider,
  PresenceProvider,
  MentionDescription,
  // Components
  MentionItem,
  MentionList,
  ResourcedMentionList,
  MentionPicker,
  Mention,
  ResourcedMention,
  // Functions
  isSpecialMention
};

export default MentionPicker;
