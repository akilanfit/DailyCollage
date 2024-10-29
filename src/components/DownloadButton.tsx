import React from 'react';
import { Download } from 'lucide-react';
import { useDesignStore } from '../store';
import html2canvas from 'html2canvas';

export const DownloadButton = () => {
  const [downloading, setDownloading] = React.useState(false);
  const { canvasSize } = useDesignStore();

  const handleDownload = async () => {
    const canvas = document.querySelector('.canvas-container');
    if (!canvas) return;

    setDownloading(true);
    try {
      const scale = Math.max(canvasSize.width / canvas.clientWidth, canvasSize.height / canvas.clientHeight);
      
      const htmlCanvas = await html2canvas(canvas as HTMLElement, {
        scale: scale,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const link = document.createElement('a');
      link.download = `design-${Date.now()}.png`;
      link.href = htmlCanvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
    >
      <Download size={20} />
      {downloading ? 'Downloading...' : 'Download Design'}
    </button>
  );
};