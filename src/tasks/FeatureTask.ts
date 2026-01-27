import { Category, TaskClass } from "../models/task.js";
import { TaskStatus } from "./TaskStatus.js";

export class FeatureTask extends TaskClass {
  priority: "Low" | "Medium" | "High";
  
  constructor(id: number, title: string, category: Category, status: TaskStatus) {
    super(id, title, category, status);
    this.priority = "Medium";
  }

  getType(): string {
    return "Feature";
  }
}