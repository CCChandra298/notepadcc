import React from 'react';
import Icon from 'components/AppIcon';

const FilePreferences = ({ settings, updateSetting, previewMode }) => {
  const saveFormats = [
    { value: 'txt', label: 'Plain Text (.txt)', icon: 'FileText' },
    { value: 'rtf', label: 'Rich Text Format (.rtf)', icon: 'FileType' },
    { value: 'md', label: 'Markdown (.md)', icon: 'Hash' },
    { value: 'json', label: 'JSON (.json)', icon: 'Braces' },
    { value: 'csv', label: 'CSV (.csv)', icon: 'Table' },
    { value: 'xml', label: 'XML (.xml)', icon: 'Code' }
  ];

  const autoSaveIntervals = [
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
    { value: 0, label: 'Disabled' }
  ];

  const backupOptions = [
    { value: 'none', label: 'No Backup', icon: 'X' },
    { value: 'local', label: 'Local Storage', icon: 'HardDrive' },
    { value: 'session', label: 'Session Storage', icon: 'Clock' },
    { value: 'both', label: 'Both', icon: 'Copy' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="FileText" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary font-heading">File Preferences</h2>
      </div>

      <div className="space-y-8">
        {/* Default Save Format */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Default Save Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {saveFormats.map((format) => (
              <button
                key={format.value}
                onClick={() => updateSetting('defaultSaveFormat', format.value)}
                className={`flex items-center space-x-3 p-4 border rounded-md transition-colors duration-200 ${
                  settings.defaultSaveFormat === format.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={format.icon} size={20} />
                <div className="text-left">
                  <div className="font-medium">{format.label}</div>
                </div>
                {settings.defaultSaveFormat === format.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Save */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-text-primary">Auto Save</label>
              <p className="text-xs text-text-secondary">Automatically save your work at regular intervals</p>
            </div>
            <button
              onClick={() => updateSetting('enableAutoSave', !settings.enableAutoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableAutoSave ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableAutoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.enableAutoSave && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Auto Save Interval
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {autoSaveIntervals.filter(interval => interval.value !== 0).map((interval) => (
                  <button
                    key={interval.value}
                    onClick={() => updateSetting('autoSaveInterval', interval.value)}
                    className={`p-3 border rounded-md transition-colors duration-200 ${
                      settings.autoSaveInterval === interval.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="font-medium">{interval.label}</span>
                    {settings.autoSaveInterval === interval.value && (
                      <Icon name="Check" size={16} className="ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Backup Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-text-primary">Enable Backup</label>
              <p className="text-xs text-text-secondary">Create backup copies of your documents</p>
            </div>
            <button
              onClick={() => updateSetting('enableBackup', !settings.enableBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableBackup ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableBackup ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.enableBackup && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Backup Storage
              </label>
              <div className="grid grid-cols-2 gap-3">
                {backupOptions.filter(option => option.value !== 'none').map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateSetting('backupStorage', option.value)}
                    className={`flex items-center space-x-3 p-4 border rounded-md transition-colors duration-200 ${
                      settings.backupStorage === option.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={option.icon} size={20} />
                    <span className="font-medium">{option.label}</span>
                    {settings.backupStorage === option.value && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* File Encoding */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Default File Encoding
          </label>
          <select
            value={settings.fileEncoding || 'utf-8'}
            onChange={(e) => updateSetting('fileEncoding', e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            <option value="utf-8">UTF-8 (Recommended)</option>
            <option value="utf-16">UTF-16</option>
            <option value="ascii">ASCII</option>
            <option value="iso-8859-1">ISO-8859-1</option>
          </select>
          <p className="text-xs text-text-secondary mt-2">
            UTF-8 is recommended for maximum compatibility
          </p>
        </div>

        {/* Additional File Options */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Additional Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Confirm Before Closing</label>
                <p className="text-xs text-text-secondary">Ask for confirmation when closing unsaved documents</p>
              </div>
              <button
                onClick={() => updateSetting('confirmBeforeClosing', !settings.confirmBeforeClosing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.confirmBeforeClosing ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.confirmBeforeClosing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Remember Recent Files</label>
                <p className="text-xs text-text-secondary">Keep a list of recently opened files</p>
              </div>
              <button
                onClick={() => updateSetting('rememberRecentFiles', !settings.rememberRecentFiles)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.rememberRecentFiles ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.rememberRecentFiles ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Show File Extensions</label>
                <p className="text-xs text-text-secondary">Display file extensions in file lists</p>
              </div>
              <button
                onClick={() => updateSetting('showFileExtensions', !settings.showFileExtensions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showFileExtensions ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showFileExtensions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* File Preferences Summary */}
        <div className="border-t border-border pt-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Current Preferences Summary
          </label>
          <div className="bg-surface border border-border rounded-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Default Format:</span>
                <span className="ml-2 text-text-primary font-medium">
                  {saveFormats.find(f => f.value === settings.defaultSaveFormat)?.label || 'Plain Text (.txt)'}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Auto Save:</span>
                <span className="ml-2 text-text-primary font-medium">
                  {settings.enableAutoSave ? `Every ${settings.autoSaveInterval}s` : 'Disabled'}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Backup:</span>
                <span className="ml-2 text-text-primary font-medium">
                  {settings.enableBackup ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Encoding:</span>
                <span className="ml-2 text-text-primary font-medium">
                  {(settings.fileEncoding || 'utf-8').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreferences;