import { taskList } from "./taskService.js";
import { userList } from "./userService.js";
import { Task } from "../models/task.js";
import { UserClass } from "../models/user.js";

export class AssignmentService {
  private taskToUsers: Map<number, number[]> = new Map();
  private userToTasks: Map<number, number[]> = new Map();

  // ===== MAIN FUNCTIONS ===== //

  assignUser(taskId: number, userId: number): void {
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
    const usersInTask = this.taskToUsers.get(taskId)!;
    if (usersInTask.indexOf(userId) === -1) {
      usersInTask.push(userId);
    }

    // Add task to user
    if (!this.userToTasks.has(userId)) {
      this.userToTasks.set(userId, []);
    }
    const tasksOfUser = this.userToTasks.get(userId)!;
    if (tasksOfUser.indexOf(taskId) === -1) {
      tasksOfUser.push(taskId);
    }

    console.log(`User "${user.name}" assigned to task "${task.title}"`);
  }

  unassignUser(taskId: number, userId: number): void {
    if (this.taskToUsers.has(taskId)) {
      const usersInTask = this.taskToUsers.get(taskId)!;
      const userIndex = usersInTask.indexOf(userId);
      if (userIndex !== -1) {
        usersInTask.splice(userIndex, 1);
      }
    }

    if (this.userToTasks.has(userId)) {
      const tasksOfUser = this.userToTasks.get(userId)!;
      const taskIndex = tasksOfUser.indexOf(taskId);
      if (taskIndex !== -1) {
        tasksOfUser.splice(taskIndex, 1);
      }
    }

    console.log(`User ${userId} unassigned from task ${taskId}`);
  }

  getUsersFromTask(taskId: number): UserClass[] {
    const userIds = this.taskToUsers.get(taskId) ?? [];

    const users: UserClass[] = [];
    for (const userId of userIds) {
      const user = userList.find((u) => u.id === userId);
      if (user) {
        users.push(user);
      }
    }

    return users;
  }

  getTasksFromUser(userId: number): Task[] {
    const taskIds = this.userToTasks.get(userId) ?? [];

    const tasks: Task[] = [];
    for (const taskId of taskIds) {
      const task = taskList.find((t) => t.id === taskId);
      if (task) {
        tasks.push(task);
      }
    }

    return tasks;
  }
}
