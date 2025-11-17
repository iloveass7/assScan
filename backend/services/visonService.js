const axios = require('axios');

const analyzeImageWithVision = async (imageUrl, mode, ocrText) => {
  try {
    console.log('🤖 Calling HuggingFace Vision API...');
    
    const prompt = generatePrompt(mode, ocrText, imageUrl);
    
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2-VL-7B-Instruct',
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.3,
          top_p: 0.9
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    
    console.log('✅ Vision analysis completed');
    
    if (response.data && response.data[0] && response.data[0].generated_text) {
      return response.data[0].generated_text;
    }
    
    return 'Vision analysis could not be completed';
    
  } catch (error) {
    console.error('❌ Vision API Error:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    return `Vision processing failed: ${error.message}`;
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