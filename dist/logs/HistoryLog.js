export class HistoryLog {
    constructor() {
        this.logs = [];
    }
    addLog(message) {
        const timestamp = new Date().toLocaleString("en");
        const logEntry = `[${timestamp}] ${message}`;
        this.logs.push(logEntry);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = [];
    }
}
