import { DndContext, type DragEndEvent, type DragOverEvent, type DragStartEvent, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ElementForm from './components/ElementForm/ElementForm';
import Sidebar from './components/Sidebar/Sidebar';
import Toolbar from './components/Toolbar/Toolbar';
import { useEditorStore } from './store/editorStore';
import type { CanvasElement, DeviceType } from './types';

function App() {
  const { 
    elements, 
    selectedElementId, 
    addElement, 
    selectElement, 
    moveElement, 
    clearSelection 
  } = useEditorStore();
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  
  // Configure multiple sensors for better cross-device performance
  const sensors = useSensors(
    // Mouse sensor with very low delay for desktop users
    useSensor(MouseSensor, {
      // Start detecting drag with minimal movement
      activationConstraint: {
        distance: 2, // Minimal distance before activation
        delay: 50, // Very short delay for immediate response
      },
    }),
    // Touch sensor optimized for mobile use
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    // Keep pointer sensor as fallback
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    // If we're dragging an existing canvas element, make sure it's selected
    if (active.id.toString().includes('element-')) {
      selectElement(active.id as string);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // If dragging from sidebar to canvas
    if (active.id.toString().includes('sidebar-') && over && over.id === 'canvas') {
      // Extract element type from the sidebar ID
      const elementType = active.id.toString().replace('sidebar-', '') as CanvasElement['type'];
      
      // Get canvas element and its position
      const canvasElement = document.getElementById('canvas');
      const canvasRect = canvasElement?.getBoundingClientRect();
      
      if (canvasRect && event.activatorEvent instanceof MouseEvent) {
        const dropX = Math.max(0, event.activatorEvent.clientX - canvasRect.left);
        const dropY = Math.max(0, event.activatorEvent.clientY - canvasRect.top);
        
        // Calculate correct position based on element type for better initial placement
        const centerOffsetX = getDefaultWidth(elementType) / 2;
        const centerOffsetY = getDefaultHeight(elementType) / 2;
        
        // Add the new element to the canvas with centered position
        addElement({
          id: `element-${Date.now()}`,
          type: elementType,
          content: getDefaultContent(elementType),
          style: {
            top: Math.max(0, dropY - centerOffsetY),
            left: Math.max(0, dropX - centerOffsetX),
            width: getDefaultWidth(elementType),
            height: getDefaultHeight(elementType),
            color: '#000000',
            backgroundColor: elementType === 'button' ? '#4a90e2' : 'transparent',
            fontSize: 16,
            textAlign: 'left',
            padding: 10,
          }
        });
      }
    } 
    // If dragging an existing element on the canvas
    else if (active.id.toString().includes('element-') && over) {
      const { delta } = event;
      moveElement(active.id as string, delta.x, delta.y);
    }
    
    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Keep this lightweight for better performance
  };

  const handleCanvasClick = (event: React.MouseEvent) => {
    // Clear selection if clicking on the canvas background
    if ((event.target as HTMLElement).id === 'canvas') {
      clearSelection();
    }
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  // Helper functions for default element properties
  const getDefaultContent = (type: CanvasElement['type']): string => {
    switch(type) {
      case 'text':
        return 'Add your text here';
      case 'heading':
        return 'Heading';
      case 'image':
        return 'https://via.placeholder.com/150';
      case 'button':
        return 'Button';
      default:
        return '';
    }
  };

  const getDefaultWidth = (type: CanvasElement['type']): number => {
    switch(type) {
      case 'text':
        return 200;
      case 'heading':
        return 300;
      case 'image':
        return 150;
      case 'button':
        return 100;
      default:
        return 100;
    }
  };

  const getDefaultHeight = (type: CanvasElement['type']): number => {
    switch(type) {
      case 'text':
        return 100;
      case 'heading':
        return 50;
      case 'image':
        return 150;
      case 'button':
        return 40;
      default:
        return 50;
    }
  };

  return (
    <div className="app-container">
      <Toolbar 
        deviceType={deviceType} 
        onDeviceChange={setDeviceType} 
      />
      
      <div className="main-content">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <Sidebar />
          
          <Canvas
            elements={elements}
            selectedElementId={selectedElementId}
            onElementSelect={selectElement}
            onClick={handleCanvasClick}
            deviceType={deviceType}
            activeDragId={activeId}
          />
          
          {selectedElement && (
            <ElementForm 
              element={selectedElement}
            />
          )}
        </DndContext>
      </div>
    </div>
  );
}

export default App;