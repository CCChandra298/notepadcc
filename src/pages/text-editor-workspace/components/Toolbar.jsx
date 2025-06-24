import React from 'react';
import Icon from 'components/AppIcon';

const Toolbar = ({
  onNew,
  onOpen,
  onSave,
  onSaveAs,
  onUndo,
  onRedo,
  onFind,
  onPrint,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onSettings,
  onFileManager,
  canUndo,
  canRedo,
  zoomLevel,
  isModified
}) => {
  const toolbarGroups = [
    {
      name: 'File Operations',
      items: [
        { icon: 'FileText', label: 'New', action: onNew, shortcut: 'Ctrl+N' },
        { icon: 'FolderOpen', label: 'Open', action: onOpen, shortcut: 'Ctrl+O' },
        { icon: 'Save', label: 'Save', action: onSave, shortcut: 'Ctrl+S', highlight: isModified },
        { icon: 'Download', label: 'Save As', action: onSaveAs, shortcut: 'Ctrl+Shift+S' }
      ]
    },
    {
      name: 'Edit Operations',
      items: [
        { icon: 'Undo', label: 'Undo', action: onUndo, shortcut: 'Ctrl+Z', disabled: !canUndo },
        { icon: 'Redo', label: 'Redo', action: onRedo, shortcut: 'Ctrl+Y', disabled: !canRedo }
      ]
    },
    {
      name: 'Search & View',
      items: [
        { icon: 'Search', label: 'Find', action: onFind, shortcut: 'Ctrl+F' },
        { icon: 'Printer', label: 'Print', action: onPrint, shortcut: 'Ctrl+P' }
      ]
    },
    {
      name: 'Zoom Controls',
      items: [
        { icon: 'ZoomIn', label: 'Zoom In', action: onZoomIn, shortcut: 'Ctrl++' },
        { icon: 'ZoomOut', label: 'Zoom Out', action: onZoomOut, shortcut: 'Ctrl+-' },
        { icon: 'RotateCcw', label: `Reset Zoom (${zoomLevel}%)`, action: onResetZoom, shortcut: 'Ctrl+0' }
      ]
    },
    {
      name: 'Tools',
      items: [
        { icon: 'Folder', label: 'File Manager', action: onFileManager },
        { icon: 'Settings', label: 'Settings', action: onSettings }
      ]
    }
  ];

  return (
    <div className="bg-surface border-b border-border px-4 py-2">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {toolbarGroups.map((group, groupIndex) => (
          <React.Fragment key={group.name}>
            {groupIndex > 0 && (
              <div className="w-px h-6 bg-border mx-2 flex-shrink-0" />
            )}
            <div className="flex items-center space-x-1 flex-shrink-0">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  disabled={item.disabled}
                  title={`${item.label}${item.shortcut ? ` (${item.shortcut})` : ''}`}
                  className={`
                    relative p-2 rounded-md transition-colors duration-200 flex-shrink-0
                    ${item.disabled 
                      ? 'text-text-secondary/50 cursor-not-allowed' :'text-text-secondary hover:text-text-primary hover:bg-background'
                    }
                    ${item.highlight ? 'bg-primary/10 text-primary' : ''}
                  `}
                >
                  <Icon name={item.icon} size={18} />
                  {item.highlight && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Toolbar - Condensed Version */}
      <div className="md:hidden mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onNew}
            className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded-md text-sm"
          >
            <Icon name="FileText" size={14} />
            <span>New</span>
          </button>
          <button
            onClick={onSave}
            disabled={!isModified}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
              isModified 
                ? 'bg-success text-white' :'bg-surface text-text-secondary cursor-not-allowed'
            }`}
          >
            <Icon name="Save" size={14} />
            <span>Save</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={onFind}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background"
            title="Find"
          >
            <Icon name="Search" size={16} />
          </button>
          <button
            onClick={onSettings}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background"
            title="Settings"
          >
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;