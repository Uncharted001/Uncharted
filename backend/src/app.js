const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route imports
const authRoutes = require('./routes/auth');

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS — only allow requests from the Vite dev server (or production frontend)
// credentials: true is required for cookies to be sent cross-origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json()); // parse JSON request bodies
app.use(cookieParser()); // parse cookies from incoming requests

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);

// Health check — useful for Docker/EC2 health probes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler — catch-all for unrecognised routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

module.exports = app;
