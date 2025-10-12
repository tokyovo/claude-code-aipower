/**
 * Example Test: Filtering and Search Functionality
 *
 * This test demonstrates testing filter and search features using Playwright.
 * Generated as an example for the Claude Code Workshop.
 *
 * To run: npx playwright test example-filtering.spec.js
 */

const { test, expect } = require('@playwright/test');

test.describe('Filtering and Search', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to TaskMaster Pro
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#task-title-input');

    // Create test data: 3 tasks with different states and priorities
    // Task 1: High priority, incomplete
    await page.fill('#task-title-input', 'High priority task');
    await page.selectOption('#task-priority-select', 'high');
    await page.click('#add-task-btn');
    await page.waitForTimeout(300);

    // Task 2: Medium priority, complete
    await page.fill('#task-title-input', 'Medium priority task');
    await page.selectOption('#task-priority-select', 'medium');
    await page.click('#add-task-btn');
    await page.waitForTimeout(300);

    // Mark task 2 as complete
    await page.locator('.task-checkbox').nth(1).click();
    await page.waitForTimeout(300);

    // Task 3: Low priority, incomplete
    await page.fill('#task-title-input', 'Low priority task');
    await page.selectOption('#task-priority-select', 'low');
    await page.click('#add-task-btn');
    await page.waitForTimeout(300);
  });

  test('should filter by status - Active', async ({ page }) => {
    // Click "Active" filter button
    await page.click('[data-filter="active"]');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show only incomplete tasks (2 tasks)
    await expect(page.locator('.task-item')).toHaveCount(2);

    // Verify active filter is highlighted
    await expect(page.locator('[data-filter="active"]')).toHaveClass(/active/);
  });

  test('should filter by status - Completed', async ({ page }) => {
    // Click "Completed" filter button
    await page.click('[data-filter="completed"]');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show only completed tasks (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);

    // Verify task is completed
    await expect(page.locator('.task-item')).toHaveClass(/completed/);

    // Verify completed filter is highlighted
    await expect(page.locator('[data-filter="completed"]')).toHaveClass(/active/);
  });

  test('should filter by status - All', async ({ page }) => {
    // Click "Completed" first
    await page.click('[data-filter="completed"]');
    await page.waitForTimeout(300);

    // Then click "All" filter button
    await page.click('[data-filter="all"]');
    await page.waitForTimeout(300);

    // Should show all tasks (3 tasks)
    await expect(page.locator('.task-item')).toHaveCount(3);

    // Verify all filter is highlighted
    await expect(page.locator('[data-filter="all"]')).toHaveClass(/active/);
  });

  test('should filter by priority - High', async ({ page }) => {
    // Click "High" priority filter
    await page.click('[data-priority="high"]');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show only high priority tasks (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-priority.high')).toBeVisible();

    // Verify high filter is highlighted
    await expect(page.locator('[data-priority="high"]')).toHaveClass(/active/);
  });

  test('should filter by priority - Medium', async ({ page }) => {
    // Click "Medium" priority filter
    await page.click('[data-priority="medium"]');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show only medium priority tasks (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-priority.medium')).toBeVisible();
  });

  test('should filter by priority - Low', async ({ page }) => {
    // Click "Low" priority filter
    await page.click('[data-priority="low"]');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show only low priority tasks (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-priority.low')).toBeVisible();
  });

  test('should combine status and priority filters', async ({ page }) => {
    // Filter by Active status
    await page.click('[data-filter="active"]');
    await page.waitForTimeout(300);

    // Then filter by High priority
    await page.click('[data-priority="high"]');
    await page.waitForTimeout(500);

    // Should show only active + high priority tasks (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-priority.high')).toBeVisible();
    await expect(page.locator('.task-item.completed')).toHaveCount(0);
  });

  test('should search tasks by title', async ({ page }) => {
    // Type search query
    await page.fill('#search-input', 'High');

    // Wait for search to filter
    await page.waitForTimeout(500);

    // Should show only tasks matching "High" (1 task)
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-title').first()).toContainText('High');
  });

  test('should search tasks case-insensitively', async ({ page }) => {
    // Type lowercase search query
    await page.fill('#search-input', 'medium');

    // Wait for search to filter
    await page.waitForTimeout(500);

    // Should find "Medium priority task"
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-title')).toContainText('Medium');
  });

  test('should show no results for non-matching search', async ({ page }) => {
    // Search for non-existent text
    await page.fill('#search-input', 'NonExistent');

    // Wait for search to filter
    await page.waitForTimeout(500);

    // Should show no tasks
    await expect(page.locator('.task-item')).toHaveCount(0);
    await expect(page.locator('#empty-state')).toBeVisible();
  });

  test('should clear search and show all tasks', async ({ page }) => {
    // Enter search query
    await page.fill('#search-input', 'High');
    await page.waitForTimeout(300);

    // Verify filtered
    await expect(page.locator('.task-item')).toHaveCount(1);

    // Clear search
    await page.fill('#search-input', '');
    await page.waitForTimeout(500);

    // Should show all tasks again
    await expect(page.locator('.task-item')).toHaveCount(3);
  });

  test('should sort tasks by newest first', async ({ page }) => {
    // Select "Newest First" sort option
    await page.selectOption('#sort-select', 'createdAt-desc');

    // Wait for sorting
    await page.waitForTimeout(500);

    // Verify order: Low → Medium → High (reverse creation order)
    const tasks = await page.locator('.task-title').allTextContents();
    expect(tasks[0]).toContain('Low');
    expect(tasks[1]).toContain('Medium');
    expect(tasks[2]).toContain('High');
  });

  test('should sort tasks by priority (high to low)', async ({ page }) => {
    // Select "Priority (High to Low)" sort option
    await page.selectOption('#sort-select', 'priority-desc');

    // Wait for sorting
    await page.waitForTimeout(500);

    // Verify order: High → Medium → Low
    const tasks = await page.locator('.task-title').allTextContents();
    expect(tasks[0]).toContain('High');
    expect(tasks[1]).toContain('Medium');
    expect(tasks[2]).toContain('Low');
  });

  test('should sort tasks alphabetically (A-Z)', async ({ page }) => {
    // Select "Title (A-Z)" sort option
    await page.selectOption('#sort-select', 'title-asc');

    // Wait for sorting
    await page.waitForTimeout(500);

    // Verify alphabetical order
    const tasks = await page.locator('.task-title').allTextContents();
    expect(tasks[0]).toContain('High');
    expect(tasks[1]).toContain('Low');
    expect(tasks[2]).toContain('Medium');
  });

  test('should update statistics based on filters', async ({ page }) => {
    // Initially shows all tasks stats
    await expect(page.locator('#stat-total')).toHaveText('3');
    await expect(page.locator('#stat-completed')).toHaveText('1');
    await expect(page.locator('#stat-incomplete')).toHaveText('2');

    // Filter by active - stats should remain same (shows global stats)
    await page.click('[data-filter="active"]');
    await page.waitForTimeout(300);

    // Stats still show totals (not filtered counts)
    await expect(page.locator('#stat-total')).toHaveText('3');
    await expect(page.locator('#stat-completed')).toHaveText('1');
  });
});
