export default function StatusArea({ progress, statusText, eta, isHidden }) {
  if (isHidden) return null;
  
  return (
    <div className="bg-panel-bg backdrop-blur-[16px] border border-panel-border p-6 md:p-8 rounded-[1.5rem] text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] animate-fade-in-up">
      <div className="flex justify-between items-end mb-3 px-1">
        <span className="text-text-main font-semibold text-sm">Processing Status</span>
        {eta !== undefined && progress < 100 && (
          <span className="text-accent-color font-bold text-xs bg-accent-color/10 px-2.5 py-1 rounded-md">
            ~{eta}s remaining
          </span>
        )}
      </div>
      <div className="w-full h-2.5 bg-glass-border rounded-full overflow-hidden mb-4 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-text-muted font-medium m-0">{statusText}</p>
    </div>
  );
}
