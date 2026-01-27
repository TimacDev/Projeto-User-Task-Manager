import { BaseEntity } from "./BaseEntity.js";
import { TaskStatus } from "../tasks/TaskStatus.js";

export type Category = "Work" | "Personal" | "Study";

export interface Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;
  status: TaskStatus;

  getType(): string;
  moveTo(status: TaskStatus): void;
}

export class TaskClass extends BaseEntity implements Task {
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;
  status: TaskStatus;

  constructor(
    id: number,
    title: string,
    category: Category,
    status: TaskStatus,
  ) {
    super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
    this.title = title;
    this.finished = false;
    this.category = category;
    this.status = status;
  }

  getType(): string {
    return this.title;
  }

  moveTo(newStatus: TaskStatus): void {
    this.status = newStatus;
  }
}
