import { Category, TaskClass } from "../models/task.js";
import { TaskStatus } from "./TaskStatus.js";
import { BugSeverity } from "./BugSeverity.js";

export class BugTask extends TaskClass {
  severity: BugSeverity;

  constructor(
    id: number,
    title: string,
    category: Category,
    status: TaskStatus,
    severity: BugSeverity = BugSeverity.MEDIUM,
  ) {
    super(id, title, category, status);
    this.severity = severity;
  }

  getType(): string {
    return "Bug";
  }

  getSeverity(): BugSeverity {
    return this.severity;
  }
}
