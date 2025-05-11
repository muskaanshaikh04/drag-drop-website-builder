import { create } from 'zustand';
import type { CanvasElement, EditorState } from '../types';

// Create the editor store with Zustand
export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  elements: [],
  selectedElementId: null,
  
  // Actions
  addElement: (element: CanvasElement) => 
    set((state) => ({ 
      elements: [...state.elements, element],
      selectedElementId: element.id // Select the newly added element
    })),
  
  updateElement: (id: string, updates: Partial<CanvasElement>) => 
    set((state) => ({
      elements: state.elements.map((element) => 
        element.id === id 
          ? { ...element, ...updates } 
          : element
      )
    })),
  
  moveElement: (id: string, deltaX: number, deltaY: number) => 
    set((state) => {
      // Find element to move
      const elementToMove = state.elements.find(el => el.id === id);
      if (!elementToMove) return state; // Element not found
      
      // Get canvas dimensions for boundary checks
      const canvas = document.getElementById('canvas');
      const canvasRect = canvas?.getBoundingClientRect();
      
      // Calculate new position with improved boundary checks
      let newLeft = Math.max(0, elementToMove.style.left + deltaX);
      let newTop = Math.max(0, elementToMove.style.top + deltaY);
      
      // Prevent elements from going too far off-canvas
      if (canvasRect) {
        // Keep at least 20px of the element visible inside the canvas
        const maxLeft = canvasRect.width - 20;
        const maxTop = canvasRect.height - 20;
        
        newLeft = Math.min(newLeft, maxLeft);
        newTop = Math.min(newTop, maxTop);
      }
      
      // Use requestAnimationFrame for smoother updates
      return {
        elements: state.elements.map((element) => 
          element.id === id 
            ? { 
                ...element, 
                style: {
                  ...element.style,
                  left: newLeft,
                  top: newTop
                } 
              } 
            : element
        )
      };
    }),
  
  selectElement: (id: string) => 
    set((state) => {
      // If selecting the same element, do nothing
      if (state.selectedElementId === id) return state;
      
      return { 
        selectedElementId: id,
        // Bring selected element to front by reordering array
        elements: [
          ...state.elements.filter(el => el.id !== id),
          state.elements.find(el => el.id === id)!
        ].filter(Boolean)
      };
    }),
  
  clearSelection: () => 
    set({ selectedElementId: null }),
  
  deleteElement: (id: string) => 
    set((state) => ({
      elements: state.elements.filter(element => element.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
    })),
}));