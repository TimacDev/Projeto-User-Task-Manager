export class GlobalValidators {
    constructor() { } // prevents new instances
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isNonEmpty(text) {
        return text.trim().length > 0;
    }
    static isPositiveNumber(value) {
        return value > 0;
    }
    static minLength(text, size) {
        return text.length >= size;
    }
}
