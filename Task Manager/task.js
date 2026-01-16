var input = document.querySelector("#taskInput");
var addBtn = document.querySelector("#addBtn");
var clearBtn = document.querySelector("#btnLimpar");
var output = document.querySelector("#output");
var counterSpan = document.querySelector("#numPendentes");
var categorySelect = document.querySelector("#categorySelect");
var TaskClass = /** @class */ (function () {
    function TaskClass(id, titulo, categoria) {
        this.id = id;
        this.title = titulo;
        this.finished = false;
        this.categoria = categoria;
    }
    return TaskClass;
}());
// ARRAY
var taskList = [];
// FUNÇÕES
function getCategoryColor(categoria) {
    var cores = {
        Trabalho: "#3498db",
        Pessoal: "#e74c3c",
        Estudo: "#2ecc71",
    };
    return cores[categoria];
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
    if (confirm("Tem certeza que deseja limpar todas as tarefas?")) {
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
// Render all tasks
function renderTasks() {
    output.innerHTML = "";
    if (taskList.length === 0) {
        output.innerHTML = "";
        return;
    }
    var ul = document.createElement("ul");
    var btnSort = document.createElement("button");
    btnSort.textContent = "Ordenar A-Z";
    btnSort.classList.add("btn-sort");
    btnSort.addEventListener("click", function () { return orderTask(); });
    ul.appendChild(btnSort);
    var btnRemoveDone = document.createElement("button");
    btnRemoveDone.textContent = "Remover Concluídas";
    btnRemoveDone.classList.add("btn-removeDone");
    btnRemoveDone.addEventListener("click", function () { return removeDoneTasks(); });
    ul.appendChild(btnRemoveDone);
    var _loop_1 = function (task) {
        var li = document.createElement("li");
        var categoryBadge = document.createElement("span");
        categoryBadge.textContent = task.categoria;
        categoryBadge.classList.add("category-badge");
        categoryBadge.style.backgroundColor = getCategoryColor(task.categoria);
        var spanText = document.createElement("span");
        spanText.textContent = task.title;
        spanText.style.cursor = "pointer";
        if (task.finished) {
            spanText.classList.add("finished");
        }
        spanText.addEventListener("click", function () {
            task.finished = !task.finished;
            if (task.finished) {
                task.dataConclusao = new Date();
            }
            else {
                task.dataConclusao = undefined;
            }
            renderTasks();
        });
        var btnRemove = document.createElement("button");
        btnRemove.textContent = "Remover";
        btnRemove.classList.add("btn-remove");
        btnRemove.addEventListener("click", function () { return removeTask(task.id); });
        var btnEdit = document.createElement("button");
        btnEdit.textContent = "Editar";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", function () { return editTask(task.id); });
        li.appendChild(categoryBadge);
        li.appendChild(spanText);
        if (task.finished && task.dataConclusao) {
            var finishedDate = document.createElement("p");
            finishedDate.textContent = "Conclu\u00EDda em: ".concat(task.dataConclusao.toLocaleString("pt-PT"));
            finishedDate.classList.add("task-date");
            li.appendChild(finishedDate);
        }
        li.appendChild(btnRemove);
        li.appendChild(btnEdit);
        ul.appendChild(li);
    };
    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
        var task = taskList_1[_i];
        _loop_1(task);
    }
    output.appendChild(ul);
    updateCounter();
}
// Event Listeners
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
