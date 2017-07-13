// @flow
export type Func = () => void;

type SpinnerSizes = 'small' | 'medium' | 'large' | 'xlarge' | number;

export type SpinnerGlyphProps = {|
  /** Time in milliseconds after component mount before spinner is visible. */
  delay: number,
  /** Set the spinner color to white, for use in dark-themed UIs. */
  invertColor: boolean,
  /** Handler for once the spinner has completed its outro animation */
  onComplete: Func,
  /** Size of the spinner. */
  size: SpinnerSizes,
|};

export type SpinnerProps = SpinnerGlyphProps & {|
  /** Whether the process is complete and the spinner should leave */
  isCompleting: boolean,
|};

export type SpinnerPhases = 'DELAY' | 'ENTER' | 'IDLE' | 'LEAVE' | '';

export type SpinnerGlyphState = {|
  phase: SpinnerPhases,
|};
