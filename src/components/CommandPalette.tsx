import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Gamepad2, 
  Sparkles, 
  Briefcase, 
  Users, 
  Crosshair, 
  Bot, 
  Sun, 
  Moon, 
  Volume2, 
  ArrowRight
} from 'lucide-react';
import type { JobOpportunity } from '../types';
import { sounds } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
  onOpenAI: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  jobs: JobOpportunity[];
  onSelectJob: (job: JobOpportunity) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenAI,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  jobs,
  onSelectJob
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build items list
  const baseActions = [
    {
      id: 'tab-plaza',
      category: 'Navigation',
      title: 'The Plaza',
      desc: 'Community feed, milestones & game devlogs',
      icon: <Gamepad2 size={16} />,
      action: () => { onSelectTab('plaza'); onClose(); }
    },
    {
      id: 'tab-profile',
      category: 'Navigation',
      title: 'Character Sheet',
      desc: 'Your gamer passport, stats polygon & clips',
      icon: <Sparkles size={16} />,
      action: () => { onSelectTab('profile'); onClose(); }
    },
    {
      id: 'tab-jobs',
      category: 'Navigation',
      title: 'LFG & Careers',
      desc: 'Esports trials, AAA studios & dev bounties',
      icon: <Briefcase size={16} />,
      action: () => { onSelectTab('jobs'); onClose(); }
    },
    {
      id: 'tab-guilds',
      category: 'Navigation',
      title: 'Guilds & Orgs',
      desc: 'Sentinels, CyberForge, Mythic & varsity teams',
      icon: <Users size={16} />,
      action: () => { onSelectTab('guilds'); onClose(); }
    },
    {
      id: 'tab-scrims',
      category: 'Navigation',
      title: 'Scrim Radar',
      desc: 'Low-latency 5v5 scrim matchmaking',
      icon: <Crosshair size={16} />,
      action: () => { onSelectTab('scrims'); onClose(); }
    },
    {
      id: 'action-ai',
      category: 'AI Assistant',
      title: 'Nexus AI Scout & Pitch Generator',
      desc: 'Audit your character sheet & draft job pitches',
      icon: <Bot size={16} className="text-emerald" />,
      action: () => { onOpenAI(); onClose(); }
    },
    {
      id: 'action-theme',
      category: 'System',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      desc: 'Toggle application color theme',
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      action: () => { onToggleTheme(); onClose(); }
    },
    {
      id: 'action-sound',
      category: 'System',
      title: `${soundEnabled ? 'Mute' : 'Enable'} Interface Audio`,
      desc: 'Toggle Web Audio synthesizer SFX',
      icon: <Volume2 size={16} />,
      action: () => { onToggleSound(); onClose(); }
    }
  ];

  // Add matching jobs
  const jobActions = jobs.map(j => ({
    id: `job-${j.id}`,
    category: 'Opportunities',
    title: `${j.organization} — ${j.title}`,
    desc: `${j.salary} • ${j.region}`,
    icon: <Briefcase size={16} className="text-cyan" />,
    action: () => {
      onSelectTab('jobs');
      onSelectJob(j);
      onClose();
    }
  }));

  const allActions = [...baseActions, ...jobActions];

  const filtered = allActions.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || 
           item.desc.toLowerCase().includes(q) || 
           item.category.toLowerCase().includes(q);
  });

  const handleSelect = (action: () => void) => {
    sounds.playClick();
    action();
  };

  return (
    <div className="modal-backdrop cmd-palette-backdrop" onClick={onClose}>
      <div 
        className="glass-card cmd-palette-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-search-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            type="text"
            placeholder="Type a command, role, or feature (e.g. 'AI Scout', 'Sentinels', 'Dark Mode')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
            className="cmd-input"
          />
          <button className="cmd-esc-btn" onClick={onClose}>ESC</button>
        </div>

        <div className="cmd-results-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              <span>No commands or items matching "{query}"</span>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item.action)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-icon">{item.icon}</div>
                <div className="cmd-item-details">
                  <div className="cmd-item-title-row">
                    <span className="cmd-item-title">{item.title}</span>
                    <span className="cmd-item-category">{item.category}</span>
                  </div>
                  <span className="cmd-item-desc">{item.desc}</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer-bar">
          <div className="cmd-keys-hint">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to dismiss</span>
          </div>
          <span className="cmd-brand-tag">NEXUS COMMAND // ⌘K</span>
        </div>
      </div>
    </div>
  );
};
