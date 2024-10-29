import React from 'react';
import { useDesignStore } from '../store';
import { CanvasSize } from '../types';

const PRESET_SIZES: CanvasSize[] = [
  { width: 1920, height: 1080, name: 'Full HD (1920x1080)' },
  { width: 1280, height: 720, name: 'HD (1280x720)' },
  { width: 1080, height: 1080, name: 'Square (1080x1080)' },
  { width: 1080, height: 1350, name: 'Instagram Post (1080x1350)' },
  { width: 1200, height: 628, name: 'Facebook Post (1200x628)' },
];

export const SizeSelector = () => {
  const { setCanvasSize, canvasSize } = useDesignStore();

  return (
    <select
      className="px-4 py-2 border rounded-lg"
      value={`${canvasSize.width}x${canvasSize.height}`}
      onChange={(e) => {
        const size = PRESET_SIZES.find(
          s => `${s.width}x${s.height}` === e.target.value
        );
        if (size) setCanvasSize(size);
      }}
    >
      {PRESET_SIZES.map((size) => (
        <option key={size.name} value={`${size.width}x${size.height}`}>
          {size.name}
        </option>
      ))}
    </select>
  );
};