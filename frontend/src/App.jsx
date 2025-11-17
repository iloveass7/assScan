import React, { useState } from 'react'
import Header from './components/Header.jsx'
import UploadArea from './components/UploadArea.jsx'
import ModeSelector from './components/ModeSelector.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import OutputSection from './components/OutputSection.jsx'
import Footer from './components/Footer.jsx'
import { processImage } from './services/api.js'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMode, setSelectedMode] = useState('NORMAL');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await processImage(selectedFile, selectedMode);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Processing failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="background-blur blur-1"></div>
      <div className="background-blur blur-2"></div>
      <div className="background-blur blur-3"></div>
      
      <div className="container">
        <Header />
        
        <UploadArea 
          onFileSelect={handleFileSelect} 
          selectedFile={selectedFile}
        />
        
        <ModeSelector 
          selectedMode={selectedMode} 
          onModeChange={handleModeChange}
        />
        
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!selectedFile}
          loading={loading}
        />
        
        <OutputSection 
          result={result}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;