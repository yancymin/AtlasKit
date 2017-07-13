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

export type ReactElement = any;

export type DrawerProps = {
  /** The icon to use as the back icon for this drawer */
  backIcon: ReactElement,
  /** The drawer contents */
  children: ReactElement,
  /** The header for this Drawer – often the ContainerTitle for a given Container */
  header?: ReactElement,
  /** Set whether the drawer is visible. */
  isOpen: boolean,
  /** Whether the Drawer is full width – used for focus tasks */
  isFullWidth?: boolean,
  /** A function to call when the backIcon button is clicked, or when the blanket
  behind the Drawer is clicked */
  onBackButton: () => mixed,
  /** The primary icon in the Drawer – usually the globalPrimaryIcon that was
  given to the GlobalNavigation component */
  primaryIcon: ReactElement,
}
