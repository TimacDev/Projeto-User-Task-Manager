export class SearchService {
    constructor() {
        this.tasks = [];
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    // Search by title text
    searchByTitle(text) {
        const normalizedText = text.toLowerCase().trim();
        return this.tasks.filter((task) => {
            return task.title.toLowerCase().indexOf(normalizedText) !== -1;
        });
    }
    // Search by category 
    searchByCategory(category) {
        return this.tasks.filter((task) => task.category === category);
    }
    // Search by status
    searchByStatus(status) {
        return this.tasks.filter((task) => task.status === status);
    }
    // Global search 
    globalSearch(query) {
        return this.searchByTitle(query);
    }
    // Remove duplicates helper
    removeDuplicates(tasks) {
        const seen = [];
        const unique = [];
        tasks.forEach((task) => {
            if (seen.indexOf(task.id) === -1) {
                seen.push(task.id);
                unique.push(task);
            }
        });
        return unique;
    }
}
