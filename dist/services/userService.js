import { getUsers as apiGetUsers, createUser as apiCreateUser, patchUser as apiPatchUser, deleteUser as apiDeleteUser, } from "../api/apiUserService.js";
// ===== DATA ===== //
export let userList = [];
// ===== CALLBACKS ===== //
let onUpdate = null;
export function setOnUserUpdate(callback) {
    onUpdate = callback;
}
// ===== LOAD USERS (syncs API → local array) ===== //
export async function loadUsers() {
    userList = await apiGetUsers();
    onUpdate?.();
}
// ===== BUSINESS LOGIC ===== //
export async function addUser(name, email) {
    if (name.trim() === "" || email.trim() === "")
        return false;
    await apiCreateUser({ name: name.trim(), email: email.trim() });
    await loadUsers();
    return true;
}
export async function deleteUser(userId) {
    await apiDeleteUser(userId);
    await loadUsers();
}
export async function toggleUserActive(userId) {
    const user = userList.find((u) => u.id === userId);
    if (!user)
        return;
    await apiPatchUser(userId, { active: !user.active });
    await loadUsers();
}
export function orderUserList() {
    userList.sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
    onUpdate?.();
}
export function getUserById(userId) {
    return userList.find((u) => u.id === userId);
}
// ===== COMPUTED DATA ===== //
export function getTotalUsers() {
    return userList.length;
}
export function getActiveUsersCount() {
    return userList.filter((user) => user.active).length;
}
export function getInactiveUsersCount() {
    return userList.filter((user) => !user.active).length;
}
export function getFilteredUsers(searchTerm, onlyActive) {
    let filtered = userList;
    if (searchTerm.trim() !== "") {
        filtered = filtered.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (onlyActive) {
        filtered = filtered.filter((user) => user.active);
    }
    return filtered;
}
