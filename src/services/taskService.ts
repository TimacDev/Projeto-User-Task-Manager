import { TaskClass, Category, Task } from "../models/index.js";

export let taskList: Task[] = [];

export let currentSearchTerm: string = "";
// Getter function
export function getCurrentSearchTerm(): string {
  return currentSearchTerm;
}

// Função
export function setSearchTerm(term: string): void {
  currentSearchTerm = term;
}

export const input = document.querySelector("#taskInput") as HTMLInputElement;
export const categorySelect = document.querySelector(
  "#categorySelect",
) as HTMLSelectElement;

// Callback that main.ts will set
let onUpdate: (() => void) | null = null;

export function setOnUpdate(callback: () => void): void {
  onUpdate = callback;
}

export function addTask(): void {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const categoriaSelecionada = categorySelect.value as Category;
  const newTask = new TaskClass(Date.now(), taskText, categoriaSelecionada);
  taskList.push(newTask);
  input.value = "";
  onUpdate?.();
}

export function filterTasks(searchTerm: string): void {
  currentSearchTerm = searchTerm;
  onUpdate?.();
}

const output = document.querySelector("#output") as HTMLDivElement;
export function clearAllTasks(): void {
  if (taskList.length === 0) return;
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.length = 0;
    onUpdate?.();
  }
}

export function orderTask(): void {
  taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
  onUpdate?.();
}

export function editTask(id: number): void {
  const task = taskList.find((t) => t.id === id);
  if (!task) return;

  const newTitle = prompt("Editar tarefa:", task.title);
  if (newTitle !== null && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    onUpdate?.();
  }
}

export function removeTask(id: number): void {
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) taskList.splice(index, 1);
  onUpdate?.();
}

export function removeDoneTasks(): void {
  taskList = taskList.filter((task) => task.finished === false);
  onUpdate?.();
}
