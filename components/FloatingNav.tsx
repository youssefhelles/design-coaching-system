
import React, { useState, useEffect } from 'react';

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // إظهار القائمة بعد تجاوز أول 300 بيكسل من الموقع لتقليل التشتيت عند الدخول
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }

      // تحديد القسم النشط لتغيير لون النقاط
      const sections = ['methodology-section', 'timeline-section', 'join-section'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 1.5) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
      {/* القائمة الدائرية المنبثقة */}
      <div className={`relative mb-3 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none translate-y-4'}`}>
        
        {/* أيقونة المنهجية */}
        <button 
          onClick={() => scrollToSection('methodology-section')}
          title="المنهجية"
          className={`absolute bottom-0 left-12 w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-transform active:scale-90 hover:scale-110 ${activeSection === 'methodology-section' ? 'text-primary ring-2 ring-primary/20' : 'text-gray-400'}`}
        >
          <span className="material-icons-round text-lg">layers</span>
        </button>

        {/* أيقونة الجدول الزمني */}
        <button 
          onClick={() => scrollToSection('timeline-section')}
          title="الجدول"
          className={`absolute -top-12 left-0 w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-transform active:scale-90 hover:scale-110 ${activeSection === 'timeline-section' ? 'text-primary ring-2 ring-primary/20' : 'text-gray-400'}`}
        >
          <span className="material-icons-round text-lg">timer</span>
        </button>

        {/* أيقونة الانضمام */}
        <button 
          onClick={() => scrollToSection('join-section')}
          title="انضم"
          className={`absolute bottom-0 -left-12 w-10 h-10 rounded-full bg-primary shadow-xl flex items-center justify-center text-white transition-transform active:scale-90 hover:scale-110 ${activeSection === 'join-section' ? 'ring-4 ring-primary/20' : ''}`}
        >
          <span className="material-icons-round text-lg">rocket_launch</span>
        </button>
      </div>

      {/* الزر الرئيسي (النقطة المركزية) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative ${isOpen ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 rotate-[135deg]' : 'bg-primary text-white scale-100 hover:scale-110'}`}
      >
        <span className="material-icons-round text-xl">
          {isOpen ? 'close' : 'navigation'}
        </span>
        
        {/* مؤشرات النقاط (Dots) */}
        {!isOpen && (
          <div className="absolute -top-1.5 flex gap-1">
            <div className={`w-1 h-1 rounded-full transition-colors ${activeSection === 'methodology-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`w-1 h-1 rounded-full transition-colors ${activeSection === 'timeline-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`w-1 h-1 rounded-full transition-colors ${activeSection === 'join-section' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingNav;
