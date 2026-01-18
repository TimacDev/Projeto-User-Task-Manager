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
// Função render users
function renderUsers() {
    var userContainer = document.querySelector("#userContainer");
    userContainer.innerHTML = "";
    userList.forEach(function (user) {
        // Cria o elemento li para o cartão
        var userCard = document.createElement("li");
        userCard.className = "user-card";
        // Adiciona o conteúdo do cartão
        userCard.innerHTML = "\n      <div class=\"user-info\">\n        <h3 class=\"user-name\">".concat(user.name, "</h3>\n        <p class=\"user-email\">").concat(user.email, "</p>\n        <button type=\"button\" class=\"btnDeactivate user-status ").concat(user.active ? "active" : "inactive", "\">\n          ").concat(user.active ? "✓ Ativo" : "✗ Inativo", "\n        </button>\n        <p class=\"user-tasks\">0 tarefas atribu\u00EDdas</p>\n      </div>\n    ");
        var btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", function () {
            handleDeactivate(user.id);
        });
        // Adiciona o cartão ao contentor
        userContainer.appendChild(userCard);
    });
    showTotalUsers();
}
// Botão adicionar users
var nameInput = document.querySelector("#nameInput");
var emailInput = document.querySelector("#emailInput");
var btnAddUser = document.querySelector("#btnAddUser");
var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents page reload
    var taskText = nameInput.value;
    var taskEmail = emailInput.value;
    var newUser = new UserClass(Date.now(), taskText, taskEmail);
    userList.push(newUser);
    renderUsers();
    nameInput.value = "";
    emailInput.value = "";
});
// Botão desativar users
function handleDeactivate(userId) {
    // PASSO 2: Localiza o utilizador no array
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
    // PASSO 4: Atualiza a renderização
    renderUsers();
}
// Botão filtro
function filterActiveUsers() {
    var userContainer = document.querySelector("#userContainer");
    userContainer.innerHTML = "";
    var activeUsers = userList.filter(function (user) { return user.active === true; });
    activeUsers.forEach(function (user) {
        var userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.innerHTML = "\n      <div class=\"user-info\">\n        <h3 class=\"user-name\">".concat(user.name, "</h3>\n        <p class=\"user-email\">").concat(user.email, "</p>\n        <button type=\"button\" class=\"btnDeactivate user-status ").concat(user.active ? "active" : "inactive", "\">\n          ").concat(user.active ? "✓ Ativo" : "✗ Inativo", "\n        </button>\n      </div>\n    ");
        var btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", function () {
            handleDeactivate(user.id);
        });
        userContainer.appendChild(userCard);
    });
}
var btnFilter = document.querySelector("#btnFilter");
btnFilter.addEventListener("click", function () {
    showOnlyActive = !showOnlyActive;
    if (showOnlyActive) {
        filterActiveUsers();
        btnFilter.textContent = "Show all users";
    }
    else {
        renderUsers();
        btnFilter.textContent = "Filter active users";
    }
});
// Total Users
var totalUsers = document.querySelector("#totalUsers");
function showTotalUsers() {
    totalUsers.innerHTML = "O total de utilizadores \u00E9: ".concat(userList.length);
}
showTotalUsers();
