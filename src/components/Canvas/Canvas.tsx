import { useDroppable } from '@dnd-kit/core';
import type { CanvasElement, DeviceType } from '../../types';
import CanvasElementComponent from './CanvasElement';
import { useRef, useEffect } from 'react';

interface CanvasProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  deviceType: DeviceType;
  activeDragId?: string | null;
  onElementSelect: (id: string) => void;
  onClick: (event: React.MouseEvent) => void;
}

const Canvas = ({ 
  elements, 
  selectedElementId,
  activeDragId,
  deviceType,
  onElementSelect,
  onClick
}: CanvasProps) => {
  // Create a ref to the canvas for measurements
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Set up the canvas as a droppable area using dnd-kit
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });
  
  // Sync the ref with dnd-kit's ref
  const handleRefSync = (node: HTMLDivElement) => {
    // Apply refs to the node
    canvasRef.current = node;
    setNodeRef(node);
  };

  // Add visual feedback class when dragging over canvas
  const canvasClasses = [
    'canvas', 
    deviceType, 
    isOver ? 'drop-active' : '', 
    activeDragId ? 'dragging-active' : ''
  ].filter(Boolean).join(' ');
  
  // Enhanced styles for better visual feedback
  const canvasStyle = {
    position: 'relative' as const,
    transition: isOver ? 'none' : 'all 0.3s ease',
    outline: isOver ? '2px dashed #4a90e2' : 'none',
    backgroundColor: isOver ? 'rgba(74, 144, 226, 0.03)' : 'white',
  };
  
  // Optimize rendering during drag operations
  useEffect(() => {
    if (activeDragId) {
      // Apply optimizations when dragging
      document.body.classList.add('dragging');
    } else {
      document.body.classList.remove('dragging');
    }
    
    return () => {
      document.body.classList.remove('dragging');
    };
  }, [activeDragId]);

  return (
    <div className="canvas-container">
      <div 
        ref={handleRefSync}
        id="canvas"
        className={canvasClasses}
        onClick={onClick}
        style={canvasStyle}
      >
        {elements.map((element) => (
          <CanvasElementComponent
            key={element.id}
            element={element}
            isSelected={element.id === selectedElementId}
            onSelect={() => onElementSelect(element.id)}
          />
        ))}
        
        {/* Add a visual indicator during drag */}
        {isOver && activeDragId?.includes('sidebar-') && (
          <div 
            className="drop-indicator"
            style={{
              position: 'absolute',
              width: '100px',
              height: '50px',
              border: '2px dashed #4a90e2',
              borderRadius: '4px',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 1000
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Canvas;