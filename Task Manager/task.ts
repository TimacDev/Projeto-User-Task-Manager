const input = document.querySelector("#taskInput") as HTMLInputElement;
const addBtn = document.querySelector("#addBtn") as HTMLButtonElement;
const clearBtn = document.querySelector("#btnLimpar") as HTMLButtonElement;
const output = document.querySelector("#output") as HTMLDivElement;
const counterSpan = document.querySelector("#numPendentes") as HTMLSpanElement;
const categorySelect = document.querySelector(
  "#categorySelect"
) as HTMLSelectElement;

// Type, Interface e Class
type Category = "Work" | "Personal" | "Study";

interface Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;
}

class TaskClass implements Task {
  id: number;
  title: string;
  finished: boolean;
  completionDate?: Date;
  category: Category;

  constructor(id: number, titulo: string, category: Category) {
    this.id = id;
    this.title = titulo;
    this.finished = false;
    this.category = category;
  }
}

// ARRAY

let taskList: Task[] = [];

// FUNÇÕES
let currentSearchTerm: string = "";

function filterTasks(searchTerm: string): void {
  currentSearchTerm = searchTerm;
  renderTasks();
}

function updateCounter(): void {
  const pendingCount = taskList.filter((task) => !task.finished).length;
  counterSpan.textContent = pendingCount.toString();
}

function addTask(): void {
  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  const categoriaSelecionada = categorySelect.value as Category;

  const newTask = new TaskClass(Date.now(), taskText, categoriaSelecionada);
  taskList.push(newTask);
  input.value = "";
  renderTasks();
}

function removeTask(id: number): void {
  taskList = taskList.filter((task) => task.id !== id);
  renderTasks();
  updateCounter();
}

function removeDoneTasks(): void {
  taskList = taskList.filter((task) => task.finished === false);
  renderTasks();
  updateCounter();
}

function editTask(id: number): void {
  const task = taskList.find((t) => t.id === id);
  if (!task) return;

  const newTitle = prompt("Editar tarefa:", task.title);

  if (newTitle !== null && newTitle.trim() !== "") {
    task.title = newTitle.trim();
    renderTasks();
  }
}

function clearAllTasks(): void {
  if (taskList.length === 0) {
    return;
  }

  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList = [];
    renderTasks();
    output.innerHTML = "";
    updateCounter();
  }
}

function orderTask(): void {
  taskList.sort((a, b) => a.title.localeCompare(b.title, "pt-PT"));
  renderTasks();
}

// Função Render Tasks

function renderTasks(): void {
  output.innerHTML = "";

  if (taskList.length === 0 && currentSearchTerm === "") {
    return;
  }

  const filteredTasks = currentSearchTerm.trim() === ""
    ? taskList
    : taskList.filter((task) =>
        task.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );

  // Controls container (buttons + search)
  const controls = document.createElement("div");
  controls.classList.add("controls");

  const btnSort = document.createElement("button");
  btnSort.textContent = "Order A-Z";
  btnSort.classList.add("btn-sort");
  btnSort.addEventListener("click", () => orderTask());
  controls.appendChild(btnSort);

  const btnRemoveDone = document.createElement("button");
  btnRemoveDone.textContent = "Remove Done";
  btnRemoveDone.classList.add("btn-removeDone");
  btnRemoveDone.addEventListener("click", () => removeDoneTasks());
  controls.appendChild(btnRemoveDone);

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Search tasks...";
  searchBox.classList.add("input-searchbox");
  searchBox.value = currentSearchTerm;
  searchBox.oninput = () => {
    currentSearchTerm = searchBox.value;
    renderTaskList(ul); 
  };
  controls.appendChild(searchBox);

  output.appendChild(controls);

  // Task list container
  const ul = document.createElement("ul");
  renderTaskList(ul);
  output.appendChild(ul);

  updateCounter();
}

// Função render task items

function renderTaskList(ul: HTMLUListElement): void {
  ul.innerHTML = "";

  const filteredTasks = currentSearchTerm.trim() === ""
    ? taskList
    : taskList.filter((task) =>
        task.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );

  if (filteredTasks.length === 0) {
    const noResults = document.createElement("li");
    noResults.textContent = "No tasks found.";
    noResults.classList.add("no-results");
    ul.appendChild(noResults);
    return;
  }

  for (const task of filteredTasks) {
    const li = document.createElement("li");

    const categoryBadge = document.createElement("span");
    categoryBadge.textContent = task.category;
    categoryBadge.classList.add("category-badge");
    categoryBadge.classList.add(`category-${task.category.toLowerCase()}`);

    const spanText = document.createElement("span");
    spanText.textContent = task.title;
    spanText.style.cursor = "pointer";

    if (task.finished) {
      spanText.classList.add("finished");
    }

    spanText.addEventListener("click", () => {
      task.finished = !task.finished;
      if (task.finished) {
        task.completionDate = new Date();
      } else {
        task.completionDate = undefined;
      }
      renderTaskList(ul);
    });

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    btnRemove.classList.add("btn-remove");
    btnRemove.addEventListener("click", () => removeTask(task.id));

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("btn-edit");
    btnEdit.addEventListener("click", () => editTask(task.id));

    li.appendChild(categoryBadge);
    li.appendChild(spanText);

    if (task.finished && task.completionDate) {
      const finishedDate = document.createElement("p");
      finishedDate.textContent = `Finished in: ${task.completionDate.toLocaleString(
        "en"
      )}`;
      finishedDate.classList.add("task-date");
      li.appendChild(finishedDate);
    }

    li.appendChild(btnRemove);
    li.appendChild(btnEdit);

    ul.appendChild(li);
  }

  updateCounter();
}

// Event Listeners

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAllTasks);
