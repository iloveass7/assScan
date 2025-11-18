// Free vision service using smart text formatting
// No external API calls - 100% free and works offline

const analyzeImageWithVision = async (imageUrl, mode, ocrText) => {
  console.log('📝 Formatting OCR text for mode:', mode);
  
  // Process based on mode
  return formatAndEnhanceText(mode, ocrText);
};

const formatAndEnhanceText = (mode, ocrText) => {
  if (!ocrText || ocrText.trim() === '') {
    return getDefaultMessage(mode);
  }
  
  switch(mode) {
    case 'MATH':
      return enhanceMathText(ocrText);
      
    case 'GRAPH':
      return enhanceGraphText(ocrText);
      
    case 'NORMAL':
    default:
      return enhanceNormalText(ocrText);
  }
};

const enhanceNormalText = (text) => {
  // Clean up common OCR errors
  let formatted = text
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .replace(/\s([.,!?;:])/g, '$1') // Remove space before punctuation
    .replace(/([.,!?;:])\s*([a-zA-Z])/g, '$1 $2') // Ensure space after punctuation
    .replace(/(\d+)\s*\.\s*(\d+)/g, '$1.$2') // Fix decimal numbers
    .replace(/(\w+)\s*'\s*(\w+)/g, "$1'$2"); // Fix contractions
  
  return formatted.trim();
};

const enhanceMathText = (text) => {
  let formatted = text;
  
  // Math symbol replacements with better formatting
  const mathReplacements = {
    // Roots
    '√': 'sqrt',
    '∛': 'cbrt',
    '∜': 'root4',
    
    // Calculus
    '∫': 'integral',
    '∬': 'double_integral',
    '∭': 'triple_integral',
    '∮': 'contour_integral',
    '∂': 'partial',
    '∇': 'nabla',
    
    // Summations and Products
    '∑': 'sum',
    'Σ': 'sum',
    '∏': 'product',
    'Π': 'product',
    
    // Comparisons
    '≈': 'approximately_equal_to',
    '≠': 'not_equal_to',
    '≤': 'less_than_or_equal_to',
    '≥': 'greater_than_or_equal_to',
    '≡': 'equivalent_to',
    '≅': 'congruent_to',
    
    // Set Theory
    '∈': 'element_of',
    '∉': 'not_element_of',
    '⊂': 'subset_of',
    '⊆': 'subset_or_equal',
    '∪': 'union',
    '∩': 'intersection',
    '∅': 'empty_set',
    
    // Logic
    '∀': 'for_all',
    '∃': 'exists',
    '∧': 'and',
    '∨': 'or',
    '¬': 'not',
    '→': 'implies',
    '⇒': 'implies',
    '⇔': 'if_and_only_if',
    
    // Greek Letters (common in math)
    'α': 'alpha',
    'β': 'beta',
    'γ': 'gamma',
    'δ': 'delta',
    'ε': 'epsilon',
    'θ': 'theta',
    'λ': 'lambda',
    'μ': 'mu',
    'π': 'pi',
    'σ': 'sigma',
    'τ': 'tau',
    'φ': 'phi',
    'ψ': 'psi',
    'ω': 'omega',
    
    // Special
    '∞': 'infinity',
    '±': 'plus_minus',
    '∓': 'minus_plus',
    '×': '*',
    '÷': '/',
    '·': '*',
    
    // Superscripts
    '²': '^2',
    '³': '^3',
    '⁴': '^4',
    '⁵': '^5',
    '⁰': '^0',
    '¹': '^1',
    
    // Fractions
    '½': '(1/2)',
    '⅓': '(1/3)',
    '⅔': '(2/3)',
    '¼': '(1/4)',
    '¾': '(3/4)',
    '⅕': '(1/5)',
    '⅖': '(2/5)',
    '⅗': '(3/5)',
    '⅘': '(4/5)',
    '⅙': '(1/6)',
    '⅚': '(5/6)',
    '⅐': '(1/7)',
    '⅛': '(1/8)',
    '⅜': '(3/8)',
    '⅝': '(5/8)',
    '⅞': '(7/8)'
  };
  
  // Apply replacements
  for (const [symbol, replacement] of Object.entries(mathReplacements)) {
    formatted = formatted.replace(new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
  }
  
  // Format common mathematical patterns
  formatted = formatted
    // Fix fractions like "a/b"
    .replace(/(\d+)\s*\/\s*(\d+)/g, '($1/$2)')
    // Fix exponents like "x^2"
    .replace(/\^(\d+)/g, '^$1')
    // Fix subscripts (if OCR caught them)
    .replace(/_(\w+)/g, '_$1')
    // Clean up spacing around operators
    .replace(/\s*([+\-*/=])\s*/g, ' $1 ')
    // Fix parentheses spacing
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')');
  
  // Add header
  return `MATHEMATICAL PROBLEM:\n\n${formatted.trim()}\n\n---\nNote: Mathematical symbols have been converted to text notation for clarity.`;
};

const enhanceGraphText = (text) => {
  let formatted = text.trim();
  
  // Detect if text contains graph/diagram keywords
  const graphKeywords = [
    'axis', 'axes', 'chart', 'graph', 'plot', 'diagram',
    'x-axis', 'y-axis', 'bar', 'line', 'pie', 'data',
    'point', 'curve', 'slope', 'coordinate', 'scale',
    'legend', 'label', 'title', 'figure', 'table'
  ];
  
  const hasGraphContent = graphKeywords.some(keyword => 
    formatted.toLowerCase().includes(keyword)
  );
  
  if (hasGraphContent) {
    // Extract and organize graph-related information
    const lines = formatted.split('\n').filter(l => l.trim());
    
    let organized = 'GRAPH/DIAGRAM QUESTION:\n\n';
    
    // Try to identify question text vs. labels/data
    const questionLines = [];
    const dataLines = [];
    
    for (const line of lines) {
      if (line.match(/^\d+\./) || line.includes('?') || line.length > 50) {
        questionLines.push(line);
      } else {
        dataLines.push(line);
      }
    }
    
    if (questionLines.length > 0) {
      organized += 'Question:\n' + questionLines.join('\n') + '\n\n';
    }
    
    if (dataLines.length > 0) {
      organized += 'Extracted Labels/Data:\n' + dataLines.join('\n') + '\n\n';
    }
    
    organized += '---\nNote: This text was extracted from a diagram/graph. Visual elements like chart types, data points, axes, and spatial relationships cannot be fully captured through text extraction alone. For complete analysis, refer to the original image.';
    
    return organized;
  }
  
  // Generic diagram format
  return `DIAGRAM/VISUAL CONTENT:\n\n${formatted}\n\n---\nNote: Text extracted from diagram. Visual elements require image viewing for complete understanding.`;
};

const getDefaultMessage = (mode) => {
  switch(mode) {
    case 'MATH':
      return 'No mathematical text detected in the image. The image may contain only visual mathematical elements (graphs, diagrams) or the text quality may be too low for OCR.';
      
    case 'GRAPH':
      return 'No text labels detected in the graph/diagram. The image may contain only visual elements without text, or the text may be too small/unclear for OCR to detect.';
      
    default:
      return 'No text detected in the image.';
  }
};

// Legacy function for compatibility
const generatePrompt = (mode, ocrText, imageUrl) => {
  return ocrText;
};

module.exports = {
  analyzeImageWithVision
};