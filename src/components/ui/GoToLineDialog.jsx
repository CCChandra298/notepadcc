import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const GoToLineDialog = ({ 
  isOpen, 
  onClose, 
  onGoToLine, 
  totalLines = 1, 
  currentLine = 1 
}) => {
  const [lineNumber, setLineNumber] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLineNumber(currentLine.toString());
      // Focus input after dialog is rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, 100);
    }
  }, [isOpen, currentLine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetLine = parseInt(lineNumber, 10);
    
    if (isNaN(targetLine) || targetLine < 1 || targetLine > totalLines) {
      return;
    }
    
    if (onGoToLine) {
      onGoToLine(targetLine);
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setLineNumber(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-background border border-border rounded-lg shadow-large w-96 max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Go To Line</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface text-text-secondary hover:text-text-primary"
            title="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="lineNumber" className="block text-sm font-medium text-text-primary mb-2">
                Line number (1-{totalLines}):
              </label>
              <input
                ref={inputRef}
                id="lineNumber"
                type="text"
                value={lineNumber}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter line number"
                autoComplete="off"
              />
            </div>
            
            <div className="text-sm text-text-secondary">
              Current line: {currentLine} of {totalLines}
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!lineNumber || parseInt(lineNumber, 10) < 1 || parseInt(lineNumber, 10) > totalLines}
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Go To Line
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoToLineDialog;