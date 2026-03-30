const BASE_URL = 'http://localhost:3000';
// GET /users (with optional search and sort)
export async function getUsers(search, sort) {
    let url = `${BASE_URL}/users`;
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
        throw new Error('Error getting users');
    }
    return await res.json();
}
// POST /users
export async function createUser(user) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error('Error creating user');
    }
    return await res.json();
}
// PUT /users/:id
export async function updateUser(id, user) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        throw new Error('Error updating user');
    }
    return await res.json();
}
// PATCH /users/:id
export async function patchUser(id, fields) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
    });
    if (!res.ok) {
        throw new Error('Error patching user');
    }
    return await res.json();
}
// DELETE /users/:id
export async function deleteUser(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Error deleting user');
    }
    await res.json();
}
// GET /users/stats
export async function getUserStats() {
    const res = await fetch(`${BASE_URL}/users/stats`);
    if (!res.ok) {
        throw new Error('Error getting users stats');
    }
    return await res.json();
}
