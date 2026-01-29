import { taskList } from "./taskService.js";
import { userList } from "./userService.js";
export class AssignmentService {
    constructor() {
        this.taskToUsers = new Map();
        this.userToTasks = new Map();
    }
    // ===== MAIN FUNCTIONS ===== //
    assignUser(taskId, userId) {
        const task = taskList.find((t) => t.id === taskId);
        if (!task) {
            console.warn(`Task with ID ${taskId} not found`);
            return;
        }
        const user = userList.find((u) => u.id === userId);
        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return;
        }
        // Add user to task
        if (!this.taskToUsers.has(taskId)) {
            this.taskToUsers.set(taskId, []);
        }
        const usersInTask = this.taskToUsers.get(taskId);
        if (usersInTask.indexOf(userId) === -1) {
            usersInTask.push(userId);
        }
        // Add task to user
        if (!this.userToTasks.has(userId)) {
            this.userToTasks.set(userId, []);
        }
        const tasksOfUser = this.userToTasks.get(userId);
        if (tasksOfUser.indexOf(taskId) === -1) {
            tasksOfUser.push(taskId);
        }
        console.log(`User "${user.name}" assigned to task "${task.title}"`);
    }
    unassignUser(taskId, userId) {
        if (this.taskToUsers.has(taskId)) {
            const usersInTask = this.taskToUsers.get(taskId);
            const userIndex = usersInTask.indexOf(userId);
            if (userIndex !== -1) {
                usersInTask.splice(userIndex, 1);
            }
        }
        if (this.userToTasks.has(userId)) {
            const tasksOfUser = this.userToTasks.get(userId);
            const taskIndex = tasksOfUser.indexOf(taskId);
            if (taskIndex !== -1) {
                tasksOfUser.splice(taskIndex, 1);
            }
        }
        console.log(`User ${userId} unassigned from task ${taskId}`);
    }
    getUsersFromTask(taskId) {
        var _a;
        const userIds = (_a = this.taskToUsers.get(taskId)) !== null && _a !== void 0 ? _a : [];
        const users = [];
        for (const userId of userIds) {
            const user = userList.find((u) => u.id === userId);
            if (user) {
                users.push(user);
            }
        }
        return users;
    }
    getTasksFromUser(userId) {
        var _a;
        const taskIds = (_a = this.userToTasks.get(userId)) !== null && _a !== void 0 ? _a : [];
        const tasks = [];
        for (const taskId of taskIds) {
            const task = taskList.find((t) => t.id === taskId);
            if (task) {
                tasks.push(task);
            }
        }
        return tasks;
    }
}
