# TaskMaster Pro - Claude Code Workshop Demo Project

## 🎯 Project Overview

**TaskMaster Pro** is a simple task management application designed specifically to demonstrate all the features and commands covered in the Claude Code Workshop. This is a hands-on learning project where you'll practice every technique from the course.

### What You'll Build

A full-stack task management application with:
- **CLI Interface** - Command-line task management
- **Web Interface** - Modern, responsive web UI
- **REST API** - Full-featured backend API
- Complete CRUD operations
- Task filtering, sorting, and search
- Priority levels and tagging system
- Export to JSON/CSV

---

## 🌐 Web Interface

TaskMaster Pro now includes a beautiful web interface!

### Quick Start - Web App

```bash
# Install dependencies
npm install

# Start the web server
npm start

# Open your browser to:
# http://localhost:3000
```

The web interface provides:
- ✅ Create, edit, and delete tasks
- ✅ Mark tasks complete/incomplete
- ✅ Filter by status (all/active/completed)
- ✅ Filter by priority (high/medium/low)
- ✅ Search tasks by title, description, or tags
- ✅ Sort by date, priority, or title
- ✅ Add and manage tags
- ✅ Real-time statistics dashboard
- ✅ Export to JSON or CSV
- ✅ Fully responsive (mobile-friendly)

### API Endpoints

The REST API is available at `http://localhost:3000/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks (with filters) |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Get a specific task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| POST | `/api/tasks/:id/complete` | Mark task complete |
| POST | `/api/tasks/:id/reopen` | Reopen completed task |
| POST | `/api/tasks/:id/tags` | Add a tag |
| DELETE | `/api/tasks/:id/tags/:tag` | Remove a tag |
| GET | `/api/stats` | Get task statistics |
| GET | `/api/export/json` | Export as JSON |
| GET | `/api/export/csv` | Export as CSV |

---

## 📚 Feature Coverage Map

This project is structured to help you practice specific workshop concepts:

| Workshop Session | Features to Practice | Files Involved |
|-----------------|---------------------|----------------|
| **Session 0: How Coding Assistants Work** | Understanding tool use and architecture | All files - observe how Claude uses tools |
| **Session 1: Adding Context** | `/init`, CLAUDE.md, `@` mentions, `#` command | `.claude/CLAUDE.md`, All source files |
| **Session 2: Making Changes** | Screenshots (Ctrl+V), Planning Mode, Thinking modes | `screenshots/`, All development work |
| **Session 3: Controlling Conversation** | Escape, Rewind, `/compact`, `/clear` | Practice during any coding session |
| **Session 4: Custom Commands** | Custom slash commands | `.claude/commands/` |

---

## 🚀 Getting Started

### 1. Initialize the Project with Claude

Open Claude Code in this directory and run:

```
/init
```

This will help Claude understand your project structure and context.

### 2. Review Project Context

Check out [.claude/CLAUDE.md](.claude/CLAUDE.md) to see how project context is defined. This file tells Claude:
- What this project is about
- Code style preferences
- Architecture decisions
- Common patterns to follow

### 3. Install Dependencies

```bash
npm install
```

---

## 📖 Step-by-Step Demo Guide

### Session 1: Adding Context to Claude

#### Exercise 1A: Using /init Command
1. Open a new Claude Code conversation
2. Run `/init` and observe how Claude reads your project
3. Ask Claude: "What is this project about?"
4. Notice how Claude references the CLAUDE.md file

#### Exercise 1B: Using @ File Mentions
1. Ask Claude: "Can you explain @src/task.js?"
2. Try: "Review @src/taskManager.js and suggest improvements"
3. Practice mentioning multiple files: "@src/task.js and @src/utils.js"

#### Exercise 1C: Adding Custom Instructions with #
1. Type `#` to add a memory/instruction
2. Example: "Always use JSDoc comments for functions"
3. Ask Claude to add a new function and see if it follows your instruction

#### Exercise 1D: Understanding CLAUDE.md Hierarchy
- **Project-level**: `.claude/CLAUDE.md` (this project)
- **Personal**: `.claude/CLAUDE.local.md` (your preferences, not in git)
- **Global**: `~/.claude/CLAUDE.md` (all your projects)

Try creating a `CLAUDE.local.md` with your personal coding preferences.

---

### Session 2: Making Changes with Claude

#### Exercise 2A: Using Screenshots (Ctrl+V)
1. Create a simple UI mockup or diagram
2. Take a screenshot
3. In Claude Code, paste with Ctrl+V (Cmd+V on Mac)
4. Ask: "Implement this UI design as a CLI interface"

**Try this scenario:**
- Draw a simple flowchart showing task creation workflow
- Paste it and ask Claude to implement the logic

#### Exercise 2B: Planning Mode (Shift + Tab)
1. Press **Shift + Tab** to enter Planning Mode
2. Ask: "Add a feature to export tasks to JSON and CSV formats"
3. Claude will create a plan without making changes
4. Review the plan, then approve or modify it

**Why use Planning Mode?**
- Complex features with multiple files
- You want to review before execution
- Experimental or risky changes

#### Exercise 2C: Thinking Modes
Try different thinking modes for various tasks:

1. **Think** (default): "Add input validation to task creation"
2. **Think more**: "Refactor the task manager to use async/await"
3. **Think a lot**: "Design a plugin system for custom task types"
4. **Think longer**: "Optimize the search algorithm for large task lists"
5. **Ultrathink**: "Architect a scalable task management system with plugins"

**Guideline:**
- Simple changes → No special thinking
- Moderate complexity → Think more
- High complexity/architecture → Think a lot or longer
- Novel solutions needed → Ultrathink

#### Exercise 2D: Planning vs Thinking - When to Use What?

**Use Planning Mode when:**
- You need to review changes before they happen
- Multiple files will be affected
- You're unsure about the approach
- You want to discuss the implementation strategy

**Use Thinking Modes when:**
- The task requires complex reasoning
- You need creative problem-solving
- Architecture decisions are needed
- Optimizing algorithms or patterns

**Pro tip:** You can combine them! Use Planning Mode with a thinking mode.

---

### Session 3: Controlling Conversation

#### Exercise 3A: Interrupting with Escape
1. Ask Claude to make a large change
2. Press **Escape** while Claude is working
3. Redirect: "Actually, let's do this differently..."

**Practice scenario:**
- "Refactor all files to use classes"
- (Press Escape mid-execution)
- "Stop - let's just refactor task.js first"

#### Exercise 3B: Combining Escape with Memories
1. Interrupt Claude with Escape
2. Type `#` to add an instruction
3. Example: "Always ask before refactoring existing code"
4. Continue the conversation with this new rule

#### Exercise 3C: Rewinding Conversations (Escape × 2)
1. Make several changes with Claude
2. Press **Escape twice** to see conversation history
3. Select an earlier point to rewind to
4. Continue from that point with a different approach

**Try this workflow:**
- Add a feature (approach A)
- Realize you want a different approach
- Rewind to before the feature
- Implement approach B instead

#### Exercise 3D: Context Management Commands

**Using /compact:**
```
/compact
```
- Summarizes the conversation so far
- Keeps important context, reduces tokens
- Use when: Long conversation, approaching context limits

**Using /clear:**
```
/clear
```
- Completely fresh start
- Clears all conversation history
- Use when: Starting a completely new task

**Best Practice:**
- Long debugging session → `/compact` to summarize findings
- Switching to unrelated task → `/clear` for fresh start
- Need to preserve some context → Rewind instead of `/clear`

---

### Session 4: Custom Commands

#### Exercise 4A: Understanding Custom Commands

Custom commands are stored in `.claude/commands/` as markdown files.

**File structure:**
```
.claude/commands/
├── audit.md          # Simple command, no arguments
├── write_tests.md    # Command with $ARGUMENTS
└── review.md         # Another custom command
```

#### Exercise 4B: Using the /audit Command

Run the audit command:
```
/audit
```

This command checks your code for:
- Missing error handling
- Undocumented functions
- Code quality issues
- Security concerns

**Check the implementation:** [.claude/commands/audit.md](.claude/commands/audit.md)

#### Exercise 4C: Using /write_tests with Arguments

Write tests for a specific file:
```
/write_tests src/task.js
```

Or for multiple files:
```
/write_tests src/task.js src/utils.js
```

**Key concept:** `$ARGUMENTS` in the command file gets replaced with what you type.

**Check the implementation:** [.claude/commands/write_tests.md](.claude/commands/write_tests.md)

#### Exercise 4D: Using the /review Command

Get a code review:
```
/review src/taskManager.js
```

This provides:
- Code quality assessment
- Best practice suggestions
- Potential bug identification
- Refactoring opportunities

#### Exercise 4E: Creating Your Own Command

Create a new command: `.claude/commands/document.md`

```markdown
Analyze $ARGUMENTS and generate comprehensive documentation including:
- Function descriptions
- Parameter details
- Return value documentation
- Usage examples
- Edge cases

Use JSDoc format for JavaScript files.
```

**To activate:**
1. Save the file
2. Restart Claude Code (Cmd+Shift+P → "Reload Window")
3. Run: `/document src/task.js`

---

## 🎓 Hands-On Exercises

### Beginner Exercises

1. **Context Mastery**
   - Use `/init` to understand the project
   - Mention `@src/task.js` and ask for an explanation
   - Add a custom instruction with `#` about code style

2. **Simple Changes**
   - Ask Claude to add JSDoc comments to all functions
   - Use default thinking mode (no special mode)
   - Review the changes

3. **Custom Command Practice**
   - Run `/audit` on the entire project
   - Run `/write_tests src/utils.js`
   - Run `/review src/taskManager.js`

### Intermediate Exercises

4. **Planning Mode Workflow**
   - Enter Planning Mode (Shift + Tab)
   - Ask: "Add a priority system to tasks (high/medium/low)"
   - Review the plan, then approve

5. **Screenshot-Driven Development**
   - Draw a simple task list interface
   - Screenshot and paste (Ctrl+V)
   - Ask Claude to implement it

6. **Conversation Control**
   - Start implementing a complex feature
   - Press Escape to interrupt
   - Ask Claude to take a different approach
   - Use `/compact` when done

### Advanced Exercises

7. **Combined Techniques**
   - Enter Planning Mode with "Think more"
   - Ask: "Add a tagging system with search capabilities"
   - Review plan, then execute
   - Use Escape if you need to adjust mid-execution

8. **Rewind and Retry**
   - Implement a feature one way
   - Press Escape twice to rewind
   - Go back and try a completely different implementation

9. **Create a Custom Command Suite**
   - Create `/optimize` command for performance analysis
   - Create `/security` command for security review
   - Create `/refactor` command with arguments
   - Test all three commands

---

## 🎬 Common Scenarios

### Scenario 1: "I need to add a feature but want to review first"

**Solution: Planning Mode**
```
Shift + Tab → "Add task filtering by date range"
```

### Scenario 2: "Claude is going in the wrong direction"

**Solution: Escape**
```
Press Escape → "Actually, let's use a simpler approach..."
```

### Scenario 3: "I tried one approach but want to try another"

**Solution: Rewind**
```
Escape × 2 → Select earlier point → Try new approach
```

### Scenario 4: "My conversation is getting too long"

**Solution: Compact or Clear**
```
/compact  (if you need to keep context)
/clear    (if starting fresh)
```

### Scenario 5: "I want to explain a UI visually"

**Solution: Screenshot**
```
Create mockup → Screenshot → Ctrl+V → Describe what you want
```

### Scenario 6: "I need to run the same analysis on multiple files"

**Solution: Custom Command**
```
Create .claude/commands/analyze.md
Run: /analyze src/task.js
```

---

## 🔧 Project Structure

```
demo-project/
├── README.md                    # This file - your complete guide
├── .claude/
│   ├── CLAUDE.md               # Project context and guidelines
│   └── commands/
│       ├── audit.md            # Code audit command
│       ├── write_tests.md      # Test generation command
│       └── review.md           # Code review command
├── src/
│   ├── task.js                 # Task model and business logic
│   ├── taskManager.js          # Main application coordinator
│   └── utils.js                # Helper utilities
├── tests/
│   └── task.test.js            # Sample tests
├── screenshots/
│   └── .gitkeep                # Place your UI mockups here
└── package.json                # Node.js configuration
```

---

## 💡 Tips & Best Practices

### Context Management
- Use `@` mentions when asking about specific files
- Keep CLAUDE.md updated as your project evolves
- Use CLAUDE.local.md for personal preferences (not committed to git)
- Run `/init` when starting a new conversation

### Making Changes
- Use Planning Mode for multi-file changes
- Use screenshots to communicate visual requirements
- Choose appropriate thinking modes based on complexity
- Review changes before accepting them

### Conversation Control
- Don't hesitate to press Escape to redirect
- Use rewind for major direction changes
- `/compact` for long sessions
- `/clear` when switching to unrelated tasks

### Custom Commands
- Name commands as verbs (audit, review, test)
- Use `$ARGUMENTS` for flexibility
- Keep commands focused and single-purpose
- Document what each command does
- Remember to restart Claude Code after adding commands

---

## 🎯 Workshop Completion Checklist

Mark off each feature as you practice it:

### Session 1: Adding Context
- [ ] Run `/init` command
- [ ] Create and modify CLAUDE.md
- [ ] Use `@` to mention files
- [ ] Add custom instructions with `#`
- [ ] Understand CLAUDE.md hierarchy

### Session 2: Making Changes
- [ ] Paste a screenshot with Ctrl+V
- [ ] Use Planning Mode (Shift + Tab)
- [ ] Try "Think more" mode
- [ ] Try "Think a lot" mode
- [ ] Understand when to use Planning vs Thinking

### Session 3: Controlling Conversation
- [ ] Interrupt with Escape
- [ ] Combine Escape with `#` memory
- [ ] Rewind with Escape × 2
- [ ] Use `/compact` command
- [ ] Use `/clear` command

### Session 4: Custom Commands
- [ ] Run existing `/audit` command
- [ ] Run `/write_tests` with arguments
- [ ] Run `/review` command
- [ ] Create your own custom command
- [ ] Restart Claude Code to load new commands

---

## 🚀 Next Steps

After completing all exercises:

1. **Apply to Real Projects**
   - Use these techniques in your actual development work
   - Create CLAUDE.md files for your real projects
   - Build custom commands for your common workflows

2. **Experiment**
   - Combine different features
   - Find your preferred workflow
   - Create your own command library

3. **Share & Learn**
   - Share useful commands with your team
   - Document your workflows
   - Teach others what you've learned

---

## 📚 Additional Resources

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Claude Code in Action Course](https://anthropic.skilljar.com/claude-code-in-action)
- [Workshop Main README](../README.md)

---

## 🤝 Getting Help

If you get stuck:
1. Use `/init` to help Claude understand your context
2. Use `@` to reference specific files when asking questions
3. Try Planning Mode to break down complex problems
4. Check the workshop session folders for examples

---

**Happy Learning! 🎉**

Remember: The best way to learn Claude Code is through practice. Work through each exercise, experiment, and don't be afraid to make mistakes. That's what this demo project is for!
