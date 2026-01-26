import { UserClass } from "../models/index.js";

import {
  userList,
  orderUserList,
  showTotalUsers,
  showTotalActiveUsers,
  showTotalInactiveUsers,
  handleDeactivate,
  handleDelete,
} from "../services/userService.js";

let showOnlyActive: boolean = false;
let selectedUser: UserClass | null = null;
let currentSearchTerm: string = "";

// Função Render Users
export function renderUsers(): void {
  const userSearchBox = document.querySelector(
    "#userSearchBox",
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
        ".search-box",
      ) as HTMLInputElement;

      searchInput.oninput = () => {
        currentSearchTerm = searchInput.value;
        renderUsers();
      };

      const btnFilter = userSearchBox.querySelector(
        "#btnFilter",
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
      ".search-box",
    ) as HTMLInputElement;
    searchInput.value = currentSearchTerm;

    const btnFilter = userSearchBox.querySelector(
      "#btnFilter",
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
    "#userContainer",
  ) as HTMLUListElement;
  userContainer.innerHTML = "";

  if (userList.length === 0 && currentSearchTerm === "") {
    return;
  }

  const filteredBySearch =
    currentSearchTerm.trim() === ""
      ? userList
      : userList.filter((user) =>
          user.name.toLowerCase().includes(currentSearchTerm.toLowerCase()),
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
        ${user.active ? "Active" : "Inactive"}
      </button>
      <button type="button" class="btnDeleteUser">Delete</button>
      <p class="user-tasks">0 tarefas atribuídas</p>
    </div>
  `;

    // Evento de clique no cartão para mostrar detalhes
    userCard.addEventListener("click", (event) => {
      // Evita abrir detalhes quando clica nos botões
      const target = event.target as HTMLElement;
      if (
        target.classList.contains("btnDeactivate") ||
        target.classList.contains("btnDeleteUser")
      ) {
        return;
      }
      showUserDetails(user.id);
    });

    // Botão desativar/ativar
    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate",
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita que o clique propague para o cartão
      handleDeactivate(user.id);
    });

    // Botão Delete
    const btnDeleteUser = userCard.querySelector(
      ".btnDeleteUser",
    ) as HTMLButtonElement;
    btnDeleteUser.addEventListener("click", (event) => {
      event.stopPropagation(); // Evita que o clique propague para o cartão
      handleDelete(user.id);
    });

    userContainer.appendChild(userCard);
  });

  showTotalUsers();
  showTotalActiveUsers();
  showTotalInactiveUsers();
}

// Função para mostrar detalhes do utilizador
export function showUserDetails(userId: number): void {
  const user = userList.find((u) => u.id === userId);

  if (!user) {
    return;
  }

  selectedUser = user;

  const userDetails = document.querySelector("#userDetails") as HTMLDivElement;
  const detailsBody = document.querySelector("#detailsBody") as HTMLDivElement;

  // Calcula há quanto tempo foi criado (simulado com o ID que é timestamp)
  const createdDate = new Date(user.id);
  const formattedDate = createdDate.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  detailsBody.innerHTML = `
    <div class="detail-item">
      <div class="detail-label">ID</div>
      <div class="detail-value">#${user.id}</div>
    </div>
    
    <div class="detail-item">
      <div class="detail-label">Nome</div>
      <div class="detail-value">${user.name}</div>
    </div>
    
    <div class="detail-item">
      <div class="detail-label">Email</div>
      <div class="detail-value">${user.email}</div>
    </div>
    
    <div class="detail-item">
      <div class="detail-label">Estado</div>
      <div class="detail-value">
        <span class="status-badge ${user.active ? "active" : "inactive"}">
          ${user.active ? "Ativo" : "Inativo"}
        </span>
      </div>
    </div>
    
    <div class="detail-item">
      <div class="detail-label">Data de Criação</div>
      <div class="detail-value">${formattedDate}</div>
    </div>
    
    <div class="detail-item">
      <div class="detail-label">Tarefas Atribuídas</div>
      <div class="detail-value">0 tarefas</div>
    </div>
  `;

  // Mostra o painel de detalhes
  userDetails.classList.remove("hidden");
}

// Função para fechar detalhes
export function closeUserDetails(): void {
  const userDetails = document.querySelector("#userDetails") as HTMLDivElement;
  if (userDetails) {
    userDetails.classList.add("hidden");
  }
  selectedUser = null;
}

// Event listener para fechar detalhes
const closeBtn = document.querySelector("#closeDetails") as HTMLButtonElement;
const userDetails = document.querySelector("#userDetails") as HTMLDivElement;

export function closeModal(): void {
  const closeBtn = document.querySelector("#closeDetails");
  const userDetails = document.querySelector("#userDetails");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeUserDetails);
  }

  if (userDetails) {
    userDetails.addEventListener("click", (event) => {
      if (event.target === userDetails) {
        closeUserDetails();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeUserDetails();
    }
  });
}

export function initUserPage(): void {
  const form = document.querySelector("form") as HTMLFormElement;
  const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
  const emailInput = document.querySelector("#emailInput") as HTMLInputElement;
  const errorMsg = document.querySelector("#errorMsg") as HTMLSpanElement;

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskText = nameInput.value.trim();
      const taskEmail = emailInput.value.trim();

      function validateEmail(email_: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email_);
      }

      errorMsg.textContent = "";

      if (taskText === "") {
        errorMsg.textContent = "Name is required";
        return;
      }

      if (!validateEmail(taskEmail)) {
        errorMsg.textContent = "Invalid e-mail";
        return;
      }

      const newUser = new UserClass(Date.now(), taskText, taskEmail);
      userList.push(newUser);
      renderUsers();

      nameInput.value = "";
      emailInput.value = "";
    });
  }

  // Initialize modal & counters
  closeModal();
  showTotalUsers();
  showTotalActiveUsers();
  showTotalInactiveUsers();
}
