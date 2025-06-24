import React, { useState } from 'react';
import Icon from '../AppIcon';

const DocumentTabs = ({ 
  tabs = [], 
  activeTab = 0, 
  onTabChange, 
  onTabClose, 
  onNewTab,
  maxTabWidth = 200 
}) => {
  const [draggedTab, setDraggedTab] = useState(null);
  const [dragOverTab, setDragOverTab] = useState(null);

  const handleTabClick = (index) => {
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const handleTabClose = (index, e) => {
    e.stopPropagation();
    if (onTabClose) {
      onTabClose(index);
    }
  };

  const handleNewTab = () => {
    if (onNewTab) {
      onNewTab();
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedTab(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverTab(index);
  };

  const handleDragLeave = () => {
    setDragOverTab(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedTab !== null && draggedTab !== dropIndex) {
      // Implement tab reordering logic here
      console.log(`Move tab from ${draggedTab} to ${dropIndex}`);
    }
    
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const truncateFileName = (fileName, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4) + '...';
    return `${truncatedName}.${extension}`;
  };

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center bg-surface border-b border-border overflow-x-auto scrollbar-thin">
      <div className="flex items-center min-w-0 flex-1">
        {tabs.map((tab, index) => (
          <div
            key={tab.id || index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => handleTabClick(index)}
            className={`
              flex items-center space-x-2 px-3 py-2 border-r border-border cursor-pointer
              transition-colors duration-200 relative group min-w-0 flex-shrink-0
              ${activeTab === index 
                ? 'bg-background text-text-primary border-b-2 border-primary' :'bg-surface text-text-secondary hover:bg-background hover:text-text-primary'
              }
              ${dragOverTab === index ? 'bg-primary/10' : ''}
              ${draggedTab === index ? 'opacity-50' : ''}
            `}
            style={{ maxWidth: `${maxTabWidth}px` }}
            title={tab.fileName || 'Untitled'}
          >
            {/* File Icon */}
            <Icon 
              name={tab.isModified ? "Circle" : "FileText"} 
              size={12}
              className={tab.isModified ? "text-warning fill-current" : ""}
            />
            
            {/* File Name */}
            <span className="text-sm truncate min-w-0 flex-1">
              {truncateFileName(tab.fileName || 'Untitled')}
            </span>
            
            {/* Close Button */}
            <button
              onClick={(e) => handleTabClose(index, e)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background/80 transition-opacity duration-200"
              title="Close tab"
            >
              <Icon name="X" size={12} />
            </button>
            
            {/* Active Tab Indicators */}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </div>
        ))}
      </div>

      {/* New Tab Button */}
      <button
        onClick={handleNewTab}
        className="flex-shrink-0 p-2 text-text-secondary hover:text-text-primary hover:bg-background transition-colors duration-200"
        title="New tab (Ctrl+T)"
      >
        <Icon name="Plus" size={16} />
      </button>

      {/* Tab Actions */}
      <div className="flex-shrink-0 border-l border-border">
        <button
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-background transition-colors duration-200"
          title="Tab options"
        >
          <Icon name="MoreHorizontal" size={16} />
        </button>
      </div>
    </div>
  );
};

export default DocumentTabs;