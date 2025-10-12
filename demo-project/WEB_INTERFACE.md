# TaskMaster Pro - Web Interface Guide

## 🌐 Overview

The web interface provides a modern, user-friendly way to interact with TaskMaster Pro. It's built with vanilla JavaScript, HTML, and CSS - no frameworks needed!

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs Express.js for the web server.

### 2. Start the Server

```bash
npm start
# or
npm run start:web
# or
npm run dev
```

### 3. Open in Browser

Navigate to: **http://localhost:3000**

---

## 📁 Project Structure

```
web/
├── server.js       # Express server + API routing
├── index.html      # Main UI structure
├── styles.css      # Modern, responsive styling
└── app.js          # Frontend logic + API client

src/
└── api.js          # REST API wrapper for TaskManager
```

---

## 🎨 Features

### Dashboard Statistics
- **Total Tasks** - Count of all tasks
- **Completed** - Number of finished tasks
- **Active** - Tasks still in progress
- **High Priority** - Critical tasks count

### Task Management
- ✅ **Create** - Add new tasks with title, description, priority, and tags
- ✏️ **Edit** - Update task details in a modal dialog
- 🗑️ **Delete** - Remove tasks with confirmation
- ☑️ **Complete/Reopen** - Toggle task completion status
- 🏷️ **Tags** - Add and remove tags dynamically

### Filtering & Sorting
- **Status Filter** - All / Active / Completed
- **Priority Filter** - All / High / Medium / Low
- **Search** - Search by title, description, or tags
- **Sort** - By date, priority, or title (ascending/descending)

### Export Options
- 📥 **Export JSON** - Download tasks as JSON file
- 📥 **Export CSV** - Download tasks as CSV file

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Touch-friendly interface
- Adaptive layouts

---

## 🔧 Technical Details

### Frontend Architecture

**State Management:**
- Client-side state stored in `tasks` array
- Filters stored in `currentFilters` object
- Re-renders on state changes

**API Communication:**
- Centralized `apiCall()` function
- Handles errors and displays toast notifications
- Async/await for clean asynchronous code

**UI Patterns:**
- Event delegation for dynamic elements
- Debounced search input (300ms delay)
- Modal dialogs for editing
- Toast notifications for feedback

### Backend Architecture

**Express Server:**
- Serves static files from `/web` directory
- REST API at `/api/*` endpoints
- CORS enabled for development
- Error handling middleware

**API Layer:**
- `setupAPI()` function creates all routes
- Wraps TaskManager instance
- Validates inputs
- Returns consistent JSON responses

### REST API

All API endpoints return JSON in this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Endpoints Detail

#### GET /api/tasks
List all tasks with optional query parameters:
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `tag` - Filter by tag name
- `search` - Search in title/description
- `sortBy` - Sort field (createdAt/priority/title)
- `order` - Sort order (asc/desc)

**Example:**
```
GET /api/tasks?completed=false&priority=high&sortBy=createdAt&order=desc
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "tags": ["shopping", "urgent"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc-123",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "tags": ["shopping", "urgent"],
    "completed": false,
    "createdAt": "2025-10-12T10:00:00.000Z",
    "completedAt": null
  }
}
```

#### PUT /api/tasks/:id
Update a task.

**Request Body:**
```json
{
  "title": "Buy groceries and cook",
  "description": "Updated description",
  "priority": "medium"
}
```

#### DELETE /api/tasks/:id
Delete a task.

#### POST /api/tasks/:id/complete
Mark a task as completed.

#### POST /api/tasks/:id/reopen
Reopen a completed task.

#### POST /api/tasks/:id/tags
Add a tag to a task.

**Request Body:**
```json
{
  "tag": "urgent"
}
```

#### DELETE /api/tasks/:id/tags/:tag
Remove a tag from a task.

#### GET /api/stats
Get task statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 3,
    "incomplete": 7,
    "byPriority": {
      "low": 2,
      "medium": 5,
      "high": 3
    },
    "byTag": {
      "urgent": 2,
      "work": 4,
      "personal": 3
    }
  }
}
```

#### GET /api/export/json
Download all tasks as JSON file.

#### GET /api/export/csv
Download all tasks as CSV file.

---

## 🎯 Testing the Web Interface

### Manual Testing Checklist

**Basic CRUD:**
- [ ] Create a task
- [ ] Edit a task
- [ ] Delete a task
- [ ] Mark task complete
- [ ] Reopen a task

**Filtering:**
- [ ] Filter by "Active" tasks
- [ ] Filter by "Completed" tasks
- [ ] Filter by "High" priority
- [ ] Search for a task
- [ ] Combine filters

**Sorting:**
- [ ] Sort by newest first
- [ ] Sort by oldest first
- [ ] Sort by priority (high to low)
- [ ] Sort by title (A-Z)

**Tags:**
- [ ] Add a tag to a task
- [ ] Add multiple tags
- [ ] Remove a tag
- [ ] Search by tag

**Export:**
- [ ] Export as JSON
- [ ] Export as CSV

**Responsive:**
- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop

### API Testing with curl

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task",
    "description": "Testing API",
    "priority": "high",
    "tags": ["test"]
  }'
```

**List all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Get statistics:**
```bash
curl http://localhost:3000/api/stats
```

**Complete a task:**
```bash
curl -X POST http://localhost:3000/api/tasks/TASK_ID/complete
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/TASK_ID
```

---

## 🎭 Testing with Playwright MCP

### What is Playwright MCP?

Playwright MCP (Model Context Protocol) allows Claude Code to control a web browser for automated testing and interaction. It's configured in the project's `.mcp.json` file and provides tools for:
- Browser navigation and interaction
- Taking screenshots for debugging
- Reading page content
- Clicking, filling forms, and more
- Generating test code from manual actions

### Prerequisites

1. **MCP Configuration**: Ensure `.mcp.json` exists in project root with Playwright MCP configured
2. **Web Server Running**: Start the server with `npm start`
3. **Claude Code Restarted**: Restart Claude Code after adding/changing MCP configuration

### Basic Playwright Commands

#### Navigate and Screenshot
```
Navigate to http://localhost:3000 and take a screenshot
```

Claude will open the web app in a browser and capture the current state.

#### Create a Task
```
Use Playwright to create a task "Buy milk" with high priority
```

Claude will:
- Fill the title input field
- Select priority from dropdown
- Click the "Add Task" button
- Take a screenshot to verify

#### Test Filtering
```
Create 3 tasks with different priorities, then test that the High priority filter works correctly
```

Claude will create test data and verify the filter behavior.

### Common Test Scenarios

#### 1. Task Creation Workflow
```
Test the complete task creation workflow:
1. Fill in task details
2. Add tags
3. Verify task appears in list
4. Check statistics update
```

#### 2. Task Completion
```
Create a task, mark it complete, and verify:
- Checkbox is checked
- Task has strikethrough style
- Statistics show 1 completed task
```

#### 3. Filter Testing
```
Test all filter combinations:
- Status filters (All/Active/Completed)
- Priority filters (All/High/Medium/Low)
- Verify correct tasks are displayed
```

#### 4. Search Functionality
```
Create tasks with different titles, then test search:
- Search for specific keywords
- Verify only matching tasks shown
- Test case-insensitive search
```

#### 5. Export Features
```
Create sample tasks and test export:
- Click "Export JSON" button
- Verify download is triggered
- Check file contains correct data
```

### Screenshot Debugging

Use screenshots to debug UI issues:

```
Take screenshots at each step:
1. Before creating task
2. After filling form
3. After clicking submit
4. After task appears
```

Compare screenshots to identify where issues occur.

### Generating Test Code

Playwright MCP can generate reusable test code:

```
Start a Playwright codegen session to record:
1. Creating a new task
2. Editing the task
3. Marking it complete
4. Deleting the task

Then end the session and save the generated test file
```

The generated code will be in standard Playwright format and can be run with `npx playwright test`.

### Example Test Files

Check the [`playwright-tests/`](playwright-tests/) folder for example tests:
- **example-task-creation.spec.js**: Task CRUD operations
- **example-filtering.spec.js**: Filter and search testing
- **example-export.spec.js**: Export functionality testing

### Tips for Effective Testing

1. **Start with clean state**: Refresh page between tests
2. **Use descriptive names**: Name screenshots clearly
3. **Verify state changes**: Check before and after actions
4. **Test edge cases**: Empty forms, invalid input, etc.
5. **Check statistics**: Verify counts update correctly

### Troubleshooting Playwright

#### Browser doesn't open
- Verify `.mcp.json` is configured correctly
- Restart Claude Code after configuration changes
- Check that Playwright MCP server is running

#### Elements not found
- Inspect element in DevTools to get correct selectors
- Use more specific CSS selectors if needed
- Wait for page to load before interacting

#### Screenshots are blank
- Ensure page has finished loading
- Try taking full-page screenshots
- Check browser viewport dimensions

#### Tests fail intermittently
- Add wait times for async operations
- Use `waitForSelector` before interactions
- Check for network delays or slow responses

### Further Reading

- [Session 5: MCP Demo](../../05-model-context-protocol/demo.md)
- [Playwright Tests README](playwright-tests/README.md)
- [Playwright Official Docs](https://playwright.dev)

---

## 🐛 Troubleshooting

### Server won't start

**Problem:** Port 3000 is already in use

**Solution:**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm start
```

### API returns 404

**Problem:** Endpoint not found

**Solution:**
- Check the URL spelling
- Ensure server is running
- Check browser console for errors
- Verify API endpoint exists in [server.js](web/server.js)

### Tasks not displaying

**Problem:** Empty screen or errors in console

**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Verify server is running
5. Try refreshing the page

### CORS errors

**Problem:** Browser blocks API calls

**Solution:**
- The server already has CORS enabled
- Make sure you're accessing via `http://localhost:3000`
- Check that origin matches server URL

### Changes not reflecting

**Problem:** Code changes don't appear

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Restart the server
4. Check for JavaScript errors in console

---

## 🎨 Customization

### Change Port

Edit [web/server.js](web/server.js):
```javascript
const PORT = process.env.PORT || 3000;
```

Or set environment variable:
```bash
PORT=8080 npm start
```

### Modify Styling

Edit [web/styles.css](web/styles.css):
- Change colors in `:root` variables
- Modify component styles
- Adjust responsive breakpoints

### Add Features

**Example: Add a "Clear All" button**

1. **Add HTML button** in [index.html](web/index.html):
```html
<button id="clear-all-btn" class="btn btn-danger">Clear All</button>
```

2. **Add event listener** in [app.js](web/app.js):
```javascript
document.getElementById('clear-all-btn').addEventListener('click', async () => {
  if (confirm('Delete all tasks?')) {
    await apiCall('/tasks', { method: 'DELETE' });
    await loadTasks();
  }
});
```

3. **API already supports it** - `DELETE /api/tasks`

---

## 📚 Learning Resources

### Understanding the Code

**For beginners:**
1. Start with [index.html](web/index.html) - See the UI structure
2. Look at [styles.css](web/styles.css) - Understand the styling
3. Read [app.js](web/app.js) - Follow the JavaScript logic
4. Check [server.js](web/server.js) - Learn about the backend

**For intermediate developers:**
- Study the state management pattern
- Analyze the API communication flow
- Review error handling strategies
- Examine the responsive design approach

**For advanced developers:**
- Consider adding authentication
- Implement real-time updates with WebSockets
- Add data persistence (database)
- Create automated tests

### Next Steps

1. **Extend the API** - Add new endpoints
2. **Enhance the UI** - Add animations, themes
3. **Add Features** - Due dates, reminders, attachments
4. **Optimize** - Implement caching, pagination
5. **Deploy** - Host on Heroku, Vercel, or Netlify

---

## 🤝 Contributing

This is a learning project! Feel free to:
- Add new features
- Improve the UI/UX
- Optimize the code
- Fix bugs
- Enhance documentation

Share your improvements with the workshop!

---

## 📖 Related Documentation

- [Main README](README.md) - Full project documentation
- [Quick Start Guide](QUICK_START.md) - Get started quickly
- [Exercises](EXERCISES.md) - Hands-on learning tasks
- [CLAUDE.md](.claude/CLAUDE.md) - Project context for Claude

---

**Happy Coding!** 🎉

The web interface makes TaskMaster Pro more accessible and provides a great foundation for learning full-stack development with Claude Code!
