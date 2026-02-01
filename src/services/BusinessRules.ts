export class BusinessRules {
  private constructor() {} // prevents new instances

  static canUserBeDeactivated(activeTasks: number): boolean {
    return activeTasks === 0; // deactivates user when it has 0 tasks
  }

  static canTaskBeCompleted(isBlocked: boolean): boolean {
    return !isBlocked; // only allows completion when not blocked (false)
  }

  static canAssignTask(active: boolean): boolean {
    return active; // only allows task assignment of active users
  }

  static isValidTitle(title: string): boolean {
    return title.trim().length >= 3; // only allows valid titles above 3 characters and trims the empty spaces in the string so there are no empty strings
  }
}
