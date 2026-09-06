import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isA4 = location.pathname === '/a4-fit';

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-panel-bg backdrop-blur-xl border-b border-panel-border shadow-sm">
      <div className="max-w-[1000px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/facecrop_square.jpg" 
            alt="Face Crop AI Logo" 
            className="h-9 w-9 rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-300 object-contain"
          />
          <span className="font-bold text-lg text-text-main tracking-tight">Face Crop</span>
        </Link>

        {/* Links Section */}
        <div className="flex items-center gap-1 sm:gap-4 bg-glass-bg p-1 rounded-full border border-glass-border">
          <Link 
            to="/" 
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${isHome ? 'bg-card-bg text-blue-600 shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-glass-bg-hover'}`}
          >
            AI Cropper
          </Link>
          <Link 
            to="/a4-fit" 
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${isA4 ? 'bg-card-bg text-purple-600 shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-glass-bg-hover'}`}
          >
            A4 Fit
          </Link>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-text-muted hover:text-text-main hover:bg-glass-bg-hover transition-all duration-300 ml-4"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          )}
        </button>

      </div>
    </nav>
  );
}
