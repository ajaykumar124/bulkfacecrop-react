import { useEffect } from 'react';

export default function ViewAllModal({ isOpen, onClose, processedFiles, onSelectFile }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-panel-bg rounded-[1.5rem] shadow-2xl border border-glass-border overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-glass-border shrink-0">
          <div>
            <h2 className="text-xl font-bold text-text-main">All Processed Photos</h2>
            <p className="text-sm text-text-muted mt-1">{processedFiles.length} images</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-text-muted hover:text-text-main hover:bg-glass-bg-hover transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {processedFiles.map((file, idx) => (
              <div 
                key={idx} 
                onClick={() => onSelectFile(file)}
                className="bg-card-bg rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-glass-border transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group relative cursor-pointer"
              >
                <img 
                  src={URL.createObjectURL(file.blob)} 
                  alt={file.name} 
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                  <span className="text-white text-xs font-medium px-2 truncate w-11/12 text-center mb-1">
                    {file.name}
                  </span>
                  {file.sizeKb && (
                    <span className="text-blue-300 text-xs font-bold px-2 py-0.5 bg-black/40 rounded mb-2">
                      {file.sizeKb} KB
                    </span>
                  )}
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full backdrop-blur flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                    Compare
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
