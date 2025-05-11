// Types of elements that can be placed on the canvas
export type ElementType = 'text' | 'heading' | 'image' | 'button';

// Device types for responsive preview
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Style properties for elements
export interface ElementStyle {
  top: number;
  left: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  padding?: number;
}

// Structure of an element on the canvas
export interface CanvasElement {
  id: string;
  type: ElementType;
  content: string;
  style: ElementStyle;
}

// Editor store state
export interface EditorState {
  elements: CanvasElement[];
  selectedElementId: string | null;
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  moveElement: (id: string, deltaX: number, deltaY: number) => void;
  selectElement: (id: string) => void;
  clearSelection: () => void;
  deleteElement: (id: string) => void;
}