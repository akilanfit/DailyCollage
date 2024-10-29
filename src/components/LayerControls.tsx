import React from 'react';
import { useDesignStore } from '../store';
import { MoveUp, MoveDown, ArrowUpToLine, ArrowDownToLine } from 'lucide-react';

export const LayerControls = () => {
  const { selectedElement, moveLayer } = useDesignStore();

  if (!selectedElement) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => moveLayer(selectedElement, 'top')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        title="Bring to Front"
      >
        <ArrowUpToLine size={20} />
      </button>
      <button
        onClick={() => moveLayer(selectedElement, 'up')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        title="Bring Forward"
      >
        <MoveUp size={20} />
      </button>
      <button
        onClick={() => moveLayer(selectedElement, 'down')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        title="Send Backward"
      >
        <MoveDown size={20} />
      </button>
      <button
        onClick={() => moveLayer(selectedElement, 'bottom')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        title="Send to Back"
      >
        <ArrowDownToLine size={20} />
      </button>
    </div>
  );
};