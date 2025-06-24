import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FileSidebar = ({ isOpen, onToggle, recentFiles, onFileSelect, onNewFile, onOpenFile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('modified');

  const filteredFiles = recentFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'modified':
        return new Date(b.lastModified) - new Date(a.lastModified);
      case 'size':
        return b.size - a.size;
      default:
        return 0;
    }
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'txt':
        return 'FileText';
      case 'md':
        return 'FileType';
      case 'js': case'jsx':
        return 'FileCode';
      case 'json':
        return 'Braces';
      case 'css':
        return 'Palette';
      case 'html':
        return 'Globe';
      default:
        return 'File';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-4 top-20 z-10 p-2 bg-background border border-border rounded-md shadow-medium hover:bg-surface transition-colors duration-200"
        title="Show file sidebar"
      >
        <Icon name="PanelLeft" size={16} />
      </button>
    );
  }

  return (
    <div className="w-64 bg-surface border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-text-primary">Recent Files</h2>
          <button
            onClick={onToggle}
            className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-background"
            title="Hide sidebar"
          >
            <Icon name="PanelLeftClose" size={16} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={onNewFile}
            className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200 text-xs"
          >
            <Icon name="Plus" size={12} />
            <span>New</span>
          </button>
          <button
            onClick={onOpenFile}
            className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-background border border-border rounded-md hover:bg-surface transition-colors duration-200 text-xs"
          >
            <Icon name="FolderOpen" size={12} />
            <span>Open</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon name="Search" size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs border border-border rounded-md focus:ring-1 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-xs border border-border rounded-md px-2 py-1.5 focus:ring-1 focus:ring-primary/20 focus:border-primary"
        >
          <option value="modified">Last Modified</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2">
        {sortedFiles.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="mx-auto text-text-secondary mb-2" />
            <p className="text-xs text-text-secondary mb-1">No files found</p>
            <p className="text-xs text-text-secondary">Create or open files to see them here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {sortedFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file)}
                className="group p-2 rounded-md hover:bg-background cursor-pointer transition-colors duration-200 border border-transparent hover:border-border"
              >
                <div className="flex items-start space-x-2">
                  <Icon 
                    name={getFileIcon(file.name)} 
                    size={14} 
                    className="text-text-secondary flex-shrink-0 mt-0.5" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-text-primary truncate mb-1">
                      {file.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{formatDate(file.lastModified)}</span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                    {file.content && (
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2 opacity-75">
                        {file.content.substring(0, 60)}...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-text-secondary text-center">
          {recentFiles.length} file{recentFiles.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
};

export default FileSidebar;