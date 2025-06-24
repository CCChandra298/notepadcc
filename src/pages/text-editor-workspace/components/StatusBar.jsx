import React from 'react';
import Icon from 'components/AppIcon';

const StatusBar = ({
  fileName,
  isModified,
  cursorPosition,
  wordCount,
  characterCount,
  selectedText,
  lastSaved,
  zoomLevel,
  encoding = 'UTF-8',
  lineEnding = 'LF',
  language = 'Text',
  showStatusBar = true,
  onStatusClick
}) => {
  const formatLastSaved = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'txt': return 'FileText';
      case 'md': return 'FileType';
      case 'js': case 'jsx': return 'Code';
      case 'html': return 'Globe';
      case 'css': return 'Palette';
      case 'json': return 'Braces';
      default: return 'File';
    }
  };

  const handleStatusItemClick = (item, data) => {
    if (onStatusClick) {
      onStatusClick(item, data);
    }
  };

  if (!showStatusBar) return null;

  return (
    <div className="bg-surface border-t border-border px-4 py-2">
      <div className="flex items-center justify-between text-xs text-text-secondary">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* File Info */}
          <div className="flex items-center space-x-2">
            <Icon name={getFileIcon(fileName)} size={12} />
            <span className="font-medium">
              {fileName || 'Untitled'}
              {isModified && <span className="text-warning ml-1">●</span>}
            </span>
          </div>

          {/* Document Stats */}
          <button
            onClick={() => handleStatusItemClick('stats', { wordCount, characterCount })}
            className="hover:text-text-primary transition-colors duration-200"
            title="Document Statistics"
          >
            {wordCount} words, {characterCount} characters
          </button>

          {/* Selection Info */}
          {selectedText && (
            <span className="text-primary">
              {selectedText.length} selected
              {selectedText.includes('\n') && ` (${selectedText.split('\n').length} lines)`}
            </span>
          )}

          {/* Last Saved */}
          <span title={lastSaved ? `Last saved: ${lastSaved.toLocaleString()}` : 'Not saved'}>
            Saved: {formatLastSaved(lastSaved)}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Mode */}
          <button
            onClick={() => handleStatusItemClick('language', language)}
            className="hover:text-text-primary transition-colors duration-200"
            title="Language Mode"
          >
            {language}
          </button>

          {/* Encoding */}
          <button
            onClick={() => handleStatusItemClick('encoding', encoding)}
            className="hover:text-text-primary transition-colors duration-200"
            title="File Encoding"
          >
            {encoding}
          </button>

          {/* Line Ending */}
          <button
            onClick={() => handleStatusItemClick('lineEnding', lineEnding)}
            className="hover:text-text-primary transition-colors duration-200"
            title="Line Ending Type"
          >
            {lineEnding}
          </button>

          {/* Cursor Position */}
          <button
            onClick={() => handleStatusItemClick('position', cursorPosition)}
            className="hover:text-text-primary transition-colors duration-200"
            title="Cursor Position (Click to go to line)"
          >
            Ln {cursorPosition?.line || 1}, Col {cursorPosition?.column || 1}
          </button>

          {/* Zoom Level */}
          <button
            onClick={() => handleStatusItemClick('zoom', zoomLevel)}
            className="hover:text-text-primary transition-colors duration-200"
            title="Zoom Level"
          >
            {zoomLevel}%
          </button>

          {/* Insert Mode */}
          <span className="uppercase font-mono">INS</span>
        </div>
      </div>

      {/* Additional Status Row for Extended Info */}
      <div className="flex items-center justify-between text-xs text-text-secondary/60 mt-1">
        <div className="flex items-center space-x-4">
          {/* File Size */}
          <span>
            Size: {new Blob([selectedText || '']).size || characterCount} bytes
          </span>

          {/* Reading Time Estimate */}
          <span>
            ~{Math.max(1, Math.ceil(wordCount / 200))} min read
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auto Save Status */}
          <div className="flex items-center space-x-1">
            <Icon 
              name={isModified ? "Clock" : "Check"} 
              size={10} 
              className={isModified ? "text-warning" : "text-success"} 
            />
            <span>Auto-save {isModified ? 'pending' : 'on'}</span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;