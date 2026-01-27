import { BaseEntity } from "./BaseEntity.js";
export class TaskClass extends BaseEntity {
    constructor(id, title, category, status) {
        super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
        this.title = title;
        this.finished = false;
        this.category = category;
        this.status = status;
    }
    getType() {
        return this.title;
    }
    moveTo(newStatus) {
        this.status = newStatus;
    }
}
