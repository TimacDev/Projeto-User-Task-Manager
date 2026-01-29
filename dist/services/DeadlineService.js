import { taskList } from "./taskService.js";
export class DeadlineService {
    constructor() {
        // Store deadlines
        this.deadlines = new Map();
    }
    // ============ HELPER FUNCTION ============
    getCurrentDate() {
        return new Date();
    }
    // ============ MAIN FUNCTIONS ============
    setDeadline(taskId, date) {
        // Check if task exists
        const task = taskList.find((t) => t.id === taskId);
        if (!task) {
            console.warn(`Task with ID ${taskId} not found`);
            return;
        }
        // Store the deadline
        this.deadlines.set(taskId, date);
        console.log(`Deadline set for "${task.title}": ${date.toLocaleString()}`);
    }
    isExpired(taskId) {
        // Get the deadline for this task
        const deadline = this.deadlines.get(taskId);
        if (!deadline) {
            return false;
        }
        // Compare: deadline timestamp vs current timestamp
        const currentTime = this.getCurrentDate().getTime();
        const deadlineTime = deadline.getTime();
        return deadlineTime < currentTime;
    }
    getExpiredTasks() {
        const expiredTasks = [];
        // Iterate through all deadlines
        this.deadlines.forEach((deadline, taskId) => {
            // Check if this deadline is expired
            if (this.isExpired(taskId)) {
                // Find the task and add to result
                const task = taskList.find((t) => t.id === taskId);
                if (task) {
                    expiredTasks.push(task);
                }
            }
        });
        return expiredTasks;
    }
}
