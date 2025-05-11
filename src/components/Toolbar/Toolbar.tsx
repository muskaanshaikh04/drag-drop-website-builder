import type { DeviceType } from '../../types';

interface ToolbarProps {
  deviceType: DeviceType;
  onDeviceChange: (deviceType: DeviceType) => void;
}

const Toolbar = ({ deviceType, onDeviceChange }: ToolbarProps) => {
  return (
    <div className="toolbar">
      <h2>Website Builder</h2>
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onDeviceChange('desktop')}
          style={{ 
            backgroundColor: deviceType === 'desktop' ? '#3a80d2' : '#4a90e2' 
          }}
        >
          Desktop
        </button>
        
        <button
          onClick={() => onDeviceChange('tablet')}
          style={{ 
            backgroundColor: deviceType === 'tablet' ? '#3a80d2' : '#4a90e2' 
          }}
        >
          Tablet
        </button>
        
        <button
          onClick={() => onDeviceChange('mobile')}
          style={{ 
            backgroundColor: deviceType === 'mobile' ? '#3a80d2' : '#4a90e2' 
          }}
        >
          Mobile
        </button>
        
        <button>
          Save
        </button>
        
        <button>
          Preview
        </button>
      </div>
    </div>
  );
};

export default Toolbar;