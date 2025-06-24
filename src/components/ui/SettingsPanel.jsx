import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SettingsPanel = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    fontSize: 14,
    fontFamily: 'Inter',
    lineHeight: 1.5,
    theme: 'light',
    wordWrap: true,
    showLineNumbers: false,
    autoSave: true,
    autoSaveInterval: 30,
    spellCheck: true,
    tabSize: 4,
    insertSpaces: true,
    trimTrailingWhitespace: true,
    showWhitespace: false,
    highlightCurrentLine: true,
    showMinimap: false
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('textEditorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('textEditorSettings', JSON.stringify(newSettings));
    
    // Apply settings immediately
    applySettings(newSettings);
  };

  const applySettings = (settingsToApply) => {
    // Apply font settings to document
    const editorElement = document.querySelector('.text-editor');
    if (editorElement) {
      editorElement.style.fontSize = `${settingsToApply.fontSize}px`;
      editorElement.style.fontFamily = settingsToApply.fontFamily;
      editorElement.style.lineHeight = settingsToApply.lineHeight;
    }

    // Apply theme
    document.documentElement.setAttribute('data-theme', settingsToApply.theme);
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 14,
      fontFamily: 'Inter',
      lineHeight: 1.5,
      theme: 'light',
      wordWrap: true,
      showLineNumbers: false,
      autoSave: true,
      autoSaveInterval: 30,
      spellCheck: true,
      tabSize: 4,
      insertSpaces: true,
      trimTrailingWhitespace: true,
      showWhitespace: false,
      highlightCurrentLine: true,
      showMinimap: false
    };
    setSettings(defaultSettings);
    localStorage.setItem('textEditorSettings', JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'text-editor-settings.json';
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
          localStorage.setItem('textEditorSettings', JSON.stringify(importedSettings));
          applySettings(importedSettings);
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
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
      <div className={`fixed top-15 right-0 h-[calc(100vh-3.75rem)] w-full lg:w-88 bg-background border-l border-border shadow-large z-20 transform transition-transform duration-200 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary font-heading">Document Settings</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Appearance */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="Palette" size={16} className="mr-2" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Font Size
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-text-secondary w-8">{settings.fontSize}px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Font Family
                  </label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSetting('fontFamily', e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="Inter">Inter</option>
                    <option value="JetBrains Mono">JetBrains Mono</option>
                    <option value="system-ui">System UI</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Line Height
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="1.2"
                      max="2.0"
                      step="0.1"
                      value={settings.lineHeight}
                      onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-text-secondary w-8">{settings.lineHeight}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => updateSetting('theme', e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="Edit" size={16} className="mr-2" />
                Editor
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Word Wrap</label>
                  <button
                    onClick={() => updateSetting('wordWrap', !settings.wordWrap)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.wordWrap ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.wordWrap ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Show Line Numbers</label>
                  <button
                    onClick={() => updateSetting('showLineNumbers', !settings.showLineNumbers)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showLineNumbers ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showLineNumbers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Highlight Current Line</label>
                  <button
                    onClick={() => updateSetting('highlightCurrentLine', !settings.highlightCurrentLine)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.highlightCurrentLine ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.highlightCurrentLine ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Show Whitespace</label>
                  <button
                    onClick={() => updateSetting('showWhitespace', !settings.showWhitespace)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showWhitespace ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showWhitespace ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Tab Size
                  </label>
                  <select
                    value={settings.tabSize}
                    onChange={(e) => updateSetting('tabSize', parseInt(e.target.value))}
                    className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Insert Spaces</label>
                  <button
                    onClick={() => updateSetting('insertSpaces', !settings.insertSpaces)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.insertSpaces ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.insertSpaces ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Auto Save */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="Save" size={16} className="mr-2" />
                Auto Save
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Enable Auto Save</label>
                  <button
                    onClick={() => updateSetting('autoSave', !settings.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoSave ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {settings.autoSave && (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Auto Save Interval (seconds)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="10"
                        max="300"
                        step="10"
                        value={settings.autoSaveInterval}
                        onChange={(e) => updateSetting('autoSaveInterval', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-text-secondary w-12">{settings.autoSaveInterval}s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Language */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="Languages" size={16} className="mr-2" />
                Language
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Spell Check</label>
                  <button
                    onClick={() => updateSetting('spellCheck', !settings.spellCheck)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.spellCheck ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.spellCheck ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Trim Trailing Whitespace</label>
                  <button
                    onClick={() => updateSetting('trimTrailingWhitespace', !settings.trimTrailingWhitespace)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.trimTrailingWhitespace ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.trimTrailingWhitespace ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={exportSettings}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-surface transition-colors duration-200"
              >
                <Icon name="Download" size={16} />
                <span className="text-sm">Export</span>
              </button>
              <label className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-surface cursor-pointer transition-colors duration-200">
                <Icon name="Upload" size={16} />
                <span className="text-sm">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={resetSettings}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors duration-200"
            >
              <Icon name="RotateCcw" size={16} />
              <span className="text-sm">Reset to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;