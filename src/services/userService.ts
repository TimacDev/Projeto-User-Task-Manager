import { User } from "../models/index.js";
import {
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  patchUser as apiPatchUser,
  deleteUser as apiDeleteUser,
} from "../api/apiUserService.js";

// ===== DATA ===== //

export let userList: User[] = [];

// ===== CALLBACKS ===== //

let onUpdate: (() => void) | null = null;

export function setOnUserUpdate(callback: () => void): void {
  onUpdate = callback;
}

// ===== LOAD USERS (syncs API → local array) ===== //

export async function loadUsers(): Promise<void> {
  userList = await apiGetUsers();
  onUpdate?.();
}

// ===== BUSINESS LOGIC ===== //

export async function addUser(name: string, email: string): Promise<boolean> {
  if (name.trim() === "" || email.trim() === "") return false;

  await apiCreateUser({ name: name.trim(), email: email.trim() });
  await loadUsers();
  return true;
}

export async function deleteUser(userId: number): Promise<void> {
  await apiDeleteUser(userId);
  await loadUsers();
}

export async function toggleUserActive(userId: number): Promise<void> {
  const user = userList.find((u) => u.id === userId);
  if (!user) return;

  await apiPatchUser(userId, { active: !user.active });
  await loadUsers();
}

export function orderUserList(): void {
  userList.sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
  onUpdate?.();
}

export function getUserById(userId: number): User | undefined {
  return userList.find((u) => u.id === userId);
}

// ===== COMPUTED DATA ===== //

export function getTotalUsers(): number {
  return userList.length;
}

export function getActiveUsersCount(): number {
  return userList.filter((user) => user.active).length;
}

export function getInactiveUsersCount(): number {
  return userList.filter((user) => !user.active).length;
}

export function getFilteredUsers(
  searchTerm: string,
  onlyActive: boolean,
): User[] {
  let filtered = userList;

  if (searchTerm.trim() !== "") {
    filtered = filtered.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (onlyActive) {
    filtered = filtered.filter((user) => user.active);
  }

  return filtered;
}
