# Shopping List App

## Overview

A modern, feature-rich shopping list application built with React and Redux for efficient state management. The app utilizes JSON-Server for data persistence, Material-UI (MUI) components for a polished user interface, and implements offline functionality for seamless usage without an internet connection.

## Key Features

### Core Functionality
- **CRUD Operations**
  - Create new shopping list items with customizable fields
  - Read and display items in an organized layout
  - Update item details in real-time
  - Delete items with confirmation dialog
  - Batch operations support for multiple items

- **List Management**
  - Create multiple shopping lists
  - Switch between different lists
  - Archive completed lists
  - Import/Export lists in JSON format
  - Automatic save and sync

### Organization
- **Categories & Tags**
  - Predefined category system
  - Custom tags for flexible organization
  - Color-coding for visual organization
  - Category-based filtering
  - Tag-based searching

- **Search & Filter**
  - Real-time search functionality
  - Advanced filtering options
  - Sort by name, date, category, or priority
  - Save custom filter combinations
  - Search history tracking

### Collaboration
- **Sharing Features**
  - Generate shareable links
  - QR code generation for lists
  - Collaborative editing
  - Access control management
  - Activity tracking for shared lists

### User Experience
- **Offline Support**
  - Local data caching
  - Background sync when online
  - Conflict resolution
  - Offline editing capabilities
  - Sync status indicators

- **User Interface**
  - Responsive design for all devices
  - Dark/Light theme support
  - Customizable layouts
  - Touch-friendly interface
  - Keyboard shortcuts

### Security
- **Authentication & Authorization**
  - Secure user registration
  - JWT token management
  - Password recovery
  - OAuth integration
  - Session management

## Technical Architecture

### Frontend
- React 18+
- Redux Toolkit for state management
- Material-UI v5 components
- React Router v6
- Service Workers for offline support

### Backend
- JSON-Server for development
- RESTful API architecture
- JWT authentication
- Data validation middleware
- Rate limiting

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Xoli-Nxiweni/Shopping-List.git
cd shopping-list-app
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start Development Servers**

Start the JSON-Server (database):
```bash
npm run server
# or
json-server --watch db.json --port 5000
```

Start the React development server:
```bash
npm start
```

### Available Scripts

- `npm start`: Starts the development server
- `npm run build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm run server`: Starts the JSON-Server
- `npm run lint`: Runs ESLint
- `npm run format`: Formats code with Prettier

## API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Items
- `GET /items`: Fetch all items
- `POST /items`: Create new item
- `PUT /items/:id`: Update item
- `DELETE /items/:id`: Delete item

#### Lists
- `GET /lists`: Fetch all lists
- `POST /lists`: Create new list
- `PUT /lists/:id`: Update list
- `DELETE /lists/:id`: Delete list

#### Categories
- `GET /categories`: Fetch all categories
- `POST /categories`: Create new category

## Development

### Code Structure
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific components and logic
├── hooks/          # Custom React hooks
├── redux/         # Redux store, slices, and actions
├── services/      # API and external service integrations
├── utils/         # Helper functions and utilities
└── App.js         # Main application component
```

### Testing
The project uses Jest and React Testing Library for testing:
```bash
npm test                 # Run all tests
npm test -- --watch     # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- Vercel (recommended)
- Netlify
- GitHub Pages
- Custom server

## Support and Contact

### Issues and Bugs
Please report any bugs or issues in the GitHub repository's Issues section.

### Contact Information
- **Developer**: Xoli Nxiweni
- **Email**: xolinxiweni@gmail.com
- **GitHub**: [Xoli-Nxiweni](https://github.com/Xoli-Nxiweni)

