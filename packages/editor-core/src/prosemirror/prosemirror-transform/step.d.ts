import { Node, Schema, Slice } from '../';
import { Mappable, StepMap } from './';

export class Step {
  apply(doc: Node): StepResult;
  getMap(): StepMap;
  invert(doc: Node): Step;
  map(mapping: Mappable): Step | null;
  merge(other: Step): Step | null;
  offset(n: number): Step;
  toJSON(): { [key: string]: any };

  static fromJSON(schema: Schema<any, any>, json: { [key: string]: any }): Step;
  static jsonID(id: string, stepClass: { new (...args: any[]): Step }): void;
}

export class StepResult {
  constructor(doc?: Node, failed?: string);

  doc?: Node;
  failed?: string;

  static ok(doc: Node): StepResult;
  static fail(message: string): StepResult;
  static fromReplace(doc: Node, from: number, to: number, slice: Slice): StepResult;
}
