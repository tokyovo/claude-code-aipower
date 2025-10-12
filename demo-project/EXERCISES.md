# TaskMaster Pro - Exercise Index

Quick reference for all hands-on exercises organized by difficulty and topic.

## 🟢 Beginner Exercises (5-10 min each)

### Exercise 1: First Steps with Context
**Topics:** `/init`, `@` mentions, CLAUDE.md
**Time:** 5 minutes

1. Run `/init` to initialize the project
2. Ask: `What is this project about?`
3. Ask: `Can you explain @src/task.js?`
4. Notice how Claude uses the CLAUDE.md file

**Goal:** Understand how Claude reads project context

---

### Exercise 2: Adding Custom Instructions
**Topics:** `#` command, persistent memory
**Time:** 5 minutes

1. Type `#` to add a custom instruction
2. Add: "Always use strict equality (===) over loose equality (==)"
3. Ask Claude to write a comparison function
4. Verify it follows your instruction

**Goal:** Learn to guide Claude's code style

---

### Exercise 3: Running Custom Commands
**Topics:** Custom slash commands
**Time:** 10 minutes

Try each custom command:
```
/audit
/write_tests src/task.js
/review src/utils.js
```

**Goal:** Understand how custom commands work

---

### Exercise 4: Running and Understanding Tests
**Topics:** Testing, code understanding
**Time:** 5 minutes

1. Run: `npm test`
2. Ask Claude: "Explain what the tests are checking"
3. Ask: "Add a test for the edge case where description is undefined"

**Goal:** Practice working with existing tests

---

## 🟡 Intermediate Exercises (10-20 min each)

### Exercise 5: Planning Mode for New Features
**Topics:** Planning Mode (Shift + Tab)
**Time:** 15 minutes

1. Press **Shift + Tab** to enter Planning Mode
2. Request: "Add a priority system to tasks (high/medium/low)"
3. Review Claude's plan
4. Approve and watch the implementation

**Goal:** Learn when and how to use Planning Mode

---

### Exercise 6: Screenshot-Driven Development
**Topics:** Screenshots (Ctrl+V), visual communication
**Time:** 15 minutes

1. Draw a simple task list interface (ASCII art or actual drawing)
2. Take a screenshot
3. Paste into Claude Code with Ctrl+V (Cmd+V on Mac)
4. Ask: "Create a CLI function to display tasks in this format"

**Example ASCII mockup:**
```
┌─────────────────────────────────────┐
│ TaskMaster Pro                      │
├─────────────────────────────────────┤
│ [✓] Buy groceries        (high)     │
│ [ ] Write documentation  (medium)   │
│ [ ] Deploy to prod       (high)     │
└─────────────────────────────────────┘
```

**Goal:** Practice visual communication with Claude

---

### Exercise 7: Conversation Control
**Topics:** Escape, Rewind, `/compact`, `/clear`
**Time:** 15 minutes

Part A - Interrupting:
1. Ask: "Refactor all files to use classes"
2. Press **Escape** while Claude is working
3. Redirect: "Actually, let's just refactor taskManager.js"

Part B - Rewinding:
1. Ask Claude to add a feature (any feature)
2. Let it complete
3. Press **Escape twice** to rewind
4. Go back and ask for a different approach

Part C - Compacting:
1. Have a long conversation (multiple requests)
2. Run `/compact` to summarize
3. Continue working with the compact context

**Goal:** Master conversation control techniques

---

### Exercise 8: Thinking Modes
**Topics:** Think, Think more, Think a lot
**Time:** 20 minutes

Try the same request with different thinking modes:

**Request:** "Optimize the filterTasks function for better performance"

1. Regular mode (no special thinking)
2. "Think more" mode
3. "Think a lot" mode

Compare the solutions and understand when each mode is useful.

**Goal:** Learn to choose the right thinking mode

---

## 🔴 Advanced Exercises (20-30 min each)

### Exercise 9: Building a Complete Feature
**Topics:** Combined techniques, full workflow
**Time:** 30 minutes

**Task:** Add a tagging system with search capabilities

Steps:
1. Use Planning Mode (Shift + Tab)
2. Ask for "Think more" reasoning
3. Review the plan
4. Implement the feature
5. Use `/write_tests` to generate tests
6. Use `/review` to check the code
7. Run `/audit` for quality check

**Goal:** Practice a complete development workflow

---

### Exercise 10: Advanced Refactoring
**Topics:** Rewind, Planning, Comparison
**Time:** 25 minutes

**Task:** Refactor utils.js to use functional programming patterns

Workflow:
1. Try approach A with Planning Mode
2. Let it complete
3. Rewind the conversation (Escape × 2)
4. Try approach B (different style)
5. Compare both approaches
6. Choose the better one

**Goal:** Learn to explore multiple solutions

---

### Exercise 11: Creating Custom Commands
**Topics:** Custom commands, workflow automation
**Time:** 20 minutes

Create three new custom commands:

1. **`/optimize`** - Performance analysis and suggestions
```markdown
Analyze $ARGUMENTS for performance bottlenecks and suggest optimizations.
Include:
- Time complexity analysis
- Memory usage concerns
- Specific optimization recommendations
```

2. **`/security`** - Security review
```markdown
Review $ARGUMENTS for security vulnerabilities:
- Input validation issues
- Injection risks
- Data sanitization
- Best practice violations
```

3. **`/document`** - Generate documentation
```markdown
Generate comprehensive documentation for $ARGUMENTS:
- JSDoc comments for all functions
- Usage examples
- Parameter descriptions
- Return value documentation
```

Test each command:
```
/optimize src/utils.js
/security src/task.js
/document src/taskManager.js
```

**Remember:** Restart Claude Code after creating new commands!

**Goal:** Build your own command library

---

## 🎯 Challenge Exercises (30+ min)

### Challenge 1: Complete Feature from Scratch
**Time:** 45 minutes

**Task:** Add a complete task history/audit trail system

Requirements:
- Track all changes to tasks (created, updated, completed)
- Export history to JSON/CSV
- Query history by date range
- Show history for a specific task

Use all techniques:
- Planning Mode for design
- Screenshots for data structure design
- Custom commands for testing and review
- Proper conversation control

---

### Challenge 2: Build a Plugin System
**Time:** 60 minutes

**Task:** Design and implement a plugin architecture

Requirements:
- Allow custom task types
- Plugin registration system
- Plugin lifecycle hooks
- Plugin validation

This is complex - use "Think a lot" or "Ultrathink" mode!

---

### Challenge 3: Create a Workshop Module
**Time:** 45 minutes

**Task:** Add a complete new feature to teach to others

Requirements:
1. Design and implement a feature
2. Write comprehensive tests
3. Create documentation
4. Add custom commands to demonstrate it
5. Write exercises for others to learn from

Share your module with the workshop!

---

## 📊 Exercise Tracking Checklist

### Session 1: Adding Context
- [ ] Exercise 1: First Steps with Context
- [ ] Exercise 2: Adding Custom Instructions

### Session 2: Making Changes
- [ ] Exercise 5: Planning Mode for New Features
- [ ] Exercise 6: Screenshot-Driven Development
- [ ] Exercise 8: Thinking Modes

### Session 3: Controlling Conversation
- [ ] Exercise 7: Conversation Control

### Session 4: Custom Commands
- [ ] Exercise 3: Running Custom Commands
- [ ] Exercise 11: Creating Custom Commands

### Complete Workflows
- [ ] Exercise 4: Running and Understanding Tests
- [ ] Exercise 9: Building a Complete Feature
- [ ] Exercise 10: Advanced Refactoring

### Challenges
- [ ] Challenge 1: Complete Feature from Scratch
- [ ] Challenge 2: Build a Plugin System
- [ ] Challenge 3: Create a Workshop Module

---

## 💡 Tips for Success

1. **Start with beginner exercises** - Build confidence first
2. **Don't skip exercises** - Each builds on previous skills
3. **Experiment freely** - This is a safe learning environment
4. **Try variations** - Same exercise with different approaches
5. **Take notes** - Document what works well for you
6. **Share learnings** - Teach others what you discover

---

## 🎓 Learning Paths

### Path 1: Context Mastery (30 min)
Exercises: 1 → 2 → 3 → 4

### Path 2: Planning & Changes (60 min)
Exercises: 5 → 6 → 8 → 9

### Path 3: Conversation Control (45 min)
Exercises: 7 → 10 → Challenge 1

### Path 4: Command Creation (90 min)
Exercises: 3 → 11 → Challenge 3

### Complete Workshop (3-4 hours)
All beginner → All intermediate → All advanced → Challenges

---

## 📝 Exercise Notes Template

Use this template to track your learning:

```markdown
## Exercise: [Name]
**Date:** [Date]
**Time Spent:** [Minutes]

### What I Learned:
-
-

### What Worked Well:
-
-

### Challenges:
-
-

### Notes for Next Time:
-
-
```

---

**Happy Learning!** 🚀

For questions or to share your solutions, refer to the main [README.md](README.md).
