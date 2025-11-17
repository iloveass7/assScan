import React from 'react';

const SubmitButton = ({ onClick, disabled, loading }) => {
  return (
    <button
      className={`submit-button glass-button ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Processing...
        </>
      ) : (
        'Convert to Text'
      )}
    </button>
  );
};

export default SubmitButton;