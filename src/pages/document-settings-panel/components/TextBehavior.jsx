import React from 'react';
import Icon from 'components/AppIcon';

const TextBehavior = ({ settings, updateSetting, previewMode }) => {
  const tabSizeOptions = [
    { value: 2, label: '2 spaces' },
    { value: 4, label: '4 spaces' },
    { value: 8, label: '8 spaces' },
    { value: 'tab', label: 'Tab character' }
  ];

  const indentationStyles = [
    { value: 'spaces', label: 'Spaces', icon: 'Space' },
    { value: 'tabs', label: 'Tabs', icon: 'Tab' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Type" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary font-heading">Text Behavior</h2>
      </div>

      <div className="space-y-8">
        {/* Word Wrap */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-sm font-medium text-text-primary">Word Wrap</label>
              <p className="text-xs text-text-secondary">Automatically wrap long lines to fit the editor width</p>
            </div>
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
        </div>

        {/* Tab Size */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Tab Size
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tabSizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('tabSize', option.value)}
                className={`flex items-center justify-center p-3 border rounded-md transition-colors duration-200 ${
                  settings.tabSize === option.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="font-medium">{option.label}</span>
                {settings.tabSize === option.value && (
                  <Icon name="Check" size={16} className="ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Indentation Style */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Indentation Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {indentationStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => updateSetting('indentationStyle', style.value)}
                className={`flex items-center space-x-3 p-4 border rounded-md transition-colors duration-200 ${
                  settings.indentationStyle === style.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={style.icon} size={20} />
                <span className="font-medium">{style.label}</span>
                {settings.indentationStyle === style.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Indent */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-sm font-medium text-text-primary">Auto Indent</label>
              <p className="text-xs text-text-secondary">Automatically indent new lines to match the previous line</p>
            </div>
            <button
              onClick={() => updateSetting('autoIndent', !settings.autoIndent)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoIndent ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoIndent ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Spell Check */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-sm font-medium text-text-primary">Spell Check</label>
              <p className="text-xs text-text-secondary">Highlight misspelled words as you type</p>
            </div>
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
        </div>

        {/* Additional Text Behavior Options */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Advanced Text Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Auto Close Brackets</label>
                <p className="text-xs text-text-secondary">Automatically close brackets, quotes, and parentheses</p>
              </div>
              <button
                onClick={() => updateSetting('autoCloseBrackets', !settings.autoCloseBrackets)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoCloseBrackets ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoCloseBrackets ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Trim Trailing Whitespace</label>
                <p className="text-xs text-text-secondary">Remove extra spaces at the end of lines when saving</p>
              </div>
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

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Insert Final Newline</label>
                <p className="text-xs text-text-secondary">Ensure files end with a newline character</p>
              </div>
              <button
                onClick={() => updateSetting('insertFinalNewline', !settings.insertFinalNewline)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.insertFinalNewline ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.insertFinalNewline ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text-primary">Show Whitespace Characters</label>
                <p className="text-xs text-text-secondary">Display dots for spaces and arrows for tabs</p>
              </div>
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
          </div>
        </div>

        {/* Text Behavior Preview */}
        <div className="border-t border-border pt-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Behavior Preview
          </label>
          <div className="border border-border rounded-md p-4 bg-background">
            <div className="text-xs text-text-secondary mb-2">
              Tab size: {settings.tabSize} | Word wrap: {settings.wordWrap ? 'On' : 'Off'} | Auto indent: {settings.autoIndent ? 'On' : 'Off'}
            </div>
            <div 
              className="font-mono text-sm text-text-primary"
              style={{
                whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                tabSize: typeof settings.tabSize === 'number' ? settings.tabSize : 4
              }}
            >
              {`function example() {
    if (condition) {
        return "This line demonstrates indentation and tab behavior";
    }
}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextBehavior;