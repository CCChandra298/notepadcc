import React from 'react';
import Icon from 'components/AppIcon';

const FileToolbar = ({ 
  onCreateNew, 
  onFileUpload, 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange,
  onToggleFolderTree,
  showFolderTree
}) => {
  return (
    <div className="p-4 border-b border-border bg-background">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        {/* Primary Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleFolderTree}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
            title="Toggle folder tree"
          >
            <Icon name={showFolderTree ? "PanelLeftClose" : "PanelLeftOpen"} size={20} />
          </button>
          
          <button
            onClick={onCreateNew}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            <Icon name="Plus" size={16} />
            <span className="font-medium">New File</span>
          </button>

          <label className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-secondary rounded-md hover:bg-border cursor-pointer transition-colors duration-200">
            <Icon name="Upload" size={16} />
            <span className="font-medium">Upload</span>
            <input
              type="file"
              multiple
              accept=".txt,.md,.json,.rtf"
              onChange={onFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Search and View Controls */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-l-md transition-colors duration-200 ${
                viewMode === 'list' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
              title="List view"
            >
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-r-md transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
              title="Grid view"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileToolbar;