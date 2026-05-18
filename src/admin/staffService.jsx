// staffService.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

// Helper to get auth token
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE}/getusers`, {
    headers: getAuthHeader()
  });
  // Map API response to consistent format
  return response.data.map(user => ({
    ...user,
    userId: user.id,
    is_active: user.status === 'active',
    is_blocked: user.status === 'blocked'
  }));
};

// Reset password
export const resetPassword = async (userId, newPassword) => {
  await axios.post(`${API_BASE}/reset-password`, {
    userId,
    password: newPassword
  }, {
    headers: getAuthHeader()
  });
};

// Activate user
export const activateUser = async (userId) => {
  await axios.put(`${API_BASE}/activate-user/${userId}`, {}, {
    headers: getAuthHeader()
  });
};

// Deactivate user
export const deactivateUser = async (userId) => {
  await axios.put(`${API_BASE}/deactivate-user/${userId}`, {}, {
    headers: getAuthHeader()
  });
};

// Block login
export const blockUserLogin = async (userId) => {
  await axios.put(`${API_BASE}/block-user/${userId}`, {}, {
    headers: getAuthHeader()
  });
};

// Unblock login
export const unblockUserLogin = async (userId) => {
  await axios.put(`${API_BASE}/unblock-user/${userId}`, {}, {
    headers: getAuthHeader()
  });
};

// Remove a single permission (task) from a user
export const removeUserTask = async (userId, taskName) => {
  await axios.delete(`${API_BASE}/remove-task`, {
    headers: getAuthHeader(),
    data: { userId, task: taskName }
  });
};

// Assign tasks (permissions) to a user
export const assignTasks = async (userId, staffName, tasks) => {
  await axios.post(`${API_BASE}/assign-tasks`, {
    userId,
    staff_name: staffName,
    tasks
  }, {
    headers: getAuthHeader()
  });
};

// Fetch tasks (permissions) for a specific user
export const fetchUserTasks = async (userId) => {
  const response = await axios.get(`${API_BASE}/api/user-tasks/${userId}`, {
    headers: getAuthHeader()
  });
  return response.data.tasks || [];
};