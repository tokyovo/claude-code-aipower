/**
 * Task Manager
 * Main application logic for managing tasks
 */

const {
  createTask,
  completeTask,
  reopenTask,
  updateTask,
  addTag,
  removeTag
} = require('./task');

const {
  filterTasks,
  sortTasks,
  exportToJSON,
  exportToCSV,
  importFromJSON,
  getTaskStats
} = require('./utils');

/**
 * TaskManager class
 * Manages a collection of tasks with various operations
 */
class TaskManager {
  /**
   * Creates a new TaskManager instance
   */
  constructor() {
    this.tasks = [];
  }

  /**
   * Adds a new task
   * @param {string} title - Task title
   * @param {Object} options - Task options
   * @returns {Object} The created task
   *
   * @example
   * const task = manager.add('Buy groceries', { priority: 'high' });
   */
  add(title, options = {}) {
    const task = createTask(title, options);
    this.tasks.push(task);
    return task;
  }

  /**
   * Finds a task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} The task or null if not found
   *
   * @example
   * const task = manager.findById('abc-123');
   */
  findById(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Removes a task by ID
   * @param {string} id - Task ID
   * @returns {boolean} True if removed, false if not found
   *
   * @example
   * const removed = manager.remove('abc-123');
   */
  remove(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  /**
   * Marks a task as completed
   * @param {string} id - Task ID
   * @returns {Object} The completed task
   * @throws {Error} If task not found
   *
   * @example
   * const task = manager.complete('abc-123');
   */
  complete(id) {
    const task = this.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const completedTask = completeTask(task);
    this._updateTask(id, completedTask);
    return completedTask;
  }

  /**
   * Reopens a completed task
   * @param {string} id - Task ID
   * @returns {Object} The reopened task
   * @throws {Error} If task not found
   *
   * @example
   * const task = manager.reopen('abc-123');
   */
  reopen(id) {
    const task = this.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const reopenedTask = reopenTask(task);
    this._updateTask(id, reopenedTask);
    return reopenedTask;
  }

  /**
   * Updates a task
   * @param {string} id - Task ID
   * @param {Object} updates - Properties to update
   * @returns {Object} The updated task
   * @throws {Error} If task not found
   *
   * @example
   * const task = manager.update('abc-123', { title: 'New title' });
   */
  update(id, updates) {
    const task = this.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask = updateTask(task, updates);
    this._updateTask(id, updatedTask);
    return updatedTask;
  }

  /**
   * Adds a tag to a task
   * @param {string} id - Task ID
   * @param {string} tag - Tag to add
   * @returns {Object} The updated task
   * @throws {Error} If task not found
   *
   * @example
   * const task = manager.addTag('abc-123', 'urgent');
   */
  addTag(id, tag) {
    const task = this.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const taggedTask = addTag(task, tag);
    this._updateTask(id, taggedTask);
    return taggedTask;
  }

  /**
   * Removes a tag from a task
   * @param {string} id - Task ID
   * @param {string} tag - Tag to remove
   * @returns {Object} The updated task
   * @throws {Error} If task not found
   *
   * @example
   * const task = manager.removeTag('abc-123', 'urgent');
   */
  removeTag(id, tag) {
    const task = this.findById(id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    const untaggedTask = removeTag(task, tag);
    this._updateTask(id, untaggedTask);
    return untaggedTask;
  }

  /**
   * Lists all tasks with optional filtering and sorting
   * @param {Object} options - Filter and sort options
   * @returns {Object[]} Array of tasks
   *
   * @example
   * const tasks = manager.list({ completed: false, sortBy: 'priority' });
   */
  list(options = {}) {
    let result = [...this.tasks];

    // Apply filters
    const { sortBy, order, ...filterCriteria } = options;
    if (Object.keys(filterCriteria).length > 0) {
      result = filterTasks(result, filterCriteria);
    }

    // Apply sorting
    if (sortBy) {
      result = sortTasks(result, sortBy, order || 'asc');
    }

    return result;
  }

  /**
   * Searches tasks by text
   * @param {string} query - Search query
   * @returns {Object[]} Matching tasks
   *
   * @example
   * const tasks = manager.search('groceries');
   */
  search(query) {
    if (!query || typeof query !== 'string') {
      throw new Error('Search query must be a non-empty string');
    }

    return filterTasks(this.tasks, { search: query });
  }

  /**
   * Gets task statistics
   * @returns {Object} Statistics object
   *
   * @example
   * const stats = manager.getStats();
   */
  getStats() {
    return getTaskStats(this.tasks);
  }

  /**
   * Exports tasks to JSON
   * @returns {string} JSON string
   *
   * @example
   * const json = manager.exportJSON();
   */
  exportJSON() {
    return exportToJSON(this.tasks);
  }

  /**
   * Exports tasks to CSV
   * @returns {string} CSV string
   *
   * @example
   * const csv = manager.exportCSV();
   */
  exportCSV() {
    return exportToCSV(this.tasks);
  }

  /**
   * Imports tasks from JSON
   * @param {string} jsonString - JSON string of tasks
   * @param {boolean} merge - Whether to merge or replace tasks
   * @returns {number} Number of tasks imported
   *
   * @example
   * const count = manager.importJSON(jsonString, true);
   */
  importJSON(jsonString, merge = false) {
    const importedTasks = importFromJSON(jsonString);

    if (merge) {
      this.tasks.push(...importedTasks);
    } else {
      this.tasks = importedTasks;
    }

    return importedTasks.length;
  }

  /**
   * Clears all tasks
   * @returns {number} Number of tasks cleared
   *
   * @example
   * const count = manager.clear();
   */
  clear() {
    const count = this.tasks.length;
    this.tasks = [];
    return count;
  }

  /**
   * Gets the total number of tasks
   * @returns {number} Task count
   *
   * @example
   * const count = manager.count();
   */
  count() {
    return this.tasks.length;
  }

  /**
   * Internal method to update a task in the tasks array
   * @private
   * @param {string} id - Task ID
   * @param {Object} updatedTask - The updated task object
   */
  _updateTask(id, updatedTask) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}

module.exports = TaskManager;
