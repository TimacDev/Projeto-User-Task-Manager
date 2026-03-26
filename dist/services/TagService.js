import { getTags as apiGetTags, createTag as apiCreateTag, deleteTag as apiDeleteTag, getTasksByTag as apiGetTasksByTag, addTagToTask as apiAddTagToTask, } from "../api/apiTagService.js";
// ===== DATA ===== //
export let tagList = [];
// ===== CALLBACKS ===== //
let onUpdate = null;
export function setOnTagUpdate(callback) {
    onUpdate = callback;
}
// ===== LOAD TAGS (syncs API → local array) ===== //
export async function loadTags() {
    tagList = await apiGetTags();
    onUpdate?.();
}
// ===== BUSINESS LOGIC ===== //
export async function addTag(name) {
    if (name.trim() === "")
        return false;
    await apiCreateTag({ name: name.trim() });
    await loadTags();
    return true;
}
export async function removeTag(id) {
    await apiDeleteTag(id);
    await loadTags();
}
export async function getTasksByTag(tagId) {
    return await apiGetTasksByTag(tagId);
}
export async function addTagToTask(taskId, tagId) {
    await apiAddTagToTask(taskId, tagId);
}
