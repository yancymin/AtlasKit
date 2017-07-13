import { Mark } from '../';
import { Step } from './';

export class AddMarkStep extends Step {
  from: number;
  to: number;
  mark: Mark;
  constructor(from: number, to: number, mark: Mark);
}

export class RemoveMarkStep extends Step {
  constructor(from: number, to: number, mark: Mark);
}
