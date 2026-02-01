import { BaseEntity } from "./BaseEntity.js";
import { UserRole } from "../security/UserRole.js";
export class UserClass extends BaseEntity {
    constructor(id, name, email, role = UserRole.VIEWER) {
        super(id); // Calls BaseEntity constructor (sets id & createdAt)
        this.activeTasks = 0;
        this.name = name;
        this.email = email;
        this.active = true;
        this.role = role;
    }
    deactivate() {
        this.active = false;
    }
    activate() {
        this.active = true;
    }
    getRole() {
        return this.role;
    }
    setRole(newRole) {
        this.role = newRole;
    }
}
