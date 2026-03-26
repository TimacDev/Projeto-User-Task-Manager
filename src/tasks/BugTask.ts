import { Task } from "../models/task.js";
import { BugSeverity } from "./BugSeverity.js";

export interface BugTask extends Task {
  severity: BugSeverity;
}
