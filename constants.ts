
import { Step, Track, TimelineStep } from './types';

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
