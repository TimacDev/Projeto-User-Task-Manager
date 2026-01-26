import { UserClass } from "../models/index.js";

import { renderUsers } from "../ui/renderUser.js";

export let userList: UserClass[] = [];

// Função eliminar utilizador
export function handleDeactivate(userId: number): void {
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
export function handleDelete(userId: number): void {
  userList = userList.filter((u) => u.id !== userId);

  renderUsers();
}

// Função filtro
export function filterActiveUsers(): void {
  const userContainer = document.querySelector(
    "#userContainer",
  ) as HTMLUListElement;
  userContainer.innerHTML = "";

  const activeUsers: UserClass[] = userList.filter(
    (user) => user.active === true,
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
          ${user.active ? "Active" : "Inactive"}
        </button>
      </div>
    `;

    const btnDeactivate = userCard.querySelector(
      ".btnDeactivate",
    ) as HTMLButtonElement;
    btnDeactivate.addEventListener("click", () => {
      handleDeactivate(user.id);
    });

    userContainer.appendChild(userCard);
  });
}

// Função Total Users
export const totalUsers = document.querySelector(
  "#totalUsers",
) as HTMLDivElement;
export const totalActiveUsers = document.querySelector(
  "#totalActiveUsers",
) as HTMLDivElement;
export const totalInactiveUsers = document.querySelector(
  "#totalInactiveUsers",
) as HTMLDivElement;

export function showTotalUsers(): void {
  totalUsers.innerHTML = `Total users: ${userList.length}`;
}

export function showTotalActiveUsers(): void {
  const activeCount = userList.filter((user) => user.active).length;
  totalActiveUsers.innerHTML = `Active users: ${activeCount}`;
}

export function showTotalInactiveUsers(): void {
  const inactiveCount = userList.filter((user) => !user.active).length;
  totalInactiveUsers.innerHTML = `Inactive users: ${inactiveCount}`;
}

// Função Ordenar (sort)

export function orderUserList(): void {
  userList = userList.sort((a, b) => a.name.localeCompare(b.name));
  renderUsers();
}
