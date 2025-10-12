# Playwright MCP - Hands-On Demo

This guide provides practical demonstrations of using Playwright MCP with Claude Code to automate browser interactions and testing on the TaskMaster Pro web interface.

## Prerequisites

1. **TaskMaster Pro web server running**:
   ```bash
   cd demo-project
   npm install
   npm start
   ```
   Server should be running at http://localhost:3000

2. **Playwright MCP configured**: The `.mcp.json` file should already be configured in the project root

3. **Claude Code restarted**: Restart Claude Code after configuring MCP to load the Playwright tools

## Demo 1: Navigate and Screenshot

### Objective
Learn basic browser navigation and screenshot capture using Playwright MCP.

### Steps

1. **Ask Claude to navigate to the app**:
   ```
   Use Playwright to navigate to http://localhost:3000 and take a screenshot
   ```

2. **What Claude will do**:
   - Use `playwright_navigate` to open the web app
   - Use `playwright_screenshot` to capture the current page
   - Return the screenshot for you to view

3. **Expected Result**:
   - Screenshot showing the TaskMaster Pro interface
   - Statistics dashboard with 0 tasks
   - Empty task list with "No tasks yet!" message

### Learning Points
- `playwright_navigate`: Opens URLs in a browser
- `playwright_screenshot`: Captures visual state
- Screenshots are useful for debugging UI issues

---

## Demo 2: Create a Task via UI

### Objective
Automate task creation through the web interface.

### Steps

1. **Ask Claude**:
   ```
   Create a new task called "Buy groceries" with high priority using the web interface
   ```

2. **What Claude will do**:
   - Navigate to http://localhost:3000
   - Use `playwright_fill` to enter task title
   - Use `playwright_select` to set priority to "high"
   - Use `playwright_click` to click the "Add Task" button
   - Take a screenshot to verify

3. **Expected Result**:
   - Task appears in the task list
   - Statistics update to show 1 total task
   - High priority badge visible on the task

### Learning Points
- `playwright_fill`: Enters text into input fields
- `playwright_select`: Chooses options from dropdowns
- `playwright_click`: Clicks buttons and links
- Multiple MCP tool calls can be chained together

---

## Demo 3: Complete a Task Workflow

### Objective
Test a complete user journey from creation to completion.

### Steps

1. **Ask Claude**:
   ```
   Using Playwright:
   1. Create a task "Write documentation" with medium priority
   2. Mark it as complete by clicking the checkbox
   3. Take a screenshot showing the completed task
   ```

2. **What Claude will do**:
   - Create the task via form submission
   - Locate the checkbox for the new task
   - Click the checkbox to mark complete
   - Capture screenshot showing completed state

3. **Expected Result**:
   - Task appears with strikethrough text
   - Checkbox is checked
   - Statistics show 1 completed task
   - Task has faded/grey appearance

### Learning Points
- CSS selectors to locate specific elements
- Testing state changes in the UI
- Verifying visual feedback

---

## Demo 4: Test Filtering Functionality

### Objective
Verify that task filters work correctly.

### Steps

1. **Setup**:
   ```
   Create 3 tasks:
   - "Task 1" - high priority
   - "Task 2" - medium priority
   - "Task 3" - low priority
   Then mark "Task 1" as complete
   ```

2. **Ask Claude to test filters**:
   ```
   Test the filter buttons:
   1. Click "Active" filter and take screenshot
   2. Click "Completed" filter and take screenshot
   3. Click "High" priority filter and take screenshot
   ```

3. **Expected Results**:
   - Active filter: Shows only 2 incomplete tasks
   - Completed filter: Shows only 1 completed task
   - High priority filter: Shows only the high priority task

### Learning Points
- `playwright_click` for interactive elements
- Testing filter behavior
- Verifying correct UI updates

---

## Demo 5: Search and Export

### Objective
Test search functionality and export features.

### Steps

1. **Create test data**:
   ```
   Create tasks:
   - "Buy groceries"
   - "Buy books"
   - "Write code"
   ```

2. **Test search**:
   ```
   Use Playwright to:
   1. Type "Buy" in the search box
   2. Take a screenshot showing only matching tasks
   ```

3. **Test export**:
   ```
   Click the "Export JSON" button and verify the download
   ```

### Expected Results
- Search shows only tasks containing "Buy"
- Other tasks are hidden
- Export button triggers download

### Learning Points
- `playwright_fill` for search inputs
- Testing live search/filtering
- Handling file downloads

---

## Demo 6: Mobile Responsive Testing

### Objective
Test the responsive design on mobile viewport.

### Steps

1. **Ask Claude**:
   ```
   Navigate to the app with a mobile viewport (375x667) and take a screenshot
   ```

2. **What Claude will do**:
   - Navigate with custom viewport dimensions
   - Capture mobile layout screenshot

3. **Expected Result**:
   - Single column layout
   - Touch-friendly buttons
   - Responsive navigation

### Learning Points
- Testing responsive designs
- Mobile viewport simulation
- Cross-device compatibility

---

## Demo 7: Form Validation Testing

### Objective
Verify input validation works correctly.

### Steps

1. **Ask Claude**:
   ```
   Try to create a task with an empty title and see what happens
   ```

2. **What Claude will do**:
   - Leave title field empty
   - Click "Add Task" button
   - Capture any error messages or validation feedback

3. **Expected Result**:
   - Task is not created
   - Error message appears (toast notification)
   - Form remains in same state

### Learning Points
- Testing error handling
- Validating user input
- Error message verification

---

## Demo 8: Statistics Dashboard

### Objective
Verify that the statistics update correctly.

### Steps

1. **Ask Claude**:
   ```
   Create 5 tasks with mixed priorities, mark 2 as complete, then verify the statistics dashboard shows correct numbers
   ```

2. **What Claude will do**:
   - Create multiple tasks
   - Mark some as complete
   - Read statistics from the dashboard
   - Verify counts match expectations

3. **Expected Result**:
   - Total: 5 tasks
   - Completed: 2 tasks
   - Active: 3 tasks
   - Counts update in real-time

### Learning Points
- `playwright_get_visible_text`: Reading UI content
- Verifying calculated data
- Testing real-time updates

---

## Demo 9: Tag Management

### Objective
Test adding and removing tags from tasks.

### Steps

1. **Ask Claude**:
   ```
   1. Create a task "Project work"
   2. Edit the task to add tags "urgent" and "work"
   3. Remove the "urgent" tag
   4. Take screenshots at each step
   ```

2. **What Claude will do**:
   - Create task via form
   - Click edit button
   - Add tags in modal
   - Remove one tag
   - Verify changes

3. **Expected Result**:
   - Tags appear as colored badges
   - Tag removal works correctly
   - Modal updates reflect changes

### Learning Points
- Working with modals/dialogs
- Testing CRUD operations on nested data
- Multiple-step workflows

---

## Demo 10: Generate Automated Tests

### Objective
Use Playwright's code generation to create reusable tests.

### Steps

1. **Ask Claude**:
   ```
   Start a Playwright codegen session and record me creating a task
   ```

2. **Perform actions manually** while codegen records

3. **Ask Claude**:
   ```
   End the codegen session and save the test to playwright-tests/
   ```

4. **Expected Result**:
   - JavaScript test file generated
   - Test contains all your actions
   - Test can be run repeatedly

### Learning Points
- `start_codegen_session`: Begin recording
- `end_codegen_session`: Generate test file
- Test automation from manual actions

---

## Common Playwright MCP Tools

### Navigation
- `playwright_navigate(url)` - Go to a URL
- `playwright_go_back()` - Browser back button
- `playwright_go_forward()` - Browser forward button

### Interaction
- `playwright_click(selector)` - Click an element
- `playwright_fill(selector, value)` - Fill input field
- `playwright_select(selector, value)` - Select dropdown option
- `playwright_press_key(key)` - Press keyboard key
- `playwright_hover(selector)` - Hover over element
- `playwright_drag(source, target)` - Drag and drop

### Information
- `playwright_screenshot(name)` - Capture screenshot
- `playwright_get_visible_text()` - Get page text
- `playwright_get_visible_html()` - Get page HTML
- `playwright_console_logs()` - Read console output

### Testing
- `playwright_expect_response(id, url)` - Wait for network request
- `playwright_assert_response(id, value)` - Verify response
- `playwright_evaluate(script)` - Run JavaScript

### Code Generation
- `start_codegen_session(options)` - Start recording
- `end_codegen_session(sessionId)` - Save generated test
- `get_codegen_session(sessionId)` - Check session status

---

## Tips for Effective Demos

1. **Start the web server first**: Ensure http://localhost:3000 is running
2. **Use descriptive names**: Name screenshots clearly for easy reference
3. **Chain actions**: Combine multiple steps in one request
4. **Verify results**: Always capture screenshots after actions
5. **Clear state**: Refresh page between demos for clean state

## Troubleshooting

### Browser doesn't open
- Ensure Playwright MCP is configured in `.mcp.json`
- Restart Claude Code after configuration changes

### Elements not found
- Check CSS selectors match the actual HTML
- Use browser DevTools to inspect elements
- Try more specific selectors

### Actions don't work
- Wait for page to load completely
- Check if element is visible/enabled
- Verify no JavaScript errors in console

### Screenshots are blank
- Ensure page has finished loading
- Check viewport dimensions
- Try full-page screenshot option

---

## Next Steps

After completing these demos:

1. **Create your own tests**: Write custom test scenarios
2. **Automate workflows**: Use Playwright for repetitive tasks
3. **CI/CD Integration**: Add tests to your build pipeline
4. **Explore more tools**: Try other Playwright MCP features
5. **Share with team**: Document your test cases

---

## Additional Resources

- [Playwright MCP Documentation](https://github.com/executeautomation/playwright-mcp-server)
- [Playwright Official Docs](https://playwright.dev)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [TaskMaster Pro API Docs](../demo-project/WEB_INTERFACE.md)

Happy testing! 🎭
