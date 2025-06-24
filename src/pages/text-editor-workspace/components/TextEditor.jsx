import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const TextEditor = forwardRef(({
  content,
  onChange,
  onCursorPositionChange,
  onTextSelection,
  settings,
  zoomLevel,
  searchMatches
}, ref) => {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useImperativeHandle(ref, () => textareaRef.current);

  // Calculate cursor position
  const calculateCursorPosition = () => {
    if (!textareaRef.current) return { line: 1, column: 1 };
    
    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = content.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1
    };
  };

  // Handle cursor position changes
  const handleSelectionChange = () => {
    const position = calculateCursorPosition();
    onCursorPositionChange(position);

    // Handle text selection
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      onTextSelection(selectedText);
    }
  };

  // Handle content changes
  const handleContentChange = (e) => {
    onChange(e.target.value);
  };

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const tabSize = settings.tabSize || 4;
      const tabChar = settings.insertSpaces ? ' '.repeat(tabSize) : '\t';
      
      const newContent = content.substring(0, start) + tabChar + content.substring(end);
      onChange(newContent);
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabChar.length;
        handleSelectionChange();
      }, 0);
    }
  };

  // Update line numbers
  const updateLineNumbers = () => {
    if (!lineNumbersRef.current || !settings.showLineNumbers) return;
    
    const lines = content.split('\n');
    const lineNumbers = lines.map((_, index) => index + 1).join('\n');
    lineNumbersRef.current.textContent = lineNumbers;
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Update line numbers when content changes
  useEffect(() => {
    updateLineNumbers();
  }, [content, settings.showLineNumbers]);

  // Apply settings
  const editorStyle = {
    fontSize: `${(settings.fontSize * zoomLevel) / 100}px`,
    fontFamily: settings.fontFamily,
    lineHeight: settings.lineHeight,
    whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre'
  };

  const lineNumberStyle = {
    fontSize: `${(settings.fontSize * zoomLevel) / 100}px`,
    fontFamily: settings.fontFamily,
    lineHeight: settings.lineHeight
  };

  return (
    <div className="flex h-full bg-background relative">
      {/* Line Numbers */}
      {settings.showLineNumbers && (
        <div className="flex-shrink-0 bg-surface border-r border-border">
          <pre
            ref={lineNumbersRef}
            className="px-3 py-4 text-text-secondary text-right select-none overflow-hidden"
            style={lineNumberStyle}
            onScroll={handleScroll}
          />
        </div>
      )}

      {/* Text Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onSelect={handleSelectionChange}
          onMouseUp={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onScroll={handleScroll}
          placeholder="Start typing your document..."
          spellCheck={settings.spellCheck}
          className={`
            w-full h-full p-4 bg-transparent border-none outline-none resize-none text-editor
            ${settings.highlightCurrentLine ? 'highlight-current-line' : ''}
            ${settings.showWhitespace ? 'show-whitespace' : ''}
          `}
          style={editorStyle}
        />

        {/* Search Highlights Overlay */}
        {searchMatches.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {/* This would contain highlighted search results */}
            {/* Implementation would require more complex text rendering */}
          </div>
        )}

        {/* Cursor Line Highlight */}
        {settings.highlightCurrentLine && (
          <style jsx>{`
            .highlight-current-line:focus {
              background-image: linear-gradient(
                to right,
                transparent 0%,
                rgba(37, 99, 235, 0.05) 0%,
                rgba(37, 99, 235, 0.05) 100%,
                transparent 100%
              );
              background-size: 100% ${settings.lineHeight}em;
              background-repeat: no-repeat;
            }
          `}</style>
        )}

        {/* Whitespace Indicators */}
        {settings.showWhitespace && (
          <style jsx>{`
            .show-whitespace {
              background-image: 
                radial-gradient(circle, rgba(100, 116, 139, 0.3) 1px, transparent 1px);
              background-size: 1ch 1em;
              background-position: 0 0;
            }
          `}</style>
        )}
      </div>

      {/* Minimap */}
      {settings.showMinimap && content.length > 1000 && (
        <div className="w-20 bg-surface border-l border-border overflow-hidden">
          <div className="text-xs p-1 text-text-secondary leading-none font-mono">
            {content.substring(0, 2000).split('\n').map((line, index) => (
              <div key={index} className="truncate opacity-60">
                {line || ' '}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;