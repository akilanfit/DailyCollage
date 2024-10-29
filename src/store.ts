import { create } from 'zustand';
import { DesignState, DesignElement, CanvasSize } from './types';

export const useDesignStore = create<DesignState>((set) => ({
  elements: [],
  selectedElement: null,
  canvasSize: { width: 1920, height: 1080, name: 'Full HD' },
  
  addElement: (element) => set((state) => ({
    elements: [...state.elements, { 
      ...element, 
      id: crypto.randomUUID(),
      zIndex: Math.max(0, ...state.elements.map(el => el.zIndex)) + 1
    }]
  })),
  
  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map((el) => 
      el.id === id ? { ...el, ...updates } : el
    )
  })),
  
  removeElement: (id) => set((state) => ({
    elements: state.elements.filter((el) => el.id !== id)
  })),
  
  setSelectedElement: (id) => set({ selectedElement: id }),
  
  setCanvasSize: (size) => set({ canvasSize: size }),

  moveLayer: (id, direction) => set((state) => {
    const elements = [...state.elements].sort((a, b) => a.zIndex - b.zIndex);
    const index = elements.findIndex(el => el.id === id);
    if (index === -1) return state;

    const element = elements[index];
    elements.splice(index, 1);

    switch (direction) {
      case 'up':
        if (index < elements.length) {
          elements.splice(index + 1, 0, element);
        } else {
          elements.push(element);
        }
        break;
      case 'down':
        if (index > 0) {
          elements.splice(index - 1, 0, element);
        } else {
          elements.unshift(element);
        }
        break;
      case 'top':
        elements.push(element);
        break;
      case 'bottom':
        elements.unshift(element);
        break;
    }

    return {
      elements: elements.map((el, i) => ({ ...el, zIndex: i }))
    };
  })
}));