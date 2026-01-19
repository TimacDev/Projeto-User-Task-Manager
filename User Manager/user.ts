interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

class UserClass implements User {
  id: number;
  name: string;
  email: string;
  active: boolean;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }

  activate(): void {
    this.active = true;
  }
}

let userList: UserClass[] = [];
let showOnlyActive: boolean = false;

// Função render users

function renderUsers(): void {
  const userContainer = document.querySelector(
    "#userContainer"
  ) as HTMLUListElement;
  userContainer.innerHTML = "";

  // Filter users based on the showOnlyActive flag
  const usersToDisplay = showOnlyActive
    ? userList.filter((user) => user.active === true)
    : userList;

  usersToDisplay.forEach((user) => {
    const userCard = document.createElement("li");
    userCard.className = "user-card";

    userCard.innerHTML = `
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <button type="button" class="btnDeactivate user-status ${
          user.active ? "active" : "inactive"
        }">
          ${user.active ? "✓ Ativo" : "✗ Inativo"}
        </button>
        <button type="button" class="btnDeleteUser">Delete User</button>
        <p class="user-tasks">0 tarefas atribuídas</p>
      </div>
    `;

    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate"
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", () => {
      handleDeactivate(user.id);
    });

    const btnDeleteUser = userCard.querySelector(
      ".btnDeleteUser"
    ) as HTMLButtonElement;
    btnDeleteUser.addEventListener("click", () => {
      handleDelete(user.id);
    });

    userContainer.appendChild(userCard);
  });

  showTotalUsers();
}

// Query selectors

const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
const btnAddUser = document.querySelector("#btnAddUser") as HTMLButtonElement;
const btnFilter = document.querySelector("#btnFilter") as HTMLButtonElement;
const totalUsers = document.querySelector("#totalUsers") as HTMLDivElement;
const form = document.querySelector("form") as HTMLFormElement;

// Botão add users

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText: string = nameInput.value;
  const taskEmail: string = emailInput.value;

  let newUser = new UserClass(Date.now(), taskText, taskEmail);
  userList.push(newUser);
  renderUsers();

  nameInput.value = "";
  emailInput.value = "";
});

// Botão filter active/inactive

btnFilter.addEventListener("click", () => {
  showOnlyActive = !showOnlyActive;
  btnFilter.textContent = showOnlyActive
    ? "Show all users"
    : "Filter active users";
  renderUsers(); 
});

// Função eliminar utilizador

function handleDeactivate(userId: number): void {
  const user = userList.find((u) => u.id === userId);

  if (!user) {
    return; // Utilizador não encontrado
  }

  if (user.active) {
    user.deactivate();
  } else {
    user.activate();
  }

  renderUsers();
}

// Função botão delete

function handleDelete(userId: number): void {
  userList = userList.filter((u) => u.id !== userId);

  renderUsers();
}

// Função filtro

function filterActiveUsers(): void {
  const userContainer = document.querySelector(
    "#userContainer"
  ) as HTMLUListElement;
  userContainer.innerHTML = "";

  const activeUsers: UserClass[] = userList.filter(
    (user) => user.active === true
  );

  activeUsers.forEach((user) => {
    const userCard = document.createElement("li");
    userCard.className = "user-card";

    userCard.innerHTML = `
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <button type="button" class="btnDeactivate user-status ${
          user.active ? "active" : "inactive"
        }">
          ${user.active ? "✓ Ativo" : "✗ Inativo"}
        </button>
      </div>
    `;

    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate"
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", () => {
      handleDeactivate(user.id);
    });

    userContainer.appendChild(userCard);
  });
}

// Função Total Users

function showTotalUsers(): void {
  totalUsers.innerHTML = `Total number of users: ${userList.length}`;
}

showTotalUsers();
