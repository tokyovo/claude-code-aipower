# Model Context Protocol (MCP)

Model Context Protocol (MCP) is a communication layer that provides Claude with context and tools without requiring you to write a bunch of tedious integration code. Think of it as a way to shift the burden of tool definitions and execution away from your server to specialized MCP servers.

When you first encounter MCP, you'll see diagrams showing the basic architecture: an MCP Client (your server) connecting to MCP Servers that contain tools, prompts, and resources. Each MCP Server acts as an interface to some outside service.

## The Problem MCP Solves

Let's say you're building a chat interface where users can ask Claude about their GitHub data. A user might ask "What open pull requests are there across all my repositories?" To handle this, Claude needs tools to access GitHub's API.

GitHub has massive functionality - repositories, pull requests, issues, projects, and tons more. Without MCP, you'd need to create an incredible number of tool schemas and functions to handle all of GitHub's features.

This means writing, testing, and maintaining all that integration code yourself. That's a lot of effort and ongoing maintenance burden.

## How MCP Works

MCP shifts this burden by moving tool definitions and execution from your server to dedicated MCP servers. Instead of you authoring all those GitHub tools, an MCP Server for GitHub handles it.

The MCP Server wraps up tons of functionality around GitHub and exposes it as a standardized set of tools. Your application connects to this MCP server instead of implementing everything from scratch.

## MCP Servers Explained

MCP Servers provide access to data or functionality implemented by outside services. They act as specialized interfaces that expose tools, prompts, and resources in a standardized way.

In our GitHub example, the MCP Server for GitHub contains tools like `get_repos()` and connects directly to GitHub's API. Your server communicates with the MCP server, which handles all the GitHub-specific implementation details.

## Common Questions

### Who authors MCP Servers?

Anyone can create an MCP server implementation. Often, service providers themselves will make their own official MCP implementations. For example, AWS might release an official MCP server with tools for their various services.

### How is this different from calling APIs directly?

MCP servers provide tool schemas and functions already defined for you. If you want to call an API directly, you'll be authoring those tool definitions on your own. MCP saves you that implementation work.

### Isn't MCP just the same as tool use?

This is a common misconception. MCP servers and tool use are complementary but different concepts. MCP servers provide tool schemas and functions already defined for you, while tool use is about how Claude actually calls those tools. The key difference is who does the work - with MCP, someone else has already implemented the tools for you.

## The Key Benefit

The benefit is clear: instead of maintaining a complex set of integrations yourself, you can leverage MCP servers that handle the heavy lifting of connecting to external services.

## MCP in Claude Code

In Claude Code, MCP servers are configured in your project's `.mcp.json` file. This file tells Claude Code which MCP servers to connect to and how to launch them.

### Example Configuration

Here's an example of configuring the Playwright MCP server:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@executeautomation/playwright-mcp-server"
      ]
    }
  }
}
```

This configuration:
- Defines an MCP server named "playwright"
- Specifies that it should be launched using `npx`
- Provides arguments to install and run the Playwright MCP server package

Once configured, Claude Code automatically connects to these MCP servers and gains access to all the tools they provide.

## Popular MCP Servers

Some commonly used MCP servers include:

- **Playwright MCP** - Browser automation and testing
- **GitHub MCP** - Repository and issue management
- **Google Drive MCP** - File storage and document access
- **Filesystem MCP** - Local file system operations
- **Database MCP** - SQL database interactions
- **Slack MCP** - Team communication
- **AWS MCP** - Cloud service management

## Benefits of Using MCP

1. **Less Code to Maintain** - No need to write integration code yourself
2. **Standardized Interface** - All MCP servers follow the same protocol
3. **Community Resources** - Leverage servers built by others
4. **Rapid Integration** - Connect to new services quickly
5. **Consistent Experience** - Same patterns across different services

## When to Use MCP

MCP is ideal when:
- You need to integrate with external services
- You want to avoid writing boilerplate integration code
- An MCP server already exists for your use case
- You want standardized tool definitions across your team

## Getting Started with MCP

To start using MCP in your Claude Code project:

1. Create a `.mcp.json` file in your project root
2. Add MCP server configurations for the services you need
3. Restart Claude Code to load the MCP servers
4. Start using the tools provided by the MCP servers

The MCP ecosystem is growing rapidly, with new servers being added regularly. Check the official MCP documentation for a complete list of available servers and how to use them.
