import React, { useState, useRef } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../utils/constants';

const UploadArea = ({ onFileSelect, selectedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return 'No file selected';
    
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Invalid file type. Please upload JPEG, PNG, or WebP images.';
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    
    return null;
  };

  const handleFile = (file) => {
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      setPreview(null);
      return;
    }
    
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="upload-card glass-card">
      <div
        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button className="change-image-btn" onClick={handleButtonClick}>
              Change Image
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="upload-text">Drag and drop your image here</p>
            <p className="upload-text-small">or</p>
            <button className="upload-button glass-button" onClick={handleButtonClick}>
              Choose File
            </button>
            <p className="upload-info">JPEG, PNG, WebP up to 10MB</p>
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          className="file-input"
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleChange}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {selectedFile && !error && (
        <div className="file-info">
          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
    </div>
  );
};

export default UploadArea;