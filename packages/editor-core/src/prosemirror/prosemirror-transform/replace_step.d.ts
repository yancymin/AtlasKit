import { Schema, Slice } from '../';
import { Step } from './';

export class ReplaceStep extends Step {
  from: number;
  to: number;
  slice: Slice;
  constructor(from: number, to: number, slice: Slice, structure?: boolean);
}

export class ReplaceAroundStep extends Step {
  constructor(from: number, to: number, gapFrom: number, gapTo: number, slice: Slice, insert: number, structure?: boolean);
}
