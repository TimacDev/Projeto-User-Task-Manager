export class BaseEntity {
  private static totalEntities: number = 0;  
  public readonly id: number;
  protected createdAt: Date;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date();
    BaseEntity.totalEntities++;
  }

  getId(): number {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  static getTotalEntities(): number {
    return BaseEntity.totalEntities;
  }
}
