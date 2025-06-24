import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import FolderTree from './components/FolderTree';
import FileTable from './components/FileTable';
import FileToolbar from './components/FileToolbar';
import BulkOperationsBar from './components/BulkOperationsBar';

const FileManagementHub = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFolderTree, setShowFolderTree] = useState(true);

  // Mock data for files and folders
  useEffect(() => {
    const mockFolders = [
      { id: 'root', name: 'Root', parentId: null, path: '/' },
      { id: 'documents', name: 'Documents', parentId: 'root', path: '/Documents' },
      { id: 'projects', name: 'Projects', parentId: 'root', path: '/Projects' },
      { id: 'notes', name: 'Notes', parentId: 'documents', path: '/Documents/Notes' },
      { id: 'drafts', name: 'Drafts', parentId: 'documents', path: '/Documents/Drafts' },
      { id: 'web-dev', name: 'Web Development', parentId: 'projects', path: '/Projects/Web Development' },
      { id: 'mobile-dev', name: 'Mobile Development', parentId: 'projects', path: '/Projects/Mobile Development' }
    ];

    const mockFiles = [
      {
        id: '1',
        name: 'Meeting Notes.txt',
        folderId: 'notes',
        size: 2048,
        type: 'text/plain',
        format: 'TXT',
        lastModified: new Date('2024-01-15T10:30:00'),
        content: `Meeting Notes - Project Kickoff
Date: January 15, 2024
Attendees: John, Sarah, Mike, Lisa

Agenda:
1. Project overview and objectives
2. Timeline and milestones
3. Resource allocation
4. Next steps

Key Points:
- Project deadline: March 30, 2024
- Budget approved: $50,000
- Team lead: Sarah Johnson
- Weekly standup meetings every Monday at 9 AM

Action Items:
- John: Prepare technical requirements document
- Mike: Set up development environment
- Lisa: Create project timeline in Gantt chart
- Sarah: Schedule stakeholder meeting

Next Meeting: January 22, 2024 at 2 PM`
      },
      {
        id: '2',
        name: 'Project Proposal.txt',
        folderId: 'documents',
        size: 4096,
        type: 'text/plain',
        format: 'TXT',
        lastModified: new Date('2024-01-14T14:20:00'),
        content: `Project Proposal: Customer Management System

Executive Summary:
This proposal outlines the development of a comprehensive customer management system to streamline our client interactions and improve service delivery.

Project Objectives:
1. Centralize customer data and communication history
2. Automate routine customer service tasks
3. Improve response times and customer satisfaction
4. Generate detailed analytics and reports

Technical Requirements:
- Web-based application with responsive design
- Integration with existing CRM systems
- Real-time notifications and alerts
- Secure data storage and backup
- Multi-user access with role-based permissions

Timeline:
Phase 1: Requirements gathering and design (4 weeks)
Phase 2: Development and testing (8 weeks)
Phase 3: Deployment and training (2 weeks)

Budget Estimate: $75,000
Expected ROI: 25% increase in customer satisfaction within 6 months`
      },
      {
        id: '3',
        name: 'README.md',
        folderId: 'web-dev',
        size: 1536,
        type: 'text/markdown',
        format: 'MD',
        lastModified: new Date('2024-01-13T16:45:00'),
        content: `# Web Development Project

## Overview
This project contains the source code for our company website redesign.

## Technologies Used
- React 18
- Tailwind CSS
- Node.js
- Express.js
- MongoDB

## Getting Started
1. Clone the repository
2. Install dependencies: npm install
3. Start development server: npm run dev
4. Open http://localhost:3000

## Project Structure
- /src - Source code
- /public - Static assets
- /docs - Documentation
- /tests - Test files

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.`
      },
      {
        id: '4',
        name: 'Todo List.txt',
        folderId: 'notes',
        size: 512,
        type: 'text/plain',
        format: 'TXT',
        lastModified: new Date('2024-01-12T09:15:00'),
        content: `Personal Todo List

High Priority:
☐ Complete quarterly report
☐ Review team performance evaluations
☐ Prepare presentation for board meeting
☐ Update project documentation

Medium Priority:
☐ Organize team building event
☐ Research new development tools
☐ Schedule one-on-one meetings with team members
☐ Update company website content

Low Priority:
☐ Clean up email inbox
☐ Organize digital files
☐ Update LinkedIn profile
☐ Plan vacation for next quarter

Completed:
☑ Submit budget proposal
☑ Attend training workshop
☑ Review code submissions
☑ Update project timeline`
      },
      {
        id: '5',
        name: 'API Documentation.txt',
        folderId: 'web-dev',
        size: 3072,
        type: 'text/plain',
        format: 'TXT',
        lastModified: new Date('2024-01-11T11:30:00'),
        content: `API Documentation - Customer Management System

Base URL: https://api.example.com/v1

Authentication:
All API requests require authentication using Bearer tokens.
Header: Authorization: Bearer <your-token>

Endpoints:

1. GET /customers
   Description: Retrieve list of customers
   Parameters:
   - page (optional): Page number (default: 1)
   - limit (optional): Items per page (default: 20)
   - search (optional): Search term for filtering
   
   Response:
   {
     "customers": [...],
     "total": 150,
     "page": 1,
     "limit": 20
   }

2. POST /customers
   Description: Create new customer
   Body:
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+1234567890",
     "address": "123 Main St"
   }

3. GET /customers/{id}
   Description: Get customer by ID
   Parameters:
   - id: Customer ID
   
4. PUT /customers/{id}
   Description: Update customer information
   
5. DELETE /customers/{id}
   Description: Delete customer

Error Codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error`
      },
      {
        id: '6',
        name: 'Draft Article.txt',
        folderId: 'drafts',
        size: 2560,
        type: 'text/plain',
        format: 'TXT',
        lastModified: new Date('2024-01-10T13:45:00'),
        content: `The Future of Web Development: Trends to Watch in 2024

Introduction:
As we move through 2024, the web development landscape continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are reshaping how we build and interact with web applications.

Key Trends:

1. AI-Powered Development Tools
Artificial intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are making developers more productive and helping catch errors before they reach production.

2. Progressive Web Apps (PWAs)
PWAs continue to bridge the gap between web and native applications. With improved offline capabilities and native-like performance, they're becoming the preferred choice for many businesses.

3. Serverless Architecture
The serverless paradigm is gaining momentum, allowing developers to focus on code rather than infrastructure management. This approach offers better scalability and cost-effectiveness.

4. WebAssembly (WASM)
WebAssembly is enabling high-performance applications in the browser, opening up new possibilities for complex applications that were previously limited to native platforms.

5. Micro-Frontends
The micro-frontend architecture is helping large organizations scale their frontend development by breaking applications into smaller, manageable pieces.

Conclusion:
The future of web development is exciting and full of opportunities. Staying current with these trends will be crucial for developers looking to remain competitive in the evolving landscape.`
      }
    ];

    setFolders(mockFolders);
    setFiles(mockFiles);
  }, []);

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    const currentFolderFiles = files.filter(file => file.folderId === currentFolder);
    if (selectedFiles.length === currentFolderFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(currentFolderFiles.map(file => file.id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
      setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  const handleBulkDownload = () => {
    selectedFiles.forEach(fileId => {
      const file = files.find(f => f.id === fileId);
      if (file) {
        const blob = new Blob([file.content], { type: file.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleCreateNew = () => {
    const newFile = {
      id: Date.now().toString(),
      name: `New Document ${files.length + 1}.txt`,
      folderId: currentFolder,
      size: 0,
      type: 'text/plain',
      format: 'TXT',
      lastModified: new Date(),
      content: ''
    };
    setFiles(prev => [...prev, newFile]);
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          folderId: currentFolder,
          size: file.size,
          type: file.type,
          format: file.name.split('.').pop().toUpperCase(),
          lastModified: new Date(),
          content: e.target.result
        };
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsText(file);
    });
  };

  const getCurrentFolderPath = () => {
    const folder = folders.find(f => f.id === currentFolder);
    return folder ? folder.path : '/';
  };

  const filteredFiles = files.filter(file => {
    const matchesFolder = file.folderId === currentFolder;
    const matchesSearch = searchTerm === '' || 
      file.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="bg-background border-b border-border shadow-subtle">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="FolderOpen" size={18} color="white" />
                </div>
                <span className="text-lg font-semibold text-text-primary font-heading">NotepadCC</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/text-editor-workspace"
                className="toolbar-item flex items-center space-x-2"
              >
                <Icon name="FileText" size={16} />
                <span>Editor</span>
              </Link>
              <Link
                to="/file-management-hub"
                className="toolbar-item toolbar-item-active flex items-center space-x-2"
              >
                <Icon name="FolderOpen" size={16} />
                <span>Files</span>
              </Link>
              <Link
                to="/document-settings-panel"
                className="toolbar-item flex items-center space-x-2"
              >
                <Icon name="Settings" size={16} />
                <span>Settings</span>
              </Link>
              <Link
                to="/find-and-replace-interface"
                className="toolbar-item flex items-center space-x-2"
              >
                <Icon name="Search" size={16} />
                <span>Find & Replace</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowFolderTree(!showFolderTree)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface"
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Home" size={14} />
            <span>File Management Hub</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-text-primary">{getCurrentFolderPath()}</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Folder Tree */}
        <div className={`${showFolderTree ? 'w-1/4' : 'w-0'} transition-all duration-200 border-r border-border bg-surface overflow-hidden`}>
          {showFolderTree && (
            <FolderTree
              folders={folders}
              currentFolder={currentFolder}
              onFolderSelect={setCurrentFolder}
            />
          )}
        </div>

        {/* Right Panel - File Management */}
        <div className={`${showFolderTree ? 'w-3/4' : 'w-full'} flex flex-col transition-all duration-200`}>
          {/* Toolbar */}
          <FileToolbar
            onCreateNew={handleCreateNew}
            onFileUpload={handleFileUpload}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFolderTree={() => setShowFolderTree(!showFolderTree)}
            showFolderTree={showFolderTree}
          />

          {/* Bulk Operations Bar */}
          {selectedFiles.length > 0 && (
            <BulkOperationsBar
              selectedCount={selectedFiles.length}
              onBulkDownload={handleBulkDownload}
              onBulkDelete={handleBulkDelete}
              onClearSelection={() => setSelectedFiles([])}
            />
          )}

          {/* File Table/Grid */}
          <div className="flex-1 overflow-auto">
            <FileTable
              files={filteredFiles}
              selectedFiles={selectedFiles}
              onFileSelect={handleFileSelect}
              onSelectAll={handleSelectAll}
              viewMode={viewMode}
              sortConfig={sortConfig}
              onSort={setSortConfig}
              folders={folders}
              onFileUpdate={(fileId, updates) => {
                setFiles(prev => prev.map(file => 
                  file.id === fileId ? { ...file, ...updates } : file
                ));
              }}
              onFileDelete={(fileId) => {
                if (window.confirm('Are you sure you want to delete this file?')) {
                  setFiles(prev => prev.filter(file => file.id !== fileId));
                  setSelectedFiles(prev => prev.filter(id => id !== fileId));
                }
              }}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagementHub;