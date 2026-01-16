var input = document.querySelector("#taskInput");
var addBtn = document.querySelector("#addBtn");
var clearBtn = document.querySelector("#btnLimpar");
var output = document.querySelector("#output");
var counterSpan = document.querySelector("#numPendentes");
var categorySelect = document.querySelector("#categorySelect");
var TaskClass = /** @class */ (function () {
    function TaskClass(id, titulo, category) {
        this.id = id;
        this.title = titulo;
        this.finished = false;
        this.category = category;
    }
    return TaskClass;
}());
// ARRAY
var taskList = [];
// FUNÇÕES
var currentSearchTerm = "";
function filterTasks(searchTerm) {
    currentSearchTerm = searchTerm;
    renderTasks();
}
function updateCounter() {
    var pendingCount = taskList.filter(function (task) { return !task.finished; }).length;
    counterSpan.textContent = pendingCount.toString();
}
function addTask() {
    var taskText = input.value.trim();
    if (taskText === "") {
        return;
    }
    var categoriaSelecionada = categorySelect.value;
    var newTask = new TaskClass(Date.now(), taskText, categoriaSelecionada);
    taskList.push(newTask);
    input.value = "";
    renderTasks();
}
function removeTask(id) {
    taskList = taskList.filter(function (task) { return task.id !== id; });
    renderTasks();
    updateCounter();
}
function removeDoneTasks() {
    taskList = taskList.filter(function (task) { return task.finished === false; });
    renderTasks();
    updateCounter();
}
function editTask(id) {
    var task = taskList.find(function (t) { return t.id === id; });
    if (!task)
        return;
    var newTitle = prompt("Editar tarefa:", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        renderTasks();
    }
}
function clearAllTasks() {
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
function orderTask() {
    taskList.sort(function (a, b) { return a.title.localeCompare(b.title, "pt-PT"); });
    renderTasks();
}
// Render Tasks
function renderTasks() {
    output.innerHTML = "";
    if (taskList.length === 0 && currentSearchTerm === "") {
        return;
    }
    var filteredTasks = currentSearchTerm.trim() === ""
        ? taskList
        : taskList.filter(function (task) {
            return task.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
        });
    // Controls container (buttons + search)
    var controls = document.createElement("div");
    controls.classList.add("controls");
    var btnSort = document.createElement("button");
    btnSort.textContent = "Order A-Z";
    btnSort.classList.add("btn-sort");
    btnSort.addEventListener("click", function () { return orderTask(); });
    controls.appendChild(btnSort);
    var btnRemoveDone = document.createElement("button");
    btnRemoveDone.textContent = "Remove Done";
    btnRemoveDone.classList.add("btn-removeDone");
    btnRemoveDone.addEventListener("click", function () { return removeDoneTasks(); });
    controls.appendChild(btnRemoveDone);
    var searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Search tasks...";
    searchBox.classList.add("input-searchbox");
    searchBox.value = currentSearchTerm;
    searchBox.oninput = function () {
        currentSearchTerm = searchBox.value;
        renderTaskList(ul); // Only re-render the task list
    };
    controls.appendChild(searchBox);
    output.appendChild(controls);
    // Task list container
    var ul = document.createElement("ul");
    renderTaskList(ul);
    output.appendChild(ul);
    updateCounter();
}
// New function: Only renders the task items
function renderTaskList(ul) {
    ul.innerHTML = "";
    var filteredTasks = currentSearchTerm.trim() === ""
        ? taskList
        : taskList.filter(function (task) {
            return task.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
        });
    if (filteredTasks.length === 0) {
        var noResults = document.createElement("li");
        noResults.textContent = "No tasks found.";
        noResults.classList.add("no-results");
        ul.appendChild(noResults);
        return;
    }
    var _loop_1 = function (task) {
        var li = document.createElement("li");
        var categoryBadge = document.createElement("span");
        categoryBadge.textContent = task.category;
        categoryBadge.classList.add("category-badge");
        categoryBadge.classList.add("category-".concat(task.category.toLowerCase()));
        var spanText = document.createElement("span");
        spanText.textContent = task.title;
        spanText.style.cursor = "pointer";
        if (task.finished) {
            spanText.classList.add("finished");
        }
        spanText.addEventListener("click", function () {
            task.finished = !task.finished;
            if (task.finished) {
                task.completionDate = new Date();
            }
            else {
                task.completionDate = undefined;
            }
            renderTaskList(ul);
        });
        var btnRemove = document.createElement("button");
        btnRemove.textContent = "Remove";
        btnRemove.classList.add("btn-remove");
        btnRemove.addEventListener("click", function () { return removeTask(task.id); });
        var btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", function () { return editTask(task.id); });
        li.appendChild(categoryBadge);
        li.appendChild(spanText);
        if (task.finished && task.completionDate) {
            var finishedDate = document.createElement("p");
            finishedDate.textContent = "Finished in: ".concat(task.completionDate.toLocaleString("en"));
            finishedDate.classList.add("task-date");
            li.appendChild(finishedDate);
        }
        li.appendChild(btnRemove);
        li.appendChild(btnEdit);
        ul.appendChild(li);
    };
    for (var _i = 0, filteredTasks_1 = filteredTasks; _i < filteredTasks_1.length; _i++) {
        var task = filteredTasks_1[_i];
        _loop_1(task);
    }
    updateCounter();
}
// Event Listeners
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
