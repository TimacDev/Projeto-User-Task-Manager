import { Task } from "../models/index.js";
import {
  Tag,
  getTags as apiGetTags,
  createTag as apiCreateTag,
  deleteTag as apiDeleteTag,
  getTasksByTag as apiGetTasksByTag,
  addTagToTask as apiAddTagToTask,
} from "../api/apiTagService.js";

// ===== DATA ===== //

export let tagList: Tag[] = [];

// ===== CALLBACKS ===== //

let onUpdate: (() => void) | null = null;

export function setOnTagUpdate(callback: () => void): void {
  onUpdate = callback;
}

// ===== LOAD TAGS (syncs API → local array) ===== //

export async function loadTags(): Promise<void> {
  tagList = await apiGetTags();
  onUpdate?.();
}

// ===== BUSINESS LOGIC ===== //

export async function addTag(name: string): Promise<boolean> {
  if (name.trim() === "") return false;

  await apiCreateTag({ name: name.trim() });
  await loadTags();
  return true;
}

export async function removeTag(id: number): Promise<void> {
  await apiDeleteTag(id);
  await loadTags();
}

export async function getTasksByTag(tagId: number): Promise<Task[]> {
  return await apiGetTasksByTag(tagId);
}

export async function addTagToTask(taskId: number, tagId: number): Promise<void> {
  await apiAddTagToTask(taskId, tagId);
}
