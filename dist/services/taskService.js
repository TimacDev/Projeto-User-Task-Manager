import { TaskClass } from "../models/index.js";
export let taskList = [];
export let currentSearchTerm = "";
// Getter function
export function getCurrentSearchTerm() {
    return currentSearchTerm;
}
// Função
export function setSearchTerm(term) {
    currentSearchTerm = term;
}
export const input = document.querySelector("#taskInput");
export const categorySelect = document.querySelector("#categorySelect");
// Callback that main.ts will set
let onUpdate = null;
export function setOnUpdate(callback) {
    onUpdate = callback;
}
export function addTask() {
    const taskText = input.value.trim();
    if (taskText === "")
        return;
    const categoriaSelecionada = categorySelect.value;
    const newTask = new TaskClass(Date.now(), taskText, categoriaSelecionada);
    taskList.push(newTask);
    input.value = "";
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function filterTasks(searchTerm) {
    currentSearchTerm = searchTerm;
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
const output = document.querySelector("#output");
export function clearAllTasks() {
    if (taskList.length === 0)
        return;
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.length = 0;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
    }
}
export function orderTask() {
    taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function editTask(id) {
    const task = taskList.find((t) => t.id === id);
    if (!task)
        return;
    const newTitle = prompt("Editar tarefa:", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
    }
}
export function removeTask(id) {
    const index = taskList.findIndex((task) => task.id === id);
    if (index !== -1)
        taskList.splice(index, 1);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function removeDoneTasks() {
    taskList = taskList.filter((task) => task.finished === false);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
