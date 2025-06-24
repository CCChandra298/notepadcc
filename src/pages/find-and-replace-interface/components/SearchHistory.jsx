import React from 'react';
import Icon from 'components/AppIcon';

const SearchHistory = ({ history, onSelectTerm, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="p-4 border-b border-border">
        <div className="text-center py-4">
          <Icon name="History" size={24} className="mx-auto text-text-secondary mb-2" />
          <p className="text-sm text-text-secondary">No search history</p>
          <p className="text-xs text-text-secondary mt-1">Your recent searches will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Recent Searches</span>
          </div>
          <button
            onClick={onClearHistory}
            className="text-xs text-text-secondary hover:text-error transition-colors duration-200"
            title="Clear history"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-1 max-h-48 overflow-y-auto">
          {history.map((term, index) => (
            <button
              key={index}
              onClick={() => onSelectTerm(term)}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Icon name="Search" size={12} className="text-text-secondary flex-shrink-0" />
                <span className="truncate font-mono">{term}</span>
              </div>
              <Icon name="ArrowRight" size={12} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Lightbulb" size={12} />
            <span>Click any term to search again</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;