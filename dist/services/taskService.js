import { getTasks as apiGetTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask, } from "../api/apiTaskService.js";
// ===== DATA ===== //
export let taskList = [];
let currentSearchTerm = "";
// ===== CALLBACKS ===== //
let onUpdate = null;
export function setOnUpdate(callback) {
    onUpdate = callback;
}
// ===== LOAD TASKS (syncs API → local array) ===== //
export async function loadTasks() {
    taskList = await apiGetTasks();
    onUpdate?.();
}
// ===== GETTERS/SETTERS ===== //
export function getCurrentSearchTerm() {
    return currentSearchTerm;
}
export function setSearchTerm(term) {
    currentSearchTerm = term;
    onUpdate?.();
}
// ===== BUSINESS LOGIC ===== //
export async function addTask(title) {
    if (title.trim() === "")
        return false;
    await apiCreateTask({ title: title.trim(), status: "pending" });
    await loadTasks();
    return true;
}
export async function removeTask(id) {
    await apiDeleteTask(id);
    await loadTasks();
}
export async function removeDoneTasks() {
    const doneTasks = taskList.filter((task) => task.status === "completed");
    for (const task of doneTasks) {
        await apiDeleteTask(task.id);
    }
    await loadTasks();
}
export async function clearAllTasks() {
    for (const task of taskList) {
        await apiDeleteTask(task.id);
    }
    await loadTasks();
}
export function orderTasks() {
    taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
    onUpdate?.();
}
export async function updateTaskTitle(id, newTitle) {
    if (newTitle.trim() === "")
        return false;
    await apiUpdateTask(id, { title: newTitle.trim() });
    await loadTasks();
    return true;
}
export async function toggleTaskFinished(id) {
    const task = taskList.find((t) => t.id === id);
    if (!task)
        return;
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await apiUpdateTask(id, { status: newStatus });
    await loadTasks();
}
// ===== FILTERED DATA ===== //
export function getFilteredTasks() {
    if (currentSearchTerm.trim() === "")
        return taskList;
    return taskList.filter((task) => task.title.toLowerCase().includes(currentSearchTerm.toLowerCase()));
}
export function getPendingCount() {
    return taskList.filter((task) => task.status === "pending").length;
}
