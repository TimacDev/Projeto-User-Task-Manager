export class RatingSystem {
    constructor() {
        this.ratings = new Map();
    }
    rate(item, value) {
        const existingRatings = this.ratings.get(item);
        if (existingRatings) {
            existingRatings.push(value);
        }
        else {
            this.ratings.set(item, [value]);
        }
    }
    getAverage(item) {
        const itemRatings = this.ratings.get(item);
        if (!itemRatings || itemRatings.length === 0) {
            return 0;
        }
        const sum = itemRatings.reduce((acc, rating) => acc + rating, 0);
        return sum / itemRatings.length;
    }
    getRatings(item) {
        return this.ratings.get(item) || [];
    }
}
