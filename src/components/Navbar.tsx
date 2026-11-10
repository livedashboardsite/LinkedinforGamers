import React from 'react';
import { 
  Shield, 
  Gamepad2, 
  Briefcase, 
  Users, 
  Crosshair, 
  Volume2, 
  VolumeX, 
  Search, 
  Bell, 
  Sparkles, 
  Sun, 
  Moon,
  Bot
} from 'lucide-react';
import type { UserProfile, NotificationItem } from '../types';
import { sounds } from '../utils/audio';

interface NavbarProps {
  currentTab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims';
  setCurrentTab: (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
  profile: UserProfile;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenEditModal: () => void;
  onNavigateToLanding: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  notifications: NotificationItem[];
  isNotifOpen: boolean;
  setIsNotifOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAI: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  profile,
  soundEnabled,
  setSoundEnabled,
  onOpenEditModal,
  onNavigateToLanding,
  theme,
  onToggleTheme,
  notifications,
  isNotifOpen,
  setIsNotifOpen,
  onOpenAI,
  onOpenCommandPalette
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const handleNav = (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => {
    sounds.playClick();
    setCurrentTab(tab);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => handleNav('plaza')} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <Shield className="brand-icon-shield" />
            <Crosshair className="brand-icon-crosshair" />
          </div>
          <div className="brand-text">
            <span className="brand-title">NEXUS<span className="brand-highlight">//</span>NET</span>
            <span className="brand-subtitle">THE GAMER PASSPORT</span>
          </div>
        </div>

        {/* Global Search / Command Palette Trigger */}
        <div 
          className="nav-search-container"
          onClick={() => {
            sounds.playClick();
            onOpenCommandPalette();
          }}
          title="Open Command Palette (⌘K)"
        >
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search players, rosters, studios, UE5 devs... (⌘K)"
            className="nav-search-input"
            readOnly
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Main Desktop Navigation Tabs */}
        <nav className="nav-links desktop-only-nav">
          <button
            className={`nav-item ${currentTab === 'plaza' ? 'active' : ''}`}
            onClick={() => handleNav('plaza')}
            onMouseEnter={() => sounds.playHover()}
          >
            <Gamepad2 size={18} />
            <span>The Plaza</span>
            {currentTab === 'plaza' && <div className="nav-glow-indicator" />}
          </button>

          <button
            className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
            onMouseEnter={() => sounds.playHover()}
          >
            <Sparkles size={18} />
            <span>Character Sheet</span>
            {currentTab === 'profile' && <div className="nav-glow-indicator" />}
          </button>

          <button
            className={`nav-item ${currentTab === 'jobs' ? 'active' : ''}`}
            onClick={() => handleNav('jobs')}
            onMouseEnter={() => sounds.playHover()}
          >
            <Briefcase size={18} />
            <span>LFG & Careers</span>
            <span className="nav-badge-pill">14 New</span>
            {currentTab === 'jobs' && <div className="nav-glow-indicator" />}
          </button>

          <button
            className={`nav-item ${currentTab === 'guilds' ? 'active' : ''}`}
            onClick={() => handleNav('guilds')}
            onMouseEnter={() => sounds.playHover()}
          >
            <Users size={18} />
            <span>Guilds & Orgs</span>
            {currentTab === 'guilds' && <div className="nav-glow-indicator" />}
          </button>

          <button
            className={`nav-item ${currentTab === 'scrims' ? 'active' : ''}`}
            onClick={() => handleNav('scrims')}
            onMouseEnter={() => sounds.playHover()}
          >
            <Crosshair size={18} />
            <span>Scrim Radar</span>
            <span className="nav-ping-dot" />
            {currentTab === 'scrims' && <div className="nav-glow-indicator" />}
          </button>
        </nav>

        {/* Right Tools & User Quick Chip */}
        <div className="nav-actions">
          {/* AI Scout Button */}
          <button 
            className="nav-ai-scout-btn"
            onClick={() => {
              sounds.playSuccess();
              onOpenAI();
            }}
            title="Launch Nexus AI Scout & Co-Pilot"
          >
            <Bot size={16} className="text-emerald" />
            <span className="ai-btn-text">AI Scout</span>
          </button>

          {/* SaaS Overview Switcher */}
          <button 
            className="btn-saas-switch"
            onClick={onNavigateToLanding}
            title="Return to Public SaaS Landing Page"
          >
            <span>Overview</span>
          </button>

          {/* Sound FX Toggle */}
          <button 
            className="sound-toggle-btn" 
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Interface SFX' : 'Enable Cyber SFX'}
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button 
            className="theme-toggle-btn" 
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notifications Toggle */}
          <button 
            className={`icon-btn notif-btn ${isNotifOpen ? 'active' : ''}`} 
            onClick={() => {
              sounds.playClick();
              setIsNotifOpen(prev => !prev);
            }}
            title="Scout Notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
          </button>

          {/* User Quick Profile Chip */}
          <div 
            className="user-quick-chip"
            onClick={() => {
              handleNav('profile');
              onOpenEditModal();
            }}
            title="Click to view & edit character sheet"
          >
            <div className="avatar-wrapper-small">
              <img src={profile.avatarUrl} alt={profile.gamertag} className="user-avatar-small" />
              <div className="level-badge-small">{profile.level}</div>
            </div>
            <div className="user-info-quick">
              <span className="user-gamertag-quick">{profile.gamertag}</span>
              <span className="user-status-quick">LFR // RADIANT</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
