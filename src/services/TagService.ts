export class TagService {
  private taskTags: Map<number, string[]> = new Map();

  addTag(taskId: number, tag: string): boolean {
    const normalizedTag = tag.toLowerCase().trim();
    const tags = this.taskTags.get(taskId) || [];
    
    if (tags.indexOf(normalizedTag) !== -1) {
      return false;
    }

    tags.push(normalizedTag);
    this.taskTags.set(taskId, tags);
    return true;
  }

  removeTag(taskId: number, tag: string): boolean {
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

  getTags(taskId: number): string[] {
    return this.taskTags.get(taskId) || [];
  }

  getTasksByTag(tag: string): number[] {
    const normalizedTag = tag.toLowerCase().trim();
    const taskIds: number[] = [];

    this.taskTags.forEach((tags, taskId) => {
      
      if (tags.indexOf(normalizedTag) !== -1) {
        taskIds.push(taskId);
      }
    });

    return taskIds;
  }
}
