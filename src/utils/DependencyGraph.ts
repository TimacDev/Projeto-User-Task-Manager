export class DependencyGraph<T> {
    
  private graph: Map<T, T[]>;

  constructor() {
    this.graph = new Map();
  }

  addDependency(item: T, dependsOn: T): void {
    const existingDependencies = this.graph.get(item);

    if (existingDependencies) {
      if (!existingDependencies.find((d) => d === dependsOn)) {
        existingDependencies.push(dependsOn);
      }
    } else {
      this.graph.set(item, [dependsOn]);
    }
  }

  getDependencies(item: T): T[] {
    return this.graph.get(item) || [];
  }

  hasDependencies(item: T): boolean {
    const dependencies = this.graph.get(item);
    return dependencies !== undefined && dependencies.length > 0;
  }
}
