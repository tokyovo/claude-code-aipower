# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **workshop repository** for teaching AI-powered coding assistants, specifically focusing on Claude Code. The repository contains educational materials, presentations, and a hands-on demo project (TaskMaster Pro) that demonstrates all workshop concepts.

**Key Philosophy**: This workshop teaches foundational concepts applicable to all AI coding assistants (Cursor, Windsurf, GitHub Copilot, etc.), not just Claude Code. Focus on universal principles over tool-specific features.

## Repository Structure

```
├── 00-how-coding-assistants-work/    # Session 0: Video presentation
├── 01-adding-context-to-claude/      # Session 1: Audio + content
├── 02-making-changes-with-claude/    # Session 2: Audio + content
├── 03-controlling-conversation/      # Session 3: Audio + content
├── 04-custom-commands/               # Session 4: Audio + content
├── 05-model-context-protocol/        # Session 5: Audio + content + demo
│   ├── content.md                    # MCP concepts
│   ├── demo.md                       # 10 Playwright MCP demos
│   └── images/                       # Diagrams (5 images)
├── demo-project/                     # TaskMaster Pro - Full-stack demo
│   ├── .claude/                      # Project context + custom commands
│   ├── src/                          # Backend (task.js, taskManager.js, utils.js, api.js)
│   ├── web/                          # Frontend (HTML, CSS, JS) + Express server
│   ├── tests/                        # Node.js tests
│   ├── playwright-tests/             # Example Playwright tests (28 test cases)
│   ├── README.md                     # Main demo guide
│   ├── EXERCISES.md                  # 15 exercises + 3 challenges
│   ├── QUICK_START.md                # 5-minute quick start
│   └── WEB_INTERFACE.md              # Web app + API docs
├── .mcp.json                         # Playwright MCP configuration
└── README.md                         # Workshop overview + agenda
```

## Working with Demo Project

### Running the Demo Application

```bash
# From demo-project folder
cd demo-project

# Install dependencies (one-time)
npm install

# Start web server (runs on http://localhost:3000)
npm start
# Alternative: npm run start:web or npm run dev

# Run tests
npm test              # Run main test suite
npm run test:all      # Run all tests
```

### Demo Project Architecture

**TaskMaster Pro** is a full-stack task management application with three interfaces:
1. **CLI**: Node.js modules for programmatic use
2. **Web UI**: Modern responsive interface (vanilla JS)
3. **REST API**: 14 endpoints for task CRUD operations

**Key Modules**:
- `src/task.js` - Task model with validation (260 lines)
- `src/taskManager.js` - Main application logic, TaskManager class (270 lines)
- `src/utils.js` - Filtering, sorting, export/import utilities (200 lines)
- `src/api.js` - REST API wrapper connecting Express to TaskManager (270 lines)
- `web/server.js` - Express server with API routes (90 lines)
- `web/app.js` - Frontend application logic (550 lines)
- `web/index.html` - UI structure (180 lines)
- `web/styles.css` - Modern, responsive styling (650+ lines)

**Data Flow**: Frontend → API Layer → TaskManager → Task Model

## Model Context Protocol (MCP)

This repository uses **Playwright MCP** for browser automation demos. Configuration in `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

**To use Playwright MCP**:
1. Ensure web server is running: `cd demo-project && npm start`
2. Restart Claude Code after MCP configuration changes
3. Navigate to http://localhost:3000 and interact via Playwright tools

**Common Playwright workflows**:
- Navigate and screenshot: Capture UI state for debugging
- Create tasks via UI: Automate form filling and submission
- Test filters/search: Verify application logic
- Generate test code: Record actions as Playwright tests

See `05-model-context-protocol/demo.md` for 10 detailed demonstrations.

## Custom Commands

The demo project includes example custom commands in `demo-project/.claude/commands/`:
- `/audit` - Code quality and security audit
- `/write_tests` - Generate comprehensive tests (accepts `$ARGUMENTS`)
- `/review` - Detailed code review with recommendations

**After creating/modifying commands**: Restart Claude Code to load them.

## Session-Specific Context

### Session 1: Context Management
- Focus on CLAUDE.md structure and hierarchy
- Demonstrate `/init`, `@` mentions, `#` custom instructions
- Reference: `demo-project/.claude/CLAUDE.md` for project context examples

### Session 2: Planning and Changes
- Use Planning Mode (Shift + Tab) for multi-file changes
- Demonstrate thinking modes (Think, Think more, Think a lot, etc.)
- Screenshot integration (Ctrl+V) for visual requirements

### Session 3: Conversation Control
- Practice Escape (interrupt), Escape × 2 (rewind)
- Use `/compact` for long conversations, `/clear` for fresh start
- Combine Escape with `#` memories for persistent instructions

### Session 4: Custom Commands
- Create commands in `.claude/commands/` as markdown files
- Use `$ARGUMENTS` for flexible, reusable commands
- Name files as `command-name.md` → creates `/command-name`

### Session 5: MCP and Browser Automation
- Start web server first: `cd demo-project && npm start`
- Use Playwright MCP for browser interaction and testing
- Generate test code with codegen sessions
- Reference 28 example tests in `demo-project/playwright-tests/`

## Workshop Content Updates

When modifying workshop materials:

1. **Session folders** (00-05): Audio/video presentations + `content.md`
2. **Demo project**: Keep `README.md`, `EXERCISES.md`, and `WEB_INTERFACE.md` in sync
3. **Main README**: Update if session structure changes
4. **Consistency**: All sessions follow similar format (format, duration, topics, demos)

## Educational Context Files

Key reference documents for understanding workshop flow:
- `README.md` - Complete workshop agenda and session descriptions
- `demo-project/README.md` - Feature coverage map linking sessions to code
- `demo-project/EXERCISES.md` - 15 exercises organized by difficulty + 3 challenges
- `demo-project/QUICK_START.md` - 5-minute getting started guide
- `demo-project/WEB_INTERFACE.md` - Web app technical guide + Playwright testing section

## Important Conventions

1. **Universal Applicability**: When discussing features, emphasize concepts that apply to all AI coding assistants, not just Claude Code-specific implementations
2. **Foundational Focus**: This is basic/intermediate training; advanced topics are referenced but not deeply covered
3. **Hands-On Learning**: Every concept has corresponding exercises in EXERCISES.md
4. **Test-Driven**: Demo project includes working tests (Node.js + Playwright examples)
5. **Documentation Style**: Use JSDoc for all functions, include usage examples

## Git Workflow

Standard commit message format used:
```
Subject line with action

Details:
- Bullet points for changes
- Specific features added
- Files modified

Technical notes or context

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Email for commits: `mr.nhatvo@gmail.com`

## Key Learning Outcomes

After completing this workshop, participants should be able to:
1. Provide effective context to any AI coding assistant
2. Use planning and thinking modes appropriately
3. Control and direct AI conversations effectively
4. Create custom workflows and automation
5. Integrate MCP servers for extended functionality
6. Apply these concepts to Cursor, Copilot, Windsurf, or other AI assistants

## Notes for Claude Instances

- This repository is for **teaching**, not production development
- Prioritize **clarity and educational value** over optimization
- All code should be **well-documented** with JSDoc comments
- When adding features, ensure they demonstrate workshop concepts
- Keep code **simple and readable** for learning purposes
- Test all changes: `npm test` for unit tests, manual testing for web UI
- When working with Playwright, ensure web server is running on port 3000
