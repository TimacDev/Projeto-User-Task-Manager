export class SystemLogger {
  private static logs: string[] = [];

  private constructor() {} // prevents instantiation

  static log(message: string): void {
    SystemLogger.logs.push(message);
  }

  static getLogs(): string[] {
    return [...SystemLogger.logs]; // protects original array by providing only a copy
  }

  static clear(): void {
    SystemLogger.logs = [];
  }
}
