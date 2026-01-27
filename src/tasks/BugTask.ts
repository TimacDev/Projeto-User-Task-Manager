import { Category, TaskClass } from "../models/task.js";
import { TaskStatus } from "./TaskStatus.js";
import { BugSeverity } from "./bugSeverity.js";

export class BugTask extends TaskClass {
  severity: BugSeverity;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;

  constructor(
    id: number,
    title: string,
    category: Category,
    status: TaskStatus,
    severity: BugSeverity = BugSeverity.MEDIUM,
    stepsToReproduce: string = "",
    expectedBehavior: string = "",
    actualBehavior: string = "",
  ) {
    super(id, title, category, status); // ← Calls TaskClass constructor
    this.severity = severity;
    this.stepsToReproduce = stepsToReproduce;
    this.expectedBehavior = expectedBehavior;
    this.actualBehavior = actualBehavior;
  }

  // Override parent method
  getType(): string {
    return "Bug";
  }

  // Bug-specific methods
  getSeverity(): BugSeverity {
    return this.severity;
  }

  setSeverity(newSeverity: BugSeverity): void {
    this.severity = newSeverity;
  }

  isCritical(): boolean {
    return this.severity === BugSeverity.CRITICAL;
  }

  getBugReport(): string {
    return `
      Bug: ${this.title}
      Severity: ${this.severity}
      Status: ${this.status}
      Steps to Reproduce: ${this.stepsToReproduce}
      Expected: ${this.expectedBehavior}
      Actual: ${this.actualBehavior}
    `;
  }
}
