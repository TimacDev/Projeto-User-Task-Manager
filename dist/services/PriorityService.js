// src/services/PriorityService.ts
import { taskList } from "./taskService.js";
import { TaskPriority } from "../tasks/TaskPriority.js";
export class PriorityService {
    constructor() {
        // Storage: taskId → priority
        this.priorities = new Map();
    }
    // ============ MAIN FUNCTIONS ============
    setPriority(taskId, priority) {
        const task = taskList.find(t => t.id === taskId);
        if (!task) {
            console.warn(`Task with ID ${taskId} not found`);
            return;
        }
        this.priorities.set(taskId, priority);
        console.log(`Priority set for "${task.title}": ${priority}`);
    }
    getPriority(taskId) {
        return this.priorities.get(taskId);
    }
    getHighPriorityTasks() {
        const highPriorityTasks = [];
        // Iterate through all priorities
        this.priorities.forEach((priority, taskId) => {
            // Filter by HIGH and CRITICAL
            if (priority === TaskPriority.HIGH || priority === TaskPriority.CRITICAL) {
                const task = taskList.find(t => t.id === taskId);
                if (task) {
                    highPriorityTasks.push(task);
                }
            }
        });
        return highPriorityTasks;
    }
}
