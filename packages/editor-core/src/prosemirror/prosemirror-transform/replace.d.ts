import { Node, Slice } from '../';
import { Step } from './';

export function replaceStep(doc: Node, from: number, to?: number, slice?: Slice): Step | null;
