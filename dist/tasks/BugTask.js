import { TaskClass } from "../models/task.js";
import { BugSeverity } from "./BugSeverity.js";
export class BugTask extends TaskClass {
    constructor(id, title, category, status, severity = BugSeverity.MEDIUM) {
        super(id, title, category, status);
        this.severity = severity;
    }
    getType() {
        return "Bug";
    }
    getSeverity() {
        return this.severity;
    }
}
