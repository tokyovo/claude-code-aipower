# Custom Commands in Claude Code

Claude Code comes with built-in commands that you can access by typing a forward slash, but you can also create your own custom commands to automate repetitive tasks you run frequently.

## Creating Custom Commands

To create a custom command, you need to set up a specific folder structure in your project:

1. Find the `.claude` folder in your project directory
2. Create a new directory called `commands` inside it
3. Create a new markdown file with your desired command name (like `audit.md`)

The filename becomes your command name - so `audit.md` creates the `/audit` command.

## Example: Audit Command

Here's a practical example of a custom command that audits project dependencies for vulnerabilities:

```markdown
Audit the project dependencies for security vulnerabilities and fix them:

1. Run `npm audit` to identify all vulnerable packages
2. Run `npm audit fix` to automatically update packages with available fixes
3. Run the test suite to ensure the updates didn't break anything
4. Report a summary of what was found and fixed

If any vulnerabilities cannot be automatically fixed, provide recommendations for manual resolution.
```

This audit command does three things:

1. Runs `npm audit` to find vulnerable installed packages
2. Runs `npm audit fix` to apply updates
3. Runs tests to verify the updates didn't break anything

**Important:** After creating your command file, you must restart Claude Code for it to recognize the new command.

## Commands with Arguments

Custom commands can accept arguments using the `$ARGUMENTS` placeholder. This makes them much more flexible and reusable.

For example, a `write_tests.md` command might contain:

```markdown
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitests with React Testing Library
* Place test files in a __tests__ directory in the same folder as the source file
* Name test files as [filename].test.ts(x)
* Use @/ prefix for imports

Coverage:
* Test happy paths
* Test edge cases
* Test error states
```

You can then run this command with a file path:

```
/write_tests the use-auth.ts file in the hooks directory
```

The arguments don't have to be file paths - they can be any string you want to pass to give Claude context and direction for the task.

## Key Benefits

- **Automation** - Turn repetitive workflows into single commands
- **Consistency** - Ensure the same steps are followed every time
- **Context** - Provide Claude with specific instructions and conventions for your project
- **Flexibility** - Use arguments to make commands work with different inputs

Custom commands are particularly useful for project-specific workflows like running test suites, deploying code, or generating boilerplate following your team's conventions.
