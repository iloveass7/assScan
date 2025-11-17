import React from 'react';
import { MODES } from '../utils/constants';

const ModeSelector = ({ selectedMode, onModeChange }) => {
  return (
    <div className="mode-selector">
      <p className="mode-label">Select Mode</p>
      <div className="mode-buttons">
        {Object.values(MODES).map((mode) => (
          <button
            key={mode.id}
            className={`mode-button glass-button ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeChange(mode.id)}
          >
            <span className="mode-name">{mode.label}</span>
            <span className="mode-description">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;