export class Favorites {
    constructor() {
        this.items = [];
    }
    add(item) {
        if (!this.exists(item)) {
            this.items.push(item);
        }
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    exists(item) {
        return this.items.find((i) => i === item) !== undefined;
    }
    getAll() {
        return this.items;
    }
}
