import { Category } from "../models/index.js";
import {
  taskList,
  getCurrentSearchTerm,
  setSearchTerm,
  orderTasks,
  removeDoneTasks,
  removeTask,
  updateTaskTitle,
  toggleTaskFinished,
  addTask,
  clearAllTasks,
  getPendingCount,
  getFilteredTasks
} from "../services/taskService.js";

// ============ DOM ELEMENTS ============
const counterSpan = document.querySelector("#numPendentes") as HTMLSpanElement;
const output = document.querySelector("#output") as HTMLDivElement;
const taskInput = document.querySelector("#taskInput") as HTMLInputElement;
const categorySelect = document.querySelector("#categorySelect") as HTMLSelectElement;

// ============ UI FUNCTIONS ============
export function updateCounter(): void {
  if (counterSpan) {
    counterSpan.textContent = getPendingCount().toString();
  }
}

// ✅ UI handles the prompt() interaction
export function handleEditTask(id: number): void {
  const task = taskList.find((t) => t.id === id);
  if (!task) return;

  const newTitle = prompt("Editar tarefa:", task.title);
  if (newTitle !== null) {
    updateTaskTitle(id, newTitle);
  }
}

// ✅ UI handles the confirm() interaction
export function handleClearAllTasks(): void {
  if (taskList.length === 0) return;
  if (confirm("Are you sure you want to delete all tasks?")) {
    clearAllTasks();
  }
}

// ✅ UI handles reading from input fields
export function handleAddTask(): void {
  const title = taskInput.value.trim();
  const category = categorySelect.value as Category;
  
  if (addTask(title, category)) {
    taskInput.value = "";
  }
}

export function renderTasks(): void {
  if (!output) return;
  output.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (taskList.length === 0 && getCurrentSearchTerm() === "") {
    updateCounter();
    return;
  }

  // Controls container
  const controls = document.createElement("div");
  controls.classList.add("controls");

  const btnSort = document.createElement("button");
  btnSort.textContent = "Order A-Z";
  btnSort.classList.add("btn-sort");
  btnSort.addEventListener("click", orderTasks);
  controls.appendChild(btnSort);

  const btnRemoveDone = document.createElement("button");
  btnRemoveDone.textContent = "Remove Done";
  btnRemoveDone.classList.add("btn-removeDone");
  btnRemoveDone.addEventListener("click", removeDoneTasks);
  controls.appendChild(btnRemoveDone);

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Search tasks...";
  searchBox.classList.add("input-searchbox");
  searchBox.value = getCurrentSearchTerm();
  searchBox.oninput = () => setSearchTerm(searchBox.value);
  controls.appendChild(searchBox);

  output.appendChild(controls);

  // Task list
  const ul = document.createElement("ul");
  renderTaskList(ul, filteredTasks);
  output.appendChild(ul);

  updateCounter();
}

function renderTaskList(ul: HTMLUListElement, tasks: typeof taskList): void {
  ul.innerHTML = "";

  if (tasks.length === 0) {
    const noResults = document.createElement("li");
    noResults.textContent = "No tasks found.";
    noResults.classList.add("no-results");
    ul.appendChild(noResults);
    return;
  }

  for (const task of tasks) {
    const li = document.createElement("li");

    const categoryBadge = document.createElement("span");
    categoryBadge.textContent = task.category;
    categoryBadge.classList.add("category-badge", `category-${task.category.toLowerCase()}`);

    const spanText = document.createElement("span");
    spanText.textContent = task.title;
    spanText.style.cursor = "pointer";
    if (task.finished) spanText.classList.add("finished");
    spanText.addEventListener("click", () => toggleTaskFinished(task.id));

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.classList.add("btn-remove");
    btnRemove.addEventListener("click", () => removeTask(task.id));

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("btn-edit");
    btnEdit.addEventListener("click", () => handleEditTask(task.id));

    li.appendChild(categoryBadge);
    li.appendChild(spanText);

    if (task.finished && task.completionDate) {
      const finishedDate = document.createElement("p");
      finishedDate.textContent = `Finished in: ${task.completionDate.toLocaleString("en")}`;
      finishedDate.classList.add("task-date");
      li.appendChild(finishedDate);
    }

    li.appendChild(btnRemove);
    li.appendChild(btnEdit);
    ul.appendChild(li);
  }

  updateCounter();
}
