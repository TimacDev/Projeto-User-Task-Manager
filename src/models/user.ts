import { BaseEntity } from "./BaseEntity.js";
import { UserRole } from "../security/UserRole.js";

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export class UserClass extends BaseEntity implements User {
  name: string;
  email: string;
  active: boolean;

  constructor(id: number, name: string, email: string) {
    super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
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

  getRole(): UserRole {
    return UserRole;
  }
}
