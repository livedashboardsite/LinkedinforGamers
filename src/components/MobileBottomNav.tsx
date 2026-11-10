import React from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Briefcase, 
  Crosshair,
  Bot
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface MobileBottomNavProps {
  currentTab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims';
  setCurrentTab: (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
  onOpenAI: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAI
}) => {
  const handleTabClick = (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => {
    sounds.playClick();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button 
        className={`mobile-nav-btn ${currentTab === 'plaza' ? 'active' : ''}`}
        onClick={() => handleTabClick('plaza')}
      >
        <Gamepad2 size={20} />
        <span>Plaza</span>
      </button>

      <button 
        className={`mobile-nav-btn ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleTabClick('profile')}
      >
        <Sparkles size={20} />
        <span>Profile</span>
      </button>

      {/* Floating Center AI Button */}
      <button 
        className="mobile-nav-ai-btn"
        onClick={() => {
          sounds.playSuccess();
          onOpenAI();
        }}
        title="Open AI Scout"
      >
        <Bot size={22} className="text-emerald" />
        <span className="mobile-ai-lbl">AI Scout</span>
      </button>

      <button 
        className={`mobile-nav-btn ${currentTab === 'jobs' ? 'active' : ''}`}
        onClick={() => handleTabClick('jobs')}
      >
        <Briefcase size={20} />
        <span>Careers</span>
      </button>

      <button 
        className={`mobile-nav-btn ${currentTab === 'scrims' ? 'active' : ''}`}
        onClick={() => handleTabClick('scrims')}
      >
        <Crosshair size={20} />
        <span>Scrims</span>
      </button>
    </nav>
  );
};
