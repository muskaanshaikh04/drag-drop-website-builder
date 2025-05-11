import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { ElementType } from '../../types';

// Component for individual draggable elements in the sidebar
const DraggableElement = ({ type, label, icon }: { type: ElementType; label: string; icon: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { type }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform || { x: 0, y: 0, scaleX: 1, scaleY: 1 }),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    // Prevent excessive size change during drag
    transformOrigin: 'center',
    // Visual feedback
    boxShadow: isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none',
    // Create better hover/active states
    transition: isDragging ? 'none' : 'all 0.15s ease',
    // Prevent text selection during drag
    userSelect: 'none' as const
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-element"
    >
      <div className="element-icon" aria-hidden="true">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

// Main sidebar component with draggable elements
const Sidebar = () => {
  const elements: Array<{ type: ElementType; label: string; icon: string }> = [
    { type: 'heading', label: 'Heading', icon: '𝐇' },
    { type: 'text', label: 'Text Block', icon: '𝐓' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'button', label: 'Button', icon: '🔘' }
  ];

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Elements</h3>
      <div className="element-list">
        {elements.map((element) => (
          <DraggableElement 
            key={element.type} 
            type={element.type} 
            label={element.label} 
            icon={element.icon}
          />
        ))}
      </div>
      <div className="sidebar-footer">
        <p className="sidebar-hint">Drag elements to the canvas</p>
      </div>
    </div>
  );
};

export default Sidebar;