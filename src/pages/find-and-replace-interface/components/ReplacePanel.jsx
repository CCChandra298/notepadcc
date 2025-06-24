import React from 'react';
import Icon from 'components/AppIcon';

const ReplacePanel = ({
  replaceTerm,
  onReplaceChange,
  onReplace,
  onReplaceAll,
  disabled,
  replaceInputRef
}) => {
  return (
    <div className="p-4 border-b border-border bg-surface/50">
      <div className="space-y-4">
        {/* Replace Input */}
        <div className="relative">
          <Icon 
            name="Replace" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            ref={replaceInputRef}
            type="text"
            placeholder="Replace with..."
            value={replaceTerm}
            onChange={(e) => onReplaceChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>

        {/* Replace Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onReplace}
            disabled={disabled}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200"
            title="Replace current match (Ctrl+Shift+L)"
          >
            <Icon name="Replace" size={14} />
            <span>Replace</span>
          </button>
          
          <button
            onClick={onReplaceAll}
            disabled={disabled}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200"
            title="Replace all matches (Ctrl+Shift+Enter)"
          >
            <Icon name="ReplaceAll" size={14} />
            <span>Replace All</span>
          </button>
        </div>

        {/* Replace Info */}
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Info" size={12} />
          <span>Use Ctrl+Z to undo replacements</span>
        </div>
      </div>
    </div>
  );
};

export default ReplacePanel;