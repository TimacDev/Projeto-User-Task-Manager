export type Category = "Work" | "Personal" | "Study";

export interface Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;
}

export class TaskClass implements Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;

  constructor(id: number, titulo: string, category: Category) {
    this.id = id;
    this.title = titulo;
    this.finished = false;
    this.category = category;
  }
}