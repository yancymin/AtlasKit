import { MarkType, Schema } from './';

export class Mark {
  type: MarkType;
  attrs: { [key: string]: any };
  addToSet(set: Mark[]): Mark[];
  removeFromSet(set: Mark[]): Mark[];
  isInSet(set: Mark[]): boolean;
  eq(other: Mark): boolean;
  toJSON(): { [key: string]: any };

  static fromJSON(schema: Schema<any, any>, json: { [key: string]: any }): Mark;
  static sameSet(a: Mark[], b: Mark[]): boolean;
  static setFrom(marks?: Mark | Mark[]): Mark[];
  static none: Mark[];
}
