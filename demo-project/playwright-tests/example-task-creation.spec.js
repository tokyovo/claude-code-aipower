/**
 * Example Test: Task Creation and Management
 *
 * This test demonstrates basic CRUD operations on tasks using Playwright.
 * Generated as an example for the Claude Code Workshop.
 *
 * To run: npx playwright test example-task-creation.spec.js
 */

const { test, expect } = require('@playwright/test');

test.describe('Task Creation and Management', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to TaskMaster Pro
    await page.goto('http://localhost:3000');

    // Wait for page to load
    await page.waitForSelector('#task-title-input');
  });

  test('should create a new task with high priority', async ({ page }) => {
    // Fill in task details
    await page.fill('#task-title-input', 'Complete workshop exercises');
    await page.fill('#task-description-input', 'Finish all Claude Code workshop exercises');
    await page.selectOption('#task-priority-select', 'high');
    await page.fill('#task-tags-input', 'learning, workshop');

    // Click add button
    await page.click('#add-task-btn');

    // Wait for task to appear
    await page.waitForSelector('.task-item');

    // Verify task appears in the list
    await expect(page.locator('.task-title').first()).toHaveText('Complete workshop exercises');
    await expect(page.locator('.task-description').first()).toContainText('Finish all Claude Code workshop exercises');
    await expect(page.locator('.task-priority.high').first()).toBeVisible();

    // Verify tags are displayed
    await expect(page.locator('.task-tag').first()).toContainText('learning');
    await expect(page.locator('.task-tag').nth(1)).toContainText('workshop');

    // Verify statistics updated
    await expect(page.locator('#stat-total')).toHaveText('1');
    await expect(page.locator('#stat-incomplete')).toHaveText('1');
    await expect(page.locator('#stat-high')).toHaveText('1');
  });

  test('should create multiple tasks with different priorities', async ({ page }) => {
    // Create high priority task
    await page.fill('#task-title-input', 'High priority task');
    await page.selectOption('#task-priority-select', 'high');
    await page.click('#add-task-btn');

    // Wait for first task
    await page.waitForSelector('.task-item');

    // Create medium priority task
    await page.fill('#task-title-input', 'Medium priority task');
    await page.selectOption('#task-priority-select', 'medium');
    await page.click('#add-task-btn');

    // Wait for second task
    await page.waitForTimeout(500);

    // Create low priority task
    await page.fill('#task-title-input', 'Low priority task');
    await page.selectOption('#task-priority-select', 'low');
    await page.click('#add-task-btn');

    // Wait for third task
    await page.waitForTimeout(500);

    // Verify all tasks are displayed
    await expect(page.locator('.task-item')).toHaveCount(3);

    // Verify statistics
    await expect(page.locator('#stat-total')).toHaveText('3');
    await expect(page.locator('#stat-incomplete')).toHaveText('3');
  });

  test('should mark task as complete', async ({ page }) => {
    // Create a task
    await page.fill('#task-title-input', 'Task to complete');
    await page.click('#add-task-btn');

    // Wait for task
    await page.waitForSelector('.task-item');

    // Click the checkbox to mark complete
    await page.click('.task-checkbox');

    // Wait for state change
    await page.waitForTimeout(500);

    // Verify task appears completed
    await expect(page.locator('.task-item')).toHaveClass(/completed/);
    await expect(page.locator('.task-checkbox')).toBeChecked();

    // Verify statistics updated
    await expect(page.locator('#stat-completed')).toHaveText('1');
    await expect(page.locator('#stat-incomplete')).toHaveText('0');
  });

  test('should edit task details', async ({ page }) => {
    // Create a task
    await page.fill('#task-title-input', 'Original Title');
    await page.fill('#task-description-input', 'Original description');
    await page.click('#add-task-btn');

    // Wait for task
    await page.waitForSelector('.task-item');

    // Click edit button
    await page.click('.task-item .btn-secondary');

    // Wait for modal
    await page.waitForSelector('#edit-modal:not(.hidden)');

    // Edit task details
    await page.fill('#edit-task-title', 'Updated Title');
    await page.fill('#edit-task-description', 'Updated description');
    await page.selectOption('#edit-task-priority', 'high');

    // Save changes
    await page.click('#modal-save-btn');

    // Wait for modal to close
    await page.waitForSelector('#edit-modal.hidden');

    // Verify changes
    await expect(page.locator('.task-title')).toHaveText('Updated Title');
    await expect(page.locator('.task-description')).toContainText('Updated description');
    await expect(page.locator('.task-priority.high')).toBeVisible();
  });

  test('should delete a task', async ({ page }) => {
    // Create a task
    await page.fill('#task-title-input', 'Task to delete');
    await page.click('#add-task-btn');

    // Wait for task
    await page.waitForSelector('.task-item');

    // Setup dialog handler
    page.on('dialog', dialog => dialog.accept());

    // Click delete button
    await page.click('.task-item .btn-danger');

    // Wait for deletion
    await page.waitForTimeout(500);

    // Verify task is removed
    await expect(page.locator('.task-item')).toHaveCount(0);
    await expect(page.locator('#empty-state')).toBeVisible();

    // Verify statistics
    await expect(page.locator('#stat-total')).toHaveText('0');
  });

  test('should show empty state when no tasks exist', async ({ page }) => {
    // Verify empty state is visible initially
    await expect(page.locator('#empty-state')).toBeVisible();
    await expect(page.locator('#empty-state h2')).toHaveText('No tasks yet!');

    // Create a task
    await page.fill('#task-title-input', 'First task');
    await page.click('#add-task-btn');

    // Wait for task
    await page.waitForSelector('.task-item');

    // Verify empty state is hidden
    await expect(page.locator('#empty-state')).toBeHidden();
  });

  test('should validate required task title', async ({ page }) => {
    // Try to create task without title
    await page.click('#add-task-btn');

    // Wait for toast notification
    await page.waitForSelector('.toast:not(.hidden)');

    // Verify error message
    await expect(page.locator('.toast')).toContainText('title');

    // Verify no task was created
    await expect(page.locator('.task-item')).toHaveCount(0);
  });
});
