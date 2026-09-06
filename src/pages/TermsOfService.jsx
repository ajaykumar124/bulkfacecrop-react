import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <>
      <header className="text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Face Crop AI</h1>
        <p className="text-text-muted text-[1.1rem]">Terms of Service</p>
      </header>

      <section className="bg-panel-bg backdrop-blur-[16px] border border-panel-border rounded-3xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-text-main leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s] fill-mode-both">
        <h2 className="text-2xl font-semibold mb-4 text-text-main">1. Acceptance of Terms</h2>
        <p className="mb-6 text-text-muted">
          By accessing and using Face Crop AI, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">2. Description of Service</h2>
        <p className="mb-6 text-text-muted">
          Face Crop AI is a free, client-side web application that utilizes artificial intelligence to detect faces in images and crop them to standard specifications. The service is provided "as is" and is intended for personal and professional use.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">3. User Responsibilities</h2>
        <p className="mb-6 text-text-muted">
          You are solely responsible for the images you process using this application. You agree not to use the service for any unlawful purposes or to process images that violate any copyright or privacy laws.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-text-main">4. Disclaimer of Warranties</h2>
        <p className="mb-8 text-text-muted">
          The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or perfection of the AI-driven cropping process. You should always review processed images to ensure they meet your specific requirements.
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
