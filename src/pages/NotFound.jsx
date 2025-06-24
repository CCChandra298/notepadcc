import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Icon name="FileX" size={64} className="mx-auto text-text-secondary mb-4" />
          <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold text-text-secondary mb-4">Page Not Found</h2>
          <p className="text-text-secondary">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/text-editor-workspace"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            <Icon name="Home" size={20} />
            <span>Go to Text Editor</span>
          </Link>
          
          <div className="text-sm text-text-secondary">
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              ← Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;