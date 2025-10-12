/**
 * Example Test: Export Functionality
 *
 * This test demonstrates testing export features using Playwright.
 * Generated as an example for the Claude Code Workshop.
 *
 * To run: npx playwright test example-export.spec.js
 */

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Export Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to TaskMaster Pro
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#task-title-input');

    // Create sample tasks for export
    const tasks = [
      { title: 'Task 1', description: 'First task', priority: 'high', tags: 'urgent,work' },
      { title: 'Task 2', description: 'Second task', priority: 'medium', tags: 'personal' },
      { title: 'Task 3', description: 'Third task', priority: 'low', tags: 'later' }
    ];

    for (const task of tasks) {
      await page.fill('#task-title-input', task.title);
      await page.fill('#task-description-input', task.description);
      await page.selectOption('#task-priority-select', task.priority);
      await page.fill('#task-tags-input', task.tags);
      await page.click('#add-task-btn');
      await page.waitForTimeout(300);
    }

    // Mark first task as complete
    await page.locator('.task-checkbox').first().click();
    await page.waitForTimeout(300);
  });

  test('should have export buttons visible', async ({ page }) => {
    // Verify export buttons exist
    await expect(page.locator('#export-json-btn')).toBeVisible();
    await expect(page.locator('#export-csv-btn')).toBeVisible();

    // Verify button text
    await expect(page.locator('#export-json-btn')).toContainText('JSON');
    await expect(page.locator('#export-csv-btn')).toContainText('CSV');
  });

  test('should initiate JSON export download', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Click export JSON button
    await page.click('#export-json-btn');

    // Wait for download to start
    const download = await downloadPromise;

    // Verify download filename
    expect(download.suggestedFilename()).toBe('tasks.json');

    // Save and verify file content
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Read and parse JSON
    const fileContent = fs.readFileSync(downloadPath, 'utf-8');
    const tasks = JSON.parse(fileContent);

    // Verify JSON structure
    expect(Array.isArray(tasks)).toBeTruthy();
    expect(tasks.length).toBe(3);

    // Verify first task data
    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0]).toHaveProperty('title');
    expect(tasks[0]).toHaveProperty('description');
    expect(tasks[0]).toHaveProperty('priority');
    expect(tasks[0]).toHaveProperty('completed');
    expect(tasks[0]).toHaveProperty('tags');

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should initiate CSV export download', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Click export CSV button
    await page.click('#export-csv-btn');

    // Wait for download to start
    const download = await downloadPromise;

    // Verify download filename
    expect(download.suggestedFilename()).toBe('tasks.csv');

    // Save and verify file content
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Read CSV content
    const fileContent = fs.readFileSync(downloadPath, 'utf-8');
    const lines = fileContent.split('\n');

    // Verify CSV structure
    expect(lines.length).toBeGreaterThanOrEqual(4); // Header + 3 tasks

    // Verify CSV header
    expect(lines[0]).toContain('id,title,description,priority,completed,tags,createdAt,completedAt');

    // Verify first data row contains expected values
    expect(lines[1]).toContain('Task 1');
    expect(lines[1]).toContain('First task');
    expect(lines[1]).toContain('high');

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should export correct data for completed tasks', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Export JSON
    await page.click('#export-json-btn');
    const download = await downloadPromise;

    // Save and read file
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Parse JSON
    const tasks = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'));

    // Find completed task
    const completedTask = tasks.find(t => t.completed === true);

    // Verify completed task has completedAt timestamp
    expect(completedTask).toBeDefined();
    expect(completedTask.completed).toBe(true);
    expect(completedTask.completedAt).not.toBeNull();

    // Verify incomplete tasks don't have completedAt
    const incompleteTasks = tasks.filter(t => !t.completed);
    incompleteTasks.forEach(task => {
      expect(task.completedAt).toBeNull();
    });

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should export all task properties correctly', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Export JSON
    await page.click('#export-json-btn');
    const download = await downloadPromise;

    // Save and read file
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Parse JSON
    const tasks = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'));

    // Verify each task has all required properties
    tasks.forEach(task => {
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('priority');
      expect(task).toHaveProperty('completed');
      expect(task).toHaveProperty('tags');
      expect(task).toHaveProperty('createdAt');
      expect(task).toHaveProperty('completedAt');

      // Verify data types
      expect(typeof task.id).toBe('string');
      expect(typeof task.title).toBe('string');
      expect(typeof task.description).toBe('string');
      expect(typeof task.priority).toBe('string');
      expect(typeof task.completed).toBe('boolean');
      expect(Array.isArray(task.tags)).toBeTruthy();

      // Verify priority is valid
      expect(['low', 'medium', 'high']).toContain(task.priority);
    });

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should export tags as array in JSON', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Export JSON
    await page.click('#export-json-btn');
    const download = await downloadPromise;

    // Save and read file
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Parse JSON
    const tasks = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'));

    // Find task with tags
    const taskWithTags = tasks.find(t => t.tags && t.tags.length > 0);

    // Verify tags structure
    expect(taskWithTags).toBeDefined();
    expect(Array.isArray(taskWithTags.tags)).toBeTruthy();
    expect(taskWithTags.tags.length).toBeGreaterThan(0);

    // Verify tag values
    taskWithTags.tags.forEach(tag => {
      expect(typeof tag).toBe('string');
      expect(tag.length).toBeGreaterThan(0);
    });

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should handle export with no tasks', async ({ page }) => {
    // Delete all tasks first
    const deleteButtons = await page.locator('.btn-danger');
    const count = await deleteButtons.count();

    // Set up dialog handler for confirmations
    page.on('dialog', dialog => dialog.accept());

    for (let i = 0; i < count; i++) {
      await page.locator('.btn-danger').first().click();
      await page.waitForTimeout(300);
    }

    // Verify no tasks
    await expect(page.locator('#empty-state')).toBeVisible();

    // Set up download listener
    const downloadPromise = page.waitForEvent('download');

    // Export JSON
    await page.click('#export-json-btn');
    const download = await downloadPromise;

    // Save and read file
    const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Parse JSON
    const tasks = JSON.parse(fs.readFileSync(downloadPath, 'utf-8'));

    // Verify empty array
    expect(Array.isArray(tasks)).toBeTruthy();
    expect(tasks.length).toBe(0);

    // Clean up
    fs.unlinkSync(downloadPath);
  });
});

// Create downloads directory if it doesn't exist
test.beforeAll(() => {
  const downloadsDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
});

// Clean up downloads directory after all tests
test.afterAll(() => {
  const downloadsDir = path.join(__dirname, 'downloads');
  if (fs.existsSync(downloadsDir)) {
    const files = fs.readdirSync(downloadsDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(downloadsDir, file));
    });
    fs.rmdirSync(downloadsDir);
  }
});
