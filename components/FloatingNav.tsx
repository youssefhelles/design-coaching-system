
import React, { useState, useEffect } from 'react';

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const WHATSAPP_URL = 'https://wa.me/972597713882';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }

      const sections = ['methodology-section', 'timeline-section', 'join-section'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -150 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, '_blank');
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-center">
      <div className={`relative mb-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 pointer-events-none translate-y-8'}`}>
        
        <button 
          onClick={() => scrollToSection('methodology-section')}
          title="المنهجية"
          className={`absolute bottom-0 left-12 w-12 h-12 rounded-full bg-white dark:bg-surface-dark shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-all active:scale-90 hover:scale-110 ${activeSection === 'methodology-section' ? 'text-primary ring-2 ring-primary/20' : 'text-gray-400'}`}
        >
          <span className="material-icons-round text-xl">layers</span>
        </button>

        <button 
          onClick={() => scrollToSection('timeline-section')}
          title="الجدول"
          className={`absolute -top-12 left-0 w-12 h-12 rounded-full bg-white dark:bg-surface-dark shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-all active:scale-90 hover:scale-110 ${activeSection === 'timeline-section' ? 'text-primary ring-2 ring-primary/20' : 'text-gray-400'}`}
        >
          <span className="material-icons-round text-xl">timer</span>
        </button>

        <button 
          onClick={openWhatsApp}
          title="تواصل واتساب"
          className={`absolute bottom-0 -left-12 w-12 h-12 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center text-white transition-all active:scale-90 hover:scale-110 ring-4 ring-green-500/10 animate-pulse`}
        >
          <span className="material-icons-round text-xl">chat</span>
        </button>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 relative ${isOpen ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 rotate-[135deg]' : 'bg-primary text-white scale-100 hover:scale-105 active:scale-95 animate-fade-in-up'}`}
      >
        <span className="material-icons-round text-2xl">
          {isOpen ? 'close' : 'navigation'}
        </span>
        
        {!isOpen && (
          <div className="absolute -top-2 flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeSection === 'methodology-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeSection === 'timeline-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeSection === 'join-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingNav;
