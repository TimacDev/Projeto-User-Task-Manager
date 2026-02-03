import { setOnUpdate } from "./services/taskService.js";
import {
  renderTasks,
  updateCounter,
  handleAddTask,
  handleClearAllTasks,
} from "./ui/renderTask.js";
import { initUserPage } from "./ui/renderUser.js";
import { SystemConfig } from "./services/SystemConfig.js";
import { IdGenerator } from "./utils/IdGenerator.js";
import { SystemLogger } from "./logs/SystemLogger.js";
import { GlobalValidators } from "./utils/GlobalValidators.js";
import { BusinessRules } from "./services/BusinessRules.js";
import { TaskClass } from "./models/task.js";
import { UserClass } from "./models/user.js";
import { UserRole } from "./security/UserRole.js";
import { TaskStatus } from "./tasks/TaskStatus.js";
import { EntityList } from './utils/EntityList.js';
import { SimpleCache } from "./utils/SimpleCache.js";
import { Favorites } from "./utils/Favorites.js";
import { Paginator } from "./utils/Paginator.js";
import { TagManager } from "./utils/TagManager.js";
import { WatcherSystem } from "./utils/WatcherSystem.js";


// ===== TASK PAGE ===== //

const addBtn = document.querySelector("#addBtn");

if (addBtn) {
  const clearBtn = document.querySelector("#btnLimpar")!;

  setOnUpdate(() => {
    renderTasks();
    updateCounter();
  });

  addBtn.addEventListener("click", handleAddTask);
  clearBtn.addEventListener("click", handleClearAllTasks);

  updateCounter();
}

// ===== USER PAGE ===== //

const nameInput = document.querySelector("#nameInput");

if (nameInput) {
  initUserPage();
}


// ===== PRATICAL DEMO ===== //
// Configure System

SystemConfig.setEnvironment("production");
SystemLogger.log("System configured");

console.log("=== System Info ===");
console.log(SystemConfig.getInfo());

// Create Users (with validation)

SystemLogger.log("Starting user creation");

const users: UserClass[] = [];

function createUser(name: string, email: string, role: UserRole): UserClass | null {
    
    if (!GlobalValidators.isValidEmail(email)) {
        SystemLogger.log(`ERROR: Invalid email - ${email}`);
        console.log(`Invalid email: ${email}`);
        return null;
    }

    const user = new UserClass(IdGenerator.generate(), name, email, role);
    users.push(user);
    
    SystemLogger.log(`User created: ${name} (ID: ${user.id})`);
    console.log(`User created: ${name}`);
    
    return user;
}

console.log("\n=== Creating Users ===");
const alice = createUser("Alice", "alice@mail.com", UserRole.ADMIN);
const bob = createUser("Bob", "invalid-email", UserRole.VIEWER);  // Will fail
const charlie = createUser("Charlie", "charlie@mail.com", UserRole.VIEWER);

// Create Tasks (with validation)

SystemLogger.log("Starting task creation");

const tasks: TaskClass[] = [];

function createTask(title: string, category: "Work" | "Personal" | "Study"): TaskClass | null {
    
    if (!GlobalValidators.isNonEmpty(title)) {
        SystemLogger.log(`ERROR: Empty title`);
        console.log(`Empty title`);
        return null;
    }

    const task = new TaskClass(IdGenerator.generate(), title, category);
    tasks.push(task);
    
    SystemLogger.log(`Task created: ${title} (ID: ${task.id})`);
    console.log(`Task created: ${title}`);
    
    return task;
}

console.log("\n=== Creating Tasks ===");
const task1 = createTask("Complete project", "Work");
const task2 = createTask("", "Personal");  // Will fail
const task3 = createTask("Study TypeScript", "Study");

// Assign Tasks (Business Rules)

function assignTask(task: TaskClass | null, user: UserClass | null): boolean {
    if (!task || !user) return false;

    if (!BusinessRules.canAssignTask(user.active)) {
        SystemLogger.log(`ERROR: Cannot assign to inactive user ${user.name}`);
        console.log(`Cannot assign - ${user.name} is inactive`);
        return false;
    }

    task.assignedTo = user.id;
    user.activeTasks++;
    
    SystemLogger.log(`Task "${task.title}" assigned to ${user.name}`);
    console.log(`"${task.title}" → ${user.name}`);
    
    return true;
}

console.log("\n=== Assigning Tasks ===");
assignTask(task1, alice);
assignTask(task3, alice);

// Complete Tasks (Business Rules)

function completeTask(task: TaskClass | null, user: UserClass | null): boolean {
    if (!task || !user) return false;

    if (!BusinessRules.canTaskBeCompleted(task.isBlocked)) {
        SystemLogger.log(`ERROR: Task "${task.title}" is blocked`);
        console.log(`Cannot complete - "${task.title}" is blocked`);
        return false;
    }

    task.finished = true;
    task.completionDate = new Date();
    task.moveTo(TaskStatus.COMPLETED);
    user.activeTasks--;
    
    SystemLogger.log(`Task "${task.title}" completed`);
    console.log(`"${task.title}" completed`);
    
    return true;
}

console.log("\n=== Completing Tasks ===");

if (task3) task3.isBlocked = true;

completeTask(task1, alice);  // Will succeed
completeTask(task3, alice);  // Will fail (blocked)

// Deactivate User (Business Rules)

function deactivateUser(user: UserClass | null): boolean {
    if (!user) return false;

    if (!BusinessRules.canUserBeDeactivated(user.activeTasks)) {
        SystemLogger.log(`ERROR: ${user.name} has ${user.activeTasks} active tasks`);
        console.log(`Cannot deactivate ${user.name} - has active tasks`);
        return false;
    }

    user.deactivate();
    
    SystemLogger.log(`User ${user.name} deactivated`);
    console.log(`${user.name} deactivated`);
    
    return true;
}

console.log("\n=== Deactivating Users ===");
deactivateUser(alice);    // Will fail (has 1 blocked task)
deactivateUser(charlie);  // Will succeed (0 tasks)

// Print Results

console.log("\n=== FINAL RESULTS ===");
console.log("\nSystem:", SystemConfig.getInfo());
console.log("\nUsers:", users.map(u => ({ id: u.id, name: u.name, active: u.active, tasks: u.activeTasks })));
console.log("\nTasks:", tasks.map(t => ({ id: t.id, title: t.title, finished: t.finished, blocked: t.isBlocked })));

console.log("\n=== ALL LOGS ===");
SystemLogger.getLogs().forEach((log, i) => console.log(`${i + 1}. ${log}`));


const user1 = new UserClass(1, "Alice", "alice@example.com", UserRole.ADMIN);
const user2 = new UserClass(2, "Bob", "bob@example.com", UserRole.VIEWER);

const task4 = new TaskClass(1, "Learn TypeScript", "Work", TaskStatus.CREATED);

// Use the generic EntityList 

const userList = new EntityList<UserClass>();
userList.add(user1);
userList.add(user2);

const taskList = new EntityList<TaskClass>();
taskList.add(task4);

// Output results
console.log("Users:", userList.getAll());
console.log("Tasks:", taskList.getAll());

// ===== SimpleCache =====

const userCache = new SimpleCache<number, UserClass>();
userCache.set(1, user1);
userCache.set(2, user2);

const taskCache = new SimpleCache<number, TaskClass>();
taskCache.set(10, task4);

console.log("\n=== SimpleCache ===");
console.log("User with ID 1:", userCache.get(1));
console.log("User with ID 99:", userCache.get(99)); // undefined
console.log("Task with ID 10:", taskCache.get(10));

// ===== Favorites =====

const favUsers = new Favorites();
favUsers.add(user1);
favUsers.add(user2);
favUsers.remove(user1);
console.log(favUsers.getAll());

const favTasks = new Favorites();
favTasks.add(task1);
console.log(favTasks.exists(task1));

// ===== Paginator =====

const paginator = new Paginator();
const page1 = paginator.paginate(userList.getAll(), 1, 2);
const page2 = paginator.paginate(userList.getAll(), 2, 2);

console.log(page1);
console.log(page2);

// ===== Tag Manager =====

const tagManager = new TagManager();
tagManager.addTag(task1, 'urgente');
tagManager.addTag(task1, 'backend');
console.log(tagManager.getTags(task1));

// ===== Watchers =====

const watcherSystem = new WatcherSystem();
watcherSystem.watch(task1, user1);
watcherSystem.watch(task1, user2);
console.log(watcherSystem.getWatchers(task1));