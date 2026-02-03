export class WatcherSystem {
    constructor() {
        this.watchers = new Map();
    }
    watch(target, user) {
        const existingWatchers = this.watchers.get(target);
        if (existingWatchers) {
            if (!existingWatchers.find((w) => w === user)) {
                existingWatchers.push(user);
            }
        }
        else {
            this.watchers.set(target, [user]);
        }
    }
    unwatch(target, user) {
        const existingWatchers = this.watchers.get(target);
        if (existingWatchers) {
            const index = existingWatchers.findIndex((w) => w === user);
            if (index !== -1) {
                existingWatchers.splice(index, 1);
            }
        }
    }
    getWatchers(target) {
        return this.watchers.get(target) || [];
    }
}
