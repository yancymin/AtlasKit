
export interface AppCardModel {
  title: AppCardTitle;
  description?: AppCardDescription;
  details?: AppCardDetails[];
  context?: AppCardContext;
  actions?: AppCardAction[];
  preview?: {url: string}; // an image URL
  background?: {url: string}; // an image URL
}

export interface AppCardTitle {
  text: string;
  user?: AppCardUser;
  lozenge?: AppCardLozenge;
}

export interface AppCardDescription {
  title?: string; // the bolded bit
  text: string;
}

export interface AppCardIcon {
  url: string;    // an image URL
  label: string;  // accessibility text e.g. tooltip or voiceover
}

export interface AppCardUser {
  icon: AppCardIcon;
}

export interface AppCardBadge {
  value: number;
  max?: number;
  theme?: 'default' | 'dark';
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
}

export interface AppCardLozenge {
  text: string;
  bold?: boolean;
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
}

export interface AppCardDetails {
  title?: string;
  icon?: AppCardIcon;
  badge?: AppCardBadge;
  lozenge?: AppCardLozenge;
  users?: AppCardUser[];
  text?: string;
}

export interface AppCardContext {
  text: string;
  icon?: AppCardIcon;
}

export interface AppCardAction {
  title: string;
}
