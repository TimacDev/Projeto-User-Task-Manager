export class SystemConfig {
  static appName: string = "MyApp";
  static version: string = "1.0.0";
  static environment: string;

  static setEnvironment(env: string): void {
    SystemConfig.environment = env;
  }

  static getInfo(): { appName: string; version: string; environment: string } {
    return {
      appName: SystemConfig.appName,
      version: SystemConfig.version,
      environment: SystemConfig.environment,
    };
  }
}
