
import React, { useState, useRef, useEffect } from 'react';

interface Viewer360Props {
  exteriorImage: string;
  interiorImage: string;
  carName: string;
}

const Viewer360: React.FC<Viewer360Props> = ({ exteriorImage, interiorImage, carName }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    if (viewMode === 'exterior') {
      setRotation(prev => (prev + deltaX / (5 / zoom)) % 360);
    } else {
      // Panning logic for interior
      setPan(prev => ({
        x: Math.min(Math.max(prev.x + deltaX / zoom, -200 * zoom), 200 * zoom),
        y: Math.min(Math.max(prev.y + deltaY / zoom, -100 * zoom), 100 * zoom)
      }));
    }
    
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Reset states on mode toggle
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  }, [viewMode]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
      {/* Viewer Canvas */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ perspective: '1200px' }}
      >
        <div 
          className="relative w-full h-full transition-transform duration-500 ease-out flex items-center justify-center"
          style={{ 
            transform: `
              scale(${zoom}) 
              translate(${pan.x}px, ${pan.y}px) 
              ${viewMode === 'exterior' ? `rotateY(${rotation}deg)` : ''}
            `,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <img 
            src={viewMode === 'exterior' ? exteriorImage : interiorImage} 
            alt={carName}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              viewMode === 'interior' ? 'brightness-110 scale-110' : 'object-contain px-12'
            }`}
          />
          
          {/* Virtual Reflection Floor */}
          {viewMode === 'exterior' && (
            <div className="absolute -bottom-1/4 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-60 blur-3xl pointer-events-none"></div>
          )}
        </div>
      </div>

      {/* Control Overlay: Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={() => setViewMode('exterior')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              viewMode === 'exterior' 
                ? 'bg-white text-black border-white shadow-lg' 
                : 'bg-black/40 text-white/70 border-white/10 backdrop-blur-md hover:bg-black/60'
            }`}
          >
            EXTERIOR
          </button>
          <button 
            onClick={() => setViewMode('interior')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              viewMode === 'interior' 
                ? 'bg-white text-black border-white shadow-lg' 
                : 'bg-black/40 text-white/70 border-white/10 backdrop-blur-md hover:bg-black/60'
            }`}
          >
            INTERIOR
          </button>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest text-white uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          3D Interactive Studio
        </div>
      </div>

      {/* Control Overlay: Bottom Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
        <div className="space-y-4 w-48">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-white/60 uppercase">Zoom Level</span>
              <span className="text-[10px] font-bold text-white">{zoom.toFixed(1)}x</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
            {viewMode === 'exterior' ? 'Drag to Rotate' : 'Drag to Pan'}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setZoom(1); setPan({x:0, y:0}); setRotation(0); }}
              className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-blue-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent"></div>
    </div>
  );
};

export default Viewer360;
