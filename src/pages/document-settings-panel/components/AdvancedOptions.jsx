import React from 'react';
import Icon from 'components/AppIcon';

const AdvancedOptions = ({ settings, updateSetting, previewMode }) => {
  const keyboardShortcutSchemes = [
    { value: 'default', label: 'Default (NotepadCC)', icon: 'Keyboard' },
    { value: 'vscode', label: 'VS Code Style', icon: 'Code' },
    { value: 'sublime', label: 'Sublime Text Style', icon: 'Edit' },
    { value: 'vim', label: 'Vim Style', icon: 'Terminal' },
    { value: 'emacs', label: 'Emacs Style', icon: 'Command' }
  ];

  const spellCheckLanguages = [
    { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { value: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
    { value: 'es-ES', label: 'Spanish (Spain)', flag: '🇪🇸' },
    { value: 'fr-FR', label: 'French (France)', flag: '🇫🇷' },
    { value: 'de-DE', label: 'German (Germany)', flag: '🇩🇪' },
    { value: 'it-IT', label: 'Italian (Italy)', flag: '🇮🇹' },
    { value: 'pt-BR', label: 'Portuguese (Brazil)', flag: '🇧🇷' },
    { value: 'ru-RU', label: 'Russian (Russia)', flag: '🇷🇺' },
    { value: 'zh-CN', label: 'Chinese (Simplified)', flag: '🇨🇳' },
    { value: 'ja-JP', label: 'Japanese (Japan)', flag: '🇯🇵' }
  ];

  const accessibilityFeatures = [
    {
      key: 'screenReaderOptimization',
      label: 'Screen Reader Optimization',
      description: 'Optimize interface for screen readers and assistive technologies',
      icon: 'Volume2'
    },
    {
      key: 'highContrastMode',
      label: 'High Contrast Mode',
      description: 'Use high contrast colors for better visibility',
      icon: 'Contrast'
    },
    {
      key: 'reduceMotion',
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: 'Pause'
    },
    {
      key: 'largeClickTargets',
      label: 'Large Click Targets',
      description: 'Increase the size of buttons and interactive elements',
      icon: 'MousePointer'
    },
    {
      key: 'keyboardNavigation',
      label: 'Enhanced Keyboard Navigation',
      description: 'Improve keyboard-only navigation experience',
      icon: 'Navigation'
    }
  ];

  const performanceOptions = [
    {
      key: 'enableVirtualScrolling',
      label: 'Virtual Scrolling',
      description: 'Improve performance for large documents',
      icon: 'Zap'
    },
    {
      key: 'enableSyntaxHighlighting',
      label: 'Syntax Highlighting',
      description: 'Highlight syntax for supported file types',
      icon: 'Palette'
    },
    {
      key: 'enableAutoComplete',
      label: 'Auto Complete',
      description: 'Show suggestions while typing',
      icon: 'Lightbulb'
    },
    {
      key: 'enableLineNumbers',
      label: 'Line Numbers',
      description: 'Display line numbers in the editor',
      icon: 'Hash'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Settings" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary font-heading">Advanced Options</h2>
      </div>

      <div className="space-y-8">
        {/* Keyboard Shortcuts */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Keyboard Shortcut Scheme
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyboardShortcutSchemes.map((scheme) => (
              <button
                key={scheme.value}
                onClick={() => updateSetting('keyboardShortcuts', scheme.value)}
                className={`flex items-center space-x-3 p-4 border rounded-md transition-colors duration-200 ${
                  settings.keyboardShortcuts === scheme.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={scheme.icon} size={20} />
                <span className="font-medium">{scheme.label}</span>
                {settings.keyboardShortcuts === scheme.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Spell Check Language */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Spell Check Language
          </label>
          <select
            value={settings.spellCheckLanguage}
            onChange={(e) => updateSetting('spellCheckLanguage', e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            {spellCheckLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-secondary mt-2">
            Select the primary language for spell checking
          </p>
        </div>

        {/* Accessibility Features */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Accessibility" size={16} className="mr-2" />
            Accessibility Features
          </h3>
          <div className="space-y-4">
            {accessibilityFeatures.map((feature) => (
              <div key={feature.key} className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name={feature.icon} size={20} className="text-text-secondary mt-0.5" />
                  <div>
                    <label className="text-sm font-medium text-text-primary">{feature.label}</label>
                    <p className="text-xs text-text-secondary">{feature.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting(feature.key, !settings[feature.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[feature.key] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[feature.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Options */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Performance Options
          </h3>
          <div className="space-y-4">
            {performanceOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name={option.icon} size={20} className="text-text-secondary mt-0.5" />
                  <div>
                    <label className="text-sm font-medium text-text-primary">{option.label}</label>
                    <p className="text-xs text-text-secondary">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting(option.key, !settings[option.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[option.key] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[option.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Options */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Code" size={16} className="mr-2" />
            Developer Options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Debug Mode</label>
                <p className="text-xs text-text-secondary">Enable debug logging and developer tools</p>
              </div>
              <button
                onClick={() => updateSetting('debugMode', !settings.debugMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.debugMode ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.debugMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Experimental Features</label>
                <p className="text-xs text-text-secondary">Enable experimental and beta features</p>
              </div>
              <button
                onClick={() => updateSetting('experimentalFeatures', !settings.experimentalFeatures)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.experimentalFeatures ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.experimentalFeatures ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Performance Monitoring</label>
                <p className="text-xs text-text-secondary">Monitor and log performance metrics</p>
              </div>
              <button
                onClick={() => updateSetting('performanceMonitoring', !settings.performanceMonitoring)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.performanceMonitoring ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.performanceMonitoring ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Custom Shortcuts */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Command" size={16} className="mr-2" />
            Custom Keyboard Shortcuts
          </h3>
          <div className="bg-surface border border-border rounded-md p-4">
            <div className="text-sm text-text-secondary mb-3">
              Customize keyboard shortcuts for frequently used actions
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">New Document</span>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">Ctrl</kbd>
                  <span className="text-xs text-text-secondary">+</span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">N</kbd>
                  <button className="ml-2 p-1 rounded text-text-secondary hover:text-text-primary">
                    <Icon name="Edit" size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Save Document</span>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">Ctrl</kbd>
                  <span className="text-xs text-text-secondary">+</span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">S</kbd>
                  <button className="ml-2 p-1 rounded text-text-secondary hover:text-text-primary">
                    <Icon name="Edit" size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Find & Replace</span>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">Ctrl</kbd>
                  <span className="text-xs text-text-secondary">+</span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">F</kbd>
                  <button className="ml-2 p-1 rounded text-text-secondary hover:text-text-primary">
                    <Icon name="Edit" size={14} />
                  </button>
                </div>
              </div>
            </div>
            <button className="mt-4 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
              Customize More Shortcuts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;