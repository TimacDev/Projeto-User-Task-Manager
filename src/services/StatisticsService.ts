import { Task } from "../models/task.js";
import { TaskStatus } from "../tasks/TaskStatus.js";

interface User {
  id: number;
  name: string;
}

interface TasksByStatus {
  created: number;
  assigned: number;
  inProgress: number;
  blocked: number;
  completed: number;
  archived: number;
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
    return this.tasks.filter((task) => task.status === TaskStatus.COMPLETED)
      .length;
  }

  countActiveTasks(): number {
    return this.tasks.filter((task) => {
      return (
        task.status !== TaskStatus.COMPLETED &&
        task.status !== TaskStatus.ARCHIVED
      );
    }).length;
  }

  tasksByStatus(): TasksByStatus {
    return {
      created: this.tasks.filter((task) => task.status === TaskStatus.CREATED)
        .length,
      assigned: this.tasks.filter((task) => task.status === TaskStatus.ASSIGNED)
        .length,
      inProgress: this.tasks.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS,
      ).length,
      blocked: this.tasks.filter((task) => task.status === TaskStatus.BLOCKED)
        .length,
      completed: this.tasks.filter(
        (task) => task.status === TaskStatus.COMPLETED,
      ).length,
      archived: this.tasks.filter((task) => task.status === TaskStatus.ARCHIVED)
        .length,
    };
  }
}
