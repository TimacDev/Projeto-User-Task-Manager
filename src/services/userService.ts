import { UserClass } from "../models/index.js";

// ============ DATA ============
export let userList: UserClass[] = [];

// ============ CALLBACKS ============
let onUpdate: (() => void) | null = null;

export function setOnUserUpdate(callback: () => void): void {
  onUpdate = callback;
}

// ============ BUSINESS LOGIC ============
export function addUser(name: string, email: string): boolean {
  if (name.trim() === "" || email.trim() === "") return false;

  const newUser = new UserClass(Date.now(), name.trim(), email.trim());
  userList.push(newUser);
  onUpdate?.();
  return true;
}

export function deleteUser(userId: number): void {
  userList = userList.filter((u) => u.id !== userId);
  onUpdate?.();
}

export function toggleUserActive(userId: number): void {
  const user = userList.find((u) => u.id === userId);
  if (!user) return;

  user.active ? user.deactivate() : user.activate();
  onUpdate?.();
}

export function orderUserList(): void {
  userList.sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
  onUpdate?.();
}

export function getUserById(userId: number): UserClass | undefined {
  return userList.find((u) => u.id === userId);
}

// ============ COMPUTED DATA ============
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
): UserClass[] {
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
