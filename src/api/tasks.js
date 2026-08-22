const API_BASE = 'http://localhost:5000';

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? 'Request failed (status ' + res.status + ')');
  return data;
}

export async function createTask(taskData) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? 'Request failed (status ' + res.status + ')');
  return data;
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? 'Request failed (status ' + res.status + ')');
  return data;
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? 'Request failed (status ' + res.status + ')');
  return data;
}
