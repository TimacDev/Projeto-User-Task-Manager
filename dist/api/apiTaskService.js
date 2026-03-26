const BASE_URL = 'http://localhost:3000';
// GET /tasks (with optional search and sort)
export async function getTasks(search, sort) {
    let url = `${BASE_URL}/tasks`;
    if (search && sort) {
        url += `?search=${search}&sort=${sort}`;
    }
    else if (search) {
        url += `?search=${search}`;
    }
    else if (sort) {
        url += `?sort=${sort}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Erro ao buscar tasks');
    }
    return await res.json();
}
// POST /tasks
export async function createTask(task) {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        throw new Error('Erro ao criar task');
    }
    return await res.json();
}
// PUT /tasks/:id
export async function updateTask(id, task) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        throw new Error('Erro ao atualizar task');
    }
    return await res.json();
}
// DELETE /tasks/:id
export async function deleteTask(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Erro ao apagar task');
    }
    await res.json();
}
// GET /tasks/stats
export async function getTaskStats() {
    const res = await fetch(`${BASE_URL}/tasks/stats`);
    if (!res.ok) {
        throw new Error('Erro ao buscar stats de tasks');
    }
    return await res.json();
}
// GET /users/:id/tasks
export async function getTasksByUser(userId) {
    const res = await fetch(`${BASE_URL}/users/${userId}/tasks`);
    if (!res.ok) {
        throw new Error('Erro ao buscar tasks do user');
    }
    return await res.json();
}
