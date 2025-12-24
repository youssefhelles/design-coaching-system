
import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './components/ThemeToggle';
import FloatingNav from './components/FloatingNav';
import { STEPS, TRACKS, TIMELINE, FAQS, TESTIMONIALS, TOOLS } from './constants';

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Audio play blocked", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-3 bg-primary/5 dark:bg-primary/10 p-3 rounded-2xl border border-primary/10">
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <button 
        onClick={togglePlay}
        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="material-icons-round">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>
      <div className="flex-1">
        <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">استمع إلى رأي العميلة</div>
        <div className="flex gap-0.5 items-end h-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div 
              key={i} 
              className={`w-1 bg-primary rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1 opacity-30'}`}
              style={{ 
                height: isPlaying ? `${Math.random() * 100}%` : '4px',
                animationDelay: `${i * 0.1}s` 
              }}
            ></div>
          ))}
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

    const elements = document.querySelectorAll('.reveal-on-scroll');
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

  const getMailData = (option: string, userEmail: string) => {
    const subject = `🚀 طلب تسجيل جديد: ${option}`;
    const body = `مرحباً أ. يوسف،\n\nأرغب في التواصل معك بخصوص الخيار الذي اخترته: [${option}]\n\nبريدي الإلكتروني للمتابعة: ${userEmail}\n\nشكراً لك، وبانتظار ردك.`;
    return { subject, body };
  };

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
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in-up group cursor-pointer" onClick={openWhatsApp}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">نظام المصمم المحترف !</span>
          </div>
          <ThemeToggle />
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
              توقف عن جمع <span className="text-primary italic">'الكورسات'</span>
              <br className="hidden sm:block" /> 
              <span className="sm:inline"> وابدأ بجمع </span>
              <span className="gradient-text italic">'العملاء'</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-10 max-w-2xl mx-auto px-2 animate-fade-in-up [animation-delay:0.4s]">
              سد الفجوة بين معرفتك التقنية بـ Canva وبين تحقيق هدفك المالي والمهني خلال 21 يوماً فقط من التدريب العملي المكثف.
            </p>

            <button 
              onClick={openWhatsApp}
              className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto animate-fade-in-up [animation-delay:0.6s]"
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
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">سوف ندمج قوة التصميم مع ذكاء الآلة لنتائج مبهرة.</p>
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

        {/* Methodology Section */}
        <section id="methodology-section" className="relative mb-28 scroll-mt-24 reveal-on-scroll">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">منهجية المصمم المتكامل</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">ثلاث مراحل مدروسة بعناية لإيصالك للاحتراف الحقيقي في سوق العمل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Call to Action under Testimonials */}
          <div className="mt-16 text-center reveal-on-scroll">
            <button 
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-6 py-4 md:px-12 md:py-5 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95 group mx-auto"
            >
              <span className="material-icons-round text-2xl md:text-3xl group-hover:rotate-12 transition-transform">whatsapp</span>
              <span className="text-sm md:text-lg">تواصل معي مباشرة عبر واتساب</span>
            </button>
            <p className="mt-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold">لدي سؤال أو استفسار سريع؟ أنا هنا لمساعدتك.</p>
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
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none text-white placeholder:text-white/60 backdrop-blur-sm transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap active:scale-95 hover:scale-105"
                  >
                    متابعة التسجيل
                  </button>
                </form>
              </div>
            )}

            {joinStep === 'options' && (
              <div className="animate-reveal">
                <h2 className="text-2xl md:text-4xl font-black mb-4">ما هو هدفك من التواصل؟</h2>
                <p className="text-sm opacity-90 mb-10">بمجرد الاختيار، سنقوم بفتح صفحة بريد جديدة معبأة بالبيانات</p>
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
                
                <button 
                  type="button"
                  onClick={() => setJoinStep('input')}
                  className="mt-6 text-white/60 hover:text-white text-xs underline"
                >
                  العودة لتعديل البريد
                </button>
              </div>
            )}

            {joinStep === 'success' && (
              <div className="animate-reveal py-10">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-xl animate-bounce">
                  <span className="material-icons-round text-5xl">auto_awesome</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-4">تم تجهيز الطلب بنجاح!</h2>
                <div className="bg-white/10 p-6 rounded-3xl border border-white/20 backdrop-blur-md mb-8">
                  <p className="text-base md:text-lg mb-4">
                    لقد قمنا بفتح نافذة بريد جديدة لإرسال طلبك بخصوص: <b>{selectedOption}</b>
                  </p>
                  
                  <div className="bg-white/20 p-4 rounded-2xl text-sm mb-6 border border-white/20 text-right">
                    <p className="font-bold mb-2">يرجى التحقق من تبويبات المتصفح أو تطبيق البريد لديك:</p>
                    <ul className="list-disc list-inside space-y-1 opacity-90 inline-block text-right">
                      <li>تم تعبئة المستلم: {RECIPIENT}</li>
                      <li>تم تعبئة العنوان والمحتوى تلقائياً</li>
                      <li>فقط اضغط على "إرسال" (Send) لتصلنا رسالتك</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs opacity-70">إذا لم يفتح التبويب تلقائياً، اضغط على الزر أدناه:</p>
                    <a 
                      href={`mailto:${RECIPIENT}?subject=${encodeURIComponent(`🚀 طلب تسجيل جديد: ${selectedOption}`)}&body=${encodeURIComponent(`مرحباً أ. يوسف،\n\nأرغب في التواصل معك بخصوص الخيار الذي اخترته: [${selectedOption}]\n\nبريدي الإلكتروني للمتابعة: ${email}\n\nشكراً لك.`)}`}
                      className="inline-block bg-white text-primary px-8 py-3 rounded-xl text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      📩 إرسال الطلب يدوياً الآن
                    </a>
                  </div>
                </div>
                
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

            {joinStep !== 'success' && (
              <>
                <div className="flex items-center gap-4 py-8 opacity-60 reveal-on-scroll">
                  <div className="h-px bg-white flex-1"></div>
                  <span className="text-xs font-bold">طرق تواصل أخرى</span>
                  <div className="h-px bg-white flex-1"></div>
                </div>

                {/* Fixed WhatsApp Button in Join Section */}
                <button 
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full bg-white text-primary font-black px-6 py-4 md:px-8 md:py-5 rounded-2xl hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-3 md:gap-4 active:scale-95 reveal-on-scroll group overflow-hidden relative"
                >
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-12 transition-transform shrink-0">
                    <span className="material-icons-round text-2xl">whatsapp</span>
                  </div>
                  <span className="text-base md:text-lg">تواصل مباشر عبر واتساب</span>
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 py-12 px-6 reveal-on-scroll">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={openWhatsApp}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">نظام المصمم المحترف</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
             <button onClick={openWhatsApp} className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform">تويتر (X)</button>
             <button onClick={openWhatsApp} className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform">إنستغرام</button>
             <button onClick={openWhatsApp} className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform">لينكدإن</button>
             <button onClick={openWhatsApp} className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform">تيك توك</button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 جميع الحقوق محفوظة للنظام التدريبي.</p>
        </div>
      </footer>

      <FloatingNav />
    </div>
  );
};

export default App;
