export class TagManager<T> {

  private tags: Map<T, string[]>;

  constructor() {
    this.tags = new Map<T, string[]>();
  }

  addTag(item: T, tag: string): void {    
    const existingTags = this.tags.get(item);

    if (existingTags) {      
      if (!existingTags.find((t) => t === tag)) {
        existingTags.push(tag);
      }
    } else {
      
      this.tags.set(item, [tag]);
    }
  }

  removeTag(item: T, tag: string): void {
    const existingTags = this.tags.get(item);

    if (existingTags) {
      
      const index = existingTags.findIndex((t) => t === tag);

      if (index !== -1) {
        existingTags.splice(index, 1);
      }
    }
  }

  getTags(item: T): string[] {
    return this.tags.get(item) || [];
  }
}
