import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
import { NotificationService } from "../notifications/NotificationService.js";
import { HistoryLog } from "../logs/HistoryLog.js";

// Assignment interface
interface Assignment {
  taskId: number;
  userId: number;
  assignedAt: Date;
}

export class AutomationRulesService {
  private assignments: Assignment[] = [];
  private notificationService: NotificationService;
  private historyLog: HistoryLog;

  constructor(
    notificationService: NotificationService,
    historyLog: HistoryLog,
  ) {
    this.notificationService = notificationService;
    this.historyLog = historyLog;
  }

  setAssignments(assignments: Assignment[]): void {
    this.assignments = assignments;
  }

  // ===== TASK RULES ===== //

  // Rule: If task is COMPLETED, create log
  private ruleTaskCompleted(task: Task): void {
    if (task.status === TaskStatus.COMPLETED) {
      this.historyLog.addLog(`Task "${task.title}" was completed`);
    }
  }

  // Rule: If task is BLOCKED, notify admins
  private ruleTaskBlocked(task: Task): void {
    if (task.status === TaskStatus.BLOCKED) {
      this.notificationService.notifyAdmins(
        `Task "${task.title}" is blocked and needs attention`,
      );
    }
  }

  // Rule: If task expired, move to BLOCKED
  private ruleTaskExpired(task: Task): void {
    if (task.completionDate && task.status !== TaskStatus.COMPLETED) {
      const now = new Date();
      if (task.completionDate < now) {
        task.moveTo(TaskStatus.BLOCKED);
        this.historyLog.addLog(
          `Task "${task.title}" expired and was moved to BLOCKED`,
        );
        this.notificationService.notifyAdmins(
          `Task "${task.title}" has expired`,
        );
      }
    }
  }

  // ===== USER RULES ===== //

  // If user is inactive, remove assignments
  private ruleUserInactive(user: User): void {
    if (!user.active) {
      const removedCount = this.assignments.filter(
        (a) => a.userId === user.id,
      ).length;

      this.assignments = this.assignments.filter((a) => a.userId !== user.id);

      if (removedCount > 0) {
        this.historyLog.addLog(
          `User "${user.name}" deactivated. ${removedCount} assignment(s) removed`,
        );
        this.notificationService.notifyAdmins(
          `User "${user.name}" was deactivated`,
        );
      }
    }
  }

  // ===== MAIN FUNCTIONS ===== //

  applyRules(task: Task): void {
    this.ruleTaskCompleted(task);
    this.ruleTaskBlocked(task);
    this.ruleTaskExpired(task);
  }

  applyUserRules(user: User): void {
    this.ruleUserInactive(user);
  }
}

