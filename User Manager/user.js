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
var userList = [];
var showOnlyActive = false;
// Função ordernar (sort)
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
// Função render users
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
        userCard.innerHTML = "\n      <div class=\"user-info\">\n        <h3 class=\"user-name\">".concat(user.name, "</h3>\n        <p class=\"user-email\">").concat(user.email, "</p>\n        <button type=\"button\" class=\"btnDeactivate user-status ").concat(user.active ? "active" : "inactive", "\">\n          ").concat(user.active ? "Active" : "Inactive", "\n        </button>\n        <button type=\"button\" class=\"btnDeleteUser\">Delete</button>\n        <p class=\"user-tasks\">0 tarefas atribu\u00EDdas</p>\n      </div>\n    ");
        // Botão desativar/ativar
        var btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", function () {
            handleDeactivate(user.id);
        });
        // Botão Delete
        var btnDeleteUser = userCard.querySelector(".btnDeleteUser");
        btnDeleteUser.addEventListener("click", function () {
            handleDelete(user.id);
        });
        userContainer.appendChild(userCard);
    });
    showTotalUsers();
    showTotalActiveUsers();
    showTotalInactiveUsers();
}
// Query selectors
var nameInput = document.querySelector("#nameInput");
var emailInput = document.querySelector("#emailInput");
var btnAddUser = document.querySelector("#btnAddUser");
var totalUsers = document.querySelector("#totalUsers");
var totalActiveUsers = document.querySelector("#totalActiveUsers");
var totalInactiveUsers = document.querySelector("#totalInactiveUsers");
var form = document.querySelector("form");
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
