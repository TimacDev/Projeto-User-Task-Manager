export class WatcherSystem<T, U> {
  private watchers: Map<T, U[]>;

  constructor() {
    this.watchers = new Map();
  }

  watch(target: T, user: U): void {
    const existingWatchers = this.watchers.get(target);

    if (existingWatchers) {
      if (!existingWatchers.find((w) => w === user)) {
        existingWatchers.push(user);
      }
    } else {
      this.watchers.set(target, [user]);
    }
  }

  unwatch(target: T, user: U): void {
    const existingWatchers = this.watchers.get(target);

    if (existingWatchers) {
      const index = existingWatchers.findIndex((w) => w === user);
      if (index !== -1) {
        existingWatchers.splice(index, 1);
      }
    }
  }

  getWatchers(target: T): U[] {
    return this.watchers.get(target) || [];
  }
}
