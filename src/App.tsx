import React, { useState, useEffect } from 'react';
import { SaaSLandingPage } from './components/SaaSLandingPage';
import { Navbar } from './components/Navbar';
import { ThePlaza } from './components/ThePlaza';
import { CharacterSheet } from './components/CharacterSheet';
import { LFGJobBoard } from './components/LFGJobBoard';
import { ScrimRadar } from './components/ScrimRadar';
import { GuildsDirectory } from './components/GuildsDirectory';
import { ApplyModal } from './components/ApplyModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ClipModal } from './components/ClipModal';
import { AIModal } from './components/AIModal';
import { CommandPalette } from './components/CommandPalette';
import { NotificationsDropdown } from './components/NotificationsDropdown';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

import { 
  initialProfile, 
  initialPosts, 
  initialJobs, 
  initialGuilds,
  initialNotifications
} from './mockData';

import type { 
  UserProfile, 
  Post, 
  JobOpportunity, 
  ClipItem,
  NotificationItem
} from './types';
import { sounds } from './utils/audio';

export const App: React.FC = () => {
  // Theme: Always defaults to 'dark' for the cyberpunk esports aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_theme_v3');
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // storage disabled
      }
    }
    return 'dark'; // Always default to Cyberpunk Night (#0C0F0A)
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('nexus_theme_v3', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    sounds.playClick();
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Sound enable state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_sound');
        return saved !== 'false';
      } catch {
        return true;
      }
    }
    return true;
  });

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    try {
      localStorage.setItem('nexus_sound', String(next));
    } catch {
      // ignore
    }
    if (next) sounds.playClick();
  };

  // View Mode: 'landing' or 'app'
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims'>('profile');
  
  // Persistent State: Profile with schema reconciliation
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_profile_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return {
              ...initialProfile,
              ...parsed,
              radarStats: Array.isArray(parsed.radarStats) && parsed.radarStats.length > 0 ? parsed.radarStats : initialProfile.radarStats,
              verifiedAccounts: Array.isArray(parsed.verifiedAccounts) && parsed.verifiedAccounts.length > 0 ? parsed.verifiedAccounts : initialProfile.verifiedAccounts,
              commendations: Array.isArray(parsed.commendations) && parsed.commendations.length > 0 ? parsed.commendations : initialProfile.commendations,
              clips: Array.isArray(parsed.clips) && parsed.clips.length > 0 ? parsed.clips : initialProfile.clips,
              rosterHistory: Array.isArray(parsed.rosterHistory) && parsed.rosterHistory.length > 0 ? parsed.rosterHistory : initialProfile.rosterHistory,
              hardware: Array.isArray(parsed.hardware) && parsed.hardware.length > 0 ? parsed.hardware : initialProfile.hardware
            };
          }
        }
      } catch (err) {
        console.warn('Reconciled profile state:', err);
      }
    }
    return initialProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_profile_v3', JSON.stringify(profile));
    } catch {
      // quota or private browsing
    }
  }, [profile]);

  // Persistent State: Posts with schema reconciliation
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_posts_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((p, idx) => ({
              ...initialPosts[idx % initialPosts.length],
              ...p,
              reactions: {
                gg: p.reactions?.gg ?? 0,
                clutch: p.reactions?.clutch ?? 0,
                vouched: p.reactions?.vouched ?? 0,
                brain: p.reactions?.brain ?? 0,
                ...(p.reactions || {})
              },
              tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ['#NexusVerified'],
              comments: Array.isArray(p.comments) ? p.comments : []
            }));
          }
        }
      } catch (err) {
        console.warn('Reconciled posts state:', err);
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_posts_v3', JSON.stringify(posts));
    } catch {
      // quota
    }
  }, [posts]);

  // Persistent State: Jobs with schema reconciliation
  const [jobs, setJobs] = useState<JobOpportunity[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_jobs_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.warn('Reconciled jobs state:', err);
      }
    }
    return initialJobs;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_jobs_v3', JSON.stringify(jobs));
    } catch {
      // quota
    }
  }, [jobs]);

  // Persistent State: Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_notifications_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (err) {
        console.warn('Reconciled notifications state:', err);
      }
    }
    return initialNotifications;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_notifications_v3', JSON.stringify(notifications));
    } catch {
      // quota
    }
  }, [notifications]);

  // Modals state
  const [applyingJob, setApplyingJob] = useState<JobOpportunity | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeClip, setActiveClip] = useState<ClipItem | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Command Palette global keyboard trigger (⌘K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Handlers
  const handleLaunchApp = (initialTab?: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => {
    if (initialTab) {
      setCurrentTab(initialTab);
    }
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleReaction = (postId: string, reactionType: 'gg' | 'clutch' | 'vouched' | 'brain') => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const isAlreadySelected = p.userReaction === reactionType;
      const newReaction = isAlreadySelected ? undefined : reactionType;
      
      const newReactions = { ...p.reactions };
      if (isAlreadySelected) {
        newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
      } else {
        if (p.userReaction) {
          newReactions[p.userReaction] = Math.max(0, newReactions[p.userReaction] - 1);
        }
        newReactions[reactionType] = newReactions[reactionType] + 1;
      }

      return {
        ...p,
        userReaction: newReaction,
        reactions: newReactions
      };
    }));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const newComment = {
        id: `c_${Date.now()}`,
        author: {
          name: profile.realName,
          handle: profile.handle,
          avatar: profile.avatarUrl,
          rankBadge: profile?.verifiedAccounts?.[0]?.badge || 'Radiant #142'
        },
        content: commentText,
        timeAgo: 'Just now',
        upvotes: 1,
        userUpvoted: true
      };
      const comments = p.comments || [];
      return {
        ...p,
        commentsCount: (p.commentsCount || comments.length) + 1,
        comments: [newComment, ...comments]
      };
    }));
  };

  const handleUpdateStatus = (newStatus: UserProfile['status']) => {
    setProfile(prev => ({ ...prev, status: newStatus }));
  };

  const handleVouchCommendation = (commendId: string) => {
    sounds.playSuccess();
    setProfile(prev => ({
      ...prev,
      commendations: prev.commendations.map(c => {
        if (c.id === commendId) {
          return {
            ...c,
            count: c.count + 1,
            userVouched: true
          };
        }
        return c;
      })
    }));
  };

  const handleStatChange = (index: number, newValue: number) => {
    setProfile(prev => {
      const updated = [...prev.radarStats];
      updated[index] = { ...updated[index], value: newValue };
      return { ...prev, radarStats: updated };
    });
  };

  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedData }));
  };

  const handleApplySuccess = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          applied: true,
          applicantsCount: j.applicantsCount + 1
        };
      }
      return j;
    }));

    // Add notification
    const appliedJob = jobs.find(j => j.id === jobId);
    if (appliedJob) {
      setNotifications(prev => [
        {
          id: `notif_${Date.now()}`,
          type: 'job',
          title: `Application Confirmed: ${appliedJob.organization}`,
          description: `Your verified gamer passport was sent for ${appliedJob.title}.`,
          timeAgo: 'Just now',
          read: false,
          actionTab: 'jobs'
        },
        ...prev
      ]);
    }
  };

  const handleToggleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { ...j, saved: !j.saved };
      }
      return j;
    }));
  };

  const handleOpenAIWithJob = (_job: JobOpportunity) => {
    setIsAIOpen(true);
  };

  const handleApplyPitch = (jobId: string, _pitchText: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (targetJob) {
      setApplyingJob(targetJob);
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setIsNotifOpen(false);
    if (notif.actionTab) {
      setCurrentTab(notif.actionTab);
    }
  };

  // If in Landing Page mode, render the SaaS website
  if (viewMode === 'landing') {
    return (
      <SaaSLandingPage 
        onLaunchApp={handleLaunchApp} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // Otherwise, render the Product Model UI
  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profile={profile}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenEditModal={() => setIsEditProfileOpen(true)}
        onNavigateToLanding={() => setViewMode('landing')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        notifications={notifications}
        isNotifOpen={isNotifOpen}
        setIsNotifOpen={setIsNotifOpen}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenCommandPalette={() => setIsCmdOpen(true)}
      />

      {/* Notifications Dropdown */}
      <NotificationsDropdown
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onClearAll={handleClearNotifications}
        onSelectNotification={handleSelectNotification}
      />

      {/* Main Container */}
      <main className="main-content-area">
        <ErrorBoundary fallbackTitle="MODULE RENDER RESTORED">
          {currentTab === 'plaza' && (
            <ThePlaza
              posts={posts}
              profile={profile}
              onAddPost={handleAddPost}
              onReaction={handleReaction}
              onAddComment={handleAddComment}
              onSelectTab={setCurrentTab}
              onOpenAI={() => setIsAIOpen(true)}
            />
          )}

          {currentTab === 'profile' && (
            <CharacterSheet
              profile={profile}
              onUpdateStatus={handleUpdateStatus}
              onVouchCommendation={handleVouchCommendation}
              onOpenEditModal={() => setIsEditProfileOpen(true)}
              onSelectClip={(clip) => setActiveClip(clip)}
              onStatChange={handleStatChange}
              onOpenAI={() => setIsAIOpen(true)}
            />
          )}

          {currentTab === 'jobs' && (
            <LFGJobBoard
              jobs={jobs}
              onOpenApplyModal={(job) => setApplyingJob(job)}
              onToggleSaveJob={handleToggleSaveJob}
              onOpenAIWithJob={handleOpenAIWithJob}
            />
          )}

          {currentTab === 'guilds' && (
            <GuildsDirectory
              guilds={initialGuilds}
              onOpenApplyModal={(fakeJob) => setApplyingJob(fakeJob)}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'scrims' && (
            <ScrimRadar />
          )}
        </ErrorBoundary>
      </main>

      {/* Mobile Bottom Dock Navigation (visible on mobile / < 768px) */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">NEXUS // THE GAMER PASSPORT</span>
            <span className="footer-sub">Connecting competitive players, indie developers, and esports organizations.</span>
          </div>
          <div className="footer-badges">
            <button 
              onClick={() => { sounds.playClick(); setViewMode('landing'); }}
              className="footer-pill-btn"
            >
              View SaaS Landing Page
            </button>
            <span className="footer-pill">Riot Games API Sync</span>
            <span className="footer-pill">Steam Verified</span>
            <span className="footer-pill">Unreal Engine Netcode Portal</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          profile={profile}
          onClose={() => setApplyingJob(null)}
          onSuccess={handleApplySuccess}
        />
      )}

      {isEditProfileOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleSaveProfile}
        />
      )}

      {activeClip && (
        <ClipModal
          clip={activeClip}
          onClose={() => setActiveClip(null)}
        />
      )}

      {/* AI Scout & Career Co-Pilot Modal */}
      <AIModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        profile={profile}
        jobs={jobs}
        onApplyPitch={handleApplyPitch}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectTab={setCurrentTab}
        onOpenAI={() => setIsAIOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        jobs={jobs}
        onSelectJob={(job) => setApplyingJob(job)}
      />
    </div>
  );
};

export default App;
