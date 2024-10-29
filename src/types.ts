export interface DesignElement {
  id: string;
  type: 'image' | 'text';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  borderColor?: string;
  borderWidth?: number;
}

export interface CanvasSize {
  width: number;
  height: number;
  name: string;
}

export interface DesignState {
  elements: DesignElement[];
  selectedElement: string | null;
  canvasSize: CanvasSize;
  addElement: (element: Omit<DesignElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (id: string | null) => void;
  setCanvasSize: (size: CanvasSize) => void;
  moveLayer: (id: string, direction: 'up' | 'down' | 'top' | 'bottom') => void;
}