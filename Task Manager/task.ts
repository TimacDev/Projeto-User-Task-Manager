const input = document.querySelector("#taskInput") as HTMLInputElement;
const addBtn = document.querySelector("#addBtn") as HTMLButtonElement;
const clearBtn = document.querySelector("#btnLimpar") as HTMLButtonElement;
const output = document.querySelector("#output") as HTMLDivElement;
const counterSpan = document.querySelector("#numPendentes") as HTMLSpanElement;
const categorySelect = document.querySelector("#categorySelect") as HTMLSelectElement;

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

function getCategoryColor(category: Category): string {
  const cores: Record<Category, string> = {
    Work: "#3498db",
    Personal: "#e74c3c",
    Study: "#2ecc71",
  };
  return cores[category];
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

// Render all tasks
function renderTasks(): void {
  output.innerHTML = "";

  if (taskList.length === 0) {
    output.innerHTML = "";
    return;
  }

  const ul = document.createElement("ul");

  const btnSort = document.createElement("button");
  btnSort.textContent = "Order A-Z";
  btnSort.classList.add("btn-sort");
  btnSort.addEventListener("click", () => orderTask());
  ul.appendChild(btnSort);

  const btnRemoveDone = document.createElement("button");
  btnRemoveDone.textContent = "Remove Done";
  btnRemoveDone.classList.add("btn-removeDone");
  btnRemoveDone.addEventListener("click", () => removeDoneTasks());
  ul.appendChild(btnRemoveDone);

  for (const task of taskList) {
    const li = document.createElement("li");

    const categoryBadge = document.createElement("span");
    categoryBadge.textContent = task.category;
    categoryBadge.classList.add("category-badge");
    categoryBadge.style.backgroundColor = getCategoryColor(task.category);

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
      renderTasks();
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
      finishedDate.textContent = `Concluída em: ${task.completionDate.toLocaleString(
        "pt-PT"
      )}`;
      finishedDate.classList.add("task-date");
      li.appendChild(finishedDate);
    }

    li.appendChild(btnRemove);
    li.appendChild(btnEdit);

    ul.appendChild(li);
  }

  output.appendChild(ul);
  updateCounter();
}

// Event Listeners
addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAllTasks);
