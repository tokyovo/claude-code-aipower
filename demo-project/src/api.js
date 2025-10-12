/**
 * REST API Wrapper for TaskManager
 * Provides HTTP endpoints for the web interface
 */

const TaskManager = require('./taskManager');

/**
 * Creates and configures Express routes for task management
 * @param {Object} app - Express application instance
 * @returns {TaskManager} The task manager instance
 */
function setupAPI(app) {
  const taskManager = new TaskManager();

  // Middleware to parse JSON bodies (handled by express.json())

  /**
   * GET /api/tasks
   * List all tasks with optional filtering
   * Query params: completed, priority, tag, search, sortBy, order
   */
  app.get('/api/tasks', (req, res) => {
    try {
      const options = {};

      // Extract filter parameters
      if (req.query.completed !== undefined) {
        options.completed = req.query.completed === 'true';
      }
      if (req.query.priority) {
        options.priority = req.query.priority;
      }
      if (req.query.tag) {
        options.tag = req.query.tag;
      }
      if (req.query.search) {
        options.search = req.query.search;
      }
      if (req.query.sortBy) {
        options.sortBy = req.query.sortBy;
      }
      if (req.query.order) {
        options.order = req.query.order;
      }

      const tasks = taskManager.list(options);
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * GET /api/tasks/:id
   * Get a specific task by ID
   */
  app.get('/api/tasks/:id', (req, res) => {
    try {
      const task = taskManager.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/tasks
   * Create a new task
   * Body: { title, description, priority, tags }
   */
  app.post('/api/tasks', (req, res) => {
    try {
      const { title, description, priority, tags } = req.body;

      if (!title) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }

      const options = {};
      if (description) options.description = description;
      if (priority) options.priority = priority;
      if (tags) options.tags = tags;

      const task = taskManager.add(title, options);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  /**
   * PUT /api/tasks/:id
   * Update a task
   * Body: { title, description, priority }
   */
  app.put('/api/tasks/:id', (req, res) => {
    try {
      const { title, description, priority } = req.body;
      const updates = {};

      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (priority !== undefined) updates.priority = priority;

      const task = taskManager.update(req.params.id, updates);
      res.json({ success: true, data: task });
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      res.status(status).json({ success: false, error: error.message });
    }
  });

  /**
   * DELETE /api/tasks/:id
   * Delete a task
   */
  app.delete('/api/tasks/:id', (req, res) => {
    try {
      const removed = taskManager.remove(req.params.id);
      if (!removed) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/tasks/:id/complete
   * Mark a task as completed
   */
  app.post('/api/tasks/:id/complete', (req, res) => {
    try {
      const task = taskManager.complete(req.params.id);
      res.json({ success: true, data: task });
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      res.status(status).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/tasks/:id/reopen
   * Reopen a completed task
   */
  app.post('/api/tasks/:id/reopen', (req, res) => {
    try {
      const task = taskManager.reopen(req.params.id);
      res.json({ success: true, data: task });
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      res.status(status).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/tasks/:id/tags
   * Add a tag to a task
   * Body: { tag }
   */
  app.post('/api/tasks/:id/tags', (req, res) => {
    try {
      const { tag } = req.body;
      if (!tag) {
        return res.status(400).json({ success: false, error: 'Tag is required' });
      }
      const task = taskManager.addTag(req.params.id, tag);
      res.json({ success: true, data: task });
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      res.status(status).json({ success: false, error: error.message });
    }
  });

  /**
   * DELETE /api/tasks/:id/tags/:tag
   * Remove a tag from a task
   */
  app.delete('/api/tasks/:id/tags/:tag', (req, res) => {
    try {
      const task = taskManager.removeTag(req.params.id, req.params.tag);
      res.json({ success: true, data: task });
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      res.status(status).json({ success: false, error: error.message });
    }
  });

  /**
   * GET /api/stats
   * Get task statistics
   */
  app.get('/api/stats', (req, res) => {
    try {
      const stats = taskManager.getStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/export/json
   * Export all tasks as JSON
   */
  app.get('/api/export/json', (req, res) => {
    try {
      const json = taskManager.exportJSON();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=tasks.json');
      res.send(json);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/export/csv
   * Export all tasks as CSV
   */
  app.get('/api/export/csv', (req, res) => {
    try {
      const csv = taskManager.exportCSV();
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=tasks.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  /**
   * POST /api/import
   * Import tasks from JSON
   * Body: { data: [...tasks], merge: boolean }
   */
  app.post('/api/import', (req, res) => {
    try {
      const { data, merge = false } = req.body;
      if (!data) {
        return res.status(400).json({ success: false, error: 'Data is required' });
      }
      const jsonString = JSON.stringify(data);
      const count = taskManager.importJSON(jsonString, merge);
      res.json({ success: true, message: `Imported ${count} tasks`, count });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  /**
   * DELETE /api/tasks
   * Clear all tasks
   */
  app.delete('/api/tasks', (req, res) => {
    try {
      const count = taskManager.clear();
      res.json({ success: true, message: `Cleared ${count} tasks`, count });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return taskManager;
}

module.exports = { setupAPI };
