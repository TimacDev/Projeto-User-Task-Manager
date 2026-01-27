export class BaseEntity {
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
