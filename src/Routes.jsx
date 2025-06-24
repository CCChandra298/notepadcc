import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import TextEditorWorkspace from "pages/text-editor-workspace";
import FindAndReplaceInterface from "pages/find-and-replace-interface";
import FileManagementHub from "pages/file-management-hub";
import DocumentSettingsPanel from "pages/document-settings-panel";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<TextEditorWorkspace />} />
          <Route path="/text-editor-workspace" element={<TextEditorWorkspace />} />
          <Route path="/find-and-replace-interface" element={<FindAndReplaceInterface />} />
          <Route path="/file-management-hub" element={<FileManagementHub />} />
          <Route path="/document-settings-panel" element={<DocumentSettingsPanel />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;