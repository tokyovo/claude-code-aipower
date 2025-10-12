# Playwright Tests for TaskMaster Pro

This folder contains example Playwright tests generated using Claude Code with Playwright MCP.

## Purpose

These tests demonstrate how to:
- Automate browser interactions with Playwright MCP
- Test the TaskMaster Pro web interface
- Generate test code from recorded actions
- Create reusable test scenarios

## Prerequisites

1. **Playwright MCP configured**: Ensure `.mcp.json` is set up in project root
2. **Web server running**: Start with `npm start` from demo-project folder
3. **Claude Code with MCP**: Restart Claude Code after MCP configuration

## Test Files

### example-task-creation.spec.js
Tests basic task CRUD operations:
- Creating tasks with different priorities
- Verifying tasks appear in the list
- Editing task details
- Deleting tasks

### example-filtering.spec.js
Tests filter functionality:
- Status filters (All/Active/Completed)
- Priority filters (High/Medium/Low)
- Search functionality
- Tag filtering

### example-export.spec.js
Tests export features:
- Export to JSON format
- Export to CSV format
- Verify downloaded file content

## How to Generate Tests

### Using Claude Code with Playwright MCP

1. **Start recording**:
   ```
   Start a Playwright codegen session
   ```

2. **Perform actions manually** in your browser:
   - Navigate to http://localhost:3000
   - Create, edit, or interact with tasks
   - Test filters and features

3. **End recording**:
   ```
   End the codegen session and save the test file
   ```

4. **Review generated code**:
   - Check CSS selectors
   - Verify test assertions
   - Add additional verification steps

## Running Tests Manually

These are example tests for learning purposes. To run them as actual Playwright tests:

1. Install Playwright:
   ```bash
   npm install -D @playwright/test
   ```

2. Initialize Playwright config:
   ```bash
   npx playwright init
   ```

3. Run tests:
   ```bash
   npx playwright test
   ```

4. View test report:
   ```bash
   npx playwright show-report
   ```

## Test Structure

Each test file follows this pattern:

```javascript
// Import Playwright
const { test, expect } = require('@playwright/test');

// Define test suite
test.describe('Feature Name', () => {

  // Setup - runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  // Individual test case
  test('should do something', async ({ page }) => {
    // Arrange: Set up test data

    // Act: Perform actions
    await page.fill('#input', 'value');
    await page.click('#button');

    // Assert: Verify results
    await expect(page.locator('#result')).toBeVisible();
  });
});
```

## Common Playwright Patterns

### Filling Forms
```javascript
await page.fill('#task-title-input', 'My Task');
await page.selectOption('#task-priority-select', 'high');
await page.click('#add-task-btn');
```

### Waiting for Elements
```javascript
await page.waitForSelector('.task-item');
await expect(page.locator('.task-title')).toHaveText('My Task');
```

### Taking Screenshots
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### Checking Visibility
```javascript
await expect(page.locator('#empty-state')).toBeHidden();
await expect(page.locator('.task-list')).toBeVisible();
```

## Best Practices

1. **Use data-testid attributes**: Add `data-testid` to elements for stable selectors
2. **Wait for elements**: Use `waitForSelector` before interacting
3. **Verify state changes**: Assert before and after actions
4. **Take screenshots on failure**: Helps debugging
5. **Clean up state**: Reset between tests for independence

## Debugging Tests

### View Browser
```bash
npx playwright test --headed
```

### Debug Mode
```bash
npx playwright test --debug
```

### Trace Viewer
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## Integration with CI/CD

Add to your GitHub Actions workflow:

```yaml
- name: Run Playwright tests
  run: |
    npm install
    npm start &
    npx playwright install
    npx playwright test
```

## Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright MCP Server](https://github.com/executeautomation/playwright-mcp-server)
- [TaskMaster Pro Web Interface Guide](../WEB_INTERFACE.md)
- [Session 5: MCP Demo](../../05-model-context-protocol/demo.md)

## Next Steps

1. **Generate your own tests**: Use Claude Code to record custom scenarios
2. **Expand test coverage**: Add tests for edge cases
3. **Create test suites**: Group related tests together
4. **Set up CI/CD**: Automate test runs on commits
5. **Share with team**: Document test scenarios for collaboration

Happy testing! 🎭
