import React from 'react';
import Icon from 'components/AppIcon';

const SearchResults = ({ searchTerm, currentMatch, totalMatches, isSearching }) => {
  if (!searchTerm) {
    return (
      <div className="p-4 text-center">
        <Icon name="Search" size={32} className="mx-auto text-text-secondary mb-3" />
        <p className="text-sm text-text-secondary mb-2">Start typing to search</p>
        <p className="text-xs text-text-secondary">Use advanced options for precise matching</p>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin mb-3">
          <Icon name="Loader2" size={24} className="mx-auto text-primary" />
        </div>
        <p className="text-sm text-text-secondary">Searching...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3">
        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Search Results</span>
          </div>
          {totalMatches > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              <Icon name="Target" size={12} />
              <span>{totalMatches} found</span>
            </div>
          )}
        </div>

        {/* Results Content */}
        {totalMatches === 0 ? (
          <div className="text-center py-6">
            <Icon name="SearchX" size={32} className="mx-auto text-text-secondary mb-3" />
            <p className="text-sm text-text-secondary mb-2">No matches found</p>
            <p className="text-xs text-text-secondary">
              Try adjusting your search term or options
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Current Match Info */}
            <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  Match {currentMatch} of {totalMatches}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} className="text-primary" />
                  <span className="text-xs text-primary">Highlighted in document</span>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                Search term: <span className="font-mono bg-background px-1 rounded">{searchTerm}</span>
              </div>
            </div>

            {/* Match Navigation */}
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-xs text-text-secondary">Navigate matches</span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded">F3</kbd>
                <span className="text-xs text-text-secondary">Next</span>
                <kbd className="px-2 py-1 text-xs bg-background border border-border rounded ml-2">Shift+F3</kbd>
                <span className="text-xs text-text-secondary">Previous</span>
              </div>
            </div>

            {/* Search Statistics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-surface p-2 rounded">
                <div className="text-text-secondary">Total matches</div>
                <div className="font-medium text-text-primary">{totalMatches}</div>
              </div>
              <div className="bg-surface p-2 rounded">
                <div className="text-text-secondary">Current position</div>
                <div className="font-medium text-text-primary">{currentMatch}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;