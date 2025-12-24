
import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';
import FloatingNav from './components/FloatingNav';
import Changelog from './components/Changelog';
import { STEPS, TRACKS, TIMELINE, FAQS, TESTIMONIALS, TOOLS } from './constants';

const getMailData = (option: string, email: string) => {
  return {
    subject: `النظام: ${option}`,
    body: `مرحباً يوسف،\n\nأنا مهتم ببرنامج "النظام" التدريبي.\n\nالخيار المختار: ${option}\nبريدي الإلكتروني: ${email}\n\nأتطلع للتواصل معك ومعرفة التفاصيل.`
  };
};

const FAQItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  return (
    <div 
      className={`bg-white dark:bg-surface-dark rounded-2xl border transition-all duration-500 overflow-hidden ${
        isOpen 
          ? 'border-primary shadow-xl shadow-primary/5 scale-[1.01]' 
          : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full p-6 flex justify-between items-center text-right outline-none group"
      >
        <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-50 dark:bg-gray-900 text-primary'}`}>
          <span className="material-icons-round text-xl">expand_more</span>
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p 
            className="px-6 pb-6 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </div>
      </div>
    </div>
  );
};

const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setHasError(false);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        }).catch(err => {
          console.error("Audio play failed:", err);
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <div className={`mt-4 flex flex-col gap-2 p-3 rounded-2xl border transition-colors ${hasError ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-primary/5 dark:bg-primary/10 border-primary/10'}`}>
      <div className="flex items-center gap-3">
        <audio 
          ref={audioRef} 
          src={src} 
          preload="none"
          onEnded={() => setIsPlaying(false)} 
          onPlaying={() => { setIsLoading(false); setIsPlaying(true); }}
          onError={() => { setHasError(true); setIsLoading(false); }}
        />
        <button 
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-50 ${hasError ? 'bg-gray-400 text-white' : 'bg-primary text-white shadow-primary/20 hover:scale-105'}`}
        >
          {isLoading ? (
            <span className="material-icons-round animate-spin">sync</span>
          ) : (
            <span className="material-icons-round">{isPlaying ? 'pause' : 'play_arrow'}</span>
          )}
        </button>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">
            {isLoading ? 'جاري التحميل...' : hasError ? 'عذراً، تعذر التشغيل المباشر' : 'استمع إلى رأي العميلة'}
          </div>
          {!hasError ? (
            <div className="flex gap-0.5 items-end h-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-primary rounded-full transition-all duration-300 ${isPlaying && !isLoading ? 'animate-pulse' : 'h-1 opacity-30'}`}
                  style={{ 
                    height: isPlaying && !isLoading ? `${20 + Math.random() * 80}%` : '4px',
                    animationDelay: `${i * 0.1}s` 
                  }}
                ></div>
              ))}
            </div>
          ) : (
            <div className="text-[10px] text-red-500 font-medium">يرجى استخدام الرابط المباشر أدناه</div>
          )}
        </div>
      </div>
    </div>
  );
};

const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joinStep, setJoinStep] = useState<'input' | 'options' | 'success'>('input');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useRevealOnScroll();

  const RECIPIENT = "ye444sf@gmail.com";
  const WHATSAPP_URL = 'https://wa.me/972597713882';
  const INSTAGRAM_URL = 'https://www.instagram.com/youssefaymanc/';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/youssefhelles/';

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setJoinStep('options');
      const section = document.getElementById('join-section');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsSubmitting(true);

    const { subject, body } = getMailData(option, email);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      const gmailWindow = window.open(gmailUrl, '_blank');
      if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }
    }

    setTimeout(() => {
      setJoinStep('success');
      setIsSubmitting(false);
    }, 800);
  };

  const resetForm = () => {
    setJoinStep('input');
    setEmail('');
    setSelectedOption('');
  };

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300 font-sans text-right" dir="rtl">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in-up group cursor-pointer" onClick={openWhatsApp}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">نظام المصمم المحترف !</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Changelog />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-20 pb-20 px-6">
        {/* Hero Section */}
        <section id="hero-section" className="relative min-h-[55vh] flex flex-col items-center justify-center text-center gap-4 mb-20 px-4">
          <div className="absolute top-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-50 animate-float"></div>
          <div className="absolute bottom-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none opacity-50 animate-float [animation-delay:2s]"></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold mb-6 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              برنامج تدريب فردي مباشر (1:1)
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] font-black mb-6 text-gray-900 dark:text-white animate-fade-in-up [animation-delay:0.2s]">
              توقف عن جمع <span className="text-primary">الكورسات</span><br className="sm:hidden" /> وابدأ بجمع <span className="gradient-text">العملاء</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-10 max-w-2xl mx-auto px-2 animate-fade-in-up [animation-delay:0.4s]">
              سد الفجوة بين معرفتك التقنية بـ Canva وبين تحقيق هدفك المالي والمهني خلال 21 يوماً فقط من التدريب العملي المكثف.
            </p>

            <button 
              onClick={openWhatsApp}
              className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-black px-6 sm:px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto animate-fade-in-up [animation-delay:0.6s]"
            >
              <span className="material-icons-round text-xl animate-bounce">rocket_launch</span>
              تواصل معي واتساب
            </button>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools-section" className="mb-28 reveal-on-scroll scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">الأدوات التي سنحترفها سوياً</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">سوف ندمج قوة التصميم مع <span className="font-bold text-primary">الذكاء الاصطناعي</span> لنتائج مبهرة.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TOOLS.map((tool, i) => (
              <div key={i} className="flex flex-col items-center text-center group hover-lift p-4 rounded-3xl transition-all duration-500">
                <div className={`w-24 h-24 rounded-full bg-white dark:bg-surface-dark shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(53,158,255,0.15)] mb-6 flex items-center justify-center transition-transform group-hover:rotate-[10deg] duration-500 border border-gray-100 dark:border-gray-800`}>
                  <span className={`material-icons-round text-4xl bg-gradient-to-tr ${tool.color} bg-clip-text text-transparent`}>{tool.icon}</span>
                </div>
                <h3 className="text-xl font-black mb-2 text-gray-900 dark:text-white">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px] mb-2 leading-relaxed">{tool.description}</p>
                {tool.extra && (
                  <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{tool.extra}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* وصف يوسف - Mentor Section */}
        <section id="mentor-section" className="mb-32 overflow-hidden scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="w-full md:w-1/2 flex justify-center reveal-left">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-6 group-hover:rotate-3 transition-transform duration-500 -z-10"></div>
                  <div className="absolute inset-0 bg-secondary/10 rounded-[2.5rem] -rotate-6 group-hover:-rotate-3 transition-transform duration-500 -z-10"></div>
                  
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] border-4 border-white dark:border-surface-dark shadow-2xl overflow-hidden ring-4 ring-secondary/20 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                    <div className="flex flex-col items-center text-gray-300 dark:text-slate-700">
                      <span className="material-icons-round text-8xl md:text-9xl">account_circle</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 text-right reveal-right">
                <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-black mb-4">
                  مؤسس البرنامج
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">يوسف أيمن</h2>
                
                <p className="text-lg md:text-xl font-bold text-primary leading-tight mb-8 relative">
                  <span className="material-icons-round absolute -right-8 -top-4 opacity-10 text-6xl pointer-events-none">format_quote</span>
                  "أنا لا أعلمك كيف تحرك 'الماوس'.. أنا أعلمك كيف تحرك 'السوق'."
                </p>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  <p>مدرب محترف ساهمت في تغيير حياة أكثر من 350 شخص وساعدتهم لإحتراف التصميم عبر منصة كانفا وحصولهم على مصدر دخل من الإنترنت.</p>
                  <p>خبرتي امتدت لسنوات فقدمت خدمات في التصميم والتسويق لمختلف العملاء من شركات وعلامات تجارية كبرى.</p>
                  <p className="font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">مهمتي واحدة: أن أجعل مهاراتك تدفع فواتيرك.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology-section" className="relative mb-28 scroll-mt-24 reveal-on-scroll">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">منهجية المصمم المتكامل</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">ثلاث مراحل مدروسة بعناية لإيصالك للاحتراف الحقيقي في سوق العمل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover-lift group"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className={`material-icons-round ${step.iconColor} text-2xl group-hover:text-white`}>{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal-on-scroll">
             <button 
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-black px-6 sm:px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group"
            >
              <span className="material-icons-round text-2xl group-hover:rotate-12 transition-transform">whatsapp</span>
              <span className="text-base">احجز مقعدك الآن</span>
            </button>
          </div>
        </section>

        {/* Tracks Section */}
        <section id="tracks-section" className="mb-28 reveal-on-scroll">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">مسارات مخصصة لأهدافك</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">نحن لا نبيع منهجاً ثابتاً، بل نصمم المسار حسب وجهتك وطموحك الشخصي.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {TRACKS.map((track, idx) => (
              <div 
                key={track.id} 
                className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full hover-lift transition-all"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <span className={`material-icons-round text-${track.color} text-4xl mb-6`}>{track.icon}</span>
                <h3 className="font-black text-xl mb-3">{track.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow leading-relaxed">{track.description}</p>
                <div className={`mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 text-base font-bold text-${track.color}`}>
                  النتيجة النهائية: {track.result}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-28 reveal-on-scroll">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">ماذا قالوا عن البرنامج؟</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">قصص نجاح حقيقية لمصممين بدأوا من الصفر.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover-lift relative group flex flex-col"
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-icons-round">format_quote</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed text-sm md:text-base flex-grow">
                  "{testimonial.text}"
                </p>

                {testimonial.audioUrl && (
                  <AudioPlayer src={testimonial.audioUrl} />
                )}

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6 mt-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors"
                    />
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-[10px] md:text-xs text-primary font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {testimonial.instagram && (
                    <a 
                      href={testimonial.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-lg shadow-pink-500/20 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <i className="material-icons-round text-xl">camera_alt</i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal-on-scroll">
            <button 
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-5 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95 group mx-auto max-w-[90%] sm:max-w-max"
            >
              <span className="material-icons-round text-2xl sm:text-3xl transition-transform group-hover:rotate-12">whatsapp</span>
              <span className="text-sm sm:text-lg">تواصل معي مباشر عبر الواتساب</span>
            </button>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline-section" className="mb-28 scroll-mt-24 reveal-on-scroll">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">الخطة الزمنية (21 يوماً)</h2>
            <div className="relative border-r-2 border-dashed border-gray-200 dark:border-gray-800 mr-4 space-y-10">
              {TIMELINE.map((step, idx) => (
                <div key={step.id} className="relative pr-10 group" style={{ transitionDelay: `${idx * 200}ms` }}>
                  <div className="absolute -right-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10 transition-transform group-hover:scale-150 duration-500"></div>
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all group-hover:border-primary group-hover:shadow-lg">
                    <h3 className="font-black text-primary text-base mb-2">{step.week}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-28 max-w-3xl mx-auto scroll-mt-24 reveal-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">الأسئلة الشائعة</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">كل ما تريد معرفته قبل الانضمام لرحلة الاحتراف.</p>
          </div>
          <div className="space-y-5">
            {FAQS.map((faq, i) => (
              <FAQItem 
                key={i} 
                faq={faq} 
                isOpen={openFaqIndex === i} 
                onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} 
              />
            ))}
          </div>
        </section>

        {/* Join Section */}
        <section id="join-section" className="bg-primary text-white rounded-[3rem] p-10 md:p-20 text-center shadow-2xl shadow-primary/20 scroll-mt-24 relative overflow-hidden mb-20 reveal-on-scroll">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50 animate-pulse-soft"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            
            {joinStep === 'input' && (
              <div className="animate-reveal">
                <h2 className="text-3xl md:text-5xl font-black mb-6">جاهز لبناء نظامك الخاص؟</h2>
                <p className="text-sm md:text-lg opacity-90 mb-10 max-w-lg mx-auto">المقاعد محدودة جداً لأن كل طالب يحصل على توجيه فردي كامل. سجل اهتمامك الآن.</p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none text-white placeholder:text-white/60 backdrop-blur-sm transition-all text-right"
                    dir="rtl"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap active:scale-95 hover:scale-105"
                  >
                    متابعة التسجيل
                  </button>
                </form>

                {/* Socials Contact Section */}
                <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                   <p className="text-xs font-bold opacity-70 uppercase tracking-widest">طرق أخرى للتواصل السريع</p>
                   <div className="flex items-center gap-6">
                      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95" title="LinkedIn">
                        <span className="material-icons-round">verified</span>
                      </a>
                      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95" title="Instagram">
                         <span className="material-icons-round">camera_alt</span>
                      </a>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95" title="WhatsApp">
                         <span className="material-icons-round">chat</span>
                      </a>
                   </div>
                </div>
              </div>
            )}

            {joinStep === 'options' && (
              <div className="animate-reveal">
                <h2 className="text-2xl md:text-4xl font-black mb-4">ما هو هدفك من التواصل؟</h2>
                <div className="grid grid-cols-1 gap-3 text-right">
                  {[
                    "ارغب في الانضمام للبرنامج",
                    "ارغب في حجز مقعد للفوج القادم",
                    "ارغب في الاستفسار عن تفاصيل البرنامج"
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleOptionSelect(option)}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-2xl text-right flex items-center justify-between group transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <span className="font-bold text-lg">{option}</span>
                      <span className="material-icons-round group-hover:translate-x-[-8px] transition-transform text-2xl">
                        {isSubmitting && selectedOption === option ? 'sync' : 'open_in_new'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {joinStep === 'success' && (
              <div className="animate-reveal py-10">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-xl animate-bounce">
                  <span className="material-icons-round text-5xl">auto_awesome</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-4">تم تجهيز الطلب بنجاح!</h2>
                <button 
                  type="button"
                  onClick={resetForm}
                  className="bg-white/20 text-white font-black px-10 py-5 rounded-2xl hover:bg-white/30 transition-all active:scale-95 flex items-center gap-3 mx-auto border border-white/20"
                >
                  <span className="material-icons-round">close</span>
                  إغلاق والعودة للرئيسية
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 py-12 px-6 reveal-on-scroll">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={openWhatsApp}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">نظام المصمم المحترف</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
             <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 جميع الحقوق محفوظة للنظام التدريبي.</p>
             <div className="flex items-center gap-4">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <span className="material-icons-round">verified</span>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                   <span className="material-icons-round">camera_alt</span>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                   <span className="material-icons-round">chat</span>
                </a>
             </div>
          </div>
        </div>
      </footer>

      <FloatingNav />
    </div>
  );
};

export default App;
