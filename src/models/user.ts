import { BaseEntity } from "./BaseEntity.js";
import { UserRole } from "../security/UserRole.js";

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: UserRole;
}

export class UserClass extends BaseEntity implements User {
  name: string;
  email: string;
  active: boolean;
  role: UserRole;

  constructor(
    id: number,
    name: string,
    email: string,
    role: UserRole = UserRole.VIEWER,
  ) {
    super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
    this.name = name;
    this.email = email;
    this.active = true;
    this.role = role;
  }

  deactivate(): void {
    this.active = false;
  }

  activate(): void {
    this.active = true;
  }

  getRole(): UserRole {
    return this.role;
  }

  setRole(newRole: UserRole): void {
    this.role = newRole;
  }
}
