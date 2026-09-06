import { useState, useEffect } from 'react';
import CompareModal from './CompareModal';
import ViewAllModal from './ViewAllModal';

export default function PreviewGrid({ processedFiles, isHidden }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  if (isHidden) return null;

  const previewLimit = 4;
  const displayedFiles = processedFiles.slice(0, previewLimit);
  const hiddenCount = processedFiles.length - previewLimit;

  return (
    <div className="w-full animate-[fadeInUp_0.8s_ease-out_0.2s] fill-mode-both flex flex-col gap-4">
      <h3 className="text-xl font-bold text-text-main mb-2 border-b border-[rgba(0,0,0,0.05)] pb-4 flex items-center justify-between">
        <span>Processed Results</span>
        <span className="text-sm font-medium text-text-muted bg-[rgba(0,0,0,0.05)] px-3 py-1 rounded-full">
          Showing {displayedFiles.length} of {processedFiles.length}
        </span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {displayedFiles.map((file, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedFile(file)}
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
      
      {hiddenCount > 0 && (
        <button 
          onClick={() => setIsViewAllOpen(true)}
          className="mt-4 w-full md:w-auto self-center bg-glass-bg border border-glass-border hover:bg-glass-bg-hover hover:border-glass-border-hover text-accent-color font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          View all {processedFiles.length} photos
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
        </button>
      )}

      {selectedFile && (
        <CompareModal 
          isOpen={true} 
          onClose={() => setSelectedFile(null)} 
          originalBlob={selectedFile.originalBlob} 
          newBlob={selectedFile.blob} 
          fileName={selectedFile.name} 
        />
      )}

      <ViewAllModal 
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        processedFiles={processedFiles}
        onSelectFile={setSelectedFile}
      />
    </div>
  );
}
