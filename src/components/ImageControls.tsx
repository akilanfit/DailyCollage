import React from 'react';
import { useDesignStore } from '../store';
import { removeBackground } from '@imgly/background-removal';

export const ImageControls = () => {
  const { selectedElement, updateElement } = useDesignStore();
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [borderWidth, setBorderWidth] = React.useState(0);
  const [borderColor, setBorderColor] = React.useState('#000000');

  const element = useDesignStore(state => 
    state.elements.find(el => el.id === selectedElement)
  );

  if (!selectedElement || !element || element.type !== 'image') return null;

  const handleRemoveBackground = async () => {
    if (!element.content) return;
    
    setIsRemoving(true);
    try {
      const result = await removeBackground(element.content);
      updateElement(selectedElement, { content: result });
    } catch (error) {
      console.error('Failed to remove background:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleBorderChange = () => {
    updateElement(selectedElement, {
      borderWidth,
      borderColor
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleRemoveBackground}
        disabled={isRemoving}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
      >
        {isRemoving ? 'Removing...' : 'Remove Background'}
      </button>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max="20"
          value={borderWidth}
          onChange={(e) => setBorderWidth(Number(e.target.value))}
          className="w-20 px-2 py-1 border rounded"
          placeholder="Border"
        />
        
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="w-8 h-8 p-0 border rounded cursor-pointer"
        />

        <button
          onClick={handleBorderChange}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};