export interface ReactNodeProps {
  selected: boolean;
}

export type ReactComponentConstructor = new() => React.Component<any, any>;
export type ProsemirrorGetPosHandler = () => number;

export {
  default as ReactPMNode,
  ReactProsemirrorNodeProps,
} from './prosemirror-node';
