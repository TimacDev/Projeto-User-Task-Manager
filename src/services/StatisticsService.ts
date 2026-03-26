import { Task } from "../models/task.js";

interface User {
  id: number;
  name: string;
}

interface TasksByStatus {
  pending: number;
  completed: number;
}

export class StatisticsService {
  private tasks: Task[] = [];
  private users: User[] = [];

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  setUsers(users: User[]): void {
    this.users = users;
  }

  countUsers(): number {
    return this.users.length;
  }

  countTasks(): number {
    return this.tasks.length;
  }

  countCompletedTasks(): number {
    return this.tasks.filter((task) => task.status === "completed").length;
  }

  countActiveTasks(): number {
    return this.tasks.filter((task) => task.status === "pending").length;
  }

  tasksByStatus(): TasksByStatus {
    return {
      pending: this.tasks.filter((task) => task.status === "pending").length,
      completed: this.tasks.filter((task) => task.status === "completed").length,
    };
  }
}
