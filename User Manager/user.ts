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

// Função ordernar (sort)

function orderUserList(): void {
  userList = userList.sort((a, b) => a.name.localeCompare(b.name));
  renderUsers();
}

// Função Search

let currentSearchTerm: string = "";

function filterUser(searchTerm: string): void {
  currentSearchTerm = searchTerm;
  renderUsers();
}

// Função render users

function renderUsers(): void {
  const userSearchBox = document.querySelector(
    "#userSearchBox"
  ) as HTMLDivElement;

  if (userList.length > 0) {
    // Only create the controls if they don't exist
    if (!userSearchBox.querySelector(".search-box")) {
      userSearchBox.innerHTML = `
        <h2>Search user</h2>        
        <input type="text" class="search-box" placeholder="Type to search by name">
        <button type="button" id="btnFilter">${
          showOnlyActive ? "Show all users" : "Filter active users"
        }</button>
        <button type="button" id="btnOrder">Order A-Z</button>        
      `;

      const searchInput = userSearchBox.querySelector(
        ".search-box"
      ) as HTMLInputElement;

      searchInput.oninput = () => {
        currentSearchTerm = searchInput.value;
        renderUsers();
      };

      const btnFilter = userSearchBox.querySelector(
        "#btnFilter"
      ) as HTMLButtonElement;

      btnFilter.addEventListener("click", () => {
        showOnlyActive = !showOnlyActive;
        renderUsers();
      });

      const btnOrder = document.querySelector("#btnOrder") as HTMLButtonElement;

      btnOrder.addEventListener("click", () => {
        orderUserList();
      });
    }

    // Update existing controls state
    const searchInput = userSearchBox.querySelector(
      ".search-box"
    ) as HTMLInputElement;
    searchInput.value = currentSearchTerm;

    const btnFilter = userSearchBox.querySelector(
      "#btnFilter"
    ) as HTMLButtonElement;
    btnFilter.textContent = showOnlyActive
      ? "Show all users"
      : "Filter active users";
  } else {
    // Hide search box and reset state if no users
    userSearchBox.innerHTML = "";
    currentSearchTerm = "";
    showOnlyActive = false;
  }

  const userContainer = document.querySelector(
    "#userContainer"
  ) as HTMLUListElement;
  userContainer.innerHTML = "";

  if (userList.length === 0 && currentSearchTerm === "") {
    return;
  }

  const filteredBySearch =
    currentSearchTerm.trim() === ""
      ? userList
      : userList.filter((user) =>
          user.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );

  const usersToDisplay = showOnlyActive
    ? filteredBySearch.filter((user) => user.active === true)
    : filteredBySearch;

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

    // Botão desativar/ativar
    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate"
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", () => {
      handleDeactivate(user.id);
    });

    // Botão Delete
    const btnDeleteUser = userCard.querySelector(
      ".btnDeleteUser"
    ) as HTMLButtonElement;
    btnDeleteUser.addEventListener("click", () => {
      handleDelete(user.id);
    });

    userContainer.appendChild(userCard);
  });

  showTotalUsers();
  showTotalActiveUsers();
  showTotalInactiveUsers();
}

// Query selectors

const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
const btnAddUser = document.querySelector("#btnAddUser") as HTMLButtonElement;
const totalUsers = document.querySelector("#totalUsers") as HTMLDivElement;
const totalActiveUsers = document.querySelector(
  "#totalActiveUsers"
) as HTMLDivElement;
const totalInactiveUsers = document.querySelector(
  "#totalInactiveUsers"
) as HTMLDivElement;
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
  totalUsers.innerHTML = `Total users: ${userList.length}`;
}

function showTotalActiveUsers(): void {
  const activeCount = userList.filter((user) => user.active).length;
  totalActiveUsers.innerHTML = `Active users: ${activeCount}`;
}

function showTotalInactiveUsers(): void {
  const inactiveCount = userList.filter((user) => !user.active).length;
  totalInactiveUsers.innerHTML = `Inactive users: ${inactiveCount}`;
}

showTotalUsers();
showTotalActiveUsers();
showTotalInactiveUsers();
