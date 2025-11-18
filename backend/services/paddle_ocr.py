#!/usr/bin/env python3
import sys
import json
import warnings

# Suppress deprecation warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)

from paddleocr import PaddleOCR

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    try:
        # Initialize PaddleOCR with updated parameters
        # use_textline_orientation=True replaces use_angle_cls=True
        ocr = PaddleOCR(
            use_textline_orientation=True,
            lang='en',
            show_log=False,
            use_gpu=False  # Set to True if you have GPU
        )
        
        # Perform OCR
        result = ocr.ocr(image_path, cls=True)
        
        # Extract text from result
        text_lines = []
        if result and result[0]:
            for line in result[0]:
                if len(line) >= 2:
                    text = line[1][0]  # Get the recognized text
                    confidence = line[1][1]  # Get confidence score
                    if confidence > 0.5:  # Only include if confidence > 50%
                        text_lines.append(text)
        
        # Output as JSON
        output = {
            "success": True,
            "text": text_lines,
            "full_text": "\n".join(text_lines)
        }
        
        print(json.dumps(output))
        sys.exit(0)
        
    except Exception as e:
        error_output = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_output))
        sys.exit(1)

if __name__ == "__main__":
    main()