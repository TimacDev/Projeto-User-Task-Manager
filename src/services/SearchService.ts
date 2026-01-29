import { Task } from "../models/task.js";
import { Category } from "../models/task.js";
import { TaskStatus } from "../tasks/TaskStatus.js";

export class SearchService {
  private tasks: Task[] = [];

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  // Search by title text
  searchByTitle(text: string): Task[] {
    const normalizedText = text.toLowerCase().trim();

    return this.tasks.filter((task) => {
      return task.title.toLowerCase().indexOf(normalizedText) !== -1;
    });
  }

  // Search by category 
  searchByCategory(category: Category): Task[] {
    return this.tasks.filter((task) => task.category === category);
  }

  // Search by status
  searchByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  // Global search 
  globalSearch(query: string): Task[] {
    return this.searchByTitle(query);
  }

  // Remove duplicates helper
  private removeDuplicates(tasks: Task[]): Task[] {
    const seen: number[] = [];
    const unique: Task[] = [];

    tasks.forEach((task) => {
      if (seen.indexOf(task.id) === -1) {
        seen.push(task.id);
        unique.push(task);
      }
    });

    return unique;
  }
}
