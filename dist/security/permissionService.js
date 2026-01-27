import { UserRole } from "./UserRole.js";
// ADMIN > MANAGER > MEMBER > VIEWER
export function canViewTask(role) {
    return (role === UserRole.VIEWER ||
        role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canCreateTask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canEditTask(role) {
    return (role === UserRole.ADMIN ||
        role === UserRole.MANAGER ||
        role === UserRole.MEMBER);
}
export function canDeleteTask(role) {
    return role === UserRole.ADMIN || role === UserRole.MANAGER;
}
export function canAssignTask(role) {
    return role === UserRole.ADMIN || role === UserRole.MANAGER;
}
