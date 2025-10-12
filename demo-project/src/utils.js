/**
 * Utility Functions
 * Helper functions used throughout the application
 */

const crypto = require('crypto');

/**
 * Generates a unique ID for tasks
 * @returns {string} A unique identifier
 *
 * @example
 * const id = generateId(); // 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
 */
function generateId() {
  return crypto.randomUUID();
}

/**
 * Formats a date string to a readable format
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} Formatted date
 *
 * @example
 * formatDate('2025-10-12T10:00:00.000Z'); // 'Oct 12, 2025, 10:00 AM'
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Filters tasks based on criteria
 * @param {Object[]} tasks - Array of tasks
 * @param {Object} criteria - Filter criteria
 * @param {boolean} [criteria.completed] - Filter by completion status
 * @param {string} [criteria.priority] - Filter by priority
 * @param {string} [criteria.tag] - Filter by tag
 * @param {string} [criteria.search] - Search in title/description
 * @returns {Object[]} Filtered tasks
 *
 * @example
 * const highPriority = filterTasks(tasks, { priority: 'high' });
 * const incomplete = filterTasks(tasks, { completed: false });
 * const tagged = filterTasks(tasks, { tag: 'urgent' });
 */
function filterTasks(tasks, criteria = {}) {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks must be an array');
  }

  return tasks.filter(task => {
    // Filter by completion status
    if (criteria.completed !== undefined && task.completed !== criteria.completed) {
      return false;
    }

    // Filter by priority
    if (criteria.priority && task.priority !== criteria.priority) {
      return false;
    }

    // Filter by tag
    if (criteria.tag) {
      const normalizedCriteria = criteria.tag.toLowerCase();
      const hasTag = task.tags.some(tag => tag.toLowerCase() === normalizedCriteria);
      if (!hasTag) return false;
    }

    // Search in title and description
    if (criteria.search) {
      const searchLower = criteria.search.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descMatch = task.description.toLowerCase().includes(searchLower);
      if (!titleMatch && !descMatch) return false;
    }

    return true;
  });
}

/**
 * Sorts tasks by various criteria
 * @param {Object[]} tasks - Array of tasks
 * @param {string} sortBy - Sort criteria (createdAt, priority, title)
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Object[]} Sorted tasks
 *
 * @example
 * const sorted = sortTasks(tasks, 'priority', 'desc');
 * const byDate = sortTasks(tasks, 'createdAt', 'asc');
 */
function sortTasks(tasks, sortBy = 'createdAt', order = 'asc') {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks must be an array');
  }

  if (!['asc', 'desc'].includes(order)) {
    throw new Error('Order must be "asc" or "desc"');
  }

  const priorityOrder = { low: 1, medium: 2, high: 3 };

  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'priority':
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Exports tasks to JSON format
 * @param {Object[]} tasks - Array of tasks
 * @returns {string} JSON string
 *
 * @example
 * const json = exportToJSON(tasks);
 */
function exportToJSON(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks must be an array');
  }

  return JSON.stringify(tasks, null, 2);
}

/**
 * Exports tasks to CSV format
 * @param {Object[]} tasks - Array of tasks
 * @returns {string} CSV string
 *
 * @example
 * const csv = exportToCSV(tasks);
 */
function exportToCSV(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks must be an array');
  }

  if (tasks.length === 0) {
    return 'id,title,description,priority,completed,tags,createdAt,completedAt\n';
  }

  const headers = 'id,title,description,priority,completed,tags,createdAt,completedAt';
  const rows = tasks.map(task => {
    return [
      task.id,
      `"${task.title.replace(/"/g, '""')}"`,
      `"${task.description.replace(/"/g, '""')}"`,
      task.priority,
      task.completed,
      `"${task.tags.join(', ')}"`,
      task.createdAt,
      task.completedAt || ''
    ].join(',');
  });

  return [headers, ...rows].join('\n');
}

/**
 * Imports tasks from JSON string
 * @param {string} jsonString - JSON string of tasks
 * @returns {Object[]} Array of tasks
 * @throws {Error} If JSON is invalid
 *
 * @example
 * const tasks = importFromJSON(jsonString);
 */
function importFromJSON(jsonString) {
  if (typeof jsonString !== 'string') {
    throw new Error('Input must be a string');
  }

  try {
    const tasks = JSON.parse(jsonString);
    if (!Array.isArray(tasks)) {
      throw new Error('JSON must contain an array of tasks');
    }
    return tasks;
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}

/**
 * Gets task statistics
 * @param {Object[]} tasks - Array of tasks
 * @returns {Object} Statistics object
 *
 * @example
 * const stats = getTaskStats(tasks);
 * // { total: 10, completed: 3, incomplete: 7, byPriority: {...} }
 */
function getTaskStats(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error('Tasks must be an array');
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    incomplete: tasks.filter(t => !t.completed).length,
    byPriority: {
      low: tasks.filter(t => t.priority === 'low').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      high: tasks.filter(t => t.priority === 'high').length
    },
    byTag: {}
  };

  // Count tasks by tag
  tasks.forEach(task => {
    task.tags.forEach(tag => {
      stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
    });
  });

  return stats;
}

module.exports = {
  generateId,
  formatDate,
  filterTasks,
  sortTasks,
  exportToJSON,
  exportToCSV,
  importFromJSON,
  getTaskStats
};
