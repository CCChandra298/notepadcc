import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const PrintPreviewDialog = ({ 
  isOpen, 
  onClose, 
  content = '', 
  fileName = 'document.txt',
  settings = {}
}) => {
  const [previewSettings, setPreviewSettings] = useState({
    fontSize: settings.fontSize || 12,
    fontFamily: settings.fontFamily || 'Inter',
    lineHeight: settings.lineHeight || 1.5,
    margins: { top: 1, right: 1, bottom: 1, left: 1 }, // inches
    orientation: 'portrait',
    paperSize: 'A4',
    showLineNumbers: false,
    showHeader: true,
    showFooter: true,
    headerText: fileName,
    footerText: 'Page {page}'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Calculate pages based on content and settings
  useEffect(() => {
    calculatePages();
  }, [content, previewSettings]);

  const calculatePages = () => {
    // Simple page calculation - in a real implementation, this would be more sophisticated
    const linesPerPage = Math.floor((11 - previewSettings.margins.top - previewSettings.margins.bottom) * 72 / (previewSettings.fontSize * previewSettings.lineHeight));
    const lines = content.split('\n');
    const pages = Math.max(1, Math.ceil(lines.length / linesPerPage));
    setTotalPages(pages);
    setCurrentPage(Math.min(currentPage, pages));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintHTML();
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generatePrintHTML = () => {
    const { fontFamily, fontSize, lineHeight, margins, showLineNumbers, showHeader, showFooter, headerText, footerText } = previewSettings;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName}</title>
          <style>
            @page {
              size: ${previewSettings.paperSize};
              margin: ${margins.top}in ${margins.right}in ${margins.bottom}in ${margins.left}in;
            }
            body {
              font-family: ${fontFamily};
              font-size: ${fontSize}pt;
              line-height: ${lineHeight};
              margin: 0;
              padding: 0;
            }
            .header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 0.5in;
              border-bottom: 1px solid #ddd;
              padding: 0.25in 0;
              font-size: ${fontSize * 0.8}pt;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 0.5in;
              border-top: 1px solid #ddd;
              padding: 0.25in 0;
              font-size: ${fontSize * 0.8}pt;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .content {
              ${showHeader ? 'margin-top: 1in;' : ''}
              ${showFooter ? 'margin-bottom: 1in;' : ''}
            }
            pre {
              white-space: pre-wrap;
              margin: 0;
              ${showLineNumbers ? 'counter-reset: line;' : ''}
            }
            ${showLineNumbers ? `
              pre .line {
                counter-increment: line;
              }
              pre .line::before {
                content: counter(line);
                display: inline-block;
                width: 3em;
                padding-right: 1em;
                text-align: right;
                color: #666;
                border-right: 1px solid #ddd;
                margin-right: 1em;
              }
            ` : ''}
          </style>
        </head>
        <body>
          ${showHeader ? `<div class="header"><span>${headerText}</span><span>${new Date().toLocaleDateString()}</span></div>` : ''}
          ${showFooter ? `<div class="footer">${footerText.replace('{page}', '<span class="page-number"></span>')}</div>` : ''}
          <div class="content">
            <pre>${showLineNumbers ? 
              content.split('\n').map(line => `<div class="line">${line}</div>`).join('') : 
              content
            }</pre>
          </div>
        </body>
      </html>
    `;
  };

  const handleSettingChange = (key, value) => {
    setPreviewSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMarginChange = (side, value) => {
    setPreviewSettings(prev => ({
      ...prev,
      margins: {
        ...prev.margins,
        [side]: parseFloat(value) || 0
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Dialog */}
      <div className="relative bg-background w-full max-w-6xl mx-auto my-4 rounded-lg shadow-large flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Print Preview - {fileName}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="Printer" size={16} />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-surface text-text-secondary hover:text-text-primary"
              title="Close"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 min-h-0">
          {/* Settings Panel */}
          <div className="w-80 border-r border-border p-4 overflow-y-auto">
            <h3 className="font-semibold text-text-primary mb-4">Print Settings</h3>
            
            <div className="space-y-4">
              {/* Paper Size */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Paper Size</label>
                <select
                  value={previewSettings.paperSize}
                  onChange={(e) => handleSettingChange('paperSize', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Orientation</label>
                <select
                  value={previewSettings.orientation}
                  onChange={(e) => handleSettingChange('orientation', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Margins */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Margins (inches)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-text-secondary">Top</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={previewSettings.margins.top}
                      onChange={(e) => handleMarginChange('top', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Bottom</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={previewSettings.margins.bottom}
                      onChange={(e) => handleMarginChange('bottom', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Left</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={previewSettings.margins.left}
                      onChange={(e) => handleMarginChange('left', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary">Right</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={previewSettings.margins.right}
                      onChange={(e) => handleMarginChange('right', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Font Settings */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Font Size</label>
                <input
                  type="number"
                  min="8"
                  max="24"
                  value={previewSettings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showLineNumbers"
                    checked={previewSettings.showLineNumbers}
                    onChange={(e) => handleSettingChange('showLineNumbers', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showLineNumbers" className="text-sm text-text-primary">Show line numbers</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showHeader"
                    checked={previewSettings.showHeader}
                    onChange={(e) => handleSettingChange('showHeader', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showHeader" className="text-sm text-text-primary">Show header</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showFooter"
                    checked={previewSettings.showFooter}
                    onChange={(e) => handleSettingChange('showFooter', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showFooter" className="text-sm text-text-primary">Show footer</label>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 flex flex-col">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage <= 1}
                    className="p-1 rounded hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1 rounded hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 p-4 bg-gray-100 overflow-auto">
              <div className="max-w-4xl mx-auto">
                {/* Paper Preview */}
                <div
                  className="bg-white shadow-medium mx-auto"
                  style={{
                    width: previewSettings.orientation === 'portrait' ? '8.5in' : '11in',
                    minHeight: previewSettings.orientation === 'portrait' ? '11in' : '8.5in',
                    padding: `${previewSettings.margins.top}in ${previewSettings.margins.right}in ${previewSettings.margins.bottom}in ${previewSettings.margins.left}in`,
                    fontSize: `${previewSettings.fontSize}pt`,
                    fontFamily: previewSettings.fontFamily,
                    lineHeight: previewSettings.lineHeight
                  }}
                >
                  {previewSettings.showHeader && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-300 mb-4 text-sm">
                      <span>{previewSettings.headerText}</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {previewSettings.showLineNumbers 
                      ? content.split('\n').map((line, index) => 
                          `${(index + 1).toString().padStart(4, ' ')} | ${line}`
                        ).join('\n')
                      : content
                    }
                  </pre>
                  
                  {previewSettings.showFooter && (
                    <div className="mt-4 pt-2 border-t border-gray-300 text-center text-sm">
                      Page {currentPage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPreviewDialog;