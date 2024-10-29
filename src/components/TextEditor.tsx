import React, { useEffect, useRef } from 'react';

interface TextEditorProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  initialText,
  onSave,
  onCancel,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = React.useState(initialText);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSave(text);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <textarea
      ref={inputRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => onSave(text)}
      className="w-full h-full p-2 text-xl resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-center"
      style={{ fontFamily: 'inherit' }}
    />
  );
};