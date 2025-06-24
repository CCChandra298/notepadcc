import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import FileManagementPanel from 'components/ui/FileManagementPanel';
import SettingsPanel from 'components/ui/SettingsPanel';
import FindReplaceBar from 'components/ui/FindReplaceBar';
import DocumentTabs from 'components/ui/DocumentTabs';
import GoToLineDialog from 'components/ui/GoToLineDialog';
import PrintPreviewDialog from 'components/ui/PrintPreviewDialog';

import Toolbar from './components/Toolbar';
import StatusBar from './components/StatusBar';
import FileSidebar from './components/FileSidebar';
import TextEditor from './components/TextEditor';

const TextEditorWorkspace = () => {
  const navigate = useNavigate();
  
  // Document Management State
  const [documents, setDocuments] = useState([
    {
      id: 1,
      fileName: 'Untitled Document.txt',
      content: '',
      isModified: false,
      cursorPosition: { line: 1, column: 1 },
      undoStack: [],
      redoStack: [],
      searchMatches: []
    }
  ]);
  const [activeDocumentIndex, setActiveDocumentIndex] = useState(0);
  
  // UI State
  const [showFilePanel, setShowFilePanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showGoToLine, setShowGoToLine] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  
  // Editor Settings
  const [zoomLevel, setZoomLevel] = useState(100);
  const [settings, setSettings] = useState({
    fontSize: 14,
    fontFamily: 'Inter',
    lineHeight: 1.5,
    wordWrap: true,
    showLineNumbers: false,
    theme: 'light',
    tabSize: 4,
    insertSpaces: true,
    spellCheck: true,
    highlightCurrentLine: false,
    showWhitespace: false,
    showMinimap: false
  });
  
  // File Management
  const [recentFiles, setRecentFiles] = useState([]);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Derived State
  const activeDocument = documents[activeDocumentIndex] || documents[0];
  const wordCount = activeDocument?.content ? activeDocument.content.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  const characterCount = activeDocument?.content?.length || 0;
  const [selectedText, setSelectedText] = useState('');
  
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);

  // Mock recent files data
  const mockRecentFiles = [
    {
      id: '1',
      name: 'Meeting Notes.txt',
      content: `Meeting Notes - Project Planning
Date: ${new Date().toLocaleDateString()}

Attendees:
- John Smith (Project Manager)
- Sarah Johnson (Lead Developer)
- Mike Chen (UI/UX Designer)
- Lisa Wang (QA Engineer)

Agenda:
1. Project timeline review
2. Resource allocation
3. Technical requirements
4. Next steps

Discussion Points:
- Frontend development using React 18
- Backend API integration
- Database schema design
- Testing strategy implementation

Action Items:
- Complete wireframes by Friday
- Set up development environment
- Schedule client review meeting
- Prepare technical documentation

Next Meeting: Next Tuesday at 2:00 PM`,
      lastModified: new Date(Date.now() - 86400000).toISOString(),
      size: 1024
    },
    {
      id: '2',
      name: 'Shopping List.txt',
      content: `Weekly Shopping List

Groceries:
- Fresh vegetables (carrots, broccoli, spinach)
- Fruits (apples, bananas, oranges)
- Dairy products (milk, cheese, yogurt)
- Protein (chicken breast, salmon, eggs)
- Grains (brown rice, quinoa, whole wheat bread)

Household Items:
- Laundry detergent
- Dish soap
- Paper towels
- Toilet paper
- Light bulbs

Personal Care:
- Shampoo
- Toothpaste
- Body wash
- Vitamins

Notes:
- Check for sales on organic produce
- Use coupons for household items
- Buy in bulk for non-perishables`,
      lastModified: new Date(Date.now() - 172800000).toISOString(),
      size: 512
    },
    {
      id: '3',
      name: 'Code Snippets.txt',
      content: `Useful Code Snippets

React Functional Component:
function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effect logic
  }, [dependency]);
  
  return (
    <div className="component">
      {/* JSX content */}
    </div>
  );
}

CSS Flexbox Center:
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

JavaScript Array Methods:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n > 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

Async/Await Pattern:
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      lastModified: new Date(Date.now() - 259200000).toISOString(),
      size: 2048
    }
  ];

  // Initialize recent files
  useEffect(() => {
    const savedFiles = localStorage.getItem('textEditorRecentFiles');
    if (savedFiles) {
      setRecentFiles(JSON.parse(savedFiles));
    } else {
      setRecentFiles(mockRecentFiles);
      localStorage.setItem('textEditorRecentFiles', JSON.stringify(mockRecentFiles));
    }
  }, []);

  // Load settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('textEditorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && activeDocument?.isModified && activeDocument?.content) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save after 30 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [activeDocument?.content, activeDocument?.isModified, autoSaveEnabled]);

  const handleAutoSave = useCallback(() => {
    if (activeDocument?.content) {
      const autoSaveData = {
        content: activeDocument.content,
        fileName: activeDocument.fileName,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('textEditorAutoSave', JSON.stringify(autoSaveData));
      setLastSaved(new Date());
      updateDocument(activeDocumentIndex, { isModified: false });
    }
  }, [activeDocument?.content, activeDocument?.fileName, activeDocumentIndex]);

  // Document Management Functions
  const updateDocument = (index, updates) => {
    setDocuments(prev => prev.map((doc, i) => 
      i === index ? { ...doc, ...updates } : doc
    ));
  };

  const createNewDocument = (content = '', fileName = null) => {
    const newDoc = {
      id: Date.now(),
      fileName: fileName || `Untitled-${documents.length + 1}.txt`,
      content,
      isModified: false,
      cursorPosition: { line: 1, column: 1 },
      undoStack: [],
      redoStack: [],
      searchMatches: []
    };
    
    setDocuments(prev => [...prev, newDoc]);
    setActiveDocumentIndex(documents.length);
    return newDoc;
  };

  const closeDocument = (index) => {
    if (documents.length === 1) {
      // If it's the last document, create a new empty one
      setDocuments([{
        id: Date.now(),
        fileName: 'Untitled Document.txt',
        content: '',
        isModified: false,
        cursorPosition: { line: 1, column: 1 },
        undoStack: [],
        redoStack: [],
        searchMatches: []
      }]);
      setActiveDocumentIndex(0);
    } else {
      const newDocs = documents.filter((_, i) => i !== index);
      setDocuments(newDocs);
      setActiveDocumentIndex(Math.min(activeDocumentIndex, newDocs.length - 1));
    }
  };

  // Content Management
  const handleContentChange = (newContent) => {
    if (!activeDocument) return;
    
    // Add to undo stack
    if (activeDocument.content !== newContent) {
      const newUndoStack = [...activeDocument.undoStack.slice(-49), activeDocument.content];
      updateDocument(activeDocumentIndex, {
        content: newContent,
        isModified: true,
        undoStack: newUndoStack,
        redoStack: []
      });
    }
  };

  const handleUndo = () => {
    if (!activeDocument || activeDocument.undoStack.length === 0) return;
    
    const previousContent = activeDocument.undoStack[activeDocument.undoStack.length - 1];
    const newUndoStack = activeDocument.undoStack.slice(0, -1);
    const newRedoStack = [activeDocument.content, ...activeDocument.redoStack];
    
    updateDocument(activeDocumentIndex, {
      content: previousContent,
      undoStack: newUndoStack,
      redoStack: newRedoStack
    });
  };

  const handleRedo = () => {
    if (!activeDocument || activeDocument.redoStack.length === 0) return;
    
    const nextContent = activeDocument.redoStack[0];
    const newRedoStack = activeDocument.redoStack.slice(1);
    const newUndoStack = [...activeDocument.undoStack, activeDocument.content];
    
    updateDocument(activeDocumentIndex, {
      content: nextContent,
      undoStack: newUndoStack,
      redoStack: newRedoStack
    });
  };

  // File Operations
  const handleNewFile = () => {
    if (activeDocument?.isModified) {
      const shouldSave = window.confirm('You have unsaved changes. Do you want to save before creating a new file?');
      if (shouldSave) {
        handleSave();
      }
    }
    
    updateDocument(activeDocumentIndex, {
      content: '',
      fileName: 'Untitled Document.txt',
      isModified: false,
      undoStack: [],
      redoStack: []
    });
  };

  const handleNewTab = () => {
    createNewDocument();
  };

  const handleNewWindow = () => {
    window.open(window.location.href, '_blank');
  };

  const handleOpenFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        if (activeDocument?.content === '' && !activeDocument?.isModified) {
          // Replace current empty document
          updateDocument(activeDocumentIndex, {
            content,
            fileName: file.name,
            isModified: false,
            undoStack: [],
            redoStack: []
          });
        } else {
          // Create new tab
          createNewDocument(content, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    if (!activeDocument) return;
    
    const blob = new Blob([activeDocument.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeDocument.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    updateDocument(activeDocumentIndex, { isModified: false });
    setLastSaved(new Date());
  };

  const handleSaveAs = () => {
    const newFileName = prompt('Enter file name:', activeDocument?.fileName || 'document.txt');
    if (newFileName) {
      updateDocument(activeDocumentIndex, { fileName: newFileName });
      handleSave();
    }
  };

  const handleSaveAll = () => {
    documents.forEach((doc, index) => {
      if (doc.isModified) {
        const blob = new Blob([doc.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        updateDocument(index, { isModified: false });
      }
    });
    setLastSaved(new Date());
  };

  const handlePrint = () => {
    if (!activeDocument) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${activeDocument.fileName}</title>
          <style>
            body { font-family: ${settings.fontFamily}; font-size: ${settings.fontSize}px; line-height: ${settings.lineHeight}; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <pre>${activeDocument.content}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Edit Operations
  const handleCut = () => {
    if (selectedText && textareaRef.current) {
      navigator.clipboard.writeText(selectedText);
      document.execCommand('cut');
    }
  };

  const handleCopy = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
    }
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then(text => {
      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const newContent = activeDocument.content.substring(0, start) + text + activeDocument.content.substring(end);
        handleContentChange(newContent);
      }
    });
  };

  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      setSelectedText(activeDocument?.content || '');
    }
  };

  const handleDelete = () => {
    if (selectedText && textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = activeDocument.content.substring(0, start) + activeDocument.content.substring(end);
      handleContentChange(newContent);
    }
  };

  const handleInsertDateTime = () => {
    const now = new Date();
    const dateTimeString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const newContent = activeDocument.content.substring(0, start) + dateTimeString + activeDocument.content.substring(start);
      handleContentChange(newContent);
    }
  };

  const handleGoToLine = (lineNumber) => {
    if (!textareaRef.current) return;
    
    const lines = activeDocument.content.split('\n');
    const targetLine = Math.min(lineNumber, lines.length);
    
    // Calculate character position
    let charPosition = 0;
    for (let i = 0; i < targetLine - 1; i++) {
      charPosition += lines[i].length + 1; // +1 for newline
    }
    
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(charPosition, charPosition);
  };

  // View Operations
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  // Event Handlers
  const handleCursorPositionChange = (position) => {
    updateDocument(activeDocumentIndex, { cursorPosition: position });
  };

  const handleTextSelection = (text) => {
    setSelectedText(text);
  };

  const handleFileFromSidebar = (file) => {
    if (activeDocument?.isModified) {
      const shouldSave = window.confirm('You have unsaved changes. Do you want to save before opening another file?');
      if (shouldSave) {
        handleSave();
      }
    }
    
    if (activeDocument?.content === '' && !activeDocument?.isModified) {
      updateDocument(activeDocumentIndex, {
        content: file.content,
        fileName: file.name,
        isModified: false,
        undoStack: [],
        redoStack: []
      });
    } else {
      createNewDocument(file.content, file.name);
    }
  };

  const handleHighlightMatches = (matches) => {
    updateDocument(activeDocumentIndex, { searchMatches: matches });
  };

  const handleReplace = (searchTerm, replaceTerm, replaceAll, options) => {
    if (!activeDocument) return;
    
    let newContent = activeDocument.content;
    
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
        newContent = activeDocument.content.replace(regex, replaceTerm);
      } else {
        newContent = activeDocument.content.replace(regex, replaceTerm);
      }
      
      if (newContent !== activeDocument.content) {
        handleContentChange(newContent);
      }
    } catch (error) {
      console.error('Replace error:', error);
    }
  };

  // Header Menu Handlers
  const handleFileAction = (action) => {
    switch (action) {
      case 'new': handleNewFile(); break;
      case 'newTab': handleNewTab(); break;
      case 'newWindow': handleNewWindow(); break;
      case 'open': handleOpenFile(); break;
      case 'save': handleSave(); break;
      case 'saveAs': handleSaveAs(); break;
      case 'saveAll': handleSaveAll(); break;
      case 'print': handlePrint(); break;
      case 'printPreview': setShowPrintPreview(true); break;
      case 'closeTab': closeDocument(activeDocumentIndex); break;
      case 'exit': window.close(); break;
      default: console.log(`File action: ${action}`);
    }
  };

  const handleEditAction = (action) => {
    switch (action) {
      case 'undo': handleUndo(); break;
      case 'redo': handleRedo(); break;
      case 'cut': handleCut(); break;
      case 'copy': handleCopy(); break;
      case 'paste': handlePaste(); break;
      case 'delete': handleDelete(); break;
      case 'selectAll': handleSelectAll(); break;
      case 'insertDateTime': handleInsertDateTime(); break;
      case 'find': setShowFindReplace(true); break;
      case 'replace': setShowFindReplace(true); break;
      case 'goToLine': setShowGoToLine(true); break;
      case 'wordWrap': 
        setSettings(prev => ({ ...prev, wordWrap: !prev.wordWrap }));
        break;
      default: console.log(`Edit action: ${action}`);
    }
  };

  const handleViewAction = (action) => {
    switch (action) {
      case 'zoom-in': handleZoomIn(); break;
      case 'zoom-out': handleZoomOut(); break;
      case 'reset-zoom': handleResetZoom(); break;
      case 'status-bar': setShowStatusBar(!showStatusBar); break;
      case 'fullscreen': 
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
      default: console.log(`View action: ${action}`);
    }
  };

  const handleToolsAction = (action) => {
    switch (action) {
      case 'settings': setShowSettingsPanel(true); break;
      default: console.log(`Tools action: ${action}`);
    }
  };

  const handleStatusClick = (item, data) => {
    switch (item) {
      case 'position': setShowGoToLine(true); break;
      case 'zoom': handleResetZoom(); break;
      case 'stats': 
        alert(`Document Statistics:\nWords: ${data.wordCount}\nCharacters: ${data.characterCount}\nLines: ${activeDocument.content.split('\n').length}`);
        break;
      default: console.log(`Status click: ${item}`, data);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            if (e.shiftKey) {
              handleNewWindow();
            } else {
              handleNewFile();
            }
            break;
          case 't':
            e.preventDefault();
            handleNewTab();
            break;
          case 'o':
            e.preventDefault();
            handleOpenFile();
            break;
          case 's':
            e.preventDefault();
            if (e.shiftKey) {
              if (e.altKey) {
                handleSaveAll();
              } else {
                handleSaveAs();
              }
            } else {
              handleSave();
            }
            break;
          case 'w':
            e.preventDefault();
            closeDocument(activeDocumentIndex);
            break;
          case 'p':
            e.preventDefault();
            handlePrint();
            break;
          case 'f':
            e.preventDefault();
            setShowFindReplace(true);
            break;
          case 'h':
            e.preventDefault();
            setShowFindReplace(true);
            break;
          case 'g':
            e.preventDefault();
            setShowGoToLine(true);
            break;
          case 'a':
            e.preventDefault();
            handleSelectAll();
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case '=': case '+':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleResetZoom();
            break;
        }
      } else if (e.key === 'F5') {
        e.preventDefault();
        handleInsertDateTime();
      } else if (e.key === 'F11') {
        e.preventDefault();
        handleViewAction('fullscreen');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDocument, activeDocumentIndex]);

  const totalLines = activeDocument?.content?.split('\n').length || 1;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onFileAction={handleFileAction}
        onEditAction={handleEditAction}
        onViewAction={handleViewAction}
        onToolsAction={handleToolsAction}
        canUndo={activeDocument?.undoStack?.length > 0}
        canRedo={activeDocument?.redoStack?.length > 0}
        hasSelection={selectedText.length > 0}
        isModified={activeDocument?.isModified}
      />
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.json,.js,.jsx,.css,.html,.xml,.csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex h-[calc(100vh-3.75rem)] mt-15">
        {/* File Sidebar */}
        <FileSidebar
          isOpen={showSidebar}
          onToggle={() => setShowSidebar(!showSidebar)}
          recentFiles={recentFiles}
          onFileSelect={handleFileFromSidebar}
          onNewFile={handleNewFile}
          onOpenFile={handleOpenFile}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Document Tabs */}
          <DocumentTabs
            tabs={documents}
            activeTab={activeDocumentIndex}
            onTabChange={setActiveDocumentIndex}
            onTabClose={closeDocument}
            onNewTab={handleNewTab}
          />

          {/* Toolbar */}
          <Toolbar
            onNew={handleNewFile}
            onOpen={handleOpenFile}
            onSave={handleSave}
            onSaveAs={handleSaveAs}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onFind={() => setShowFindReplace(true)}
            onPrint={handlePrint}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            onSettings={() => setShowSettingsPanel(true)}
            onFileManager={() => setShowFilePanel(true)}
            canUndo={activeDocument?.undoStack?.length > 0}
            canRedo={activeDocument?.redoStack?.length > 0}
            zoomLevel={zoomLevel}
            isModified={activeDocument?.isModified}
          />

          {/* Find & Replace Bar */}
          <FindReplaceBar
            isOpen={showFindReplace}
            onClose={() => setShowFindReplace(false)}
            editorContent={activeDocument?.content || ''}
            onHighlight={handleHighlightMatches}
            onReplace={handleReplace}
          />

          {/* Text Editor */}
          <div className="flex-1 relative">
            <TextEditor
              content={activeDocument?.content || ''}
              onChange={handleContentChange}
              onCursorPositionChange={handleCursorPositionChange}
              onTextSelection={handleTextSelection}
              settings={settings}
              zoomLevel={zoomLevel}
              searchMatches={activeDocument?.searchMatches || []}
              ref={textareaRef}
            />
          </div>

          {/* Status Bar */}
          <StatusBar
            fileName={activeDocument?.fileName}
            isModified={activeDocument?.isModified}
            cursorPosition={activeDocument?.cursorPosition}
            wordCount={wordCount}
            characterCount={characterCount}
            selectedText={selectedText}
            lastSaved={lastSaved}
            zoomLevel={zoomLevel}
            encoding="UTF-8"
            lineEnding="LF"
            language="Text"
            showStatusBar={showStatusBar}
            onStatusClick={handleStatusClick}
          />
        </div>
      </div>

      {/* Dialogs */}
      <GoToLineDialog
        isOpen={showGoToLine}
        onClose={() => setShowGoToLine(false)}
        onGoToLine={handleGoToLine}
        totalLines={totalLines}
        currentLine={activeDocument?.cursorPosition?.line || 1}
      />

      <PrintPreviewDialog
        isOpen={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        content={activeDocument?.content || ''}
        fileName={activeDocument?.fileName || 'document.txt'}
        settings={settings}
      />

      {/* Panels */}
      <FileManagementPanel
        isOpen={showFilePanel}
        onClose={() => setShowFilePanel(false)}
      />

      <SettingsPanel
        isOpen={showSettingsPanel}
        onClose={() => setShowSettingsPanel(false)}
      />
    </div>
  );
};

export default TextEditorWorkspace;