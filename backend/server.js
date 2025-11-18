const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const imageRoutes = require('./routes/imageRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}));

// Routes
app.use('/api', imageRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'AssScan API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      processImage: 'POST /api/process-image'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

// Start server with explicit host binding
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 SERVER RUNNING');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Error handling for server
server.on('error', (err) => {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('❌ SERVER ERROR');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
    console.error('Solutions:');
    console.error(`  1. Kill process: lsof -ti:${PORT} | xargs kill -9`);
    console.error(`  2. Change PORT in .env file`);
  } else if (err.code === 'EACCES') {
    console.error(`Permission denied for port ${PORT}`);
    console.error('Try using a port > 1024');
  } else {
    console.error('Error:', err.message);
  }
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  process.exit(1);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('\n👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});