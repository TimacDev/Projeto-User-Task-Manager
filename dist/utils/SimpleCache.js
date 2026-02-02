export class SimpleCache {
    constructor() {
        this.cache = new Map();
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
}
