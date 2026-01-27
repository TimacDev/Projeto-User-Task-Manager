import { Category, TaskClass } from "../models/task.js";
import { TaskStatus } from "./TaskStatus.js";

export class BugTask extends TaskClass {
  id: number;
  

  constructor(id: number, title: string, category: Category, status: TaskStatus) {
    super
  }

}
