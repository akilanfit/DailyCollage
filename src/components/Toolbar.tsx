import React from 'react';
import { useDesignStore } from '../store';
import { RotateCw, Trash2, Type, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { LayerControls } from './LayerControls';
import { ImageControls } from './ImageControls';

export const Toolbar = () => {
  const { addElement, selectedElement, updateElement, removeElement } = useDesignStore();
  
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        addElement({
          type: 'image',
          content: reader.result as string,
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          rotation: 0,
          zIndex: 1
        });
      };
      reader.readAsDataURL(file);
    });
  }, [addElement]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    noClick: true
  });

  const handleRotate = () => {
    if (selectedElement) {
      updateElement(selectedElement, {
        rotation: (prev => (prev?.rotation || 0) + 90)
      });
    }
  };

  const handleAddText = () => {
    addElement({
      type: 'text',
      content: 'Double click to edit',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      zIndex: 1
    });
  };

  return (
    <div {...getRootProps()} className="flex items-center gap-4">
      <input {...getInputProps()} />
      
      {isDragActive && (
        <div className="fixed inset-0 bg-blue-500/10 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            Drop image here
          </div>
        </div>
      )}

      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <ImageIcon size={20} />
        Add Image
      </button>

      <button
        onClick={handleAddText}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        <Type size={20} />
        Add Text
      </button>

      {selectedElement && (
        <>
          <div className="h-8 w-px bg-gray-200" />
          
          <button
            onClick={handleRotate}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            <RotateCw size={20} />
            Rotate
          </button>

          <button
            onClick={() => removeElement(selectedElement)}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            <Trash2 size={20} />
            Delete
          </button>

          <div className="h-8 w-px bg-gray-200" />
          
          <LayerControls />
          
          <div className="h-8 w-px bg-gray-200" />
          
          <ImageControls />
        </>
      )}
    </div>
  );
};