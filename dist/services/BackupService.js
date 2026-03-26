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
        return this.users.map((user) => ({ ...user }));
    }
    exportTasks() {
        return this.tasks.map((task) => ({ ...task }));
    }
    exportAssignments() {
        return this.assignments.map((assignment) => ({ ...assignment }));
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
