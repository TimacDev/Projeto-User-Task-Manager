export class Favorites<T> {
    
  private items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T): void {
    if (!this.exists(item)) {
      this.items.push(item);
    }
  }

  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  exists(item: T): boolean {
    return this.items.find((i) => i === item) !== undefined;
  }

  getAll(): T[] {
    return this.items;
  }
}
