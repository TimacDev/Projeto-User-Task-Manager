import { TaskStatus } from "../tasks/TaskStatus.js";
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
        return this.tasks.filter((task) => task.status === TaskStatus.COMPLETED)
            .length;
    }
    countActiveTasks() {
        return this.tasks.filter((task) => {
            return (task.status !== TaskStatus.COMPLETED &&
                task.status !== TaskStatus.ARCHIVED);
        }).length;
    }
    tasksByStatus() {
        return {
            created: this.tasks.filter((task) => task.status === TaskStatus.CREATED)
                .length,
            assigned: this.tasks.filter((task) => task.status === TaskStatus.ASSIGNED)
                .length,
            inProgress: this.tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length,
            blocked: this.tasks.filter((task) => task.status === TaskStatus.BLOCKED)
                .length,
            completed: this.tasks.filter((task) => task.status === TaskStatus.COMPLETED).length,
            archived: this.tasks.filter((task) => task.status === TaskStatus.ARCHIVED)
                .length,
        };
    }
}
