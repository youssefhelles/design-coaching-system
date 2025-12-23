
import React, { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import FloatingNav from './components/FloatingNav';
import { STEPS, TRACKS, TIMELINE, FAQS, TESTIMONIALS } from './constants';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsJoined(true);
      setTimeout(() => setIsJoined(false), 3000);
      setEmail('');
    }
  };

  const scrollToJoin = () => {
    const joinSection = document.getElementById('join-section');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">نظام المصمم المحترف !</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-20 pb-20 px-6">
        {/* Hero Section */}
        <section className="relative min-h-[45vh] flex flex-col items-center justify-center text-center gap-4 mb-20 px-4">
          <div className="absolute top-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-50"></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              برنامج تدريب فردي مباشر (1:1)
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] font-black mb-6 text-gray-900 dark:text-white">
              توقف عن جمع <span className="text-primary italic">'الكورسات'</span>
              <br className="hidden sm:block" /> 
              <span className="sm:inline"> وابدأ بجمع </span>
              <span className="gradient-text italic">'العملاء'</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-10 max-w-2xl mx-auto px-2">
              سد الفجوة بين معرفتك التقنية بـ Canva وبين تحقيق هدفك المالي والمهني خلال 21 يوماً فقط من التدريب العملي المكثف.
            </p>

            <button 
              onClick={scrollToJoin}
              className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <span className="material-icons-round text-xl">rocket_launch</span>
              احجز مقعدك الآن
            </button>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology-section" className="relative mb-28 scroll-mt-24">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">منهجية المصمم المتكامل</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">ثلاث مراحل مدروسة بعناية لإيصالك للاحتراف الحقيقي في سوق العمل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.id} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <span className={`material-icons-round ${step.iconColor} text-2xl`}>{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Suffering Section */}
        <section id="suffering-section" className="mb-28 bg-white dark:bg-surface-dark rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-10 leading-snug">لماذا مازلت تعاني رغم كثرة الشروحات المجانية؟</h2>
            <div className="grid gap-5 text-right mb-10">
              {[
                "تعرف الأدوات (Tools) لكنك لا تملك العقلية (Mindset) التي تجعل التصميم يباع.",
                "تشعر أن السوق مزدحم بالهواة بينما هو فارغ تماماً من المحترفين الحقيقيين.",
                "لا تملك خارطة طريق واضحة تربط بين المهارة التقنية وبين تحقيق دخل مستدام."
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50/50 dark:bg-gray-900/30 p-5 rounded-2xl border-r-4 border-red-500 transition-transform hover:translate-x-[-4px]">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">{point}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={scrollToJoin}
              className="bg-primary/10 hover:bg-primary/20 text-primary text-sm md:text-base font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-2 mx-auto border border-primary/20"
            >
              <span className="material-icons-round">bolt</span>
              احجز مقعدك الآن وتخلص من المعاناة
            </button>
          </div>
        </section>

        {/* Tracks Section */}
        <section id="tracks-section" className="mb-28">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">مسارات مخصصة لأهدافك</h2>
            <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">نحن لا نبيع منهجاً ثابتاً، بل نصمم المسار حسب وجهتك وطموحك الشخصي.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {TRACKS.map((track) => (
              <div key={track.id} className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full hover:shadow-2xl transition-all">
                <span className={`material-icons-round text-${track.color} text-4xl mb-6`}>{track.icon}</span>
                <h3 className="font-black text-xl mb-3">{track.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow leading-relaxed">{track.description}</p>
                <div className={`mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 text-base font-bold text-${track.color}`}>
                  النتيجة النهائية: {track.result}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollToJoin}
            className="bg-primary hover:bg-primary/90 text-white text-sm md:text-base font-black px-10 py-5 rounded-[2rem] shadow-xl shadow-primary/20 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span className="material-icons-round">stars</span>
            ابدأ مسار نجاحك الآن
          </button>
        </section>

        {/* Testimonials Section */}
        <section className="mb-28">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-12">قصص نجاح حقيقية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 flex gap-4">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full bg-gray-100" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-primary mb-3">{t.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline-section" className="mb-28 scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">الخطة الزمنية (21 يوماً)</h2>
            <div className="relative border-r-2 border-dashed border-gray-200 dark:border-gray-800 mr-4 space-y-10">
              {TIMELINE.map((step) => (
                <div key={step.id} className="relative pr-10 group">
                  <div className="absolute -right-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10 transition-transform group-hover:scale-125"></div>
                  <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all group-hover:shadow-md">
                    <h3 className="font-black text-primary text-base mb-2">{step.week}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-28 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-10">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-4 transition-all hover:shadow-sm">
                <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-sm md:text-base">
                  {faq.question}
                  <span className="material-icons-round text-primary transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Join Section */}
        <section id="join-section" className="bg-primary text-white rounded-[3rem] p-10 md:p-20 text-center shadow-2xl shadow-primary/20 scroll-mt-24 relative overflow-hidden mb-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">جاهز لبناء نظامك الخاص؟</h2>
            <p className="text-sm md:text-lg opacity-90 mb-10 max-w-lg mx-auto">المقاعد محدودة جداً لأن كل طالب يحصل على توجيه فردي كامل. سجل اهتمامك الآن.</p>
            <form onSubmit={handleJoin} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              <button 
                type="submit"
                className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap active:scale-95"
              >
                {isJoined ? 'تم تسجيل اهتمامك!' : 'أريد الانضمام للفوج'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">layers</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">نظام المصمم المحترف</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">تويتر (X)</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">إنستغرام</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">لينكدإن</a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 جميع الحقوق محفوظة للنظام التدريبي.</p>
        </div>
      </footer>

      {/* Floating Navigation (Available on all devices) */}
      <FloatingNav />
    </div>
  );
};

export default App;
