console.log('═══════════════════════════════════════');
console.log('🔍 STARTING DETAILED DEBUG SERVER');
console.log('═══════════════════════════════════════\n');

// Test 1: Basic modules
console.log('TEST 1: Loading core modules...');
try {
  const express = require('express');
  console.log('  ✅ express loaded');
  
  const cors = require('cors');
  console.log('  ✅ cors loaded');
  
  const dotenv = require('dotenv');
  console.log('  ✅ dotenv loaded');
  
  const fileUpload = require('express-fileupload');
  console.log('  ✅ express-fileupload loaded');
} catch (err) {
  console.error('  ❌ Module loading failed:', err.message);
  process.exit(1);
}

// Test 2: Load environment
console.log('\nTEST 2: Loading environment variables...');
try {
  const dotenv = require('dotenv');
  const result = dotenv.config();
  
  if (result.error) {
    console.log('  ⚠️  .env file not found or error:', result.error.message);
  } else {
    console.log('  ✅ .env file loaded');
  }
  
  console.log('  Environment variables:');
  console.log('    PORT:', process.env.PORT || '(not set, will use 5000)');
  console.log('    NODE_ENV:', process.env.NODE_ENV || '(not set)');
  console.log('    CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '⚠️  Not set');
  console.log('    CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '⚠️  Not set');
  console.log('    CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '⚠️  Not set');
  console.log('    HUGGINGFACE_API_KEY:', process.env.HUGGINGFACE_API_KEY ? '✅ Set' : '⚠️  Not set');
} catch (err) {
  console.error('  ❌ Environment loading failed:', err.message);
}

// Test 3: Load routes
console.log('\nTEST 3: Loading routes...');
try {
  const imageRoutes = require('./routes/imageRoutes');
  console.log('  ✅ imageRoutes loaded');
  console.log('  Routes type:', typeof imageRoutes);
} catch (err) {
  console.error('  ❌ Routes loading failed:', err.message);
  console.error('  Stack:', err.stack);
  process.exit(1);
}

// Test 4: Create Express app
console.log('\nTEST 4: Creating Express app...');
try {
  const express = require('express');
  const app = express();
  console.log('  ✅ Express app created');
  console.log('  App type:', typeof app);
} catch (err) {
  console.error('  ❌ App creation failed:', err.message);
  process.exit(1);
}

// Test 5: Configure middleware
console.log('\nTEST 5: Configuring middleware...');
try {
  const express = require('express');
  const cors = require('cors');
  const fileUpload = require('express-fileupload');
  const app = express();
  
  app.use(cors());
  console.log('  ✅ CORS middleware added');
  
  app.use(express.json());
  console.log('  ✅ JSON parser added');
  
  app.use(express.urlencoded({ extended: true }));
  console.log('  ✅ URL encoder added');
  
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
  console.log('  ✅ File upload middleware added');
} catch (err) {
  console.error('  ❌ Middleware configuration failed:', err.message);
  process.exit(1);
}

// Test 6: Add routes
console.log('\nTEST 6: Adding routes...');
try {
  const express = require('express');
  const cors = require('cors');
  const fileUpload = require('express-fileupload');
  const imageRoutes = require('./routes/imageRoutes');
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
  
  app.use('/api', imageRoutes);
  console.log('  ✅ API routes added');
  
  app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
  });
  console.log('  ✅ Health route added');
} catch (err) {
  console.error('  ❌ Route addition failed:', err.message);
  console.error('  Stack:', err.stack);
  process.exit(1);
}

// Test 7: Start server
console.log('\nTEST 7: Starting server...');
try {
  const express = require('express');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const fileUpload = require('express-fileupload');
  const imageRoutes = require('./routes/imageRoutes');
  
  dotenv.config();
  
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
  
  app.use('/api', imageRoutes);
  
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });
  
  app.get('/', (req, res) => {
    res.json({ message: 'AssScan API Server' });
  });
  
  app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({ error: err.message });
  });
  
  const PORT = process.env.PORT || 5000;
  
  console.log('  Attempting to bind to port', PORT, '...');
  
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('\n═══════════════════════════════════════');
    console.log('✅ SERVER STARTED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════');
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/health`);
    console.log(`🔧 API: http://localhost:${PORT}/api`);
    console.log('═══════════════════════════════════════\n');
    console.log('Server is running. Press Ctrl+C to stop.\n');
  });
  
  server.on('error', (err) => {
    console.error('\n❌ SERVER ERROR:', err.message);
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use!`);
    }
    process.exit(1);
  });
  
  // Prevent process from exiting
  process.on('SIGTERM', () => {
    console.log('\n👋 Received SIGTERM, shutting down...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
  
  process.on('SIGINT', () => {
    console.log('\n👋 Received SIGINT, shutting down...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
  
} catch (err) {
  console.error('  ❌ Server start failed:', err.message);
  console.error('  Stack:', err.stack);
  process.exit(1);
}

console.log('\n📝 If you see this, the server setup completed without errors.');
console.log('If the server exits immediately, check above for which test failed.\n');