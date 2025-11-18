const axios = require('axios');

const analyzeImageWithVision = async (imageUrl, mode, ocrText) => {
  try {
    console.log('🤖 Calling HuggingFace Vision API...');
    
    const prompt = generatePrompt(mode, ocrText, imageUrl);
    
    // NEW HUGGINGFACE ENDPOINT
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct',
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.3
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 2 minutes for vision models
      }
    );
    
    console.log('✅ Vision API Response Status:', response.status);
    
    // Handle different response formats
    if (response.data) {
      // Format 1: Array with generated_text
      if (Array.isArray(response.data) && response.data[0]?.generated_text) {
        return response.data[0].generated_text;
      }
      
      // Format 2: Direct generated_text
      if (response.data.generated_text) {
        return response.data.generated_text;
      }
      
      // Format 3: Plain text response
      if (typeof response.data === 'string') {
        return response.data;
      }
      
      // Format 4: Model is loading
      if (response.data.error && response.data.error.includes('loading')) {
        const estimatedTime = response.data.estimated_time || 20;
        throw new Error(`Model is loading. Please wait ${estimatedTime} seconds and try again.`);
      }
      
      // Format 5: Error message
      if (response.data.error) {
        throw new Error(`HuggingFace API Error: ${response.data.error}`);
      }
    }
    
    console.log('⚠️ Unexpected response:', JSON.stringify(response.data));
    throw new Error('Unexpected response format from HuggingFace API');
    
  } catch (error) {
    console.error('❌ Vision API Error:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data));
      
      if (error.response.status === 401) {
        throw new Error('Invalid HuggingFace API key. Please check your HUGGINGFACE_API_KEY in .env file.');
      }
      
      if (error.response.status === 403) {
        throw new Error('Access forbidden. This model may require special permissions or a Pro account.');
      }
      
      if (error.response.status === 404) {
        throw new Error('Model not found. The model may have been removed or renamed.');
      }
      
      if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      
      if (error.response.status === 503) {
        throw new Error('Model is currently loading. Please try again in 20-30 seconds.');
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. The model took too long to respond.');
    }
    
    throw new Error(`Vision processing failed: ${error.message}`);
  }
};

const generatePrompt = (mode, ocrText, imageUrl) => {
  const baseInstructions = `You are a vision-enabled question reconstruction assistant.
Your job is to convert an uploaded exam image into a complete, accurate, and clean text version of the question.

CRITICAL RULES:
- Pure text ONLY
- No phrases like "the image shows", "based on the image"
- Fix all OCR errors
- Reconstruct missing or blurry text intelligently
- Keep question formatting (numbering, parts, equations)
- Remove irrelevant info (page numbers, decorations)
- NO ANSWERS, NO SOLUTIONS

OCR Text (may have errors):
${ocrText}

Image URL: ${imageUrl}
`;

  let modeInstructions = '';
  
  switch(mode) {
    case 'NORMAL':
      modeInstructions = `
MODE: NORMAL
- Extract and reconstruct plain text
- Use OCR text as main source
- Correct grammar and formatting
- Only rewrite the question cleanly`;
      break;
      
    case 'MATH':
      modeInstructions = `
MODE: MATH
- Read ALL mathematical expressions from image
- Convert to clear plain-text notation:
  √x → sqrt(x)
  x² → x^2
  ∫₀¹ x² dx → integral from 0 to 1 of x^2 dx
  Σ_{i=1}^n i² → summation from i=1 to n of i^2
  matrices → [[a, b], [c, d]]
- Preserve every equation accurately
- Do NOT solve - only restate the question`;
      break;
      
    case 'GRAPH':
      modeInstructions = `
MODE: GRAPH/DIAGRAM
- Provide complete text version of question
- Add detailed interpretation of ALL visual elements:
  * Chart/graph type and axes
  * All data values, bar heights, plot points
  * Labels, arrows, directions
  * Component names (circuits, diagrams, geometry)
  * Shapes, angles, lengths, coordinates
  * Table contents (all rows/columns)
  
Format:
1. Full cleaned text question first
2. Then write "Diagram Interpretation:" section with detailed breakdown`;
      break;
      
    default:
      modeInstructions = 'MODE: NORMAL - Reconstruct the question as clean text.';
  }
  
  return `${baseInstructions}\n${modeInstructions}\n\nNow reconstruct the complete question:`;
};

module.exports = {
  analyzeImageWithVision
};