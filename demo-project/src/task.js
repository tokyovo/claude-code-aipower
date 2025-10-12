/**
 * Task Model and Business Logic
 * Handles task creation, validation, and manipulation
 */

const { generateId } = require('./utils');

// Task priority levels
const PRIORITY_LEVELS = ['low', 'medium', 'high'];

/**
 * Creates a new task with validation
 * @param {string} title - The task title
 * @param {Object} options - Optional task properties
 * @param {string} [options.description=''] - Task description
 * @param {string} [options.priority='medium'] - Task priority (low/medium/high)
 * @param {string[]} [options.tags=[]] - Task tags
 * @returns {Object} The created task object
 * @throws {Error} If title is empty or priority is invalid
 *
 * @example
 * const task = createTask('Buy groceries', {
 *   description: 'Milk, eggs, bread',
 *   priority: 'high',
 *   tags: ['shopping', 'urgent']
 * });
 */
function createTask(title, options = {}) {
  // Validate title
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Task title is required and must be a non-empty string');
  }

  // Extract and validate options
  const {
    description = '',
    priority = 'medium',
    tags = []
  } = options;

  // Validate priority
  if (!PRIORITY_LEVELS.includes(priority)) {
    throw new Error(`Invalid priority. Must be one of: ${PRIORITY_LEVELS.join(', ')}`);
  }

  // Validate tags
  if (!Array.isArray(tags)) {
    throw new Error('Tags must be an array');
  }

  // Create the task object
  return {
    id: generateId(),
    title: title.trim(),
    description: description?.trim() || '',
    priority,
    tags: tags.map(tag => tag.trim()),
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
}

/**
 * Marks a task as completed
 * @param {Object} task - The task to complete
 * @returns {Object} The updated task
 * @throws {Error} If task is invalid or already completed
 *
 * @example
 * const completedTask = completeTask(task);
 */
function completeTask(task) {
  validateTask(task);

  if (task.completed) {
    throw new Error('Task is already completed');
  }

  return {
    ...task,
    completed: true,
    completedAt: new Date().toISOString()
  };
}

/**
 * Marks a task as incomplete (reopens it)
 * @param {Object} task - The task to reopen
 * @returns {Object} The updated task
 * @throws {Error} If task is invalid or not completed
 *
 * @example
 * const reopenedTask = reopenTask(completedTask);
 */
function reopenTask(task) {
  validateTask(task);

  if (!task.completed) {
    throw new Error('Task is not completed');
  }

  return {
    ...task,
    completed: false,
    completedAt: null
  };
}

/**
 * Updates task properties
 * @param {Object} task - The task to update
 * @param {Object} updates - Properties to update
 * @returns {Object} The updated task
 * @throws {Error} If updates are invalid
 *
 * @example
 * const updated = updateTask(task, {
 *   title: 'New title',
 *   priority: 'high'
 * });
 */
function updateTask(task, updates) {
  validateTask(task);

  // Validate updates
  if (updates.priority && !PRIORITY_LEVELS.includes(updates.priority)) {
    throw new Error(`Invalid priority. Must be one of: ${PRIORITY_LEVELS.join(', ')}`);
  }

  if (updates.title !== undefined && (!updates.title || updates.title.trim() === '')) {
    throw new Error('Task title cannot be empty');
  }

  if (updates.tags !== undefined && !Array.isArray(updates.tags)) {
    throw new Error('Tags must be an array');
  }

  // Don't allow direct modification of system fields
  const { id, createdAt, completedAt, ...allowedUpdates } = updates;

  return {
    ...task,
    ...allowedUpdates,
    title: updates.title ? updates.title.trim() : task.title,
    description: updates.description !== undefined ? updates.description.trim() : task.description,
    tags: updates.tags ? updates.tags.map(tag => tag.trim()) : task.tags
  };
}

/**
 * Validates a task object structure
 * @param {Object} task - The task to validate
 * @throws {Error} If task is invalid
 *
 * @example
 * validateTask(task); // throws if invalid
 */
function validateTask(task) {
  if (!task || typeof task !== 'object') {
    throw new Error('Task must be an object');
  }

  if (!task.id) {
    throw new Error('Task must have an id');
  }

  if (!task.title || typeof task.title !== 'string') {
    throw new Error('Task must have a valid title');
  }

  if (typeof task.completed !== 'boolean') {
    throw new Error('Task completed status must be a boolean');
  }
}

/**
 * Adds a tag to a task
 * @param {Object} task - The task
 * @param {string} tag - The tag to add
 * @returns {Object} Updated task
 * @throws {Error} If tag is invalid or already exists
 *
 * @example
 * const tagged = addTag(task, 'urgent');
 */
function addTag(task, tag) {
  validateTask(task);

  if (!tag || typeof tag !== 'string' || tag.trim() === '') {
    throw new Error('Tag must be a non-empty string');
  }

  const normalizedTag = tag.trim().toLowerCase();

  if (task.tags.map(t => t.toLowerCase()).includes(normalizedTag)) {
    throw new Error('Tag already exists on this task');
  }

  return {
    ...task,
    tags: [...task.tags, tag.trim()]
  };
}

/**
 * Removes a tag from a task
 * @param {Object} task - The task
 * @param {string} tag - The tag to remove
 * @returns {Object} Updated task
 * @throws {Error} If tag doesn't exist
 *
 * @example
 * const untagged = removeTag(task, 'urgent');
 */
function removeTag(task, tag) {
  validateTask(task);

  const normalizedTag = tag.trim().toLowerCase();
  const tagIndex = task.tags.findIndex(t => t.toLowerCase() === normalizedTag);

  if (tagIndex === -1) {
    throw new Error('Tag not found on this task');
  }

  return {
    ...task,
    tags: task.tags.filter((_, index) => index !== tagIndex)
  };
}

module.exports = {
  PRIORITY_LEVELS,
  createTask,
  completeTask,
  reopenTask,
  updateTask,
  validateTask,
  addTag,
  removeTag
};
