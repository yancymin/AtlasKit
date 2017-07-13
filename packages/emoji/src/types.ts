import { SyntheticEvent } from 'react';

export type RelativePosition = 'above' | 'below' | 'auto';

export interface Styles {
  [index: string]: any;
}

/**
 * Minimum information to defined an emoji is the shortName.
 * In order to uniquely define an emoji, the id should be included, and is
 * used in preference to shortName if provided, and has a matching emoji.
 * If not emoji can be found by id (e.g. a custom emoji has been removed),
 * fallback behaviour will be to attempt to find a matching emoji by shortName.
 */
export interface EmojiId {
  shortName: string;
  id?: string;
  fallback?: string;
}

export interface SpriteSheet {
  url: string;
  row: number;
  column: number;
  height: number;
  width: number;
}

export interface EmojiImageRepresentation {
  height: number;
  width: number;
}

export interface SpriteImageRepresentation extends EmojiImageRepresentation {
  x: number;
  y: number;
  xIndex: number;
  yIndex: number;
}

/**
 * Sprite representation exposed from the EmojiResource.
 */
export interface SpriteRepresentation extends SpriteImageRepresentation {
  sprite: SpriteSheet;
}

/**
 * Representation returned from a sprite service.
 */
export interface SpriteServiceRepresentation extends SpriteImageRepresentation {
  /** Should match a index in a SpriteSheets */
  spriteRef: string;
}

export interface ImageRepresentation extends EmojiImageRepresentation {
  imagePath: string;
}

export interface MediaApiRepresentation extends EmojiImageRepresentation {
  mediaPath: string;
}

export type EmojiRepresentation = SpriteRepresentation | ImageRepresentation | MediaApiRepresentation | undefined;

export interface EmojiDescription extends EmojiId {
  name?: string;
  order?: number;
  type: string;
  category: string;
  ascii?: string[];
  representation: EmojiRepresentation;
}

export interface EmojiDescriptionWithVariations extends EmojiDescription {
  skinVariations?: EmojiDescription[];
}

export type OptionalEmojiDescription = EmojiDescription | undefined;
export type OptionalEmojiDescriptionWithVariations = EmojiDescriptionWithVariations | undefined;

export type EmojiServiceRepresentation = SpriteServiceRepresentation | ImageRepresentation;

export interface EmojiServiceDescription {
  id: string;
  shortName: string;
  name?: string;
  order?: number;
  fallback?: string;
  ascii?: string[];
  type: string;
  category: string;
  representation: EmojiServiceRepresentation;
}

export interface EmojiServiceDescriptionWithVariations extends EmojiServiceDescription {
  skinVariations?: EmojiServiceDescription[];
}


export interface SpriteSheets {
  [index: string]: SpriteSheet;
}

/**
 * An access token for emoji stored in the MediaApi
 * (indicated by urls beginning with the url of the token.)
 */
export interface MediaApiToken {
  url: string;
  clientId: string;
  jwt: string;
  collectionName: string;
  expiresAt: number; // seconds since Epoch UTC
}

export interface EmojiMeta {
  spriteSheets?: SpriteSheets;
  mediaApiToken?: MediaApiToken;
}

/**
 * The expected response from an Emoji service.
 */
export interface EmojiServiceResponse {
  emojis: EmojiServiceDescriptionWithVariations[];
  meta?: EmojiMeta;
}

export interface EmojiResponse {
  emojis: EmojiDescriptionWithVariations[];
  mediaApiToken?: MediaApiToken;
}

export interface CategoryDescription {
  id: string;
  name: string;
  icon: any;
}

export interface AvailableCategories {
  /** index is a category id */
  [index: string]: boolean;
}

export interface OnToneSelected {
  (variation: number): void;
}

export interface OnEmojiEvent {
  (emojiId: EmojiId, emoji: OptionalEmojiDescription, event?: SyntheticEvent<any>): void;
}

export interface OnCategory {
  (categoryId: string | null): void;
}

export interface SearchOptions {
  skinTone?: number; // skin tone offset starting at 1
  limit?: number;
}

export interface EmojiUpload {
  name: string;
  shortName: string;
  filename: string;
  dataURL: string;
  width: number;
  height: number;
}
