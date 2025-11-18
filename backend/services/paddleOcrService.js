const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const performPaddleOCR = async (imagePath) => {
  return new Promise((resolve, reject) => {
    console.log('🔢 Starting PaddleOCR for math processing...');
    
    // Create a Python script path
    const pythonScript = path.join(__dirname, 'paddle_ocr.py');
    
    // Check if Python script exists
    if (!fs.existsSync(pythonScript)) {
      console.error('❌ Python script not found:', pythonScript);
      return reject(new Error('PaddleOCR Python script not found'));
    }
    
    // Spawn Python process with -W ignore flag to suppress warnings
    const pythonProcess = spawn('python', ['-W', 'ignore', pythonScript, imagePath]);
    
    let dataString = '';
    let errorString = '';
    
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      // Only log actual errors, not warnings
      const stderr = data.toString();
      if (!stderr.includes('DeprecationWarning') && !stderr.includes('FutureWarning')) {
        errorString += stderr;
        console.error('PaddleOCR error:', stderr);
      }
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0 && errorString.trim() !== '') {
        console.error('❌ PaddleOCR failed with code:', code);
        console.error('Error:', errorString);
        return reject(new Error(`PaddleOCR process failed: ${errorString}`));
      }
      
      try {
        const result = JSON.parse(dataString);
        
        if (!result.success) {
          console.error('❌ PaddleOCR returned error:', result.error);
          return reject(new Error(`PaddleOCR error: ${result.error}`));
        }
        
        console.log('✅ PaddleOCR completed');
        
        // Extract text from PaddleOCR result
        let extractedText = '';
        if (result.full_text) {
          extractedText = result.full_text;
        } else if (result.text && Array.isArray(result.text)) {
          extractedText = result.text.join('\n');
        } else if (typeof result.text === 'string') {
          extractedText = result.text;
        }
        
        resolve(extractedText || 'No math text detected');
      } catch (err) {
        console.error('❌ Failed to parse PaddleOCR output:', err);
        console.error('Raw output:', dataString);
        // If JSON parsing fails, return raw output
        resolve(dataString || 'PaddleOCR processing completed but no text extracted');
      }
    });
    
    // Timeout after 60 seconds
    setTimeout(() => {
      pythonProcess.kill();
      reject(new Error('PaddleOCR timeout'));
    }, 60000);
  });
};

module.exports = {
  performPaddleOCR
};