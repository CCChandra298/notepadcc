import React from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsBar = ({ 
  selectedCount, 
  onBulkDownload, 
  onBulkDelete, 
  onClearSelection 
}) => {
  return (
    <div className="px-4 py-3 bg-primary/5 border-b border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-text-primary">
            {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onClearSelection}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onBulkDownload}
            className="flex items-center space-x-2 px-3 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors duration-200"
          >
            <Icon name="Download" size={16} />
            <span className="text-sm font-medium">Download</span>
          </button>

          <button
            onClick={onBulkDelete}
            className="flex items-center space-x-2 px-3 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors duration-200"
          >
            <Icon name="Trash2" size={16} />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsBar;