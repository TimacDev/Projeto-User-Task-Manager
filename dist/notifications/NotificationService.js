import { userList } from "../services/userService.js";
import { UserRole } from "../security/UserRole.js";
export class NotificationService {
    notifyUser(userId, message) {
        const user = userList.find((u) => u.id === userId);
        if (!user) {
            return;
        }
        console.log(`Notification for ${user.name}: ${message}`);
    }
    notifyGroup(userIds, message) {
        for (const user of userIds) {
            this.notifyUser(user, message);
        }
    }
    notifyAdmins(message) {
        const admins = userList.filter((user) => user.getRole() === UserRole.ADMIN);
        for (const admin of admins) {
            this.notifyUser(admin.id, message);
        }
    }
}
