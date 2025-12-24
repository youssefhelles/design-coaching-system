
import { Step, Track, TimelineStep, Testimonial } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    phase: 'المرحلة الأولى',
    title: 'هندسة الأساس',
    description: 'تفكيك وإعادة بناء فهمك للتصميم. نركز هنا على القواعد الأكاديمية، سيكولوجية المستخدم، وأدوات التصميم المتقدمة لضمان أساس متين لا يهتز.',
    icon: 'architecture',
    iconColor: 'text-primary'
  },
  {
    id: 2,
    phase: 'المرحلة الثانية',
    title: 'محاكاة السوق',
    description: 'وداعاً للمشاريع الوهمية. ستعمل على مشاريع تحاكي طلبات السوق الحالية، تتعلم كيفية التعامل مع العملاء، إدارة التوقعات، وتسليم ملفات احترافية.',
    icon: 'science',
    iconColor: 'text-blue-500'
  },
  {
    id: 3,
    phase: 'المرحلة الثالثة',
    title: 'نظام الدخل',
    description: 'كيف تحول المهارة إلى مال. استراتيجيات التسعير، التفاوض، وبناء معرض أعمال يجذب العملاء ذوي الميزانيات العالية (High-Ticket Clients).',
    icon: 'monetization_on',
    iconColor: 'text-green-500'
  }
];

export const TOOLS = [
  {
    name: 'موقع كانفا',
    description: 'سوف نستخدمه في التصميم',
    icon: 'palette',
    color: 'from-blue-400 to-indigo-600',
    extra: ''
  },
  {
    name: 'موقع Image FX',
    description: 'سوف نستخدمه في توليد العناصر باستخدام الذكاء الاصطناعي',
    icon: 'auto_awesome',
    color: 'from-purple-500 to-pink-500',
    extra: ''
  },
  {
    name: 'موقع جيميناي',
    description: 'سوف نستخدمه في توليد الافكار بطرق احترافية',
    icon: 'auto_graph',
    color: 'from-blue-600 to-cyan-400',
    extra: 'سوف تتعلم كتابة اوامر احترافية'
  }
];

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'مسار "الدخل الحر" (Freelancing Focus)',
    goal: 'تريد المال والعمل مع العملاء.',
    description: 'سنركز 80% على "التصاميم التجارية" (السوشيال ميديا، الإعلانات)، وسأعلمك كيف تسعر، كيف تفاوض، وكيف تغلق الصفقة.',
    result: 'مصمم جاهز للسوق.',
    icon: 'payments',
    color: 'primary'
  },
  {
    id: 2,
    title: 'مسار "البرستيج المهني" (Professional Presentation)',
    goal: 'أنت مدرب، معلم، أو موظف وتريد عروضاً تقديمية تبهر جمهورك ومديرك.',
    description: 'سنركز على "سيكولوجية الألوان"، "تراتبية المعلومات"، وكيف تحول البيانات المملة إلى شرائح بصرية مدهشة.',
    result: 'عروض تقديمية تجعلهم يصورون الشاشة بهواتفهم.',
    icon: 'auto_graph',
    color: 'blue-500'
  },
  {
    id: 3,
    title: 'مسار "الهوية الرقمية" (Personal Branding)',
    goal: 'لديك مشروع خاص أو حساب صناعة محتوى وتريد تصاميم تشبهك.',
    description: 'سنبني "نظام قوالب" (Templates System) خاص بك يوفر وقتك، ونركز على توحيد الهوية البصرية.',
    result: 'براند قوي يرسخ في ذاكرة المتابع.',
    icon: 'fingerprint',
    color: 'green-500'
  }
];

export const TIMELINE: TimelineStep[] = [
  {
    id: 1,
    week: "الأسبوع الأول",
    detail: "2 ورش عمل (بناء القواعد البصرية).",
    icon: "design_services"
  },
  {
    id: 2,
    week: "الأسبوع الثاني",
    detail: "2 ورش عمل (التطبيق على مشاريع حقيقية).",
    icon: "auto_awesome_motion"
  },
  {
    id: 3,
    week: "الأسبوع الثالث",
    detail: "2 ورش عمل (استراتيجيات الدخل والإطلاق).",
    icon: "rocket_launch"
  }
];

export const FAQS = [
  {
    question: "هل سأتعلم التصميم عن طريق كانفا فقط ؟",
    answer: "سوف تتعلم التصميم باستخدام كانفا مع استخدام ادوات الذكاء الاصطناعي بحيث ترفع مستواك الى مستوى اخر!"
  },
  {
    question: "هل سوف اتعلم باستخدام الجوال التصميم ؟",
    answer: "تستطيع ان تتطبق جميع دروس الدورة الفردية باستخدام الجوال ولكن نفضل <strong class='font-black text-gray-900 dark:text-white'>ان يكون لديك لابتوب</strong> او حتى ايباد لتحقيق سلاسة في الشرح."
  },
  {
    question: "هل أحتاج لخبرة سابقة في التصميم? ",
    answer: "لا نهائياً. البرنامج مصمم ليأخذك من الصفر أو من مستوى الهواية إلى الاحتراف التجاري."
  },
  {
    question: "ما الفرق بين هذا البرنامج والكورسات المسجلة؟",
    answer: "الفرق هو 'التوجيه المباشر'. في الكورسات أنت تشاهد فقط، هنا نحن نعمل معاً على تصاميمك ونصحح أخطاءك لحظة بلحظة."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "سارة لاين",
    role: "مصممة وباحثة جمال",
    text: "خذيت دورات وايد من قبل، بس اللي صج لقيته مميز عندك إنك ما بخلت علي بالمعلومة.. حشيت مخي حشو بالمعلومات وعطيتني كل شيء بعكس الدورات اللي كانت تعطيني بالقطاره.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahLine",
    instagram: "https://www.instagram.com/sarah.line.kw/",
    audioUrl: "https://docs.google.com/uc?export=download&id=15IgxGFgGSB3fMS2qEo59XmInHaC2Wetr"
  },
  {
    name: "محمد خالد",
    role: "صانع محتوى",
    text: "نظام القوالب الذي بنيناه سوياً وفر علي ساعات من العمل الأسبوعي. هويتي البصرية أصبحت ثابتة واحترافية.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed"
  }
];

export const CHANGELOG = [
  {
    type: 'New',
    title: 'زيادة عدد ورش العمل',
    description: 'يمكن الآن للمشتركين الحصول على أكثر من 6 ورش عمل تدريبية حسب حاجتهم ومستوى تقدمهم لضمان أقصى استفادة.',
    date: 'ديسمبر 2025'
  },
  {
    type: 'Upcoming',
    title: 'تحديثات كثيرة قريباً',
    description: 'نعمل حالياً على تطوير مميزات جديدة لنظام المصمم المحترف ستنطلق تباعاً.',
    date: 'قريباً'
  }
];
