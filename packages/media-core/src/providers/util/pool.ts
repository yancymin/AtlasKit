
export class Pool<Item> {
  private readonly referenceCountById: {[s: string]: number} = {};
  private readonly referencesById: {[s: string]: Item} = {};
  acquire(poolId: string, createItem: () => Item): Item {
    if (!this.referenceCountById[poolId]) {

      this.referencesById[poolId] = createItem();
      this.referenceCountById[poolId] = 0;
    }
    this.referenceCountById[poolId] = this.referenceCountById[poolId] + 1;
    return this.referencesById[poolId];
  }
  release(poolId: string): void {
    if (this.referenceCountById[poolId] > 0) {
      this.referenceCountById[poolId] = this.referenceCountById[poolId] - 1;
    }
    if (!this.referenceCountById[poolId]) {
      delete this.referencesById[poolId];
    }
  }
}

