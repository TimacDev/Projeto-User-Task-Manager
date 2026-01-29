import { TaskClass, Category, Task } from "../models/index.js";

// ===== DATA ===== //
export let taskList: Task[] = [];
let currentSearchTerm: string = "";

// ===== CALLBACKS ===== //
let onUpdate: (() => void) | null = null;

export function setOnUpdate(callback: () => void): void {
  onUpdate = callback;
}

// ===== GETTERS/SETTERS ===== //
export function getCurrentSearchTerm(): string {
  return currentSearchTerm;
}

export function setSearchTerm(term: string): void {
  currentSearchTerm = term;
  onUpdate?.();
}

// ===== BUSINESS LOGIC ===== //
export function addTask(title: string, category: Category): boolean {
  if (title.trim() === "") return false;

  const newTask = new TaskClass(Date.now(), title.trim(), category);
  taskList.push(newTask);
  onUpdate?.();
  return true;
}

export function removeTask(id: number): void {
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) taskList.splice(index, 1);
  onUpdate?.();
}

export function removeDoneTasks(): void {
  taskList = taskList.filter((task) => !task.finished);
  onUpdate?.();
}

export function clearAllTasks(): void {
  taskList.length = 0;
  onUpdate?.();
}

export function orderTasks(): void {
  taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
  onUpdate?.();
}

export function updateTaskTitle(id: number, newTitle: string): boolean {
  const task = taskList.find((t) => t.id === id);
  if (!task || newTitle.trim() === "") return false;

  task.title = newTitle.trim();
  onUpdate?.();
  return true;
}

export function toggleTaskFinished(id: number): void {
  const task = taskList.find((t) => t.id === id);
  if (!task) return;

  task.finished = !task.finished;
  task.completionDate = task.finished ? new Date() : undefined;
  onUpdate?.();
}

export function getFilteredTasks(): Task[] {
  if (currentSearchTerm.trim() === "") return taskList;

  return taskList.filter((task) =>
    task.title.toLowerCase().includes(currentSearchTerm.toLowerCase()),
  );
}

export function getPendingCount(): number {
  return taskList.filter((task) => !task.finished).length;
}
