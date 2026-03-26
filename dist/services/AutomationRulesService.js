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
    // Rule: If task is completed, create log
    ruleTaskCompleted(task) {
        if (task.status === "completed") {
            this.historyLog.addLog(`Task "${task.title}" was completed`);
        }
    }
    // Rule: If task is blocked, notify admins
    ruleTaskBlocked(task) {
        if (task.status === "blocked") {
            this.notificationService.notifyAdmins(`Task "${task.title}" is blocked and needs attention`);
        }
    }
    // Rule: If task expired, move to blocked
    ruleTaskExpired(task) {
        if (task.due_date && task.status !== "completed") {
            const now = new Date();
            if (new Date(task.due_date) < now) {
                task.status = "blocked";
                this.historyLog.addLog(`Task "${task.title}" expired and was moved to blocked`);
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
