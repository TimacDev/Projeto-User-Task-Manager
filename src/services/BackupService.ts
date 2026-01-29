import { Task } from "../models/task.js";
import { User } from "../models/user.js";

// Interface for assignments (task-user relationships)
interface Assignment {
  taskId: number;
  userId: number;
  assignedAt: Date;
}

// Interface for full backup
interface FullBackup {
  users: User[];
  tasks: Task[];
  assignments: Assignment[];
  exportedAt: Date;
}

export class BackupService {
  private tasks: Task[] = [];
  private users: User[] = [];
  private assignments: Assignment[] = [];

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  setUsers(users: User[]): void {
    this.users = users;
  }

  setAssignments(assignments: Assignment[]): void {
    this.assignments = assignments;
  }

  exportUsers(): User[] {
    return this.users.map((user) => ({ ...user }));
  }

  exportTasks(): Task[] {
    return this.tasks.map((task) => ({ ...task }));
  }

  exportAssignments(): Assignment[] {
    return this.assignments.map((assignment) => ({ ...assignment }));
  }

  exportAll(): FullBackup {
    return {
      users: this.exportUsers(),
      tasks: this.exportTasks(),
      assignments: this.exportAssignments(),
      exportedAt: new Date(),
    };
  }
}
