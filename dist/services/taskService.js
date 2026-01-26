import { TaskClass } from "../models/index.js";
// ============ DATA ============
export let taskList = [];
let currentSearchTerm = "";
// ============ CALLBACKS ============
let onUpdate = null;
export function setOnUpdate(callback) {
    onUpdate = callback;
}
// ============ GETTERS/SETTERS ============
export function getCurrentSearchTerm() {
    return currentSearchTerm;
}
export function setSearchTerm(term) {
    currentSearchTerm = term;
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
// ============ BUSINESS LOGIC ============
export function addTask(title, category) {
    if (title.trim() === "")
        return false;
    const newTask = new TaskClass(Date.now(), title.trim(), category);
    taskList.push(newTask);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
    return true;
}
export function removeTask(id) {
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1)
        taskList.splice(index, 1);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function removeDoneTasks() {
    taskList = taskList.filter((task) => !task.finished);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function clearAllTasks() {
    taskList.length = 0;
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function orderTasks() {
    taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function updateTaskTitle(id, newTitle) {
    const task = taskList.find((t) => t.id === id);
    if (!task || newTitle.trim() === "")
        return false;
    task.title = newTitle.trim();
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
    return true;
}
export function toggleTaskFinished(id) {
    const task = taskList.find((t) => t.id === id);
    if (!task)
        return;
    task.finished = !task.finished;
    task.completionDate = task.finished ? new Date() : undefined;
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function getFilteredTasks() {
    if (currentSearchTerm.trim() === "")
        return taskList;
    return taskList.filter((task) => task.title.toLowerCase().includes(currentSearchTerm.toLowerCase()));
}
export function getPendingCount() {
    return taskList.filter((task) => !task.finished).length;
}
