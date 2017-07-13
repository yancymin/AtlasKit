export interface Mappable {
  map(pos: number, assoc?: number): number;
  mapResult(pos: number, assoc?: number): MapResult;
}

export class MapResult {
  pos: number;
  deleted: boolean;
}

export class StepMap {
  constructor(ranges: number[]);

  mapResult(pos: number, assoc?: number): MapResult;
  map(pos: number, assoc?: number): number;
  forEach(f: (oldStart: number, oldEnd: number, newStart: number, newEnd: number) => void): void;
  invert(): StepMap;
}

export class Mapping {
  constructor(maps?: StepMap[]);

  maps: StepMap[];
  from: number;
  to: number;
  slice(from?: number, to?: number): Mapping;
  appendMap(map: StepMap, mirrors?: number): void;
  appendMapping(mapping: Mapping): void;
  appendMappingInverted(mapping: Mapping): void;
  map(pos: number, assoc?: number): number;
  mapResult(pos: number, assoc?: number): MapResult;
}
