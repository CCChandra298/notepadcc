import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const FindReplaceBar = ({ isOpen, onClose, editorContent, onHighlight, onReplace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [showReplace, setShowReplace] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('textEditorSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchTerm && editorContent) {
      findMatches();
    } else {
      setTotalMatches(0);
      setCurrentMatch(0);
      if (onHighlight) {
        onHighlight([]);
      }
    }
  }, [searchTerm, matchCase, wholeWord, useRegex, editorContent]);

  const findMatches = () => {
    if (!searchTerm || !editorContent) return;

    try {
      let pattern = searchTerm;
      let flags = 'g';

      if (!matchCase) {
        flags += 'i';
      }

      if (!useRegex) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const regex = new RegExp(pattern, flags);
      const matches = [...editorContent.matchAll(regex)];
      
      setTotalMatches(matches.length);
      setCurrentMatch(matches.length > 0 ? 1 : 0);

      if (onHighlight) {
        const matchPositions = matches.map(match => ({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0]
        }));
        onHighlight(matchPositions);
      }
    } catch (error) {
      console.error('Invalid regex pattern:', error);
      setTotalMatches(0);
      setCurrentMatch(0);
      if (onHighlight) {
        onHighlight([]);
      }
    }
  };

  const navigateMatch = (direction) => {
    if (totalMatches === 0) return;

    let newMatch = currentMatch;
    if (direction === 'next') {
      newMatch = currentMatch >= totalMatches ? 1 : currentMatch + 1;
    } else {
      newMatch = currentMatch <= 1 ? totalMatches : currentMatch - 1;
    }
    setCurrentMatch(newMatch);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    // Add to search history
    if (term && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 9)]; // Keep last 10 searches
      setSearchHistory(newHistory);
      localStorage.setItem('textEditorSearchHistory', JSON.stringify(newHistory));
    }
  };

  const handleReplace = () => {
    if (!searchTerm || !replaceTerm) return;
    
    if (onReplace) {
      onReplace(searchTerm, replaceTerm, false, { matchCase, wholeWord, useRegex });
    }
  };

  const handleReplaceAll = () => {
    if (!searchTerm) return;
    
    if (onReplace) {
      onReplace(searchTerm, replaceTerm, true, { matchCase, wholeWord, useRegex });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setReplaceTerm('');
    setCurrentMatch(0);
    setTotalMatches(0);
    if (onHighlight) {
      onHighlight([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-15 left-0 right-0 z-10 bg-surface border-b border-border shadow-subtle animate-slide-up">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Find & Replace</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-background"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Search Section */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Find..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-3 pr-20 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {totalMatches > 0 && (
                  <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded">
                    {currentMatch}/{totalMatches}
                  </span>
                )}
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="p-1 rounded text-text-secondary hover:text-text-primary"
                  >
                    <Icon name="X" size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && !searchTerm && (
              <div className="max-h-32 overflow-y-auto">
                <div className="text-xs text-text-secondary mb-1">Recent searches:</div>
                <div className="space-y-1">
                  {searchHistory.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(term)}
                      className="block w-full text-left text-xs text-text-secondary hover:text-text-primary hover:bg-background px-2 py-1 rounded"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMatch('prev')}
                disabled={totalMatches === 0}
                className="p-2 rounded-md border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous match"
              >
                <Icon name="ChevronUp" size={16} />
              </button>
              <button
                onClick={() => navigateMatch('next')}
                disabled={totalMatches === 0}
                className="p-2 rounded-md border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next match"
              >
                <Icon name="ChevronDown" size={16} />
              </button>
              <button
                onClick={() => setShowReplace(!showReplace)}
                className={`p-2 rounded-md border border-border hover:bg-background ${
                  showReplace ? 'bg-primary text-white' : ''
                }`}
                title="Toggle replace"
              >
                <Icon name="Replace" size={16} />
              </button>
            </div>
          </div>

          {/* Replace Section */}
          {showReplace && (
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceTerm}
                  onChange={(e) => setReplaceTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReplace}
                  disabled={!searchTerm || totalMatches === 0}
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Replace
                </button>
                <button
                  onClick={handleReplaceAll}
                  disabled={!searchTerm || totalMatches === 0}
                  className="px-3 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Replace All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Options */}
        <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="rounded border-border focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-text-secondary">Match case</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="rounded border-border focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-text-secondary">Whole word</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="rounded border-border focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-sm text-text-secondary">Use regex</span>
          </label>
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-text-secondary">
              {totalMatches === 0 ? (
                'No matches found'
              ) : (
                `${totalMatches} match${totalMatches !== 1 ? 'es' : ''} found`
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindReplaceBar;