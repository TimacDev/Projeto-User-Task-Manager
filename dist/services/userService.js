import { renderUsers } from "../ui/renderUser.js";
export let userList = [];
// Função eliminar utilizador
export function handleDeactivate(userId) {
    const user = userList.find((u) => u.id === userId);
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
export function handleDelete(userId) {
    userList = userList.filter((u) => u.id !== userId);
    renderUsers();
}
// Função filtro
export function filterActiveUsers() {
    const userContainer = document.querySelector("#userContainer");
    userContainer.innerHTML = "";
    const activeUsers = userList.filter((user) => user.active === true);
    activeUsers.forEach((user) => {
        const userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.innerHTML = `
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <button type="button" class="btnDeactivate user-status ${user.active ? "active" : "inactive"}">
          ${user.active ? "Active" : "Inactive"}
        </button>
      </div>
    `;
        const btnDeactivate = userCard.querySelector(".btnDeactivate");
        btnDeactivate.addEventListener("click", () => {
            handleDeactivate(user.id);
        });
        userContainer.appendChild(userCard);
    });
}
// Função Total Users
export const totalUsers = document.querySelector("#totalUsers");
export const totalActiveUsers = document.querySelector("#totalActiveUsers");
export const totalInactiveUsers = document.querySelector("#totalInactiveUsers");
export function showTotalUsers() {
    totalUsers.innerHTML = `Total users: ${userList.length}`;
}
export function showTotalActiveUsers() {
    const activeCount = userList.filter((user) => user.active).length;
    totalActiveUsers.innerHTML = `Active users: ${activeCount}`;
}
export function showTotalInactiveUsers() {
    const inactiveCount = userList.filter((user) => !user.active).length;
    totalInactiveUsers.innerHTML = `Inactive users: ${inactiveCount}`;
}
// Função Ordenar (sort)
export function orderUserList() {
    userList = userList.sort((a, b) => a.name.localeCompare(b.name));
    renderUsers();
}
