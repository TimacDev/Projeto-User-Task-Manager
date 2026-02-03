export class DependencyGraph {
    constructor() {
        this.graph = new Map();
    }
    addDependency(item, dependsOn) {
        const existingDependencies = this.graph.get(item);
        if (existingDependencies) {
            if (!existingDependencies.find((d) => d === dependsOn)) {
                existingDependencies.push(dependsOn);
            }
        }
        else {
            this.graph.set(item, [dependsOn]);
        }
    }
    getDependencies(item) {
        return this.graph.get(item) || [];
    }
    hasDependencies(item) {
        const dependencies = this.graph.get(item);
        return dependencies !== undefined && dependencies.length > 0;
    }
}
