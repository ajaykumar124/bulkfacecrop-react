import { Trash2, Download } from 'lucide-react';

export default function ActionBar({ onClear, onDownload, isHidden }) {
  if (isHidden) return null;

  return (
    <div className="flex gap-4 justify-center animate-fade-in-up">
      <button 
        onClick={onClear}
        className="px-6 py-3 bg-glass-bg border border-glass-border rounded-xl font-semibold text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-glass-border-hover hover:bg-glass-bg-hover flex items-center justify-center gap-2 flex-1 md:flex-none"
      >
        <Trash2 size={20} />
        Clear
      </button>
      <button 
        onClick={onDownload}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 flex-[2] md:flex-none"
      >
        <Download size={20} />
        Download ZIP
      </button>
    </div>
  );
}
