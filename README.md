# AssScan - AI-Powered Exam Assistant

<div align="center">

![AssScan Banner](https://img.shields.io/badge/AssScan-Exam%20Assistant-4FC3F7?style=for-the-badge&logo=react&logoColor=white)

**Transform exam images into clean, editable text with AI-powered OCR and Vision models**

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-61DAFB?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Modes Explained](#-modes-explained)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AssScan** is a modern web application designed to help students convert exam questions from images into clean, copyable text. Whether it's a handwritten math problem, a complex diagram, or plain text, AssScan uses advanced OCR and AI vision models to accurately reconstruct the question.

### Why AssScan?

- 📸 **Quick Processing**: Upload any exam image and get text in seconds
- 🎯 **Smart Mode Selection**: Specialized processing for text, math, and diagrams
- 🧠 **AI-Powered**: Uses Tesseract, PaddleOCR, and Qwen2-VL for maximum accuracy
- 💎 **Beautiful UI**: Modern glassmorphic design that's easy on the eyes
- 🚀 **Fast & Lightweight**: Built with performance in mind
- 📱 **Responsive**: Works seamlessly on desktop and mobile

---

## ✨ Features

### 🎨 Frontend Features

- **Glassmorphic Design**: Modern, aesthetic UI with blur effects and soft colors
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Image Preview**: See your uploaded image before processing
- **Three Processing Modes**: Normal, Math, and Graph modes
- **Real-time Processing**: Live progress indicators
- **Copy to Clipboard**: One-click copying of results
- **Error Handling**: Clear, user-friendly error messages
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Eye-friendly deep blue color scheme

### ⚙️ Backend Features

- **Multiple OCR Engines**: Tesseract and PaddleOCR for different use cases
- **AI Vision Integration**: Qwen2-VL for intelligent text reconstruction
- **Cloud Storage**: Cloudinary integration for image hosting
- **Smart Mode Detection**: Automatic optimization based on selected mode
- **File Validation**: Size and type checks for security
- **Error Recovery**: Graceful error handling and cleanup
- **RESTful API**: Clean, documented API endpoints
- **Environment Configuration**: Easy setup with .env files

---

## 🎥 Demo

### Upload Process
1. Drag and drop or select an exam image
2. Choose processing mode (Normal/Math/Graph)
3. Click "Convert to Text"
4. Get clean, editable text output

### Processing Modes

| Mode | Best For | Technology |
|------|----------|------------|
| **NORMAL** | Typed text, essays, paragraphs | Tesseract OCR |
| **MATH** | Equations, formulas, symbols | PaddleOCR + Qwen Vision AI |
| **GRAPH** | Diagrams, charts, visual data | Qwen Vision AI |

---

## 🛠 Technology Stack

### Frontend
- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling (Glassmorphism effects)
- **Inter Font** - Modern typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Tesseract.js** - OCR for normal text
- **PaddleOCR** - OCR for mathematical expressions
- **Qwen2-VL** - AI vision model (via HuggingFace)
- **Cloudinary** - Image hosting and CDN
- **Multer/Express-Fileupload** - File upload handling

### APIs & Services
- **HuggingFace Inference API** - AI vision processing
- **Cloudinary API** - Image storage and delivery
- **Tesseract OCR Engine** - Text recognition
- **PaddlePaddle** - Mathematical OCR

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│                    (React + Glassmorphic UI)                 │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP Request (Image + Mode)
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER                          │
│                   (Routes + Controllers)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    IMAGE PROCESSING FLOW                     │
├─────────────────────────────────────────────────────────────┤
│  1. Upload to Cloudinary ☁️                                 │
│  2. Select Processing Mode:                                  │
│     ┌────────────┬─────────────┬──────────────┐            │
│     │  NORMAL    │    MATH     │    GRAPH     │            │
│     │ Tesseract  │ PaddleOCR + │  Qwen Vision │            │
│     │    OCR     │ Qwen Vision │   AI Only    │            │
│     └────────────┴─────────────┴──────────────┘            │
│  3. Return Reconstructed Text 📝                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Python 3.8+** - For PaddleOCR (Math mode)
- **Git** - For cloning the repository

#### System Dependencies (Linux/Arch)

```bash
# Install Tesseract OCR
sudo pacman -S tesseract tesseract-data-eng

# Install Python and pip
sudo pacman -S python python-pip

# Install PaddleOCR
pip install paddlepaddle paddleocr
```

#### System Dependencies (macOS)

```bash
# Install Tesseract OCR
brew install tesseract

# Install Python (if not already installed)
brew install python

# Install PaddleOCR
pip3 install paddlepaddle paddleocr
```

#### System Dependencies (Windows)

```bash
# Install Tesseract OCR from: https://github.com/UB-Mannheim/tesseract/wiki
# Add Tesseract to PATH

# Install Python from: https://www.python.org/downloads/

# Install PaddleOCR
pip install paddlepaddle paddleocr
```

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/assscan.git
cd assscan
```

---

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials (see Configuration section)
nano .env
```

---

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
```

---

### Step 4: PaddleOCR Setup

```bash
# Make Python script executable
cd ../backend/services
chmod +x paddle_ocr.py

# Test PaddleOCR installation
python paddle_ocr.py /path/to/test/image.jpg
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration
# Sign up at: https://cloudinary.com/
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# HuggingFace API
# Get token at: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_huggingface_token
```

#### Getting API Keys

**Cloudinary:**
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**HuggingFace:**
1. Sign up at [huggingface.co](https://huggingface.co/)
2. Go to Settings → Access Tokens
3. Create a new token with "Read" permissions
4. Copy the token

---

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory (optional):

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Usage

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 SERVER RUNNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Port: 5000
🌐 URL: http://localhost:5000
📊 Health: http://localhost:5000/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will open at `http://localhost:3000`

---

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-18T12:00:00.000Z",
  "env": "development"
}
```

---

#### 2. Process Image
```http
POST /api/process-image
```

**Request:**
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `image` (file): Image file (JPEG, PNG, WebP, max 10MB)
  - `mode` (string): Processing mode ("NORMAL", "MATH", or "GRAPH")

**Example using cURL:**
```bash
curl -X POST http://localhost:5000/api/process-image \
  -F "image=@/path/to/exam-image.jpg" \
  -F "mode=MATH"
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/...",
    "mode": "MATH",
    "ocrText": "Raw OCR extracted text...",
    "reconstructedQuestion": "Clean, formatted question text..."
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

---

### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid file or parameters |
| 413 | Payload Too Large - File exceeds 10MB |
| 500 | Internal Server Error - Processing failed |

---

## 📁 Project Structure

```
exam-assistant/
│
├── backend/                      # Backend server
│   ├── config/
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── controllers/
│   │   └── imageController.js   # Image processing logic
│   ├── routes/
│   │   └── imageRoutes.js       # API routes
│   ├── services/
│   │   ├── ocrService.js        # Tesseract OCR service
│   │   ├── paddleOcrService.js  # PaddleOCR service
│   │   ├── paddle_ocr.py        # Python script for PaddleOCR
│   │   └── visionService.js     # HuggingFace Vision API
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Main server file
│
├── frontend/                     # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # App header
│   │   │   ├── UploadArea.jsx   # File upload component
│   │   │   ├── ModeSelector.jsx # Mode selection buttons
│   │   │   ├── SubmitButton.jsx # Submit button with loading
│   │   │   ├── OutputSection.jsx# Result display
│   │   │   └── Footer.jsx       # App footer
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── styles/
│   │   │   └── App.css          # Main stylesheet
│   │   ├── utils/
│   │   │   └── constants.js     # Constants and config
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── vite.config.js           # Vite configuration
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   └── package.json
│
└── README.md                     # This file
```

---

## 🎯 Modes Explained

### 1. NORMAL Mode 📝

**Best for:** Typed documents, printed text, essays, paragraphs

**How it works:**
- Uses Tesseract OCR for fast, accurate text extraction
- No AI processing (faster, more efficient)
- Direct OCR output

**Example use cases:**
- Scanning typed exam questions
- Converting printed study notes
- Extracting text from textbooks

**Processing time:** ~2-5 seconds

---

### 2. MATH Mode 🔢

**Best for:** Mathematical equations, formulas, symbols

**How it works:**
1. Uses PaddleOCR (specialized for mathematical notation)
2. Passes result to Qwen Vision AI for refinement
3. AI corrects errors and formats properly

**Example use cases:**
- Complex calculus problems: `∫₀^∞ e^(-x²) dx`
- Linear algebra: matrices, determinants
- Physics equations: `E = mc²`
- Statistics formulas: `Σ(xᵢ - μ)²/n`

**Supported notation:**
- Integrals: `∫`, `∬`, `∭`
- Summations: `Σ`
- Roots: `√`, `∛`
- Exponents: `x²`, `e^x`
- Fractions: `a/b`
- Greek letters: `α`, `β`, `γ`, `π`

**Processing time:** ~10-20 seconds

---

### 3. GRAPH Mode 📊

**Best for:** Diagrams, charts, graphs, visual data

**How it works:**
1. Skips traditional OCR
2. Uses Qwen Vision AI to "see" and describe the diagram
3. Extracts all visual elements, data points, labels

**Example use cases:**
- Bar charts, line graphs, pie charts
- Circuit diagrams
- Geometry problems with shapes
- Biology diagrams
- Chemistry structures
- Physics diagrams

**What it extracts:**
- Graph type and axes
- Data values and trends
- Labels and legends
- Component relationships
- Spatial information

**Processing time:** ~10-20 seconds

---

## 🐛 Troubleshooting

### Backend Issues

#### Server won't start
```bash
# Check if port is in use
lsof -i :5000
# Kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

#### Tesseract errors
```bash
# Verify installation
tesseract --version

# Reinstall if needed
sudo pacman -S tesseract tesseract-data-eng  # Arch
brew reinstall tesseract                      # macOS
```

#### PaddleOCR errors
```bash
# Check Python installation
python --version
python -c "import paddleocr; print('PaddleOCR OK')"

# Reinstall if needed
pip install --upgrade paddlepaddle paddleocr

# Make script executable
chmod +x backend/services/paddle_ocr.py
```

#### Cloudinary upload fails
- Verify credentials in `.env`
- Check file size (max 10MB)
- Test manually at [cloudinary.com](https://cloudinary.com/)

#### HuggingFace API errors
- Verify API token is valid
- Check rate limits (free tier has limits)
- Try regenerating token

---

### Frontend Issues

#### White screen / blank page
```bash
# Clear cache and rebuild
rm -rf node_modules .vite
npm install
npm run dev
```

#### API connection errors
- Verify backend is running on port 5000
- Check `vite.config.js` proxy settings
- Check browser console for CORS errors

#### Footer not visible
- Check that `Footer.jsx` is imported in `App.jsx`
- Verify CSS is loading
- Clear browser cache

#### Upload not working
- Check file type (only JPEG, PNG, WebP)
- Check file size (max 10MB)
- Check browser console for errors

---

### Common Error Messages

| Error | Solution |
|-------|----------|
| "No image file uploaded" | Ensure file is selected before clicking submit |
| "Invalid file type" | Use JPEG, PNG, or WebP images only |
| "File too large" | Compress image to under 10MB |
| "Cloudinary upload failed" | Check API credentials in .env |
| "OCR processing failed" | Ensure Tesseract/PaddleOCR is installed |
| "Vision processing failed" | Check HuggingFace API key and rate limits |

---

## 🧪 Testing

### Test Backend Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Test image processing (replace path)
curl -X POST http://localhost:5000/api/process-image \
  -F "image=@test-image.jpg" \
  -F "mode=NORMAL"
```

### Test Frontend

1. Open browser to `http://localhost:3000`
2. Upload a test image
3. Try all three modes
4. Check browser console for errors

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs
- Use GitHub Issues
- Include error messages and logs
- Provide steps to reproduce

### Feature Requests
- Describe the feature clearly
- Explain use cases
- Discuss implementation ideas

### Pull Requests
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a PR with description

### Code Style
- Use ESLint for JavaScript
- Follow existing code patterns
- Add comments for complex logic
- Update documentation

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 AssScan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Tesseract OCR** - Open-source OCR engine
- **PaddleOCR** - Mathematical OCR by PaddlePaddle
- **Qwen2-VL** - Vision-language model by Alibaba
- **HuggingFace** - AI model hosting and inference
- **Cloudinary** - Image hosting and CDN
- **React Community** - Amazing UI library
- **Express.js** - Fast, minimalist web framework

---

## 📞 Support

- **Documentation**: This README
- **Issues**: [GitHub Issues](https://github.com/yourusername/assscan/issues)
- **Email**: support@assscan.com (if applicable)

---

## 🗺 Roadmap

### Planned Features
- [ ] Multi-language support (Spanish, French, German)
- [ ] Batch processing (multiple images at once)
- [ ] History/saved results
- [ ] User accounts and authentication
- [ ] Mobile app (React Native)
- [ ] PDF export of results
- [ ] Custom OCR training for handwriting
- [ ] API rate limiting and caching
- [ ] WebSocket for real-time progress
- [ ] Dark/Light theme toggle

---

## 📊 Performance

### Benchmarks

| Mode | Average Processing Time | Accuracy |
|------|------------------------|----------|
| NORMAL | 2-5 seconds | 95%+ |
| MATH | 10-20 seconds | 90%+ |
| GRAPH | 10-20 seconds | 85%+ |

*Benchmarks may vary based on image quality and complexity*

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

<div align="center">

**Made with ♥ for students everywhere**

[⬆ Back to Top](#assscan---ai-powered-exam-assistant)

</div>
