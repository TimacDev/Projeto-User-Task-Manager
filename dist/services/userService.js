import { UserClass } from "../models/index.js";
// ===== DATA ===== //
export let userList = [];
// ===== CALLBACKS ===== //
let onUpdate = null;
export function setOnUserUpdate(callback) {
    onUpdate = callback;
}
// ===== BUSINESS LOGIC ===== //
export function addUser(name, email) {
    if (name.trim() === "" || email.trim() === "")
        return false;
    const newUser = new UserClass(Date.now(), name.trim(), email.trim());
    userList.push(newUser);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
    return true;
}
export function deleteUser(userId) {
    userList = userList.filter((u) => u.id !== userId);
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function toggleUserActive(userId) {
    const user = userList.find((u) => u.id === userId);
    if (!user)
        return;
    user.active ? user.deactivate() : user.activate();
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
}
export function orderUserList() {
    userList.sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
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
