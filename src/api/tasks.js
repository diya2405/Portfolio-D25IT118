const API_BASE = 'http://localhost:5000';

async function handleResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error ?? 'Request failed (status ' + res.status + ')');
    err.status = res.status;
    throw err;
  }
  return data;
}

export function getTasks(token) {
  return fetch(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export async function fetchTasksWithTiming(token) {
  const startTime = performance.now();
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const durationMs = Math.round(performance.now() - startTime);
  const cacheStatus = res.headers.get('X-Cache') || 'UNKNOWN';
  const tasks = await handleResponse(res);
  return { tasks, durationMs, cacheStatus };
}

export function getCacheStats(token) {
  return fetch(`${API_BASE}/tasks/cache/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export function flushCache(token) {
  return fetch(`${API_BASE}/tasks/cache/flush`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export function seedDummyTasks(token) {
  return fetch(`${API_BASE}/tasks/seed-dummy`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export function createTask(token, taskData) {
  return fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  }).then(handleResponse);
}

export function updateTask(token, id, updates) {
  return fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  }).then(handleResponse);
}

export function deleteTask(token, id) {
  return fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
}
