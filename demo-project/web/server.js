/**
 * TaskMaster Pro Web Server
 * Express server for the web interface
 */

const express = require('express');
const path = require('path');
const { setupAPI } = require('../src/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Setup API routes
setupAPI(app);

// Serve static files from web directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// 404 handler for other routes
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║           TaskMaster Pro - Web Interface              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝

🚀 Server running at: http://localhost:${PORT}
📝 API available at: http://localhost:${PORT}/api

Available endpoints:
  GET    /api/tasks          - List all tasks
  POST   /api/tasks          - Create a new task
  GET    /api/tasks/:id      - Get a specific task
  PUT    /api/tasks/:id      - Update a task
  DELETE /api/tasks/:id      - Delete a task
  POST   /api/tasks/:id/complete - Mark task complete
  POST   /api/tasks/:id/reopen   - Reopen task
  POST   /api/tasks/:id/tags     - Add a tag
  DELETE /api/tasks/:id/tags/:tag - Remove a tag
  GET    /api/stats          - Get statistics
  GET    /api/export/json    - Export as JSON
  GET    /api/export/csv     - Export as CSV
  POST   /api/import         - Import tasks
  DELETE /api/tasks          - Clear all tasks

Press Ctrl+C to stop the server
  `);
});

module.exports = app;
