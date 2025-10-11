# Claude Code Workshop

## 🎯 Workshop Overview

Master Claude Code and integrate AI-powered assistance into your development workflow. This hands-on workshop covers essential techniques for effective collaboration with Claude.

---

## 📚 Reference Course

**[Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action)** - Anthropic's official course

This workshop is based on key concepts from Anthropic's comprehensive training program.

---

## 📋 Workshop Agenda

### Session 0️⃣: How Coding Assistants Work
📁 [00-how-coding-assistants-work/](00-how-coding-assistants-work/)

- **Format:** 🎥 Video Presentation
- **Duration:** ⏱️ 15-20 minutes
- **File:** `how-coding-assistants-work.mp4`
- **Interaction:** ⏸️ Pause to explain concepts as needed

**Topics Covered:**
- Understanding coding assistant architecture
- How tool use works
- Language models and tool integration
- Why Claude's tool use matters
- Security and extensibility benefits

---

### Session 1️⃣: Adding Context to Claude
📁 [01-adding-context-to-claude/](01-adding-context-to-claude/)

- **Format:** 🔊 Audio Presentation
- **Duration:** ⏱️ 25-30 minutes
- **File:** `adding-context-to-claude.m4a`
- **Interaction:** ⏸️ Pause for explanation and live demos

**Topics Covered:**
- The `/init` command
- Understanding CLAUDE.md files
  - Project-level: `CLAUDE.md`
  - Personal: `CLAUDE.local.md`
  - Global: `~/.claude/CLAUDE.md`
- Using `@` file mentions
- Adding custom instructions with `#` command

**Live Demos:**
- Running `/init` on a sample project
- Adding context with `@` mentions
- Creating custom instructions

---

### Session 2️⃣: Making Changes with Claude
📁 [02-making-changes-with-claude/](02-making-changes-with-claude/)

- **Format:** 🔊 Audio Presentation
- **Duration:** ⏱️ 30-35 minutes
- **File:** `making-changes-with-claude.m4a`
- **Interaction:** ⏸️ Pause for explanation and live demos

**Topics Covered:**
- Using screenshots for precise communication (Ctrl+V)
- Planning Mode (Shift + Tab)
- Thinking modes:
  - Think
  - Think more
  - Think a lot
  - Think longer
  - Ultrathink
- When to use Planning vs Thinking

**Live Demos:**
- Implementing a feature with screenshots
- Using Planning Mode for complex tasks
- Applying different thinking modes

---

### Session 3️⃣: Controlling Conversation
📁 [03-controlling-conversation/](03-controlling-conversation/)

- **Format:** 🔊 Audio Presentation
- **Duration:** ⏱️ 20-25 minutes
- **File:** `controlling-conversation.m4a`
- **Interaction:** ⏸️ Pause for explanation and live demos

**Topics Covered:**
- Interrupting with Escape key
- Combining Escape with memories (`#` command)
- Rewinding conversations (Escape × 2)
- Context management commands:
  - `/compact` - Summarize conversation
  - `/clear` - Fresh start
- Best practices for conversation control

**Live Demos:**
- Interrupting and redirecting Claude
- Rewinding to an earlier point
- Using `/compact` and `/clear` effectively

---

### Session 4️⃣: Custom Commands
📁 [04-custom-commands/](04-custom-commands/)

- **Format:** 🔊 Audio Presentation
- **Duration:** ⏱️ 15-20 minutes
- **File:** `custom_commands.m4a`
- **Interaction:** ⏸️ Pause for explanation and live demos

**Topics Covered:**
- Understanding custom slash commands
- Creating the `.claude/commands` folder structure
- Building simple commands (audit example)
- Using `$ARGUMENTS` for flexible commands
- Command naming conventions
- Restarting Claude Code to load new commands

**Live Demos:**
- Creating a custom `/audit` command
- Building a `/write_tests` command with arguments
- Running custom commands with different inputs
