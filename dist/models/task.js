import { BaseEntity } from "./BaseEntity.js";
import { TaskStatus } from "../tasks/TaskStatus.js";
export class TaskClass extends BaseEntity {
    constructor(id, title, category, status = TaskStatus.CREATED) {
        super(id); // BaseEntity constructor (sets id & createdAt)
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
