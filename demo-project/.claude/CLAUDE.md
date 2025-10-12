# TaskMaster Pro - Project Context

## Project Overview

TaskMaster Pro is a demonstration project for the Claude Code Workshop. It's a simple command-line task management application designed to help learners practice all Claude Code features.

**Purpose:** Educational - demonstrates Claude Code capabilities
**Type:** Node.js CLI Application
**Complexity:** Intentionally simple for learning

## Architecture

### Design Philosophy
- Keep it simple and readable
- Focus on demonstrating Claude Code features
- Prioritize clarity over optimization
- Use vanilla JavaScript (no complex frameworks)

### File Structure
```
src/
  task.js         - Task model and validation
  taskManager.js  - Main application logic
  utils.js        - Helper functions
tests/
  task.test.js    - Test examples
```

## Code Style Guidelines

### General Rules
1. **Use modern JavaScript (ES6+)**
   - Prefer `const` and `let` over `var`
   - Use arrow functions where appropriate
   - Use template literals for strings

2. **Documentation**
   - All functions must have JSDoc comments
   - Include parameter types and return types
   - Add usage examples for complex functions

3. **Error Handling**
   - Validate all inputs
   - Throw descriptive errors with context
   - Never fail silently

4. **Naming Conventions**
   - camelCase for functions and variables
   - PascalCase for classes
   - UPPER_CASE for constants
   - Descriptive names (no single letters except in loops)

### Example Function Format
```javascript
/**
 * Creates a new task with validation
 * @param {string} title - The task title
 * @param {string} description - Task description
 * @returns {Object} The created task object
 * @throws {Error} If title is empty
 *
 * @example
 * const task = createTask('Buy groceries', 'Milk, eggs, bread');
 */
function createTask(title, description) {
  if (!title || title.trim() === '') {
    throw new Error('Task title cannot be empty');
  }

  return {
    id: generateId(),
    title: title.trim(),
    description: description?.trim() || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
}
```

## Implementation Preferences

### When Adding New Features
1. **Always validate input first**
2. **Write tests for new functionality**
3. **Update JSDoc comments**
4. **Keep functions small and focused** (ideally < 20 lines)
5. **Use descriptive variable names**

### Testing
- Use simple assertions (Node.js built-in `assert`)
- Test happy path and error cases
- Include edge cases
- Keep tests readable and well-documented

### Data Structures
- Tasks are plain JavaScript objects
- Use arrays for task lists (no database needed)
- Prefer immutability where practical
- Keep data structures flat and simple

## Common Patterns

### Task Object Structure
```javascript
{
  id: 'uuid-string',
  title: 'Task title',
  description: 'Optional description',
  completed: false,
  priority: 'medium',  // 'low' | 'medium' | 'high'
  tags: [],
  createdAt: '2025-10-12T10:00:00.000Z',
  completedAt: null
}
```

### Validation Pattern
```javascript
function validateTask(task) {
  const errors = [];

  if (!task.title) errors.push('Title is required');
  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.push('Invalid priority');
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }
}
```

### Export/Import Pattern
```javascript
// Export formats: JSON, CSV
// Keep export functions separate from core logic
// Always validate before export
```

## Things to Avoid

1. **Don't use external frameworks** (e.g., React, Vue)
   - Keep dependencies minimal
   - This is a learning project, not production

2. **Don't add complexity unnecessarily**
   - No database setup
   - No authentication/authorization
   - No network requests
   - Focus on core functionality

3. **Don't skip documentation**
   - Every function needs JSDoc
   - Complex logic needs inline comments
   - Update README when adding features

4. **Don't ignore errors**
   - Validate all inputs
   - Handle edge cases
   - Provide meaningful error messages

## Workshop Integration Notes

This project is designed to demonstrate:
- **Context management**: How CLAUDE.md helps Claude understand the project
- **File mentions**: Using @ to reference specific files
- **Planning mode**: Complex features can be planned first
- **Custom commands**: See `.claude/commands/` for examples
- **Screenshots**: CLI output can be shown via screenshots

## Development Workflow

### When adding a new feature:
1. **Plan first** (use Planning Mode for complex features)
2. **Write the code** with proper documentation
3. **Add tests** for the new functionality
4. **Run tests** to ensure nothing breaks
5. **Update README** if user-facing changes

### When fixing a bug:
1. **Understand the issue** (read related code)
2. **Write a failing test** that reproduces the bug
3. **Fix the bug**
4. **Verify the test passes**
5. **Check for similar issues** elsewhere

### When refactoring:
1. **Ensure tests exist** for the code being refactored
2. **Make small, incremental changes**
3. **Run tests after each change**
4. **Keep the same external API** (don't break callers)
5. **Update documentation** if behavior changes

## Questions to Ask Before Implementing

Before implementing any change, consider:
- Is this aligned with the project's educational purpose?
- Does it demonstrate a Claude Code feature?
- Is it simple enough for learners to understand?
- Does it follow the code style guidelines?
- Is it properly documented?

## Example Interactions

### Good requests:
- "Add input validation to the createTask function"
- "Write tests for the task filtering functionality"
- "Refactor taskManager.js to use more descriptive variable names"
- "Add JSDoc comments to all functions in utils.js"

### Requests that need clarification:
- "Make it better" → Ask: What aspect? Performance? Readability? Features?
- "Add a database" → Explain: This is a learning project, we keep it simple
- "Use React" → Clarify: This is a CLI app, not a web app

## Success Metrics

This project succeeds when:
- Learners can understand all the code easily
- Each feature demonstrates a Claude Code capability
- Documentation is clear and helpful
- Code follows consistent patterns
- Tests cover main functionality

## Notes for Claude

When working on this project:
- Prioritize clarity over cleverness
- Always include JSDoc comments
- Keep functions small and focused
- Explain your reasoning when making decisions
- Ask if unsure about project scope
- Reference this file when making architectural decisions

---

**Remember:** This is a teaching tool. Every line of code should serve the purpose of helping someone learn Claude Code effectively.
