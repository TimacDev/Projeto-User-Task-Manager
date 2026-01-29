import { TaskStatus } from "../tasks/TaskStatus.js";
export class AutomationRulesService {
    constructor(notificationService, historyLog) {
        this.assignments = [];
        this.notificationService = notificationService;
        this.historyLog = historyLog;
    }
    setAssignments(assignments) {
        this.assignments = assignments;
    }
    // ===== TASK RULES ===== //
    // Rule: If task is COMPLETED, create log
    ruleTaskCompleted(task) {
        if (task.status === TaskStatus.COMPLETED) {
            this.historyLog.addLog(`Task "${task.title}" was completed`);
        }
    }
    // Rule: If task is BLOCKED, notify admins
    ruleTaskBlocked(task) {
        if (task.status === TaskStatus.BLOCKED) {
            this.notificationService.notifyAdmins(`Task "${task.title}" is blocked and needs attention`);
        }
    }
    // Rule: If task expired, move to BLOCKED
    ruleTaskExpired(task) {
        if (task.completionDate && task.status !== TaskStatus.COMPLETED) {
            const now = new Date();
            if (task.completionDate < now) {
                task.moveTo(TaskStatus.BLOCKED);
                this.historyLog.addLog(`Task "${task.title}" expired and was moved to BLOCKED`);
                this.notificationService.notifyAdmins(`Task "${task.title}" has expired`);
            }
        }
    }
    // ===== USER RULES ===== //
    // If user is inactive, remove assignments
    ruleUserInactive(user) {
        if (!user.active) {
            const removedCount = this.assignments.filter((a) => a.userId === user.id).length;
            this.assignments = this.assignments.filter((a) => a.userId !== user.id);
            if (removedCount > 0) {
                this.historyLog.addLog(`User "${user.name}" deactivated. ${removedCount} assignment(s) removed`);
                this.notificationService.notifyAdmins(`User "${user.name}" was deactivated`);
            }
        }
    }
    // ===== MAIN FUNCTIONS ===== //
    applyRules(task) {
        this.ruleTaskCompleted(task);
        this.ruleTaskBlocked(task);
        this.ruleTaskExpired(task);
    }
    applyUserRules(user) {
        this.ruleUserInactive(user);
    }
}
