import { userList } from "../services/userService.js";
import { UserRole } from "../security/UserRole.js";

export class NotificationService {
  notifyUser(userId: number, message: string) {
    const user = userList.find((u) => u.id === userId);
    if (!user) {
      return;
    }
    console.log(`Notification for ${user.name}: ${message}`);
  }

  notifyGroup(userIds: number[], message: string) {
    for (const user of userIds) {
      this.notifyUser(user, message);
    }
  }

  notifyAdmins(message: string) {
    const admins = userList.filter((user) => user.getRole() === UserRole.ADMIN);
    for (const admin of admins) {
      this.notifyUser(admin.id, message);
    }
  }
}
