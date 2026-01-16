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

  userList.forEach((user) => {
    // Cria o elemento li para o cartão
    const userCard = document.createElement("li");
    userCard.className = "user-card";

    // Adiciona o conteúdo do cartão
    userCard.innerHTML = `
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <button type="button" class="btnDeactivate user-status ${
          user.active ? "active" : "inactive"
        }">
          ${user.active ? "✓ Ativo" : "✗ Inativo"}
        </button>
        <p class="user-tasks">0 tarefas atribuídas</p>
      </div>
    `;

    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate"
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", () => {
      handleDeactivate(user.id);
    });

    // Adiciona o cartão ao contentor
    userContainer.appendChild(userCard);
  });

  showTotalUsers();
}

// Botão adicionar users

const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
const btnAddUser = document.querySelector("#btnAddUser") as HTMLButtonElement;

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page reload
  
  const taskText: string = nameInput.value;
  const taskEmail: string = emailInput.value;

  let newUser = new UserClass(Date.now(), taskText, taskEmail);
  userList.push(newUser);
  renderUsers();

  nameInput.value = "";
  emailInput.value = "";
});

btnAddUser.addEventListener("click", () => {
  const taskText: string = nameInput.value;

  if (taskText === "") {
    return;
  }

  const taskEmail: string = emailInput.value;

  if (taskEmail === "") {
    return;
  }

  let newUser = new UserClass(Date.now(), taskText, taskEmail);
  userList.push(newUser);
  renderUsers();

  nameInput.value = "";
  emailInput.value = "";
});

// Botão desativar users

function handleDeactivate(userId: number): void {
  // PASSO 2: Localiza o utilizador no array
  const user = userList.find((u) => u.id === userId);

  if (!user) {
    return; // Utilizador não encontrado
  }

  if (user.active) {
    user.deactivate();
  } else {
    user.activate();
  }

  // PASSO 4: Atualiza a renderização
  renderUsers();
}

// Botão filtro

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

const btnFilter = document.querySelector("#btnFilter") as HTMLButtonElement;

btnFilter.addEventListener("click", () => {
  showOnlyActive = !showOnlyActive;

  if (showOnlyActive) {
    filterActiveUsers();
    btnFilter.textContent = "Show all users";
  } else {
    renderUsers();
    btnFilter.textContent = "Filter active users";
  }
});

// Total Users
const totalUsers = document.querySelector("#totalUsers") as HTMLDivElement;

function showTotalUsers(): void {
  totalUsers.innerHTML = `O total de utilizadores é: ${userList.length}`;
}

showTotalUsers();

//
