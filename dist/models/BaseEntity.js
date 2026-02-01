export class BaseEntity {
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        BaseEntity.totalEntities++;
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    static getTotalEntities() {
        return BaseEntity.totalEntities;
    }
}
BaseEntity.totalEntities = 0;
