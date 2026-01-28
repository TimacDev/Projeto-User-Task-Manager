export class HistoryLog {
  private logs: string[] = [];

  addLog(message: string): void {
    const timestamp = new Date().toLocaleString("en");
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push(logEntry);
  }

  getLogs(): string[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}
