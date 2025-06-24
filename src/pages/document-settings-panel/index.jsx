import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import DisplaySettings from './components/DisplaySettings';
import TextBehavior from './components/TextBehavior';
import FilePreferences from './components/FilePreferences';
import AdvancedOptions from './components/AdvancedOptions';

const DocumentSettingsPanel = () => {
  const [settings, setSettings] = useState({
    // Display Settings
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.5,
    colorTheme: 'light',
    
    // Text Behavior
    wordWrap: true,
    tabSize: 4,
    autoIndent: true,
    spellCheck: true,
    
    // File Preferences
    defaultSaveFormat: 'txt',
    autoSaveInterval: 30,
    enableBackup: true,
    
    // Advanced Options
    keyboardShortcuts: 'default',
    spellCheckLanguage: 'en-US',
    screenReaderOptimization: false
  });

  const [activeSection, setActiveSection] = useState('display');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notepadCCSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('notepadCCSettings', JSON.stringify(settings));
    setHasUnsavedChanges(false);
    
    // Apply settings to document
    applySettingsToDocument();
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 1.5,
      colorTheme: 'light',
      wordWrap: true,
      tabSize: 4,
      autoIndent: true,
      spellCheck: true,
      defaultSaveFormat: 'txt',
      autoSaveInterval: 30,
      enableBackup: true,
      keyboardShortcuts: 'default',
      spellCheckLanguage: 'en-US',
      screenReaderOptimization: false
    };
    
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notepadcc-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          setHasUnsavedChanges(true);
        } catch (error) {
          alert('Invalid settings file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const applySettingsToDocument = () => {
    // Apply font settings
    document.documentElement.style.setProperty('--editor-font-family', settings.fontFamily);
    document.documentElement.style.setProperty('--editor-font-size', `${settings.fontSize}px`);
    document.documentElement.style.setProperty('--editor-line-height', settings.lineHeight);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.colorTheme);
  };

  const sections = [
    { id: 'display', name: 'Display Settings', icon: 'Monitor' },
    { id: 'behavior', name: 'Text Behavior', icon: 'Type' },
    { id: 'files', name: 'File Preferences', icon: 'FileText' },
    { id: 'advanced', name: 'Advanced Options', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/text-editor-workspace"
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm font-medium">Back to Editor</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-text-primary font-heading">Document Settings</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  previewMode 
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name="Eye" size={16} className="mr-2" />
                Preview
              </button>
              
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  <span className="text-sm text-text-secondary">Unsaved changes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={section.icon} size={20} />
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-semibold text-text-primary">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={exportSettings}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="Download" size={16} />
                  <span>Export Settings</span>
                </button>
                
                <label className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md cursor-pointer transition-colors duration-200">
                  <Icon name="Upload" size={16} />
                  <span>Import Settings</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={resetToDefaults}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors duration-200"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-lg border border-border shadow-subtle">
              {activeSection === 'display' && (
                <DisplaySettings
                  settings={settings}
                  updateSetting={updateSetting}
                  previewMode={previewMode}
                />
              )}
              
              {activeSection === 'behavior' && (
                <TextBehavior
                  settings={settings}
                  updateSetting={updateSetting}
                  previewMode={previewMode}
                />
              )}
              
              {activeSection === 'files' && (
                <FilePreferences
                  settings={settings}
                  updateSetting={updateSetting}
                  previewMode={previewMode}
                />
              )}
              
              {activeSection === 'advanced' && (
                <AdvancedOptions
                  settings={settings}
                  updateSetting={updateSetting}
                  previewMode={previewMode}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link
                  to="/text-editor-workspace"
                  className="px-4 py-2 border border-border rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  Cancel
                </Link>
                <button
                  onClick={saveSettings}
                  disabled={!hasUnsavedChanges}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Save Settings
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  to="/file-management-hub"
                  className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="Folder" size={16} />
                  <span>File Management</span>
                </Link>
                <Link
                  to="/find-and-replace-interface"
                  className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-200"
                >
                  <Icon name="Search" size={16} />
                  <span>Find & Replace</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Overlay */}
      {previewMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-large max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Settings Preview</h3>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              <div 
                className="border border-border rounded-md p-4 min-h-64"
                style={{
                  fontFamily: settings.fontFamily,
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight,
                  wordWrap: settings.wordWrap ? 'break-word' : 'normal'
                }}
              >
                <p className="text-text-primary mb-4">
                  This is a preview of how your text will appear with the current settings.
                </p>
                <p className="text-text-secondary">
                  Font Family: {settings.fontFamily}<br />
                  Font Size: {settings.fontSize}px<br />
                  Line Height: {settings.lineHeight}<br />
                  Theme: {settings.colorTheme}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSettingsPanel;