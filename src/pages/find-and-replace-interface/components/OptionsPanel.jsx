import React from 'react';
import Icon from 'components/AppIcon';

const OptionsPanel = ({ options, onOptionsChange }) => {
  const updateOption = (key, value) => {
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="p-4 border-b border-border bg-surface/30">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Settings" size={16} className="text-text-secondary" />
          <h3 className="text-sm font-medium text-text-primary">Search Options</h3>
        </div>

        {/* Search Options */}
        <div className="grid grid-cols-1 gap-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
              <Icon name="Type" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Match case</span>
            </div>
            <button
              onClick={() => updateOption('matchCase', !options.matchCase)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                options.matchCase ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  options.matchCase ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
              <Icon name="WholeWord" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Whole word</span>
            </div>
            <button
              onClick={() => updateOption('wholeWord', !options.wholeWord)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                options.wholeWord ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  options.wholeWord ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
              <Icon name="Regex" size={14} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Use regex</span>
            </div>
            <button
              onClick={() => updateOption('useRegex', !options.useRegex)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                options.useRegex ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  options.useRegex ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Search Scope */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={14} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Search scope</span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchScope"
                value="current"
                checked={options.searchScope === 'current'}
                onChange={(e) => updateOption('searchScope', e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-sm text-text-secondary">Current document</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchScope"
                value="all"
                checked={options.searchScope === 'all'}
                onChange={(e) => updateOption('searchScope', e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-sm text-text-secondary">All open files</span>
            </label>
          </div>
        </div>

        {/* Regex Help */}
        {options.useRegex && (
          <div className="pt-3 border-t border-border">
            <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
              <div className="flex items-start space-x-2">
                <Icon name="HelpCircle" size={14} className="text-primary mt-0.5" />
                <div className="text-xs text-primary">
                  <div className="font-medium mb-1">Regex Examples:</div>
                  <div className="space-y-1 font-mono">
                    <div>\d+ - Numbers</div>
                    <div>\w+ - Words</div>
                    <div>^.+ - Start of line</div>
                    <div>.+$ - End of line</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsPanel;