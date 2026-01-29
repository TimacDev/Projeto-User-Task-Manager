import { userList, toggleUserActive, deleteUser, orderUserList, getUserById, getTotalUsers, getActiveUsersCount, getInactiveUsersCount, getFilteredUsers, addUser, setOnUserUpdate, } from "../services/userService.js";
// ===== STATE ===== //
let showOnlyActive = false;
let currentSearchTerm = "";
let selectedUser = null;
// ===== DOM DISPLAY FUNCTIONS ===== //
export function displayTotalUsers() {
    const el = document.querySelector("#totalUsers");
    if (el)
        el.innerHTML = `Total users: ${getTotalUsers()}`;
}
export function displayActiveUsers() {
    const el = document.querySelector("#totalActiveUsers");
    if (el)
        el.innerHTML = `Active users: ${getActiveUsersCount()}`;
}
export function displayInactiveUsers() {
    const el = document.querySelector("#totalInactiveUsers");
    if (el)
        el.innerHTML = `Inactive users: ${getInactiveUsersCount()}`;
}
function updateAllCounters() {
    displayTotalUsers();
    displayActiveUsers();
    displayInactiveUsers();
}
// ===== RENDER USERS ===== //
export function renderUsers() {
    var _a, _b;
    const userSearchBox = document.querySelector("#userSearchBox");
    const userContainer = document.querySelector("#userContainer");
    if (!userSearchBox || !userContainer)
        return;
    // Render search controls if users exist
    if (userList.length > 0) {
        if (!userSearchBox.querySelector(".search-box")) {
            userSearchBox.innerHTML = `
        <h2>Search user</h2>        
        <input type="text" class="search-box" placeholder="Type to search by name">
        <button type="button" id="btnFilter">${showOnlyActive ? "Show all users" : "Filter active users"}</button>
        <button type="button" id="btnOrder">Order A-Z</button>        
      `;
            const searchInput = userSearchBox.querySelector(".search-box");
            searchInput.oninput = () => {
                currentSearchTerm = searchInput.value;
                renderUsers();
            };
            (_a = userSearchBox
                .querySelector("#btnFilter")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                showOnlyActive = !showOnlyActive;
                renderUsers();
            });
            (_b = userSearchBox
                .querySelector("#btnOrder")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", orderUserList);
        }
        // Update controls state
        const searchInput = userSearchBox.querySelector(".search-box");
        if (searchInput)
            searchInput.value = currentSearchTerm;
        const btnFilter = userSearchBox.querySelector("#btnFilter");
        if (btnFilter)
            btnFilter.textContent = showOnlyActive
                ? "Show all users"
                : "Filter active users";
    }
    else {
        userSearchBox.innerHTML = "";
        currentSearchTerm = "";
        showOnlyActive = false;
    }
    // Render user list
    userContainer.innerHTML = "";
    const usersToDisplay = getFilteredUsers(currentSearchTerm, showOnlyActive);
    usersToDisplay.forEach((user) => {
        var _a, _b;
        const userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.innerHTML = `
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <button type="button" class="btnDeactivate user-status ${user.active ? "active" : "inactive"}">
          ${user.active ? "Active" : "Inactive"}
        </button>
        <button type="button" class="btnDeleteUser">Delete</button>
        <p class="user-tasks">0 tarefas atribuídas</p>
      </div>
    `;
        userCard.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("btnDeactivate") ||
                target.classList.contains("btnDeleteUser"))
                return;
            showUserDetails(user.id);
        });
        (_a = userCard.querySelector(".btnDeactivate")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleUserActive(user.id);
        });
        (_b = userCard.querySelector(".btnDeleteUser")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteUser(user.id);
        });
        userContainer.appendChild(userCard);
    });
    updateAllCounters();
}
// ===== USER DETAILS MODAL ===== //
export function showUserDetails(userId) {
    const user = getUserById(userId);
    if (!user)
        return;
    selectedUser = user;
    const userDetails = document.querySelector("#userDetails");
    const detailsBody = document.querySelector("#detailsBody");
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
  `;
    userDetails.classList.remove("hidden");
}
export function closeUserDetails() {
    const userDetails = document.querySelector("#userDetails");
    if (userDetails)
        userDetails.classList.add("hidden");
    selectedUser = null;
}
export function setupModal() {
    const closeBtn = document.querySelector("#closeDetails");
    const userDetails = document.querySelector("#userDetails");
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", closeUserDetails);
    userDetails === null || userDetails === void 0 ? void 0 : userDetails.addEventListener("click", (e) => {
        if (e.target === userDetails)
            closeUserDetails();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            closeUserDetails();
    });
}
// ===== INIT FUNCTION ===== //
export function initUserPage() {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("#nameInput");
    const emailInput = document.querySelector("#emailInput");
    const errorMsg = document.querySelector("#errorMsg");
    if (!form)
        return;
    // Connect service updates to UI
    setOnUserUpdate(() => {
        renderUsers();
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        errorMsg.textContent = "";
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        if (name === "") {
            errorMsg.textContent = "Name is required";
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMsg.textContent = "Invalid e-mail";
            return;
        }
        addUser(name, email);
        nameInput.value = "";
        emailInput.value = "";
    });
    setupModal();
    updateAllCounters();
}
