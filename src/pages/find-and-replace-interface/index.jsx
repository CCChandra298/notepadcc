import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Header from 'components/ui/Header';
import SearchPanel from './components/SearchPanel';
import ReplacePanel from './components/ReplacePanel';
import OptionsPanel from './components/OptionsPanel';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';

const FindAndReplaceInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [isReplaceVisible, setIsReplaceVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Search options
  const [options, setOptions] = useState({
    matchCase: false,
    wholeWord: false,
    useRegex: false,
    searchScope: 'current' // 'current' or 'all'
  });

  // Mock document content for demonstration
  const [documentContent, setDocumentContent] = useState(`Welcome to NotepadCC - Advanced Text Editor

This is a sample document to demonstrate the Find and Replace functionality. You can search for specific words, phrases, or patterns within this text.

Features include:
- Case-sensitive search
- Whole word matching
- Regular expression support
- Replace single or all occurrences
- Search history tracking
- Real-time match highlighting

Try searching for words like "search", "replace", "text", or "document" to see the functionality in action. The interface provides powerful tools for efficient text manipulation and editing.

Advanced users can utilize regular expressions for complex pattern matching. For example, you could search for email patterns, phone numbers, or specific formatting structures within your documents.

The search functionality integrates seamlessly with the main editor, providing visual feedback and easy navigation between matches throughout your document.`);

  const searchInputRef = useRef(null);
  const replaceInputRef = useRef(null);

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('notepadcc-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      performSearch();
    } else {
      setTotalMatches(0);
      setCurrentMatch(0);
    }
  }, [searchTerm, options, documentContent]);

  const performSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    try {
      let pattern = searchTerm;
      let flags = 'g';

      if (!options.matchCase) {
        flags += 'i';
      }

      if (!options.useRegex) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (options.wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const regex = new RegExp(pattern, flags);
      const matches = [...documentContent.matchAll(regex)];
      
      setTotalMatches(matches.length);
      setCurrentMatch(matches.length > 0 ? 1 : 0);
    } catch (error) {
      console.error('Search error:', error);
      setTotalMatches(0);
      setCurrentMatch(0);
    }
    
    setIsSearching(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('notepadcc-search-history', JSON.stringify(newHistory));
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

  const handleReplace = (replaceAll = false) => {
    if (!searchTerm || !replaceTerm) return;

    let newContent = documentContent;
    
    try {
      let pattern = searchTerm;
      let flags = 'g';

      if (!options.matchCase) {
        flags += 'i';
      }

      if (!options.useRegex) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (options.wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const regex = new RegExp(pattern, flags);
      
      if (replaceAll) {
        newContent = documentContent.replace(regex, replaceTerm);
      } else {
        // Replace only current match (simplified for demo)
        newContent = documentContent.replace(regex, replaceTerm);
      }
      
      setDocumentContent(newContent);
      
      // Show confirmation
      const replacedCount = replaceAll ? totalMatches : 1;
      console.log(`Replaced ${replacedCount} occurrence${replacedCount !== 1 ? 's' : ''}`);
      
    } catch (error) {
      console.error('Replace error:', error);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setReplaceTerm('');
    setCurrentMatch(0);
    setTotalMatches(0);
    setShowHistory(false);
  };

  const toggleReplace = () => {
    setIsReplaceVisible(!isReplaceVisible);
    if (!isReplaceVisible) {
      setTimeout(() => replaceInputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-15">
        {/* Navigation Breadcrumb */}
        <div className="bg-surface border-b border-border px-4 py-2">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/text-editor-workspace" className="text-primary hover:text-primary/80">
              Text Editor
            </Link>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="text-text-primary font-medium">Find & Replace</span>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-7.5rem)]">
          {/* Find & Replace Panel */}
          <div className="w-full lg:w-96 bg-background border-r border-border flex flex-col">
            {/* Panel Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold text-text-primary font-heading">
                  Find & Replace
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsOptionsVisible(!isOptionsVisible)}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      isOptionsVisible ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                    title="Search Options"
                  >
                    <Icon name="Settings" size={16} />
                  </button>
                  <Link
                    to="/text-editor-workspace"
                    className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
                    title="Back to Editor"
                  >
                    <Icon name="X" size={16} />
                  </Link>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="flex items-center space-x-2 mb-4">
                <Link
                  to="/text-editor-workspace"
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="FileText" size={16} />
                  <span>Editor</span>
                </Link>
                <Link
                  to="/file-management-hub"
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="Folder" size={16} />
                  <span>Files</span>
                </Link>
                <Link
                  to="/document-settings-panel"
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </Link>
              </div>
            </div>

            {/* Search Panel */}
            <div className="flex-1 overflow-y-auto">
              <SearchPanel
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                onClear={clearSearch}
                currentMatch={currentMatch}
                totalMatches={totalMatches}
                onNavigate={navigateMatch}
                isSearching={isSearching}
                onToggleReplace={toggleReplace}
                isReplaceVisible={isReplaceVisible}
                searchInputRef={searchInputRef}
                showHistory={showHistory}
                onToggleHistory={() => setShowHistory(!showHistory)}
              />

              {/* Search History */}
              {showHistory && (
                <SearchHistory
                  history={searchHistory}
                  onSelectTerm={handleSearch}
                  onClearHistory={() => {
                    setSearchHistory([]);
                    localStorage.removeItem('notepadcc-search-history');
                  }}
                />
              )}

              {/* Replace Panel */}
              {isReplaceVisible && (
                <ReplacePanel
                  replaceTerm={replaceTerm}
                  onReplaceChange={setReplaceTerm}
                  onReplace={() => handleReplace(false)}
                  onReplaceAll={() => handleReplace(true)}
                  disabled={!searchTerm || totalMatches === 0}
                  replaceInputRef={replaceInputRef}
                />
              )}

              {/* Options Panel */}
              {isOptionsVisible && (
                <OptionsPanel
                  options={options}
                  onOptionsChange={setOptions}
                />
              )}

              {/* Search Results */}
              <SearchResults
                searchTerm={searchTerm}
                currentMatch={currentMatch}
                totalMatches={totalMatches}
                isSearching={isSearching}
              />
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 bg-background">
            <div className="h-full flex flex-col">
              {/* Document Header */}
              <div className="p-4 border-b border-border bg-surface">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-text-secondary" />
                    <div>
                      <h2 className="text-sm font-medium text-text-primary">Sample Document</h2>
                      <p className="text-xs text-text-secondary">Demonstrating search functionality</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {totalMatches > 0 && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        <Icon name="Search" size={12} />
                        <span>{totalMatches} matches</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white border border-border rounded-lg shadow-subtle p-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-text-primary leading-relaxed font-mono text-sm">
                        {documentContent.split('').map((char, index) => {
                          // Simple highlighting logic for demonstration
                          const isHighlighted = searchTerm && 
                            documentContent.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            index >= documentContent.toLowerCase().indexOf(searchTerm.toLowerCase()) &&
                            index < documentContent.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length;
                          
                          return (
                            <span
                              key={index}
                              className={isHighlighted ? 'bg-yellow-200 text-yellow-900' : ''}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAndReplaceInterface;