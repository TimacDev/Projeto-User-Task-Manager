import {
  taskList, 
  getCurrentSearchTerm, 
  setSearchTerm, 
  orderTask, 
  removeDoneTasks, 
  removeTask, 
  editTask 
} from "../services/index.js";

// Função counter
const counterSpan = document.querySelector("#numPendentes") as HTMLSpanElement;
const output = document.querySelector("#output") as HTMLDivElement;

export function updateCounter(): void {
  const pendingCount = taskList.filter((task) => !task.finished).length;
  counterSpan.textContent = pendingCount.toString();
}

// Função Render Tasks

export function renderTasks(): void {
  output.innerHTML = "";

  if (taskList.length === 0 && getCurrentSearchTerm() === "") {
    updateCounter();
    return;
  }

  const filteredTasks =
    getCurrentSearchTerm().trim() === ""
      ? taskList
      : taskList.filter((task) =>
          task.title.toLowerCase().includes(getCurrentSearchTerm().toLowerCase()),
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
  searchBox.value = getCurrentSearchTerm();
  searchBox.oninput = () => {
  setSearchTerm(searchBox.value);
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

  const filteredTasks =
    getCurrentSearchTerm().trim() === ""
      ? taskList
      : taskList.filter((task) =>
          task.title.toLowerCase().includes(getCurrentSearchTerm().toLowerCase()),
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
      updateCounter();
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
        "en",
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
