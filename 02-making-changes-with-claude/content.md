# When working with Claude in your development environment

You'll often need to make changes to existing projects. This guide covers practical techniques for implementing changes effectively, including visual communication with screenshots and leveraging Claude's advanced reasoning capabilities.

## Using Screenshots for Precise Communication

One of the most effective ways to communicate with Claude is through screenshots. When you want to modify a specific part of your interface, taking a screenshot helps Claude understand exactly what you're referring to.

To paste a screenshot into Claude, use **Ctrl+V** (not Cmd+V on macOS). This keyboard shortcut is specifically designed for pasting screenshots into the chat interface. Once you've pasted the image, you can ask Claude to make specific changes to that area of your application.

## Planning Mode

For more complex tasks that require extensive research across your codebase, you can enable **Planning Mode**. This feature makes Claude do thorough exploration of your project before implementing changes.

Enable Planning Mode by pressing **Shift + Tab twice** (or once if you're already auto-accepting edits). In this mode, Claude will:

- Read more files in your project
- Create a detailed implementation plan
- Show you exactly what it intends to do
- Wait for your approval before proceeding

This gives you the opportunity to review the plan and redirect Claude if it missed something important or didn't consider a particular scenario.

## Thinking Modes

Claude offers different levels of reasoning through "thinking" modes. These allow Claude to spend more time reasoning about complex problems before providing solutions.

The available thinking modes include:

- **"Think"** - Basic reasoning
- **"Think more"** - Extended reasoning
- **"Think a lot"** - Comprehensive reasoning
- **"Think longer"** - Extended time reasoning
- **"Ultrathink"** - Maximum reasoning capability

Each mode gives Claude progressively more tokens to work with, allowing for deeper analysis of challenging problems.

## When to Use Planning vs Thinking

These two features handle different types of complexity:

**Planning Mode is best for:**

- Tasks requiring broad understanding of your codebase
- Multi-step implementations
- Changes that affect multiple files or components

**Thinking Mode is best for:**

- Complex logic problems
- Debugging difficult issues
- Algorithmic challenges

You can combine both modes for tasks that require both breadth and depth. Just keep in mind that both features consume additional tokens, so there's a cost consideration for using them.
