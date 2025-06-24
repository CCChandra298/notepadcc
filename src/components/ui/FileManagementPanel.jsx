import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const FileManagementPanel = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    // Load files from localStorage or initialize with sample data
    const savedFiles = localStorage.getItem('textEditorFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    } else {
      const sampleFiles = [
        {
          id: '1',
          name: 'Untitled Document.txt',
          content: '',
          lastModified: new Date().toISOString(),
          size: 0,
          type: 'text/plain'
        }
      ];
      setFiles(sampleFiles);
      localStorage.setItem('textEditorFiles', JSON.stringify(sampleFiles));
    }
  }, []);

  const handleCreateNew = () => {
    const newFile = {
      id: Date.now().toString(),
      name: `Untitled Document ${files.length + 1}.txt`,
      content: '',
      lastModified: new Date().toISOString(),
      size: 0,
      type: 'text/plain'
    };
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem('textEditorFiles', JSON.stringify(updatedFiles));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  const handleFileDelete = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    localStorage.setItem('textEditorFiles', JSON.stringify(updatedFiles));
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
  };

  const handleFileRename = (fileId, newName) => {
    const updatedFiles = files.map(file =>
      file.id === fileId ? { ...file, name: newName } : file
    );
    setFiles(updatedFiles);
    localStorage.setItem('textEditorFiles', JSON.stringify(updatedFiles));
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: Date.now().toString(),
          name: file.name,
          content: e.target.result,
          lastModified: new Date().toISOString(),
          size: file.size,
          type: file.type
        };
        const updatedFiles = [...files, newFile];
        setFiles(updatedFiles);
        localStorage.setItem('textEditorFiles', JSON.stringify(updatedFiles));
      };
      reader.readAsText(file);
    }
  };

  const handleFileExport = (file) => {
    const blob = new Blob([file.content], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredFiles = files.filter(file =>
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
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-20 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className={`fixed top-15 left-0 h-[calc(100vh-3.75rem)] w-full lg:w-88 bg-background border-r border-border shadow-large z-20 transform transition-transform duration-200 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary font-heading">File Management</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Toolbar */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCreateNew}
                className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
                <span className="text-sm font-medium">New</span>
              </button>
              <label className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-secondary rounded-md hover:bg-border cursor-pointer transition-colors duration-200">
                <Icon name="Upload" size={16} />
                <span className="text-sm font-medium">Import</span>
                <input
                  type="file"
                  accept=".txt,.md,.json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="name">Name</option>
                <option value="modified">Modified</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto p-4">
            {sortedFiles.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="mx-auto text-text-secondary mb-4" />
                <p className="text-text-secondary">No files found</p>
                <p className="text-sm text-text-secondary mt-1">Create a new file or import existing ones</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
                {sortedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`group relative p-3 border border-border rounded-md hover:border-primary/50 cursor-pointer transition-colors duration-200 ${
                      selectedFile?.id === file.id ? 'border-primary bg-primary/5' : 'hover:bg-surface'
                    }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon name="FileText" size={20} className="text-text-secondary flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-text-primary truncate">{file.name}</h3>
                        <p className="text-xs text-text-secondary mt-1">
                          {formatDate(file.lastModified)}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>

                    {/* File Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileExport(file);
                          }}
                          className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-background"
                          title="Export"
                        >
                          <Icon name="Download" size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newName = prompt('Enter new name:', file.name);
                            if (newName && newName !== file.name) {
                              handleFileRename(file.id, newName);
                            }
                          }}
                          className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-background"
                          title="Rename"
                        >
                          <Icon name="Edit" size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this file?')) {
                              handleFileDelete(file.id);
                            }
                          }}
                          className="p-1 rounded text-error hover:bg-error/10"
                          title="Delete"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-text-secondary">
              {files.length} file{files.length !== 1 ? 's' : ''} total
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileManagementPanel;