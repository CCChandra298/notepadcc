import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FolderTree = ({ folders, currentFolder, onFolderSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState(['root']);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getFolderChildren = (parentId) => {
    return folders.filter(folder => folder.parentId === parentId);
  };

  const renderFolder = (folder, level = 0) => {
    const children = getFolderChildren(folder.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedFolders.includes(folder.id);
    const isSelected = currentFolder === folder.id;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-background transition-colors duration-200 ${
            isSelected ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => onFolderSelect(folder.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="p-0.5 rounded hover:bg-border"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={14} 
              />
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          <Icon 
            name={isExpanded && hasChildren ? "FolderOpen" : "Folder"} 
            size={16}
            className={isSelected ? 'text-primary' : 'text-text-secondary'}
          />
          <span className="text-sm font-medium truncate">{folder.name}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {children.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootFolders = folders.filter(folder => folder.parentId === null);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-primary flex items-center">
          <Icon name="FolderTree" size={16} className="mr-2" />
          Folders
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {rootFolders.map(folder => renderFolder(folder))}
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-colors duration-200">
          <Icon name="Plus" size={16} />
          <span>New Folder</span>
        </button>
      </div>
    </div>
  );
};

export default FolderTree;