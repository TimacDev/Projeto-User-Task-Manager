import { Task } from "../models/task.js";

export interface FeatureTask extends Task {
  priority: "Low" | "Medium" | "High";
}
