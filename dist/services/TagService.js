export class TagService {
    constructor() {
        this.taskTags = new Map();
    }
    addTag(taskId, tag) {
        const normalizedTag = tag.toLowerCase().trim();
        const tags = this.taskTags.get(taskId) || [];
        if (tags.indexOf(normalizedTag) !== -1) {
            return false;
        }
        tags.push(normalizedTag);
        this.taskTags.set(taskId, tags);
        return true;
    }
    removeTag(taskId, tag) {
        const normalizedTag = tag.toLowerCase().trim();
        const tags = this.taskTags.get(taskId);
        if (!tags) {
            return false;
        }
        const filteredTags = tags.filter((t) => t !== normalizedTag);
        if (filteredTags.length === tags.length) {
            return false;
        }
        this.taskTags.set(taskId, filteredTags);
        return true;
    }
    getTags(taskId) {
        return this.taskTags.get(taskId) || [];
    }
    getTasksByTag(tag) {
        const normalizedTag = tag.toLowerCase().trim();
        const taskIds = [];
        this.taskTags.forEach((tags, taskId) => {
            if (tags.indexOf(normalizedTag) !== -1) {
                taskIds.push(taskId);
            }
        });
        return taskIds;
    }
}
