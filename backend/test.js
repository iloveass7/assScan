console.log('Testing imports...');

try {
  console.log('1. Testing express...');
  require('express');
  console.log('✅ Express OK');
  
  console.log('2. Testing cors...');
  require('cors');
  console.log('✅ CORS OK');
  
  console.log('3. Testing dotenv...');
  require('dotenv');
  console.log('✅ Dotenv OK');
  
  console.log('4. Testing cloudinary...');
  require('cloudinary');
  console.log('✅ Cloudinary OK');
  
  console.log('5. Testing tesseract.js...');
  require('tesseract.js');
  console.log('✅ Tesseract OK');
  
  console.log('6. Testing routes...');
  require('./routes/imageRoutes');
  console.log('✅ Routes OK');
  
  console.log('\n✅ All imports successful!');
} catch (err) {
  console.error('❌ Import failed:', err.message);
  console.error(err.stack);
}