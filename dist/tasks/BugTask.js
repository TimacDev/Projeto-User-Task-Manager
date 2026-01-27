import { TaskClass } from "../models/task.js";
import { BugSeverity } from "./bugSeverity.js";
export class BugTask extends TaskClass {
    constructor(id, title, category, status, severity = BugSeverity.MEDIUM, stepsToReproduce = "", expectedBehavior = "", actualBehavior = "") {
        super(id, title, category, status); // ← Calls TaskClass constructor
        this.severity = severity;
        this.stepsToReproduce = stepsToReproduce;
        this.expectedBehavior = expectedBehavior;
        this.actualBehavior = actualBehavior;
    }
    // Override parent method
    getType() {
        return "Bug";
    }
    // Bug-specific methods
    getSeverity() {
        return this.severity;
    }
    setSeverity(newSeverity) {
        this.severity = newSeverity;
    }
    isCritical() {
        return this.severity === BugSeverity.CRITICAL;
    }
    getBugReport() {
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
