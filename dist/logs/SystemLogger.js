export class SystemLogger {
    constructor() { } // prevents instantiation
    static log(message) {
        SystemLogger.logs.push(message);
    }
    static getLogs() {
        return [...SystemLogger.logs]; // protects original array by providing only a copy
    }
    static clear() {
        SystemLogger.logs = [];
    }
}
SystemLogger.logs = [];
