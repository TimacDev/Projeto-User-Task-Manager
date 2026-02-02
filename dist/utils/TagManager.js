export class TagManager {
    constructor() {
        this.tags = new Map();
    }
    addTag(item, tag) {
        const existingTags = this.tags.get(item);
        if (existingTags) {
            if (!existingTags.find((t) => t === tag)) {
                existingTags.push(tag);
            }
        }
        else {
            this.tags.set(item, [tag]);
        }
    }
    removeTag(item, tag) {
        const existingTags = this.tags.get(item);
        if (existingTags) {
            const index = existingTags.findIndex((t) => t === tag);
            if (index !== -1) {
                existingTags.splice(index, 1);
            }
        }
    }
    getTags(item) {
        return this.tags.get(item) || [];
    }
}
