import { Task } from '../models/task.js';

export interface Tag {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:3000';

// GET /tags
export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${BASE_URL}/tags`);

  if (!res.ok) {
    throw new Error('Erro ao buscar tags');
  }

  return await res.json();
}

// POST /tags
export async function createTag(tag: { name: string }): Promise<Tag> {
  const res = await fetch(`${BASE_URL}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });

  if (!res.ok) {
    throw new Error('Erro ao criar tag');
  }

  return await res.json();
}

// DELETE /tags/:id
export async function deleteTag(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/tags/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao apagar tag');
  }

  await res.json();
}

// GET /tags/:id/tasks
export async function getTasksByTag(tagId: number): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tags/${tagId}/tasks`);

  if (!res.ok) {
    throw new Error('Erro ao buscar tasks da tag');
  }

  return await res.json();
}

// POST /tasks/:id/tags
export async function addTagToTask(taskId: number, tagId: number): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagId }),
  });

  if (!res.ok) {
    throw new Error('Erro ao adicionar tag à task');
  }

  return await res.json();
}
