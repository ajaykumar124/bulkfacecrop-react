import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <header className="text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Face Crop AI</h1>
        <p className="text-text-muted text-[1.1rem]">Privacy Policy</p>
      </header>

      <section className="bg-panel-bg backdrop-blur-[16px] border border-panel-border rounded-3xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-text-main leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s] fill-mode-both">
        <h2 className="text-2xl font-semibold mb-4 text-text-main">1. 100% On-Device Processing</h2>
        <p className="mb-6 text-text-muted">
          Face Crop AI is designed from the ground up with your absolute privacy in mind. Every single operation—including file reading, face detection, image cropping, format mapping, and ZIP file generation—happens <strong>entirely on your own device</strong> (in your browser).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">2. Data Uploads and Storage</h2>
        <p className="mb-6 text-text-muted">
          We <strong>do not</strong> upload, transmit, or store any of your photos on any external servers. There is no backend database connected to this application. The AI models run directly on your hardware via WebAssembly and WebGL. Once you close this tab, all processed data is completely erased from your device's memory.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">3. Third-Party Services</h2>
        <p className="mb-6 text-text-muted">
          We utilize Google's MediaPipe framework for face detection. However, we load the MediaPipe WebAssembly binaries directly to your browser for local execution. No images are sent to Google's servers for processing.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">4. Cookies and Tracking</h2>
        <p className="mb-8 text-text-muted">
          This application does not use cookies for tracking, nor do we employ any analytics software to monitor your usage of the tool.
        </p>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex justify-center items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] w-auto mx-auto"
          >
            Return to Home
          </Link>
        </div>
      </section>
    </>
  );
}
