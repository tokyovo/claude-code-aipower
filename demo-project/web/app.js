/**
 * TaskMaster Pro - Frontend Application
 * Handles all UI interactions and API communication
 */

// API Base URL
const API_BASE = window.location.origin + '/api';

// State
let tasks = [];
let currentFilters = {
  status: 'all',
  priority: 'all',
  sortBy: 'createdAt',
  order: 'desc',
  search: ''
};
let editingTaskId = null;

// DOM Elements
const elements = {
  taskList: document.getElementById('task-list'),
  emptyState: document.getElementById('empty-state'),
  taskTitleInput: document.getElementById('task-title-input'),
  taskDescriptionInput: document.getElementById('task-description-input'),
  taskPrioritySelect: document.getElementById('task-priority-select'),
  taskTagsInput: document.getElementById('task-tags-input'),
  addTaskBtn: document.getElementById('add-task-btn'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  exportJsonBtn: document.getElementById('export-json-btn'),
  exportCsvBtn: document.getElementById('export-csv-btn'),
  modal: document.getElementById('edit-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCancelBtn: document.getElementById('modal-cancel-btn'),
  modalSaveBtn: document.getElementById('modal-save-btn'),
  editTaskTitle: document.getElementById('edit-task-title'),
  editTaskDescription: document.getElementById('edit-task-description'),
  editTaskPriority: document.getElementById('edit-task-priority'),
  editTaskTags: document.getElementById('edit-task-tags'),
  editTaskTagsInput: document.getElementById('edit-task-tags-input'),
  toast: document.getElementById('toast'),
  statTotal: document.getElementById('stat-total'),
  statCompleted: document.getElementById('stat-completed'),
  statIncomplete: document.getElementById('stat-incomplete'),
  statHigh: document.getElementById('stat-high')
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  loadTasks();
});

// Event Listeners
function initializeEventListeners() {
  // Add task
  elements.addTaskBtn.addEventListener('click', handleAddTask);
  elements.taskTitleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTask();
  });

  // Filters
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => handleStatusFilter(btn));
  });

  document.querySelectorAll('.filter-btn[data-priority]').forEach(btn => {
    btn.addEventListener('click', () => handlePriorityFilter(btn));
  });

  elements.sortSelect.addEventListener('change', handleSortChange);
  elements.searchInput.addEventListener('input', debounce(handleSearch, 300));

  // Export
  elements.exportJsonBtn.addEventListener('click', handleExportJSON);
  elements.exportCsvBtn.addEventListener('click', handleExportCSV);

  // Modal
  elements.modalCloseBtn.addEventListener('click', closeModal);
  elements.modalCancelBtn.addEventListener('click', closeModal);
  elements.modalSaveBtn.addEventListener('click', handleSaveEdit);
  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) closeModal();
  });

  // Edit modal tags input
  elements.editTaskTagsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTagInModal();
    }
  });
}

// API Functions
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

async function loadTasks() {
  try {
    const result = await apiCall('/tasks');
    tasks = result.data;
    renderTasks();
    await loadStats();
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}

async function loadStats() {
  try {
    const result = await apiCall('/stats');
    updateStats(result.data);
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

async function createTask(title, options = {}) {
  const result = await apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, ...options })
  });
  return result.data;
}

async function updateTask(id, updates) {
  const result = await apiCall(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  return result.data;
}

async function deleteTask(id) {
  await apiCall(`/tasks/${id}`, { method: 'DELETE' });
}

async function toggleTaskComplete(id, completed) {
  const endpoint = completed ? 'reopen' : 'complete';
  const result = await apiCall(`/tasks/${id}/${endpoint}`, { method: 'POST' });
  return result.data;
}

async function addTagToTask(id, tag) {
  const result = await apiCall(`/tasks/${id}/tags`, {
    method: 'POST',
    body: JSON.stringify({ tag })
  });
  return result.data;
}

async function removeTagFromTask(id, tag) {
  const result = await apiCall(`/tasks/${id}/tags/${encodeURIComponent(tag)}`, {
    method: 'DELETE'
  });
  return result.data;
}

// UI Handlers
async function handleAddTask() {
  const title = elements.taskTitleInput.value.trim();
  if (!title) {
    showToast('Please enter a task title', 'error');
    return;
  }

  const description = elements.taskDescriptionInput.value.trim();
  const priority = elements.taskPrioritySelect.value;
  const tagsInput = elements.taskTagsInput.value.trim();
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

  try {
    await createTask(title, { description, priority, tags });

    // Clear inputs
    elements.taskTitleInput.value = '';
    elements.taskDescriptionInput.value = '';
    elements.taskPrioritySelect.value = 'medium';
    elements.taskTagsInput.value = '';

    showToast('Task created successfully!', 'success');
    await loadTasks();
  } catch (error) {
    // Error already shown by apiCall
  }
}

async function handleToggleComplete(id, completed) {
  try {
    await toggleTaskComplete(id, completed);
    await loadTasks();
    showToast(completed ? 'Task reopened!' : 'Task completed!', 'success');
  } catch (error) {
    // Error already shown by apiCall
  }
}

async function handleDeleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    await deleteTask(id);
    showToast('Task deleted successfully!', 'success');
    await loadTasks();
  } catch (error) {
    // Error already shown by apiCall
  }
}

function handleEditTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  editingTaskId = id;
  elements.editTaskTitle.value = task.title;
  elements.editTaskDescription.value = task.description || '';
  elements.editTaskPriority.value = task.priority;

  // Render tags
  renderEditTags(task.tags);

  elements.modal.classList.remove('hidden');
}

async function handleSaveEdit() {
  if (!editingTaskId) return;

  const title = elements.editTaskTitle.value.trim();
  if (!title) {
    showToast('Please enter a task title', 'error');
    return;
  }

  const updates = {
    title,
    description: elements.editTaskDescription.value.trim(),
    priority: elements.editTaskPriority.value
  };

  try {
    await updateTask(editingTaskId, updates);
    showToast('Task updated successfully!', 'success');
    closeModal();
    await loadTasks();
  } catch (error) {
    // Error already shown by apiCall
  }
}

function handleAddTagInModal() {
  const tag = elements.editTaskTagsInput.value.trim();
  if (!tag) return;

  if (!editingTaskId) return;

  addTagToTask(editingTaskId, tag)
    .then(() => {
      elements.editTaskTagsInput.value = '';
      return loadTasks();
    })
    .then(() => {
      const task = tasks.find(t => t.id === editingTaskId);
      if (task) renderEditTags(task.tags);
      showToast('Tag added!', 'success');
    })
    .catch(() => {
      // Error already shown by apiCall
    });
}

async function handleRemoveTag(id, tag) {
  try {
    await removeTagFromTask(id, tag);
    await loadTasks();

    // If modal is open for this task, update tags display
    if (editingTaskId === id) {
      const task = tasks.find(t => t.id === id);
      if (task) renderEditTags(task.tags);
    }

    showToast('Tag removed!', 'success');
  } catch (error) {
    // Error already shown by apiCall
  }
}

function handleStatusFilter(btn) {
  document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  currentFilters.status = btn.dataset.filter;
  renderTasks();
}

function handlePriorityFilter(btn) {
  document.querySelectorAll('.filter-btn[data-priority]').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  currentFilters.priority = btn.dataset.priority;
  renderTasks();
}

function handleSortChange(e) {
  const [sortBy, order] = e.target.value.split('-');
  currentFilters.sortBy = sortBy;
  currentFilters.order = order;
  renderTasks();
}

function handleSearch(e) {
  currentFilters.search = e.target.value.trim().toLowerCase();
  renderTasks();
}

async function handleExportJSON() {
  window.open(`${API_BASE}/export/json`, '_blank');
}

async function handleExportCSV() {
  window.open(`${API_BASE}/export/csv`, '_blank');
}

// Rendering Functions
function renderTasks() {
  let filteredTasks = [...tasks];

  // Apply status filter
  if (currentFilters.status === 'active') {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  } else if (currentFilters.status === 'completed') {
    filteredTasks = filteredTasks.filter(t => t.completed);
  }

  // Apply priority filter
  if (currentFilters.priority !== 'all') {
    filteredTasks = filteredTasks.filter(t => t.priority === currentFilters.priority);
  }

  // Apply search filter
  if (currentFilters.search) {
    filteredTasks = filteredTasks.filter(t => {
      const searchLower = currentFilters.search;
      return t.title.toLowerCase().includes(searchLower) ||
             (t.description && t.description.toLowerCase().includes(searchLower)) ||
             t.tags.some(tag => tag.toLowerCase().includes(searchLower));
    });
  }

  // Apply sorting
  filteredTasks.sort((a, b) => {
    let comparison = 0;

    if (currentFilters.sortBy === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (currentFilters.sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else {
      // createdAt
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }

    return currentFilters.order === 'asc' ? comparison : -comparison;
  });

  // Render
  if (filteredTasks.length === 0) {
    elements.taskList.innerHTML = '';
    elements.emptyState.style.display = 'block';
  } else {
    elements.emptyState.style.display = 'none';
    elements.taskList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');

    // Attach event listeners
    filteredTasks.forEach(task => {
      const checkbox = document.getElementById(`task-checkbox-${task.id}`);
      const editBtn = document.getElementById(`task-edit-${task.id}`);
      const deleteBtn = document.getElementById(`task-delete-${task.id}`);

      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          handleToggleComplete(task.id, task.completed);
        });
      }

      if (editBtn) {
        editBtn.addEventListener('click', () => handleEditTask(task.id));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));
      }
    });
  }
}

function createTaskHTML(task) {
  const date = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <div class="task-item ${task.completed ? 'completed' : ''}">
      <input
        type="checkbox"
        class="task-checkbox"
        id="task-checkbox-${task.id}"
        ${task.completed ? 'checked' : ''}
      >
      <div class="task-content">
        <div class="task-header">
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
        </div>
        ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
        <div class="task-meta">
          <span class="task-priority ${task.priority}">${task.priority}</span>
          ${task.tags.length > 0 ? `
            <div class="task-tags">
              ${task.tags.map(tag => `<span class="task-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
          ` : ''}
          <span class="task-date">${date}</span>
        </div>
      </div>
      <div class="task-actions">
        <button id="task-edit-${task.id}" class="btn btn-secondary btn-small">Edit</button>
        <button id="task-delete-${task.id}" class="btn btn-danger btn-small">Delete</button>
      </div>
    </div>
  `;
}

function renderEditTags(tags) {
  elements.editTaskTags.innerHTML = tags.map(tag => `
    <div class="tag-item">
      ${escapeHtml(tag)}
      <button class="tag-remove" onclick="handleRemoveTag('${editingTaskId}', '${escapeHtml(tag)}')">×</button>
    </div>
  `).join('');
}

function updateStats(stats) {
  elements.statTotal.textContent = stats.total;
  elements.statCompleted.textContent = stats.completed;
  elements.statIncomplete.textContent = stats.incomplete;
  elements.statHigh.textContent = stats.byPriority.high;
}

// Modal Functions
function closeModal() {
  elements.modal.classList.add('hidden');
  editingTaskId = null;
}

// Toast Functions
function showToast(message, type = 'success') {
  elements.toast.textContent = message;
  elements.toast.className = `toast ${type}`;

  setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 3000);
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions globally available for inline handlers
window.handleRemoveTag = handleRemoveTag;
