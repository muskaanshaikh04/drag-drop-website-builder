import { useDraggable } from '@dnd-kit/core';
//import { CSS } from '@dnd-kit/utilities';
//import { CSS } from '@dnd-kit/utilities';
import type { CanvasElement } from '../../types';
import React from 'react';

interface CanvasElementProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
}

const CanvasElementComponent = ({ 
  element, 
  isSelected, 
  onSelect 
}: CanvasElementProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: 'canvas-element',
      element
    }
  });

  // Isolate only translation values
  const translate = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : 'none';

  const style: React.CSSProperties = {
    position: 'absolute',
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height,
    color: element.style.color,
    backgroundColor: element.type === 'image' ? 'transparent' : element.style.backgroundColor,
    fontSize: element.style.fontSize,
    textAlign: element.style.textAlign as 'left' | 'center' | 'right' | 'justify',
    padding: element.style.padding,
    transform: translate,
    cursor: 'grab',
    transition: isDragging ? 'none' : 'transform 0.2s ease',
    zIndex: isDragging ? 100 : isSelected ? 10 : 1,
    boxShadow: isDragging
      ? '0 5px 15px rgba(0,0,0,0.2)'
      : isSelected
      ? '0 0 0 2px #4a90e2, 0 2px 10px rgba(0,0,0,0.1)'
      : '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    pointerEvents: isDragging ? 'none' : 'auto',
    userSelect: 'none',
  };

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{element.content}</p>;
      case 'heading':
        return <h2 style={{ margin: 0 }}>{element.content}</h2>;
      case 'image':
        return (
          <img 
            src={element.content} 
            alt="Canvas element" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        );
      case 'button':
        return (
          <button 
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: element.style.backgroundColor,
              color: element.style.color,
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {element.content}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`canvas-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      {...attributes}
      {...listeners}
    >
      {renderElement()}
    </div>
  );
};

export default CanvasElementComponent;
