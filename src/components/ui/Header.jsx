import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ 
  onFileAction, 
  onEditAction, 
  onViewAction, 
  onToolsAction,
  canUndo = false,
  canRedo = false,
  hasSelection = false,
  isModified = false
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleFileAction = (action) => {
    if (onFileAction) {
      onFileAction(action);
    }
    closeDropdowns();
  };

  const handleEditAction = (action) => {
    if (onEditAction) {
      onEditAction(action);
    }
    closeDropdowns();
  };

  const handleViewAction = (action) => {
    if (onViewAction) {
      onViewAction(action);
    }
    closeDropdowns();
  };

  const handleToolsAction = (action) => {
    if (onToolsAction) {
      onToolsAction(action);
    }
    closeDropdowns();
  };

  const handleHelpAction = (action) => {
    console.log(`Help action: ${action}`);
    closeDropdowns();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b border-border shadow-subtle">
      <div className="flex items-center justify-between px-4 py-3 h-15">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="FileText" size={18} color="white" />
            </div>
            <span className="text-lg font-semibold text-text-primary font-heading">NotepadCC</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* File Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('file')}
              className="toolbar-item flex items-center space-x-1"
              aria-expanded={activeDropdown === 'file'}
            >
              <span>File</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {activeDropdown === 'file' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-md shadow-medium z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleFileAction('new')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="FileText" size={16} />
                    <span>New</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+N</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('newTab')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Plus" size={16} />
                    <span>New Tab</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+T</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('newWindow')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="ExternalLink" size={16} />
                    <span>New Window</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+Shift+N</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleFileAction('open')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="FolderOpen" size={16} />
                    <span>Open...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+O</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('recentFiles')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Clock" size={16} />
                    <span>Recent Files</span>
                    <Icon name="ChevronRight" size={14} className="ml-auto" />
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleFileAction('save')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Save" size={16} />
                    <span>Save</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+S</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('saveAs')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Download" size={16} />
                    <span>Save As...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+Shift+S</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('saveAll')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Archive" size={16} />
                    <span>Save All</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+Alt+S</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleFileAction('pageSetup')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="FileType" size={16} />
                    <span>Page Setup...</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('printPreview')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Eye" size={16} />
                    <span>Print Preview</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('print')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Printer" size={16} />
                    <span>Print...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+P</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleFileAction('closeTab')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="X" size={16} />
                    <span>Close Tab</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+W</span>
                  </button>
                  <button
                    onClick={() => handleFileAction('exit')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Exit</span>
                    <span className="ml-auto text-xs text-text-secondary">Alt+F4</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Edit Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('edit')}
              className="toolbar-item flex items-center space-x-1"
              aria-expanded={activeDropdown === 'edit'}
            >
              <span>Edit</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {activeDropdown === 'edit' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-md shadow-medium z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleEditAction('undo')}
                    disabled={!canUndo}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 ${
                      canUndo ? 'text-text-secondary hover:text-text-primary hover:bg-surface' : 'text-text-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Undo" size={16} />
                    <span>Undo</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+Z</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('redo')}
                    disabled={!canRedo}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 ${
                      canRedo ? 'text-text-secondary hover:text-text-primary hover:bg-surface' : 'text-text-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Redo" size={16} />
                    <span>Redo</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+Y</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleEditAction('cut')}
                    disabled={!hasSelection}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 ${
                      hasSelection ? 'text-text-secondary hover:text-text-primary hover:bg-surface' : 'text-text-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Scissors" size={16} />
                    <span>Cut</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+X</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('copy')}
                    disabled={!hasSelection}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 ${
                      hasSelection ? 'text-text-secondary hover:text-text-primary hover:bg-surface' : 'text-text-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Copy" size={16} />
                    <span>Copy</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+C</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('paste')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Clipboard" size={16} />
                    <span>Paste</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+V</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('delete')}
                    disabled={!hasSelection}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 ${
                      hasSelection ? 'text-text-secondary hover:text-text-primary hover:bg-surface' : 'text-text-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete</span>
                    <span className="ml-auto text-xs text-text-secondary">Del</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleEditAction('selectAll')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="MousePointer2" size={16} />
                    <span>Select All</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+A</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('insertDateTime')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Calendar" size={16} />
                    <span>Time/Date</span>
                    <span className="ml-auto text-xs text-text-secondary">F5</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleEditAction('find')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Search" size={16} />
                    <span>Find...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+F</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('findNext')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="SkipForward" size={16} />
                    <span>Find Next</span>
                    <span className="ml-auto text-xs text-text-secondary">F3</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('findPrevious')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="SkipBack" size={16} />
                    <span>Find Previous</span>
                    <span className="ml-auto text-xs text-text-secondary">Shift+F3</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('replace')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Replace" size={16} />
                    <span>Replace...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+H</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('goToLine')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Navigation" size={16} />
                    <span>Go To Line...</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+G</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Format Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('format')}
              className="toolbar-item flex items-center space-x-1"
              aria-expanded={activeDropdown === 'format'}
            >
              <span>Format</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {activeDropdown === 'format' && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-medium z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleEditAction('wordWrap')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="WrapText" size={16} />
                    <span>Word Wrap</span>
                  </button>
                  <button
                    onClick={() => handleEditAction('font')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Type" size={16} />
                    <span>Font...</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* View Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('view')}
              className="toolbar-item flex items-center space-x-1"
              aria-expanded={activeDropdown === 'view'}
            >
              <span>View</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {activeDropdown === 'view' && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-medium z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleViewAction('zoom-in')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="ZoomIn" size={16} />
                    <span>Zoom In</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl++</span>
                  </button>
                  <button
                    onClick={() => handleViewAction('zoom-out')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="ZoomOut" size={16} />
                    <span>Zoom Out</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+-</span>
                  </button>
                  <button
                    onClick={() => handleViewAction('reset-zoom')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="RotateCcw" size={16} />
                    <span>Restore Default Zoom</span>
                    <span className="ml-auto text-xs text-text-secondary">Ctrl+0</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleViewAction('status-bar')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="BarChart3" size={16} />
                    <span>Status Bar</span>
                  </button>
                  <button
                    onClick={() => handleViewAction('fullscreen')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Maximize" size={16} />
                    <span>Full Screen</span>
                    <span className="ml-auto text-xs text-text-secondary">F11</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Menu */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('help')}
              className="toolbar-item flex items-center space-x-1"
              aria-expanded={activeDropdown === 'help'}
            >
              <span>Help</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {activeDropdown === 'help' && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-background border border-border rounded-md shadow-medium z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleHelpAction('shortcuts')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Keyboard" size={16} />
                    <span>View Shortcuts</span>
                  </button>
                  <button
                    onClick={() => handleHelpAction('about')}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Info" size={16} />
                    <span>About NotepadCC</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
          aria-expanded={showMobileMenu}
        >
          <Icon name={showMobileMenu ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => handleFileAction('new')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="FileText" size={16} />
              <span>New Document</span>
            </button>
            <button
              onClick={() => handleFileAction('open')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="FolderOpen" size={16} />
              <span>Open File</span>
            </button>
            <button
              onClick={() => handleFileAction('save')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="Save" size={16} />
              <span>Save</span>
            </button>
            <button
              onClick={() => handleEditAction('find')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="Search" size={16} />
              <span>Find & Replace</span>
            </button>
            <button
              onClick={() => handleEditAction('goToLine')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="Navigation" size={16} />
              <span>Go To Line</span>
            </button>
            <button
              onClick={() => handleToolsAction('settings')}
              className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md flex items-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for closing dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-1"
          onClick={closeDropdowns}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;