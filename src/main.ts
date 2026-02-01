import { setOnUpdate } from "./services/taskService.js";
import {
  renderTasks,
  updateCounter,
  handleAddTask,
  handleClearAllTasks,
} from "./ui/renderTask.js";
import { initUserPage } from "./ui/renderUser.js";
import { SystemConfig } from "./services/SystemConfig";
import { IdGenerator } from "./utils/IdGenerator";
import { SystemLogger } from "./logs/SystemLogger";
import { GlobalValidators } from "./utils/GlobalValidators";
import { BusinessRules } from "./services/BusinessRules";

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

console.log("=== STEP 1: System Configuration ===\n");

SystemConfig.setEnvironment("production");
SystemLogger.log("System environment configured");

const systemInfo = SystemConfig.getInfo();
console.log(`System info: ${systemInfo}`);
SystemLogger.log(`App "${systemInfo.appName}" v${systemInfo.version} started in ${systemInfo.environment} mode`);

