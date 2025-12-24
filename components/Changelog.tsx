
import React, { useState, useRef, useEffect } from 'react';
import { CHANGELOG } from '../constants';

const Changelog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
      >
        <span className="material-icons-round">campaign</span>
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-bg-dark animate-pulse"></span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-72 sm:w-80 bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] overflow-hidden animate-reveal origin-top-left">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
            <span className="font-bold text-sm text-gray-900 dark:text-white">آخر التحديثات</span>
            <span className="text-[10px] text-gray-400 font-medium">سجل التغييرات</span>
          </div>
          
          <div className="max-h-[350px] overflow-y-auto p-2 space-y-2">
            {CHANGELOG.map((item, i) => (
              <div key={i} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-xl transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                    item.type === 'New' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    item.type === 'Fix' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2 text-[9px] text-gray-300 dark:text-gray-600 text-left">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-100 dark:border-gray-800">
            <button className="text-[10px] font-bold text-primary hover:underline">مشاهدة السجل الكامل</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Changelog;
