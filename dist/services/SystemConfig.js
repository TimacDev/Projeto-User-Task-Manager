export class SystemConfig {
    static setEnvironment(env) {
        SystemConfig.environment = env;
    }
    static getInfo() {
        return {
            appName: SystemConfig.appName,
            version: SystemConfig.version,
            environment: SystemConfig.environment,
        };
    }
}
SystemConfig.appName = "MyApp";
SystemConfig.version = "1.0.0";
