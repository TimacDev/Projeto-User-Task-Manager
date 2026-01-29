export class BackupService {
    constructor() {
        this.tasks = [];
        this.users = [];
        this.assignments = [];
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    setUsers(users) {
        this.users = users;
    }
    setAssignments(assignments) {
        this.assignments = assignments;
    }
    exportUsers() {
        return this.users.map((user) => (Object.assign({}, user)));
    }
    exportTasks() {
        return this.tasks.map((task) => (Object.assign({}, task)));
    }
    exportAssignments() {
        return this.assignments.map((assignment) => (Object.assign({}, assignment)));
    }
    exportAll() {
        return {
            users: this.exportUsers(),
            tasks: this.exportTasks(),
            assignments: this.exportAssignments(),
            exportedAt: new Date(),
        };
    }
}
