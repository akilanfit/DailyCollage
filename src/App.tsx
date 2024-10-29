import React from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { SizeSelector } from './components/SizeSelector';
import { DownloadButton } from './components/DownloadButton';
import { Palette } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900">Design Editor</h1>
          </div>
          <div className="flex items-center gap-4">
            <SizeSelector />
            <DownloadButton />
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Toolbar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div className="max-w-full max-h-full">
          <Canvas />
        </div>
      </main>
    </div>
  );
}

export default App;