export default function SettingsBar({ 
  format, setFormat, 
  padding, setPadding,
  mode, setMode,
  targetKb, setTargetKb 
}) {
  return (
    <div className="flex flex-col gap-5 animate-[fadeInUp_0.8s_ease-out_0.2s] fill-mode-both w-full h-full bg-glass-bg rounded-2xl p-4 md:p-5 border border-glass-border">
      
      <div className="border-b border-glass-border pb-3 mb-1">
        <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-color"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Configuration
        </h2>
      </div>
      
      {/* Mode Selection - Always Visible */}
      <div className="flex-1 flex flex-col gap-2 relative">
        <label htmlFor="modeSelect" className="font-semibold text-[0.95rem] text-text-main">Processing Mode</label>
        <div className="relative">
          <select 
            id="modeSelect" 
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full appearance-none bg-glass-bg border border-glass-border rounded-xl px-4 py-2.5 text-text-main text-base outline-none cursor-pointer transition-all duration-300 hover:border-glass-border-hover focus:border-accent-color focus:ring-2 focus:ring-[rgba(59,130,246,0.2)]"
          >
            <option value="crop">Crop Only</option>
            <option value="compress">Compress Only</option>
            <option value="both">Crop & Compress</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Format Selection - Hidden in Compress Only mode */}
      {mode !== 'compress' && (
        <div className="flex-1 flex flex-col gap-2 relative">
          <label htmlFor="formatSelect" className="font-semibold text-[0.95rem] text-text-main">Crop Format</label>
          <div className="relative">
            <select 
              id="formatSelect" 
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full appearance-none bg-glass-bg border border-glass-border rounded-xl px-4 py-2.5 text-text-main text-base outline-none cursor-pointer transition-all duration-300 hover:border-glass-border-hover focus:border-accent-color focus:ring-2 focus:ring-[rgba(59,130,246,0.2)]"
            >
              <option value="0.7777">Indian / Euro Passport (3.5x4.5 cm)</option>
              <option value="1.0">US Passport / Square (1:1)</option>
              <option value="0.7142">Canadian Passport (50x70 mm)</option>
              <option value="0.6666">Standard Print (4x6 / 2:3)</option>
              <option value="0.7143">Portrait Print (5x7 / 5:7)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      )}

      {mode !== 'compress' && (
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="paddingRange" className="font-semibold text-[0.95rem] text-text-main flex items-center justify-between">
            <span>Face Padding</span>
            <span className="font-bold text-accent-color bg-accent-color/10 px-2 py-0.5 rounded-md text-xs">{padding}%</span>
          </label>
          <div className="flex items-center gap-4 mt-2">
            <input 
              type="range" 
              id="paddingRange" 
              min="20" 
              max="60" 
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="flex-1 h-2 appearance-none rounded-full outline-none cursor-pointer transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-color [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(59,130,246,0.5)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110"
              style={{
                background: `linear-gradient(to right, #3b82f6 ${((padding - 20) / (60 - 20)) * 100}%, var(--glass-border) ${((padding - 20) / (60 - 20)) * 100}%)`
              }}
            />
          </div>
        </div>
      )}

      {/* Target KB Input - Hidden in Crop Only mode */}
      {mode !== 'crop' && (
        <div className="flex-1 flex flex-col gap-2 relative">
          <label htmlFor="targetKbInput" className="font-semibold text-[0.95rem] text-text-main">
            Target Max Size (KB)
          </label>
          <div className="relative mt-2">
            <input 
              type="number" 
              id="targetKbInput" 
              value={targetKb}
              onChange={(e) => setTargetKb(Number(e.target.value))}
              min="10"
              max="500"
              className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-2.5 text-text-main text-base outline-none transition-all duration-300 hover:border-glass-border-hover focus:border-accent-color focus:ring-2 focus:ring-[rgba(59,130,246,0.2)]"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted font-medium text-sm">
              KB
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
