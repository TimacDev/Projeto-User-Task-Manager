// Interface & Class
var UserClass = /** @class */ (function () {
    function UserClass(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = true;
    }
    UserClass.prototype.deactivate = function () {
        this.active = false;
    };
    UserClass.prototype.activate = function () {
        this.active = true;
    };
    return UserClass;
}());
// Query selectors
var nameInput = document.querySelector("#nameInput");
var emailInput = document.querySelector("#emailInput");
var btnAddUser = document.querySelector("#btnAddUser");
var totalUsers = document.querySelector("#totalUsers");
var totalActiveUsers = document.querySelector("#totalActiveUsers");
var totalInactiveUsers = document.querySelector("#totalInactiveUsers");
var form = document.querySelector("form");
// Variáveis globais
var userList = [];
var showOnlyActive = false;
var selectedUser = null;
// Função para mostrar detalhes do utilizador
function showUserDetails(userId) {
    var user = userList.find(function (u) { return u.id === userId; });
    if (!user) {
        return;
    }
    selectedUser = user;
    var userDetails = document.querySelector("#userDetails");
    var detailsBody = document.querySelector("#detailsBody");
    // Calcula há quanto tempo foi criado (simulado com o ID que é timestamp)
    var createdDate = new Date(user.id);
    var formattedDate = createdDate.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    detailsBody.innerHTML = "\n    <div class=\"detail-item\">\n      <div class=\"detail-label\">ID</div>\n      <div class=\"detail-value\">#".concat(user.id, "</div>\n    </div>\n    \n    <div class=\"detail-item\">\n      <div class=\"detail-label\">Nome</div>\n      <div class=\"detail-value\">").concat(user.name, "</div>\n    </div>\n    \n    <div class=\"detail-item\">\n      <div class=\"detail-label\">Email</div>\n      <div class=\"detail-value\">").concat(user.email, "</div>\n    </div>\n    \n    <div class=\"detail-item\">\n      <div class=\"detail-label\">Estado</div>\n      <div class=\"detail-value\">\n        <span class=\"status-badge ").concat(user.active ? "active" : "inactive", "\">\n          ").concat(user.active ? "Ativo" : "Inativo", "\n        </span>\n      </div>\n    </div>\n    \n    <div class=\"detail-item\">\n      <div class=\"detail-label\">Data de Cria\u00E7\u00E3o</div>\n      <div class=\"detail-value\">").concat(formattedDate, "</div>\n    </div>\n    \n    <div class=\"detail-item\">\n      <div class=\"detail-label\">Tarefas Atribu\u00EDdas</div>\n      <div class=\"detail-value\">0 tarefas</div>\n    </div>\n  ");
    // Mostra o painel de detalhes
    userDetails.classList.remove("hidden");
}
// Função para fechar detalhes
function closeUserDetails() {
    var userDetails = document.querySelector("#userDetails");
    userDetails.classList.add("hidden");
    selectedUser = null;
}
// Event listener para fechar detalhes
var closeBtn = document.querySelector("#closeDetails");
var userDetails = document.querySelector("#userDetails");
if (closeBtn) {
    closeBtn.addEventListener("click", closeUserDetails);
}
// Fechar ao clicar fora do modal
if (userDetails) {
    userDetails.addEventListener("click", function (event) {
        if (event.target === userDetails) {
            closeUserDetails();
        }
    });
}
// Fechar com tecla Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeUserDetails();
    }
});
// Função Ordenar (sort)
function orderUserList() {
    userList = userList.sort(function (a, b) { return a.name.localeCompare(b.name); });
    renderUsers();
}
// Função Search
var currentSearchTerm = "";
function filterUser(searchTerm) {
    currentSearchTerm = searchTerm;
    renderUsers();
}
// Função Render Users
function renderUsers() {
    var userSearchBox = document.querySelector("#userSearchBox");
    if (userList.length > 0) {
        // Only create the controls if they don't exist
        if (!userSearchBox.querySelector(".search-box")) {
            userSearchBox.innerHTML = "\n        <h2>Search user</h2>        \n        <input type=\"text\" class=\"search-box\" placeholder=\"Type to search by name\">\n        <button type=\"button\" id=\"btnFilter\">".concat(showOnlyActive ? "Show all users" : "Filter active users", "</button>\n        <button type=\"button\" id=\"btnOrder\">Order A-Z</button>        \n      ");
            var searchInput_1 = userSearchBox.querySelector(".search-box");
            searchInput_1.oninput = function () {
                currentSearchTerm = searchInput_1.value;
                renderUsers();
            };
            var btnFilter_1 = userSearchBox.querySelector("#btnFilter");
            btnFilter_1.addEventListener("click", function () {
                showOnlyActive = !showOnlyActive;
                renderUsers();
            });
            var btnOrder = document.querySelector("#btnOrder");
            btnOrder.addEventListener("click", function () {
                orderUserList();
            });
        }
        // Update existing controls state
        var searchInput = userSearchBox.querySelector(".search-box");
        searchInput.value = currentSearchTerm;
        var btnFilter = userSearchBox.querySelector("#btnFilter");
        btnFilter.textContent = showOnlyActive
            ? "Show all users"
            : "Filter active users";
    }
    else {
        // Hide search box and reset state if no users
        userSearchBox.innerHTML = "";
        currentSearchTerm = "";
        showOnlyActive = false;
    }
    var userContainer = document.querySelector("#userContainer");
    userContainer.innerHTML = "";
    if (userList.length === 0 && currentSearchTerm === "") {
        return;
    }
    var filteredBySearch = currentSearchTerm.trim() === ""
        ? userList
        : userList.filter(function (user) {
            return user.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
        });
    var usersToDisplay = showOnlyActive
        ? filteredBySearch.filter(function (user) { return user.active === true; })
        : filteredBySearch;
    usersToDisplay.forEach(function (user) {
        var userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.innerHTML = "\n    <div class=\"user-info\">\n      <h3 class=\"user-name\">".concat(user.name, "</h3>\n      <p class=\"user-email\">").concat(user.email, "</p>\n      <button type=\"button\" class=\"btnDeactivate user-status ").concat(user.active ? "active" : "inactive", "\">\n        ").concat(user.active ? "Active" : "Inactive", "\n      </button>\n      <button type=\"button\" class=\"btnDeleteUser\">Delete</button>\n      <p class=\"user-tasks\">0 tarefas atribu\u00EDdas</p>\n    </div>\n  ");
        // Evento de clique no cartão para mostrar detalhes
        userCard.addEventListener("click", function (event) {
            // Evita abrir detalhes quando clica nos botões
            var target = event.target;
            if (target.classList.contains("btnDeactivate") ||
                target.classList.contains("btnDeleteUser")) {
                return;
            }
            showUserDetails(user.id);
        });
        // Botão desativar/ativar
        var btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que o clique propague para o cartão
            handleDeactivate(user.id);
        });
        // Botão Delete
        var btnDeleteUser = userCard.querySelector(".btnDeleteUser");
        btnDeleteUser.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que o clique propague para o cartão
            handleDelete(user.id);
        });
        userContainer.appendChild(userCard);
    });
    showTotalUsers();
    showTotalActiveUsers();
    showTotalInactiveUsers();
}
// Botão add users
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var taskText = nameInput.value;
    var taskEmail = emailInput.value;
    var newUser = new UserClass(Date.now(), taskText, taskEmail);
    userList.push(newUser);
    renderUsers();
    nameInput.value = "";
    emailInput.value = "";
});
// Função eliminar utilizador
function handleDeactivate(userId) {
    var user = userList.find(function (u) { return u.id === userId; });
    if (!user) {
        return; // Utilizador não encontrado
    }
    if (user.active) {
        user.deactivate();
    }
    else {
        user.activate();
    }
    renderUsers();
}
// Função botão delete
function handleDelete(userId) {
    userList = userList.filter(function (u) { return u.id !== userId; });
    renderUsers();
}
// Função filtro
function filterActiveUsers() {
    var userContainer = document.querySelector("#userContainer");
    userContainer.innerHTML = "";
    var activeUsers = userList.filter(function (user) { return user.active === true; });
    activeUsers.forEach(function (user) {
        var userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.innerHTML = "\n      <div class=\"user-info\">\n        <h3 class=\"user-name\">".concat(user.name, "</h3>\n        <p class=\"user-email\">").concat(user.email, "</p>\n        <button type=\"button\" class=\"btnDeactivate user-status ").concat(user.active ? "active" : "inactive", "\">\n          ").concat(user.active ? "Active" : "Inactive", "\n        </button>\n      </div>\n    ");
        var btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", function () {
            handleDeactivate(user.id);
        });
        userContainer.appendChild(userCard);
    });
}
// Função Total Users
function showTotalUsers() {
    totalUsers.innerHTML = "Total users: ".concat(userList.length);
}
function showTotalActiveUsers() {
    var activeCount = userList.filter(function (user) { return user.active; }).length;
    totalActiveUsers.innerHTML = "Active users: ".concat(activeCount);
}
function showTotalInactiveUsers() {
    var inactiveCount = userList.filter(function (user) { return !user.active; }).length;
    totalInactiveUsers.innerHTML = "Inactive users: ".concat(inactiveCount);
}
showTotalUsers();
showTotalActiveUsers();
showTotalInactiveUsers();
