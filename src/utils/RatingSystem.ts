export class RatingSystem<T> {
    
  private ratings: Map<T, number[]>;

  constructor() {
    this.ratings = new Map();
  }

  rate(item: T, value: number): void {
    const existingRatings = this.ratings.get(item);

    if (existingRatings) {
      existingRatings.push(value);
    } else {
      this.ratings.set(item, [value]);
    }
  }

  getAverage(item: T): number {
    const itemRatings = this.ratings.get(item);

    if (!itemRatings || itemRatings.length === 0) {
      return 0;
    }

    const sum = itemRatings.reduce((acc, rating) => acc + rating, 0);
    return sum / itemRatings.length;
  }

  getRatings(item: T): number[] {
    return this.ratings.get(item) || [];
  }
}
