import { useEffect } from 'react';

export default function CompareModal({ isOpen, onClose, originalBlob, newBlob, fileName }) {
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

  if (!isOpen || !originalBlob || !newBlob) return null;

  const origUrl = URL.createObjectURL(originalBlob);
  const newUrl = URL.createObjectURL(newBlob);
  const origSize = (originalBlob.size / 1024).toFixed(1);
  const newSize = (newBlob.size / 1024).toFixed(1);
  const sizeReduction = ((1 - (newBlob.size / originalBlob.size)) * 100).toFixed(0);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-card-bg rounded-[1.5rem] shadow-2xl border border-glass-border overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-glass-border">
          <div>
            <h2 className="text-xl font-bold text-text-main">Before & After</h2>
            <p className="text-sm text-text-muted mt-1 truncate max-w-[250px] sm:max-w-md">{fileName}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-text-muted hover:text-text-main hover:bg-glass-bg-hover transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Original */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Original File</span>
                <span className="bg-red-500/10 text-red-500 font-bold px-2 py-1 rounded text-xs">{origSize} KB</span>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-glass-border bg-black/5 flex items-center justify-center">
                <img src={origUrl} alt="Original" className="w-full h-auto max-h-[45vh] object-contain block" />
              </div>
            </div>

            {/* Processed */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-accent-color uppercase tracking-wider text-xs">Processed Result</span>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500/10 text-green-500 font-bold px-2 py-1 rounded text-xs">{newSize} KB</span>
                </div>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-accent-color/30 bg-accent-color/5 flex items-center justify-center">
                <img src={newUrl} alt="Processed" className="w-full h-auto max-h-[45vh] object-contain block shadow-[0_0_20px_rgba(59,130,246,0.1)]" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Stats */}
        {sizeReduction > 0 && (
          <div className="p-4 bg-green-500/5 border-t border-green-500/10 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
            File size reduced by {sizeReduction}%!
          </div>
        )}

      </div>
    </div>
  );
}
