import type { CanvasElement } from '../../types';
import { useEditorStore } from '../../store/editorStore';

interface ElementFormProps {
  element: CanvasElement;
}

const ElementForm = ({ element }: ElementFormProps) => {
  const { updateElement, deleteElement } = useEditorStore();

  // Handle input changes and update the element
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle style properties vs content
    if (name === 'content') {
      updateElement(element.id, { content: value });
    } else {
      // For style properties
      const styleProperty = name as keyof typeof element.style;
      
      // Convert numeric values
      let processedValue: string | number = value;
      if (['width', 'height', 'top', 'left', 'fontSize', 'padding'].includes(name)) {
        processedValue = Number(value);
      }

      updateElement(element.id, {
        style: {
          ...element.style,
          [styleProperty]: processedValue
        }
      });
    }
  };

  // Handle element deletion
  const handleDelete = () => {
    deleteElement(element.id);
  };

  return (
    <div className="properties-panel">
      <h3 className="properties-panel-title">Properties</h3>
      
      <div className="properties-form">
        {/* Common properties for all elements */}
        <div className="form-group">
          <label>Element Type</label>
          <input 
            type="text" 
            value={element.type} 
            disabled 
          />
        </div>

        {/* Content field depends on element type */}
        <div className="form-group">
          <label>Content</label>
          {element.type === 'text' ? (
            <textarea
              name="content"
              value={element.content}
              onChange={handleChange}
              rows={4}
            />
          ) : (
            <input
              type={element.type === 'image' ? 'url' : 'text'}
              name="content"
              value={element.content}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Position and size */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group">
            <label>X Position</label>
            <input
              type="number"
              name="left"
              value={element.style.left}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Y Position</label>
            <input
              type="number"
              name="top"
              value={element.style.top}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group">
            <label>Width</label>
            <input
              type="number"
              name="width"
              value={element.style.width}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={element.style.height}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Style properties */}
        {element.type !== 'image' && (
          <>
            <div className="form-group">
              <label>Text Color</label>
              <input
                type="color"
                name="color"
                value={element.style.color}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                name="backgroundColor"
                value={element.style.backgroundColor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Font Size</label>
              <input
                type="number"
                name="fontSize"
                value={element.style.fontSize}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Text Align</label>
              <select
                name="textAlign"
                value={element.style.textAlign}
                onChange={handleChange}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="form-group">
              <label>Padding</label>
              <input
                type="number"
                name="padding"
                value={element.style.padding}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Delete button */}
        <button 
          onClick={handleDelete}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Delete Element
        </button>
      </div>
    </div>
  );
};

export default ElementForm;