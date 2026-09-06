import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import A4Fit from './pages/A4Fit';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <>
      <NavBar />
      
      {/* Absolute floating shapes like in vanilla version */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-400/20 rounded-full blur-3xl animate-[pulse_4s_infinite]"></div>
      </div>
      
      <main className="w-full max-w-[1000px] px-4 md:px-8 pt-20 z-10 flex flex-col gap-4 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a4-fit" element={<A4Fit />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      
      <Footer />
    </>
  );
}

export default App;
