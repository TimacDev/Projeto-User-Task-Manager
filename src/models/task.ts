import { BaseEntity } from "./BaseEntity.js";
import { TaskStatus } from "../tasks/TaskStatus.js";

export type Category = "Work" | "Personal" | "Study";

export interface Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;

  getType(): string;  
  moveTo(status: TaskStatus): void;
}

export class TaskClass extends BaseEntity implements Task {
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;

  constructor(id: number, title: string, category: Category) {
    super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
    this.title = title;
    this.finished = false;
    this.category = category;
  }

  getType(): string {
    return;
  }
  
  moveTo(status: TaskStatus): void {
    
  }
}
