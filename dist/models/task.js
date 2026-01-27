import { BaseEntity } from "./BaseEntity.js";
export class TaskClass extends BaseEntity {
    constructor(id, title, category) {
        super(id); // ← Calls BaseEntity constructor (sets id & createdAt)
        this.title = title;
        this.finished = false;
        this.category = category;
    }
    getType() {
        return;
    }
    moveTo(status) {
    }
}
