import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trophy, 
  Edit3, 
  Share2, 
  Play, 
  Cpu, 
  Monitor, 
  Mouse, 
  Keyboard, 
  Layers,
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Bot, 
  Zap,
  Award
} from 'lucide-react';
import type { UserProfile, ClipItem } from '../types';
import { RadarChart } from './RadarChart';
import { sounds } from '../utils/audio';

interface CharacterSheetProps {
  profile: UserProfile;
  onUpdateStatus: (newStatus: UserProfile['status']) => void;
  onVouchCommendation: (commendId: string) => void;
  onOpenEditModal: () => void;
  onSelectClip: (clip: ClipItem) => void;
  onStatChange?: (index: number, newValue: number) => void;
  onOpenAI?: () => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  profile,
  onUpdateStatus,
  onVouchCommendation,
  onOpenEditModal,
  onSelectClip,
  onStatChange,
  onOpenAI
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'clips' | 'history' | 'setup'>('stats');

  const handleCopyCard = () => {
    sounds.playSuccess();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getHardwareIcon = (cat: string) => {
    if (cat.toLowerCase().includes('graphics') || cat.toLowerCase().includes('processor')) return <Cpu size={16} />;
    if (cat.toLowerCase().includes('display')) return <Monitor size={16} />;
    if (cat.toLowerCase().includes('mouse')) return <Mouse size={16} />;
    if (cat.toLowerCase().includes('keyboard')) return <Keyboard size={16} />;
    return <Layers size={16} />;
  };

  // Calculate dynamic average rating from radar stats
  const averageRating = Math.round(
    profile.radarStats.reduce((acc, curr) => acc + curr.value, 0) / profile.radarStats.length
  );

  return (
    <div className="character-sheet-container">
      {/* Hero Banner with Futuristic Cyber Overlay */}
      <div className="profile-banner-container">
        <img src={profile.bannerUrl} alt="Tournament Arena" className="profile-banner-img" />
        <div className="profile-banner-overlay" />
        <div className="banner-tag-badge">
          <Award size={13} className="text-lemon" />
          <span>VERIFIED TOURNAMENT PASSPORT // VCT NA CIRCUIT</span>
        </div>
      </div>

      {/* Main Character Header Card */}
      <div className="glass-card profile-hero-card">
        <div className="hero-card-left">
          {/* Avatar with Animated Glow and Level Ring */}
          <div className="avatar-frame-container">
            <div className="avatar-glow-ring" />
            <img src={profile.avatarUrl} alt={profile.gamertag} className="profile-avatar-large" />
            <div className="level-crest">
              <span className="crest-level">LVL {profile.level}</span>
              <span className="crest-tier">RADIANT</span>
            </div>
          </div>

          {/* Gamertag & Identity Details */}
          <div className="profile-core-info">
            <div className="profile-names-row">
              <h1 className="profile-gamertag">{profile.gamertag}</h1>
              <span title="Verified Tournament Identity" style={{ display: 'inline-flex' }}>
                <ShieldCheck className="passport-verified-icon" size={24} />
              </span>
              <span className="tier-pill-gold">TIER 1 PRO</span>
              <span className="ovr-rating-badge">
                <span className="ovr-val">{averageRating}</span>
                <span className="ovr-lbl">OVR</span>
              </span>
            </div>

            <div className="profile-real-name-row">
              <span className="real-name">{profile.realName}</span>
              <span className="handle-text">{profile.handle}</span>
              <span className="location-pill">
                <MapPin size={11} /> {profile.location}
              </span>
            </div>

            <p className="profile-headline">{profile.title}</p>
            <p className="profile-bio-text">{profile.bio}</p>

            {/* XP Progression Bar with Shimmer */}
            <div className="xp-bar-container">
              <div className="xp-bar-header">
                <span className="xp-label">EXPERIENCE RANK PROGRESSION</span>
                <span className="xp-values">{profile.currentXp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP</span>
              </div>
              <div className="xp-track">
                <div 
                  className="xp-fill" 
                  style={{ width: `${(profile.currentXp / profile.nextLevelXp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Dropdown & Action CTA */}
        <div className="hero-card-right">
          <div className="status-selector-box">
            <span className="status-label">CURRENT AVAILABILITY:</span>
            <select
              value={profile.status}
              onChange={(e) => {
                sounds.playClick();
                onUpdateStatus(e.target.value as UserProfile['status']);
              }}
              className="status-dropdown-select"
            >
              <option value="LFR (Looking for Roster)">🟢 LFR (Looking for Roster)</option>
              <option value="Open to Studio Roles">🔵 Open to Studio Roles (UE5)</option>
              <option value="Contracted">🔴 Contracted / Active</option>
              <option value="Sub Only">🟡 Substitute / Loan Only</option>
            </select>
          </div>

          <div className="hero-actions-column">
            {onOpenAI && (
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onOpenAI();
                }}
                className="btn-glow-primary hero-btn hero-ai-btn"
                title="Run AI Scout evaluation on this character sheet"
              >
                <Bot size={15} className="text-emerald" />
                <span>AI Scout Audit</span>
              </button>
            )}

            <button
              onClick={() => {
                sounds.playClick();
                onOpenEditModal();
              }}
              className="btn-secondary hero-btn"
            >
              <Edit3 size={15} />
              <span>Edit Character Sheet</span>
            </button>

            <button
              onClick={handleCopyCard}
              className="btn-ghost-secondary hero-btn"
            >
              {copiedLink ? <CheckCircle2 size={15} className="text-emerald" /> : <Share2 size={15} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Player Card'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Game Ecosystem Row (Steam, Riot, Faceit, Twitch, GitHub) */}
      <div className="verified-accounts-grid">
        {profile.verifiedAccounts.map((acc, idx) => (
          <div 
            key={idx} 
            className="glass-card verified-account-card"
            style={{ '--account-glow': acc.color } as React.CSSProperties}
          >
            <div className="acc-header">
              <span className="acc-platform-name">{acc.name}</span>
              <span className="acc-check-badge">
                <ShieldCheck size={12} /> VERIFIED
              </span>
            </div>
            <div className="acc-rank-display" style={{ color: acc.color }}>
              {acc.badge}
            </div>
            <div className="acc-stat-sub">{acc.rank}</div>
          </div>
        ))}
      </div>

      {/* Profile Section Sub-Navigation Tabs */}
      <div className="profile-subnav-bar">
        <button
          className={`subnav-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('stats'); }}
        >
          <Sparkles size={15} />
          <span>Radar Matrix & Commendations</span>
        </button>

        <button
          className={`subnav-btn ${activeTab === 'clips' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('clips'); }}
        >
          <Play size={15} />
          <span>Clips Vault ({profile.clips.length})</span>
        </button>

        <button
          className={`subnav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('history'); }}
        >
          <Trophy size={15} />
          <span>Roster & Studio History</span>
        </button>

        <button
          className={`subnav-btn ${activeTab === 'setup' ? 'active' : ''}`}
          onClick={() => { sounds.playClick(); setActiveTab('setup'); }}
        >
          <Cpu size={15} />
          <span>Battlestation Specs</span>
        </button>
      </div>

      {/* TAB CONTENT: Radar Stats & Commendations */}
      {activeTab === 'stats' && (
        <div className="stats-tab-layout">
          {/* Radar Chart Card */}
          <div className="glass-card radar-showcase-card">
            <div className="card-top-title">
              <h3 className="section-title">RPG ATTRIBUTE MATRIX</h3>
              <span className="badge-interactive">INTERACTIVE POLYGON</span>
            </div>
            <p className="card-caption">
              Derived from verified Riot tournament telemetry, Faceit match logs, and peer code reviews. Hover/drag vertices to simulate adjustments.
            </p>

            <div className="radar-centered-wrap">
              <RadarChart 
                stats={profile.radarStats} 
                size={310} 
                interactive={true}
                onStatChange={onStatChange}
              />
            </div>

            {/* Stat Breakdown Bars */}
            <div className="stat-bars-list">
              {profile.radarStats.map((st, i) => (
                <div key={i} className="stat-bar-row">
                  <div className="stat-bar-labels">
                    <span className="stat-bar-name">{st.label}</span>
                    <span className="stat-bar-num">{st.value} / 100</span>
                  </div>
                  <div className="stat-progress-track">
                    <div className="stat-progress-fill" style={{ width: `${st.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commendations & Peer Vouching Card */}
          <div className="glass-card commendations-showcase-card">
            <div className="card-top-title">
              <h3 className="section-title">PEER COMMENDATIONS & VOUCHES</h3>
              <span className="badge-verified">VERIFIED TEAMMATES</span>
            </div>
            <p className="card-caption">
              Reputation endorsements from Tier 1 teammates, scrim captains, and studio technical leads.
            </p>

            <div className="commendations-list">
              {profile.commendations.map((c) => (
                <div key={c.id} className="commendation-card">
                  <div className="commend-icon-box">{c.icon}</div>
                  <div className="commend-details">
                    <div className="commend-title-row">
                      <h4 className="commend-name">{c.name}</h4>
                      <span className="commend-count-badge">
                        {c.count} {c.count === 1 ? 'Vouch' : 'Vouches'}
                      </span>
                    </div>
                    <p className="commend-desc">{c.description}</p>
                    <button
                      onClick={() => onVouchCommendation(c.id)}
                      className={`vouch-btn ${c.userVouched ? 'vouched' : ''}`}
                    >
                      {c.userVouched ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald" />
                          <span>Vouched (+1)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={13} />
                          <span>Vouch Player</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Highlight Clips */}
      {activeTab === 'clips' && (
        <div className="clips-grid">
          {profile.clips.map((clip) => (
            <div
              key={clip.id}
              className="glass-card clip-card"
              onClick={() => {
                sounds.playClick();
                onSelectClip(clip);
              }}
            >
              <div className="clip-thumbnail-wrapper">
                <img src={clip.thumbnail} alt={clip.title} className="clip-thumbnail" />
                <div className="clip-overlay-gradient" />
                <div className="clip-play-center">
                  <Play size={22} fill="#fff" />
                </div>
                <span className="clip-duration-tag">{clip.duration}</span>
                <span className="clip-cat-badge">{clip.category}</span>
              </div>
              <div className="clip-info">
                <h4 className="clip-title">{clip.title}</h4>
                <div className="clip-meta">
                  <span>{clip.game}</span>
                  <span className="dot-divider">•</span>
                  <span>{clip.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: Roster History */}
      {activeTab === 'history' && (
        <div className="history-timeline-container">
          {profile.rosterHistory.map((rh) => (
            <div key={rh.id} className="glass-card history-card">
              <img src={rh.logo} alt={rh.team} className="history-team-logo" />
              <div className="history-content">
                <div className="history-header">
                  <div>
                    <h3 className="history-role">{rh.role}</h3>
                    <span className="history-team">{rh.team}</span>
                  </div>
                  <div className="history-meta">
                    <span className="history-tier-badge">{rh.tier}</span>
                    <span className="history-period">{rh.period}</span>
                  </div>
                </div>
                <ul className="history-highlights">
                  {rh.highlights.map((h, idx) => (
                    <li key={idx}>
                      <Zap size={13} className="text-emerald" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: Battlestation Hardware */}
      {activeTab === 'setup' && (
        <div className="hardware-grid">
          {profile.hardware.map((hw, idx) => (
            <div key={idx} className="glass-card hardware-card">
              <div className="hw-icon-wrapper">{getHardwareIcon(hw.category)}</div>
              <div className="hw-info">
                <span className="hw-cat">{hw.category}</span>
                <span className="hw-name">{hw.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
