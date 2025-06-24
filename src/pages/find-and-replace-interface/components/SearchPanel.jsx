import React from 'react';
import Icon from 'components/AppIcon';

const SearchPanel = ({
  searchTerm,
  onSearchChange,
  onClear,
  currentMatch,
  totalMatches,
  onNavigate,
  isSearching,
  onToggleReplace,
  isReplaceVisible,
  searchInputRef,
  showHistory,
  onToggleHistory
}) => {
  return (
    <div className="p-4 border-b border-border">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Find in document..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {isSearching && (
                <div className="animate-spin">
                  <Icon name="Loader2" size={14} className="text-text-secondary" />
                </div>
              )}
              {searchTerm && (
                <button
                  onClick={onClear}
                  className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface"
                  title="Clear search"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          </div>
          
          {/* Search History Toggle */}
          <button
            onClick={onToggleHistory}
            className={`absolute -bottom-1 right-2 p-1 rounded text-xs transition-colors duration-200 ${
              showHistory ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
            }`}
            title="Search History"
          >
            <Icon name="History" size={12} />
          </button>
        </div>

        {/* Match Counter and Navigation */}
        {searchTerm && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {totalMatches === 0 ? (
                  'No matches'
                ) : (
                  `${currentMatch} of ${totalMatches}`
                )}
              </span>
              {totalMatches > 0 && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onNavigate('prev')}
                    className="p-1.5 rounded-md border border-border hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={totalMatches === 0}
                    title="Previous match (Shift+F3)"
                  >
                    <Icon name="ChevronUp" size={14} />
                  </button>
                  <button
                    onClick={() => onNavigate('next')}
                    className="p-1.5 rounded-md border border-border hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={totalMatches === 0}
                    title="Next match (F3)"
                  >
                    <Icon name="ChevronDown" size={14} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Replace Toggle */}
            <button
              onClick={onToggleReplace}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                isReplaceVisible 
                  ? 'bg-primary text-white' :'border border-border hover:bg-surface text-text-secondary hover:text-text-primary'
              }`}
              title="Toggle replace (Ctrl+H)"
            >
              <Icon name="Replace" size={14} />
              <span>Replace</span>
            </button>
          </div>
        )}

        {/* Quick Actions */}
        {searchTerm && totalMatches > 0 && (
          <div className="flex items-center space-x-2 pt-2 border-t border-border">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Lightbulb" size={12} />
              <span>Press F3 for next, Shift+F3 for previous</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;