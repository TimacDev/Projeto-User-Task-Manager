const BASE_URL = 'http://localhost:3000';
// GET /tags
export async function getTags() {
    const res = await fetch(`${BASE_URL}/tags`);
    if (!res.ok) {
        throw new Error('Error getting tags');
    }
    return await res.json();
}
// POST /tags
export async function createTag(tag) {
    const res = await fetch(`${BASE_URL}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tag),
    });
    if (!res.ok) {
        throw new Error('Error. creating tag');
    }
    return await res.json();
}
// DELETE /tags/:id
export async function deleteTag(id) {
    const res = await fetch(`${BASE_URL}/tags/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Error deleting tag');
    }
    await res.json();
}
// GET /tags/:id/tasks
export async function getTasksByTag(tagId) {
    const res = await fetch(`${BASE_URL}/tags/${tagId}/tasks`);
    if (!res.ok) {
        throw new Error('Error getting tags tasks');
    }
    return await res.json();
}
// POST /tasks/:id/tags
export async function addTagToTask(taskId, tagId) {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagId }),
    });
    if (!res.ok) {
        throw new Error('Error adding tag to task');
    }
    return await res.json();
}
