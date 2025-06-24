import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FileTable = ({
  files,
  selectedFiles,
  onFileSelect,
  onSelectAll,
  viewMode,
  sortConfig,
  onSort,
  folders,
  onFileUpdate,
  onFileDelete,
  searchTerm, onSearchChange
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const [editName, setEditName] = useState('');

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  const sortedFiles = [...files].sort((a, b) => {
    const { key, direction } = sortConfig;
    let aValue = a[key];
    let bValue = b[key];

    if (key === 'lastModified') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleContextMenu = (e, file) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      file
    });
  };

  const handleRename = (file) => {
    setEditingFile(file.id);
    setEditName(file.name);
    setContextMenu(null);
  };

  const handleSaveRename = () => {
    if (editName.trim() && editName !== editingFile.name) {
      onFileUpdate(editingFile, { name: editName.trim() });
    }
    setEditingFile(null);
    setEditName('');
  };

  const handleDownload = (file) => {
    const blob = new Blob([file.content], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setContextMenu(null);
  };

  const handleDuplicate = (file) => {
    const duplicatedFile = {
      ...file,
      id: Date.now().toString(),
      name: `Copy of ${file.name}`,
      lastModified: new Date()
    };
    onFileUpdate(null, duplicatedFile);
    setContextMenu(null);
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const renderListView = () =>
  <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-surface border-b border-border">
          <tr>
            <th className="w-12 px-4 py-3">
              <input
              type="checkbox"
              checked={selectedFiles.length === files.length && files.length > 0}
              onChange={onSelectAll}
              className="rounded border-border focus:ring-2 focus:ring-primary/20" />

            </th>
            <th className="text-left px-4 py-3">
              <button
              onClick={() => handleSort('name')}
              className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary">

                <span>Name</span>
                <Icon
                name={sortConfig.key === 'name' && sortConfig.direction === 'desc' ? "ChevronDown" : "ChevronUp"}
                size={14} />

              </button>
            </th>
            <th className="text-left px-4 py-3">
              <button
              onClick={() => handleSort('lastModified')}
              className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary">

                <span>Modified</span>
                <Icon
                name={sortConfig.key === 'lastModified' && sortConfig.direction === 'desc' ? "ChevronDown" : "ChevronUp"}
                size={14} />

              </button>
            </th>
            <th className="text-left px-4 py-3">
              <button
              onClick={() => handleSort('size')}
              className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary">

                <span>Size</span>
                <Icon
                name={sortConfig.key === 'size' && sortConfig.direction === 'desc' ? "ChevronDown" : "ChevronUp"}
                size={14} />

              </button>
            </th>
            <th className="text-left px-4 py-3">
              <span className="text-sm font-medium text-text-primary">Type</span>
            </th>
            <th className="w-12 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) =>
        <tr
          key={file.id}
          className="border-b border-border hover:bg-surface transition-colors duration-200"
          onContextMenu={(e) => handleContextMenu(e, file)}>

              <td className="px-4 py-3">
                <input
              type="checkbox"
              checked={selectedFiles.includes(file.id)}
              onChange={() => onFileSelect(file.id)}
              className="rounded border-border focus:ring-2 focus:ring-primary/20" />

              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={20} className="text-text-secondary" />
                  <div>
                    {editingFile === file.id ?
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleSaveRename}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveRename()}
                  className="text-sm font-medium text-text-primary bg-transparent border-b border-primary focus:outline-none"
                  autoFocus /> :


                <div
                  className="text-sm font-medium text-text-primary"
                  dangerouslySetInnerHTML={{ __html: highlightSearchTerm(file.name) }} />

                }
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary">
                {formatDate(file.lastModified)}
              </td>
              <td className="px-4 py-3 text-sm text-text-secondary">
                {formatFileSize(file.size)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary">
                  {file.format}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
              onClick={(e) => handleContextMenu(e, file)}
              className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-background">

                  <Icon name="MoreVertical" size={16} />
                </button>
              </td>
            </tr>
        )}
        </tbody>
      </table>
    </div>;


  const renderGridView = () =>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
      {sortedFiles.map((file) =>
    <div
      key={file.id}
      className={`relative p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors duration-200 ${
      selectedFiles.includes(file.id) ? 'border-primary bg-primary/5' : 'hover:bg-surface'}`
      }
      onContextMenu={(e) => handleContextMenu(e, file)}
      onClick={() => onFileSelect(file.id)}>

          <div className="flex flex-col items-center space-y-3">
            <Icon name="FileText" size={32} className="text-text-secondary" />
            <div className="text-center">
              {editingFile === file.id ?
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveRename}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveRename()}
            className="text-sm font-medium text-text-primary bg-transparent border-b border-primary focus:outline-none text-center"
            autoFocus /> :


          <div
            className="text-sm font-medium text-text-primary truncate"
            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(file.name) }} />

          }
              <p className="text-xs text-text-secondary mt-1">
                {formatFileSize(file.size)}
              </p>
              <p className="text-xs text-text-secondary">
                {formatDate(file.lastModified)}
              </p>
            </div>
          </div>

          {/* Selection indicator */}
          {selectedFiles.includes(file.id) &&
      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
      }
        </div>
    )}
    </div>;


  return (
    <div className="relative h-full">
      {files.length === 0 ?
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <Icon name="FileText" size={64} className="text-text-secondary mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No files found</h3>
          <p className="text-text-secondary mb-4">
            {searchTerm ? 'No files match your search criteria' : 'This folder is empty'}
          </p>
          {searchTerm &&
        <button
          onClick={() => onSearchChange('')}
          className="text-primary hover:text-primary/80 transition-colors duration-200">

              Clear search
            </button>
        }
        </div> :

      viewMode === 'list' ? renderListView() : renderGridView()
      }

      {/* Context Menu */}
      {contextMenu &&
      <>
          <div
          className="fixed inset-0 z-10"
          onClick={() => setContextMenu(null)} />

          <div
          className="fixed z-20 bg-background border border-border rounded-md shadow-large py-1 min-w-48"
          style={{
            left: contextMenu.x,
            top: contextMenu.y
          }}>

            <button
            onClick={() => handleDownload(contextMenu.file)}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2">

              <Icon name="Download" size={16} />
              <span>Download</span>
            </button>
            <button
            onClick={() => handleRename(contextMenu.file)}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2">

              <Icon name="Edit" size={16} />
              <span>Rename</span>
            </button>
            <button
            onClick={() => handleDuplicate(contextMenu.file)}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface flex items-center space-x-2">

              <Icon name="Copy" size={16} />
              <span>Duplicate</span>
            </button>
            <hr className="my-1 border-border" />
            <button
            onClick={() => {
              onFileDelete(contextMenu.file.id);
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 flex items-center space-x-2">

              <Icon name="Trash2" size={16} />
              <span>Delete</span>
            </button>
          </div>
        </>
      }
    </div>);

};

export default FileTable;