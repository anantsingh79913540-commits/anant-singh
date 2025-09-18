
import React, { useState, useEffect } from 'react';
import Confetti from './components/Confetti';
import Slideshow from './components/Slideshow';
import { SHRUTI_IMAGES } from './constants';

const InitialSurprise: React.FC = () => (
  <div className="text-white text-center flex flex-col items-center justify-center h-full">
    <h1 className="text-5xl md:text-7xl font-light opacity-0 animate-fade-in-slow">
      Happy Birthday
    </h1>
    <h2 className="text-8xl md:text-9xl font-sacramento text-pink-300 mt-4 opacity-0 animate-fade-in-fast" style={{ textShadow: '0 0 15px rgba(244, 114, 182, 0.8)' }}>
      Shruti
    </h2>
  </div>
);

const App: React.FC = () => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlideshow(true);
    }, 4500); // Wait for the initial animation to complete

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'A Birthday Surprise for Shruti!',
      text: 'Check out this special birthday website made for Shruti!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Couldn't share using Web Share API:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000); // Hide after 2s
      } catch (err) {
        console.error('Failed to copy URL:', err);
        alert('Failed to copy link. Please copy the URL from the address bar.');
      }
    }
  };


  return (
    <main className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white">
      <Confetti />
      <div className="absolute inset-0 z-10">
        {!showSlideshow ? (
          <InitialSurprise />
        ) : (
          <div className="w-full h-full animate-scale-in">
            <Slideshow images={SHRUTI_IMAGES} />
          </div>
        )}
      </div>
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-xs z-20">
        With love and best wishes!
      </div>

      <button
        onClick={handleShare}
        className="absolute bottom-4 right-4 z-30 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
        aria-label="Share this page"
        title="Share this page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.044.583.06h.007a2.25 2.25 0 012.018 2.018v.007c.016.193.034.388.06.583m0 0a2.25 2.25 0 002.186 0m0 0c.026-.195.044-.39.06-.583h.007a2.25 2.25 0 00-2.018-2.018v-.007c-.193-.016-.388-.034-.583-.06m0 0l-4.137-2.348a2.25 2.25 0 00-2.186 0l-4.137 2.348m12.523 0l4.137 2.348a2.25 2.25 0 010 2.186l-4.137 2.348m0-4.534L7.217 10.907" />
        </svg>
      </button>

      {showCopiedMessage && (
        <div 
          className="absolute bottom-16 right-4 bg-green-500 text-white text-sm py-1 px-3 rounded-lg z-30 shadow-lg"
          role="alert"
          aria-live="polite"
        >
          Link Copied!
        </div>
      )}
    </main>
  );
};

export default App;
