# Quick Start Guide

Get started with the TaskMaster Pro demo project in 5 minutes!

## Step 1: Open in Claude Code

1. Open VS Code in this directory
2. Open Claude Code panel
3. Start a new conversation

## Step 2: Initialize the Project

Type in Claude Code:
```
/init
```

This tells Claude about your project structure and context.

## Step 3: Try Your First Commands

### Run the tests:
```bash
npm test
```

### Ask Claude about the code:
```
Can you explain @src/task.js?
```

### Try a custom command:
```
/audit
```

## Step 4: Practice Session Features

### Session 1: Context (5 min)
```
# Add this as a custom instruction
Always use strict equality (===) instead of loose equality (==)
```

Then ask:
```
Add a function to compare two task IDs
```

Notice how Claude follows your instruction!

### Session 2: Planning Mode (5 min)
1. Press **Shift + Tab** to enter Planning Mode
2. Type: `Add a feature to archive completed tasks`
3. Review the plan before approving

### Session 3: Conversation Control (5 min)
1. Ask Claude to refactor all files
2. Press **Escape** while it's working
3. Say: "Stop - let's just refactor one file first"

### Session 4: Custom Commands (5 min)
```
/write_tests src/utils.js
```

Watch as Claude generates comprehensive tests!

## Next Steps

1. Read the full [README.md](README.md) for detailed exercises
2. Check [.claude/CLAUDE.md](.claude/CLAUDE.md) to see project context
3. Explore [.claude/commands/](.claude/commands/) for command examples
4. Create your own custom commands!

## Common Tasks to Practice

1. **Add a new feature:**
   ```
   Add a due date field to tasks with validation
   ```

2. **Fix a bug with Planning Mode:**
   ```
   (Shift + Tab) Fix the issue where tags aren't case-insensitive
   ```

3. **Get a code review:**
   ```
   /review src/taskManager.js
   ```

4. **Generate documentation:**
   ```
   Add comprehensive README documentation for the API
   ```

5. **Refactor code:**
   ```
   Refactor utils.js to use more functional programming patterns
   ```

## Tips

- Use `@filename` to reference specific files
- Use `#` to add persistent instructions
- Press Escape to interrupt Claude
- Press Escape twice to rewind the conversation
- Use `/compact` when conversations get long
- Use `/clear` to start fresh

## Having Fun!

The best way to learn is by doing. Try breaking things, fixing them, and experimenting with different Claude Code features. This is a safe sandbox project designed for learning!

Happy coding! 🎉
