import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function DropZone({ onFilesSelected }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.items) {
      const files = [];
      const queue = [];
      
      // Get all root entries
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry();
          if (entry) queue.push(entry);
        }
      }

      // Process the queue recursively
      while (queue.length > 0) {
        const entry = queue.shift();
        if (entry.isFile) {
          const file = await new Promise((resolve) => entry.file(resolve));
          files.push(file);
        } else if (entry.isDirectory) {
          const dirReader = entry.createReader();
          // Read all entries in the directory (readEntries might need to be called repeatedly if > 100 items, but for simple use cases one call is usually enough. For robust we loop).
          let allEntries = [];
          let readBatch = await new Promise((resolve) => dirReader.readEntries(resolve));
          while (readBatch.length > 0) {
            allEntries = allEntries.concat(readBatch);
            readBatch = await new Promise((resolve) => dirReader.readEntries(resolve));
          }
          queue.push(...allEntries);
        }
      }

      if (files.length > 0) {
        onFilesSelected(files);
      }
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleClick = (e) => {
    // If they clicked the explicit folder button, do nothing here (it handles itself)
    if (e.target.closest('#browseFolderBtn')) return;
    // Otherwise trigger file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div 
      className={`w-full h-full flex-1 border-2 border-dashed rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[130px] animate-[fadeInUp_0.8s_ease-out_0.4s] fill-mode-both ${
        isDragOver 
          ? 'border-accent-color bg-glass-bg scale-[1.02] shadow-[0_10px_30px_rgba(59,130,246,0.1)]' 
          : 'border-panel-border bg-glass-bg hover:border-glass-border-hover hover:bg-glass-bg-hover'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
        <UploadCloud size={40} className="text-accent-color mb-1" strokeWidth={1.5} />
        
        <p className="text-base font-semibold text-text-main mb-1">
          Drag & Drop your photos here
        </p>
        <p className="text-xs text-text-muted">
          or click to browse from your device
        </p>
        
        <div className="hidden md:flex gap-4 mt-2 pointer-events-auto">
          <label 
            htmlFor="fileInput"
            className="px-6 py-2.5 bg-glass-bg border border-glass-border rounded-xl font-semibold text-text-main transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-glass-border-hover hover:bg-glass-bg-hover cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            Browse Files
          </label>
        </div>
      </div>

      <input 
        id="fileInput"
        type="file" 
        ref={fileInputRef}
        multiple 
        accept="image/jpeg, image/png, image/webp" 
        className="hidden"
        onChange={handleFileChange} 
      />
    </div>
  );
}
