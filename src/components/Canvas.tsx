import React from 'react';
import { Rnd } from 'react-rnd';
import { useDesignStore } from '../store';
import { TextEditor } from './TextEditor';

export const Canvas = () => {
  const { elements, selectedElement, updateElement, setSelectedElement, canvasSize } = useDesignStore();
  const [editingText, setEditingText] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const padding = 32; // 2rem (p-8)
      const maxWidth = parent.clientWidth - padding * 2;
      const maxHeight = parent.clientHeight - padding * 2;
      
      const scaleX = maxWidth / canvasSize.width;
      const scaleY = maxHeight / canvasSize.height;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [canvasSize]);

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  const handleDoubleClick = (element: any) => {
    if (element.type === 'text') {
      setEditingText(element.id);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="canvas-container relative bg-white shadow-lg"
      style={{ 
        width: canvasSize.width,
        height: canvasSize.height,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        margin: 'auto'
      }}
    >
      {sortedElements.map((element) => (
        <Rnd
          key={element.id}
          position={{ x: element.x, y: element.y }}
          size={{ width: element.width, height: element.height }}
          onDragStop={(e, d) => {
            updateElement(element.id, { x: d.x, y: d.y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateElement(element.id, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              x: position.x,
              y: position.y,
            });
          }}
          className={`${selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedElement(element.id)}
          onDoubleClick={() => handleDoubleClick(element)}
          style={{ zIndex: element.zIndex }}
          dragHandleClassName="drag-handle"
        >
          {element.type === 'image' ? (
            <div
              className="w-full h-full drag-handle"
              style={{
                border: element.borderWidth ? `${element.borderWidth}px solid ${element.borderColor || '#000'}` : 'none'
              }}
            >
              <img
                src={element.content}
                alt=""
                className="w-full h-full object-cover"
                style={{ transform: `rotate(${element.rotation}deg)` }}
              />
            </div>
          ) : (
            editingText === element.id ? (
              <TextEditor
                initialText={element.content}
                onSave={(text) => {
                  updateElement(element.id, { content: text });
                  setEditingText(null);
                }}
                onCancel={() => setEditingText(null)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xl cursor-text drag-handle"
                style={{ transform: `rotate(${element.rotation}deg)` }}
              >
                {element.content}
              </div>
            )
          )}
        </Rnd>
      ))}
    </div>
  );
};