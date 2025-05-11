# Drag-and-Drop Website Builder Prototype

A prototype for a drag-and-drop website builder that allows users to visually design websites by dragging elements onto a canvas and configuring them through forms.

## Features

- Drag-and-drop interface for adding elements to a canvas
- Form-based configuration of element properties
- Responsive design support
- Modern React architecture with TypeScript

## Tech Stack

- **React** - Frontend framework
- **TypeScript** - Type safety
- **@dnd-kit** - Drag and drop functionality
- **Zustand** - State management
- **Vite** - Build tool

## Setup Instructions

1. **Clone the repository**

```bash
git clone [repository-url]
cd drag-drop-website-builder
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**
   
Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## Project Structure

```
drag-drop-website-builder/
├── src/
│   ├── components/            # UI components
│   │   ├── Canvas/            # Canvas and related components
│   │   ├── Sidebar/           # Sidebar with draggable elements
│   │   ├── ElementForm/       # Forms to configure elements
│   │   ├── Toolbar/           # Top bar with actions
│   ├── store/                 # State management using Zustand
│   ├── types/                 # TypeScript types and interfaces
│   ├── App.tsx                # App root
│   └── main.tsx               # Entry point
└── ...
```

## Usage Guide

1. **Adding Elements**: Drag elements from the sidebar onto the canvas.
2. **Selecting Elements**: Click on any element on the canvas to select it.
3. **Configuring Elements**: Use the property panel on the right to modify the selected element.
4. **Moving Elements**: Drag selected elements to reposition them on the canvas.
5. **Responsive Preview**: Toggle between desktop and mobile views using the toolbar.

## Architecture Overview

The application uses a component-based architecture with state management via Zustand:

- **Canvas Component**: Serves as the droppable area where website elements are placed and arranged.
- **Element Components**: Represent the draggable and configurable website elements (text, images, buttons).
- **Form Components**: Allow users to configure properties of selected elements.
- **Store**: Centralized state management for the editor, handling element data, selection, and canvas state.

## Development Notes

- The prototype focuses on core drag-and-drop functionality with minimal styling
- Responsive design is handled through relative positioning and flexible layouts
- Elements maintain their relative positions across different device sizes

## Next Steps

- Add more element types (columns, containers, forms)
- Implement template selection
- Add export functionality to generate actual website code
- Enhance styling and visual feedback
- Implement undo/redo functionality