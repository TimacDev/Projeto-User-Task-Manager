import { Task } from "../models/index.js";
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../api/apiTaskService.js";

// ===== DATA ===== //

export let taskList: Task[] = [];
let currentSearchTerm: string = "";

// ===== CALLBACKS ===== //

let onUpdate: (() => void) | null = null;

export function setOnUpdate(callback: () => void): void {
  onUpdate = callback;
}

// ===== LOAD TASKS (syncs API → local array) ===== //

export async function loadTasks(): Promise<void> {
  taskList = await apiGetTasks();
  onUpdate?.();
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

export async function addTask(title: string): Promise<boolean> {
  if (title.trim() === "") return false;

  await apiCreateTask({ title: title.trim(), status: "pending" });
  await loadTasks();
  return true;
}

export async function removeTask(id: number): Promise<void> {
  await apiDeleteTask(id);
  await loadTasks();
}

export async function removeDoneTasks(): Promise<void> {
  const doneTasks = taskList.filter((task) => task.status === "completed");

  for (const task of doneTasks) {
    await apiDeleteTask(task.id);
  }

  await loadTasks();
}

export async function clearAllTasks(): Promise<void> {
  for (const task of taskList) {
    await apiDeleteTask(task.id);
  }

  await loadTasks();
}

export function orderTasks(): void {
  taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
  onUpdate?.();
}

export async function updateTaskTitle(id: number, newTitle: string): Promise<boolean> {
  if (newTitle.trim() === "") return false;

  await apiUpdateTask(id, { title: newTitle.trim() });
  await loadTasks();
  return true;
}

export async function toggleTaskFinished(id: number): Promise<void> {
  const task = taskList.find((t) => t.id === id);
  if (!task) return;

  const newStatus = task.status === "completed" ? "pending" : "completed";

  await apiUpdateTask(id, { status: newStatus });
  await loadTasks();
}

// ===== FILTERED DATA ===== //

export function getFilteredTasks(): Task[] {
  if (currentSearchTerm.trim() === "") return taskList;

  return taskList.filter((task) =>
    task.title.toLowerCase().includes(currentSearchTerm.toLowerCase()),
  );
}

export function getPendingCount(): number {
  return taskList.filter((task) => task.status === "pending").length;
}
