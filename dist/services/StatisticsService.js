export class StatisticsService {
    constructor() {
        this.tasks = [];
        this.users = [];
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    setUsers(users) {
        this.users = users;
    }
    countUsers() {
        return this.users.length;
    }
    countTasks() {
        return this.tasks.length;
    }
    countCompletedTasks() {
        return this.tasks.filter((task) => task.status === "completed").length;
    }
    countActiveTasks() {
        return this.tasks.filter((task) => task.status === "pending").length;
    }
    tasksByStatus() {
        return {
            pending: this.tasks.filter((task) => task.status === "pending").length,
            completed: this.tasks.filter((task) => task.status === "completed").length,
        };
    }
}
