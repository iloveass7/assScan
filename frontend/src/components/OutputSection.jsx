import React, { useState } from 'react';

const OutputSection = ({ result, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.reconstructedQuestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result && !error) return null;

  return (
    <div className="output-section glass-card">
      <div className="output-header">
        <h3 className="output-title">Result</h3>
        {result && (
          <button className="copy-button glass-button" onClick={handleCopy}>
            {copied ? (
              <>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div className="error-output">
          <p className="error-icon">⚠️</p>
          <p className="error-text">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="output-content">
          <div className="output-text">
            {result.reconstructedQuestion}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputSection;