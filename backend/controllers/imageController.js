const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const { performOCR } = require('../services/ocrService');
const { analyzeImageWithVision } = require('../services/visionService');
const fs = require('fs');

const processImage = async (req, res) => {
  let uploadedFile = null;
  let cloudinaryResult = null;
  
  try {
    // Validate file
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }
    
    // Validate mode
    const mode = req.body.mode || 'NORMAL';
    const validModes = ['NORMAL', 'MATH', 'GRAPH'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mode. Must be NORMAL, MATH, or GRAPH'
      });
    }
    
    uploadedFile = req.files.image;
    console.log(`📤 Processing image: ${uploadedFile.name}, Mode: ${mode}`);
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed'
      });
    }
    
    // Step 1: Upload to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    cloudinaryResult = await uploadToCloudinary(uploadedFile.tempFilePath);
    console.log('✅ Cloudinary upload successful:', cloudinaryResult.url);
    
    // Step 2: Perform OCR
    const ocrText = await performOCR(uploadedFile.tempFilePath);
    console.log('📝 OCR Result:', ocrText.substring(0, 100) + '...');
    
    // Step 3: Analyze with Vision AI
    const reconstructedText = await analyzeImageWithVision(
      cloudinaryResult.url,
      mode,
      ocrText
    );
    
    // Clean up temp file
    if (fs.existsSync(uploadedFile.tempFilePath)) {
      fs.unlinkSync(uploadedFile.tempFilePath);
    }
    
    // Send response
    res.json({
      success: true,
      data: {
        imageUrl: cloudinaryResult.url,
        mode: mode,
        ocrText: ocrText,
        reconstructedQuestion: reconstructedText
      }
    });
    
  } catch (error) {
    console.error('❌ Error processing image:', error);
    
    // Clean up on error
    if (uploadedFile && fs.existsSync(uploadedFile.tempFilePath)) {
      fs.unlinkSync(uploadedFile.tempFilePath);
    }
    
    if (cloudinaryResult && cloudinaryResult.publicId) {
      await deleteFromCloudinary(cloudinaryResult.publicId);
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to process image',
      error: error.message
    });
  }
};

module.exports = {
  processImage
};