// @flow
export type Color = string;
export type Background = Color;
export type Text = Color;
export type Line = Color;

export type ItemTheme = {|
  default: {|
    background: Background
  |},
  hover: {|
    background: Background
  |},
  active: {|
    background: Background
  |},
  focus: {|
    outline: Line,
  |},
  selected: {|
    background: Background,
    text?: Text,
  |},
|}

export type Provided = {|
  background: {|
    primary: Background,
    secondary: Background,
    // currently used for drawer
    tertiary: Background,
  |},
  text: Text,
  subText: Text,
  keyline: Line,
  item: ItemTheme,
  dropdown: ItemTheme,
|}

export type RootTheme = {|
  provided: Provided,
  isCollapsed: bool,
|}

export type GroupTheme = {|
  isCompact: bool
|}
