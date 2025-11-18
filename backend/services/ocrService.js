const Tesseract = require('tesseract.js');

const performOCR = async (imagePath) => {
  try {
    console.log('🔍 Starting OCR processing...');
    
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: info => {
          if (info.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
          }
        }
      }
    );
    
    // Clean up the OCR text
    const cleanedText = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
    
    console.log('✅ OCR completed');
    return cleanedText || 'No text detected';
    
  } catch (error) {
    console.error('❌ OCR Error:', error);
    throw new Error(`OCR processing failed: ${error.message}`);
  }
};

module.exports = {
  performOCR
};