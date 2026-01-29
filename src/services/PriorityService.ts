// src/services/PriorityService.ts
import { taskList } from "./taskService.js";
import { Task } from "../models/task.js";
import { TaskPriority } from "../tasks/TaskPriority.js";

export class PriorityService {
  private priorities: Map<number, TaskPriority> = new Map();

  // ===== MAIN FUNCTIONS ===== //

  setPriority(taskId: number, priority: TaskPriority): void {
    const task = taskList.find((t) => t.id === taskId);

    if (!task) {
      console.warn(`Task with ID ${taskId} not found`);
      return;
    }

    this.priorities.set(taskId, priority);
    console.log(`Priority set for "${task.title}": ${priority}`);
  }

  getPriority(taskId: number): TaskPriority | undefined {
    return this.priorities.get(taskId);
  }

  getHighPriorityTasks(): Task[] {
    const highPriorityTasks: Task[] = [];

    this.priorities.forEach((priority, taskId) => {
      if (
        priority === TaskPriority.HIGH ||
        priority === TaskPriority.CRITICAL
      ) {
        const task = taskList.find((t) => t.id === taskId);
        if (task) {
          highPriorityTasks.push(task);
        }
      }
    });

    return highPriorityTasks;
  }
}
