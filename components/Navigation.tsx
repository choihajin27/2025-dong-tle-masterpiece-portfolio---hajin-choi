
import React from 'react';
import { SlideId } from '../types';
import { SLIDES } from '../constants';

interface NavigationProps {
  currentSlide: SlideId;
  onNavigate: (id: SlideId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, onNavigate }) => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end group">
      {SLIDES.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => onNavigate(slide.id as SlideId)}
          className="flex items-center gap-3 group/item relative"
        >
          <span className={`text-[10px] font-bold tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${currentSlide === slide.id
            ? 'text-[#1a237e] opacity-100 translate-x-0'
            : 'text-[#5d4037] opacity-0 translate-x-4 group-hover/item:opacity-70 group-hover/item:translate-x-0'
            }`}>
            {slide.label.toUpperCase()}
          </span>
          <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${currentSlide === slide.id
            ? 'w-3 h-3'
            : 'w-2 h-2 group-hover/item:w-2.5 group-hover/item:h-2.5'
            }`}>
            <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${currentSlide === slide.id
              ? 'bg-[#1a237e] border-[#1a237e] shadow-lg shadow-[#1a237e]/30'
              : 'bg-transparent border-[#5d4037]/30 group-hover/item:bg-[#5d4037]/20 group-hover/item:border-[#5d4037]/60'
              }`} />
            {currentSlide === slide.id && (
              <div className="absolute inset-0 rounded-full bg-[#1a237e] animate-ping opacity-20" />
            )}
          </div>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
