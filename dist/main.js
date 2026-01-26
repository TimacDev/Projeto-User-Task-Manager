import { addTask, clearAllTasks, setOnUpdate } from "./services/taskService.js";
import { renderTasks, updateCounter } from "./ui/renderTask.js";
import { initUserPage } from "./ui/renderUser.js";
// TASK PAGE
const addBtn = document.querySelector("#addBtn");
if (addBtn) {
    const clearBtn = document.querySelector("#btnLimpar");
    setOnUpdate(() => {
        renderTasks();
        updateCounter();
    });
    addBtn.addEventListener("click", addTask);
    clearBtn.addEventListener("click", clearAllTasks);
    updateCounter();
}
// USER PAGE
const nameInput = document.querySelector("#nameInput");
if (nameInput) {
    initUserPage();
}
