# When working with Claude on complex tasks

You'll often need to guide the conversation to keep it focused and productive. There are several techniques you can use to control the flow of your conversation and help Claude stay on track.

## Interrupting Claude with Escape

Sometimes Claude starts heading in the wrong direction or tries to tackle too much at once. You can press the **Escape** key to stop Claude mid-response, allowing you to redirect the conversation.

This is particularly useful when you want Claude to focus on one specific task instead of trying to handle multiple things simultaneously. For example, if you ask Claude to write tests for multiple functions and it starts creating a comprehensive plan for all of them, you can interrupt and ask it to focus on just one function at a time.

## Combining Escape with Memories

One of the most powerful applications of the escape technique is fixing repetitive errors. When Claude makes the same mistake repeatedly across different conversations, you can:

1. Press Escape to stop the current response
2. Use the `#` shortcut to add a memory about the correct approach
3. Continue the conversation with the corrected information

This prevents Claude from making the same error in future conversations on your project.

## Rewinding Conversations

During long conversations, you might accumulate context that becomes irrelevant or distracting. For instance, if Claude encounters an error and spends time debugging it, that back-and-forth discussion might not be useful for the next task.

You can rewind the conversation by pressing **Escape twice**. This shows you all the messages you've sent, allowing you to jump back to an earlier point and continue from there. This technique helps you:

- Maintain valuable context (like Claude's understanding of your codebase)
- Remove distracting or irrelevant conversation history
- Keep Claude focused on the current task

## Context Management Commands

Claude provides several commands to help manage conversation context effectively:

### /compact

The `/compact` command summarizes your entire conversation history while preserving the key information Claude has learned. This is ideal when:

- Claude has gained valuable knowledge about your project
- You want to continue with related tasks
- The conversation has become long but contains important context

Use compact when Claude has learned a lot about the current task and you want to maintain that knowledge as it moves to the next related task.

### /clear

The `/clear` command completely removes the conversation history, giving you a fresh start. This is most useful when:

- You're switching to a completely different, unrelated task
- The current conversation context might confuse Claude for the new task
- You want to start over without any previous context

## When to Use These Techniques

These conversation control techniques are particularly valuable during:

- Long-running conversations where context can become cluttered
- Task transitions where previous context might be distracting
- Situations where Claude repeatedly makes the same mistakes
- Complex projects where you need to maintain focus on specific components

By using escape, double-tap escape, `/compact`, and `/clear` strategically, you can keep Claude focused and productive throughout your development workflow. These aren't just convenience features—they're essential tools for maintaining effective AI-assisted development sessions.
