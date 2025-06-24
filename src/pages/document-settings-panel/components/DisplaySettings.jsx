import React from 'react';
import Icon from 'components/AppIcon';

const DisplaySettings = ({ settings, updateSetting, previewMode }) => {
  const fontFamilies = [
    { value: 'Inter', label: 'Inter (Default)' },
    { value: 'JetBrains Mono', label: 'JetBrains Mono (Monospace)' },
    { value: 'Georgia', label: 'Georgia (Serif)' },
    { value: 'Arial', label: 'Arial (Sans-serif)' },
    { value: 'Times New Roman', label: 'Times New Roman (Serif)' },
    { value: 'Courier New', label: 'Courier New (Monospace)' },
    { value: 'Helvetica', label: 'Helvetica (Sans-serif)' },
    { value: 'Verdana', label: 'Verdana (Sans-serif)' }
  ];

  const colorThemes = [
    { value: 'light', label: 'Light Theme', icon: 'Sun' },
    { value: 'dark', label: 'Dark Theme', icon: 'Moon' },
    { value: 'high-contrast', label: 'High Contrast', icon: 'Contrast' },
    { value: 'sepia', label: 'Sepia', icon: 'Coffee' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Monitor" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary font-heading">Display Settings</h2>
      </div>

      <div className="space-y-8">
        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Font Family
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => updateSetting('fontFamily', e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-secondary mt-2">
            Choose the font family for your text editor
          </p>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Font Size
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="8"
              max="72"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              className="flex-1"
            />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="8"
                max="72"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                className="w-16 border border-border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <span className="text-sm text-text-secondary">pt</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>Small (8pt)</span>
            <span>Large (72pt)</span>
          </div>
        </div>

        {/* Line Height */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Line Height
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
              className="flex-1"
            />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1.0"
                max="3.0"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                className="w-16 border border-border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>Tight (1.0)</span>
            <span>Loose (3.0)</span>
          </div>
        </div>

        {/* Color Theme */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Color Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            {colorThemes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => updateSetting('colorTheme', theme.value)}
                className={`flex items-center space-x-3 p-4 border rounded-md transition-colors duration-200 ${
                  settings.colorTheme === theme.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={theme.icon} size={20} />
                <span className="font-medium">{theme.label}</span>
                {settings.colorTheme === theme.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Sample */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Preview
          </label>
          <div 
            className="border border-border rounded-md p-4 bg-background min-h-32"
            style={{
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize}px`,
              lineHeight: settings.lineHeight
            }}
          >
            <p className="text-text-primary mb-2">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-text-secondary text-sm">
              This is how your text will appear with the current display settings. 
              You can adjust the font family, size, and line height to match your preferences.
            </p>
          </div>
        </div>

        {/* Additional Display Options */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Additional Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Show Ruler</label>
                <p className="text-xs text-text-secondary">Display a ruler at the top of the editor</p>
              </div>
              <button
                onClick={() => updateSetting('showRuler', !settings.showRuler)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showRuler ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showRuler ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Show Status Bar</label>
                <p className="text-xs text-text-secondary">Display document information at the bottom</p>
              </div>
              <button
                onClick={() => updateSetting('showStatusBar', !settings.showStatusBar)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showStatusBar ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showStatusBar ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Smooth Scrolling</label>
                <p className="text-xs text-text-secondary">Enable smooth scrolling animation</p>
              </div>
              <button
                onClick={() => updateSetting('smoothScrolling', !settings.smoothScrolling)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.smoothScrolling ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.smoothScrolling ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;