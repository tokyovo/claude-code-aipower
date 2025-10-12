/**
 * Task Tests
 * Sample test file demonstrating testing patterns for TaskMaster Pro
 */

const assert = require('assert');
const { createTask, completeTask, reopenTask, updateTask, addTag, removeTag, PRIORITY_LEVELS } = require('../src/task');

console.log('Running Task Tests...\n');

// Test: createTask - Happy Path
console.log('Test: createTask() with valid inputs');
try {
  const task = createTask('Buy groceries', {
    description: 'Milk, eggs, bread',
    priority: 'high',
    tags: ['shopping', 'urgent']
  });

  assert.strictEqual(task.title, 'Buy groceries');
  assert.strictEqual(task.description, 'Milk, eggs, bread');
  assert.strictEqual(task.priority, 'high');
  assert.deepStrictEqual(task.tags, ['shopping', 'urgent']);
  assert.strictEqual(task.completed, false);
  assert.ok(task.id);
  assert.ok(task.createdAt);
  assert.strictEqual(task.completedAt, null);

  console.log('  ✓ Creates task with all properties correctly\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: createTask - Default values
console.log('Test: createTask() with minimal inputs (defaults)');
try {
  const task = createTask('Simple task');

  assert.strictEqual(task.title, 'Simple task');
  assert.strictEqual(task.description, '');
  assert.strictEqual(task.priority, 'medium');
  assert.deepStrictEqual(task.tags, []);

  console.log('  ✓ Uses correct default values\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: createTask - Empty title error
console.log('Test: createTask() with empty title');
try {
  createTask('');
  console.error('  ✗ FAILED: Should have thrown error for empty title\n');
} catch (error) {
  assert.ok(error.message.includes('title'));
  console.log('  ✓ Throws error for empty title\n');
}

// Test: createTask - Invalid priority
console.log('Test: createTask() with invalid priority');
try {
  createTask('Task', { priority: 'urgent' });
  console.error('  ✗ FAILED: Should have thrown error for invalid priority\n');
} catch (error) {
  assert.ok(error.message.includes('priority'));
  console.log('  ✓ Throws error for invalid priority\n');
}

// Test: createTask - Trims whitespace
console.log('Test: createTask() trims whitespace');
try {
  const task = createTask('  Spaced task  ', {
    description: '  Spaced description  ',
    tags: ['  tag1  ', '  tag2  ']
  });

  assert.strictEqual(task.title, 'Spaced task');
  assert.strictEqual(task.description, 'Spaced description');
  assert.deepStrictEqual(task.tags, ['tag1', 'tag2']);

  console.log('  ✓ Trims whitespace from all text fields\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: completeTask - Happy Path
console.log('Test: completeTask() marks task as completed');
try {
  const task = createTask('Test task');
  const completed = completeTask(task);

  assert.strictEqual(completed.completed, true);
  assert.ok(completed.completedAt);
  assert.notStrictEqual(completed, task); // Should return new object (immutable)

  console.log('  ✓ Marks task as completed with timestamp\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: completeTask - Already completed error
console.log('Test: completeTask() on already completed task');
try {
  const task = createTask('Test task');
  const completed = completeTask(task);
  completeTask(completed); // Try to complete again

  console.error('  ✗ FAILED: Should have thrown error\n');
} catch (error) {
  assert.ok(error.message.includes('already completed'));
  console.log('  ✓ Throws error when already completed\n');
}

// Test: reopenTask - Happy Path
console.log('Test: reopenTask() reopens completed task');
try {
  const task = createTask('Test task');
  const completed = completeTask(task);
  const reopened = reopenTask(completed);

  assert.strictEqual(reopened.completed, false);
  assert.strictEqual(reopened.completedAt, null);

  console.log('  ✓ Reopens completed task\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: updateTask - Happy Path
console.log('Test: updateTask() updates task properties');
try {
  const task = createTask('Original title');
  const updated = updateTask(task, {
    title: 'Updated title',
    priority: 'high',
    description: 'New description'
  });

  assert.strictEqual(updated.title, 'Updated title');
  assert.strictEqual(updated.priority, 'high');
  assert.strictEqual(updated.description, 'New description');
  assert.strictEqual(updated.id, task.id); // ID should not change

  console.log('  ✓ Updates task properties correctly\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: updateTask - Cannot update system fields
console.log('Test: updateTask() ignores system fields');
try {
  const task = createTask('Test task');
  const originalId = task.id;
  const originalCreatedAt = task.createdAt;

  const updated = updateTask(task, {
    id: 'new-id',
    createdAt: '2020-01-01',
    completedAt: '2020-01-02'
  });

  assert.strictEqual(updated.id, originalId);
  assert.strictEqual(updated.createdAt, originalCreatedAt);

  console.log('  ✓ System fields (id, createdAt, completedAt) are protected\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: addTag - Happy Path
console.log('Test: addTag() adds a tag to task');
try {
  const task = createTask('Test task');
  const tagged = addTag(task, 'urgent');

  assert.strictEqual(tagged.tags.length, 1);
  assert.strictEqual(tagged.tags[0], 'urgent');

  console.log('  ✓ Adds tag successfully\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: addTag - Duplicate tag error
console.log('Test: addTag() prevents duplicate tags');
try {
  const task = createTask('Test task', { tags: ['urgent'] });
  addTag(task, 'urgent');

  console.error('  ✗ FAILED: Should have thrown error for duplicate tag\n');
} catch (error) {
  assert.ok(error.message.includes('already exists'));
  console.log('  ✓ Throws error for duplicate tags\n');
}

// Test: removeTag - Happy Path
console.log('Test: removeTag() removes a tag from task');
try {
  const task = createTask('Test task', { tags: ['urgent', 'work'] });
  const untagged = removeTag(task, 'urgent');

  assert.strictEqual(untagged.tags.length, 1);
  assert.strictEqual(untagged.tags[0], 'work');

  console.log('  ✓ Removes tag successfully\n');
} catch (error) {
  console.error('  ✗ FAILED:', error.message, '\n');
}

// Test: removeTag - Non-existent tag error
console.log('Test: removeTag() on non-existent tag');
try {
  const task = createTask('Test task');
  removeTag(task, 'nonexistent');

  console.error('  ✗ FAILED: Should have thrown error\n');
} catch (error) {
  assert.ok(error.message.includes('not found'));
  console.log('  ✓ Throws error when tag not found\n');
}

console.log('\n=================================');
console.log('All Task Tests Completed!');
console.log('=================================\n');
console.log('Run this test file with: node tests/task.test.js');
console.log('Or use: npm test\n');
