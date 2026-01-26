import { setOnUpdate } from "./services/taskService.js";
import { renderTasks, updateCounter, handleAddTask, handleClearAllTasks } from "./ui/renderTask.js";
import { initUserPage } from "./ui/renderUser.js";
// ========== TASK PAGE ==========
const addBtn = document.querySelector("#addBtn");
if (addBtn) {
    const clearBtn = document.querySelector("#btnLimpar");
    setOnUpdate(() => {
        renderTasks();
        updateCounter();
    });
    addBtn.addEventListener("click", handleAddTask);
    clearBtn.addEventListener("click", handleClearAllTasks);
    updateCounter();
}
// ========== USER PAGE ==========
const nameInput = document.querySelector("#nameInput");
if (nameInput) {
    initUserPage();
}
