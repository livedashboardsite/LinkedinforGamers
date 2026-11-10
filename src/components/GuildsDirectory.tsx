import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Briefcase, 
  UserPlus, 
  Check, 
  Search,
  Crosshair
} from 'lucide-react';
import type { GuildTeam, JobOpportunity } from '../types';
import { sounds } from '../utils/audio';

interface GuildsDirectoryProps {
  guilds: GuildTeam[];
  onOpenApplyModal: (fakeJob: JobOpportunity) => void;
  onSelectTab?: (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
}

export const GuildsDirectory: React.FC<GuildsDirectoryProps> = ({
  guilds: initialGuildsList,
  onOpenApplyModal,
  onSelectTab
}) => {
  const [guilds, setGuilds] = useState<GuildTeam[]>(initialGuildsList);
  const [search, setSearch] = useState('');

  const toggleFollow = (id: string) => {
    sounds.playSuccess();
    setGuilds(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, isFollowing: !g.isFollowing };
      }
      return g;
    }));
  };

  const filtered = (guilds || []).filter(g => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (g.name || '').toLowerCase().includes(q) || 
           (g.game || '').toLowerCase().includes(q) || 
           (g.division || '').toLowerCase().includes(q) || 
           (g.description || '').toLowerCase().includes(q);
  });

  return (
    <div className="guilds-directory-view">
      <div className="glass-card guilds-hero-banner">
        <div className="guilds-hero-title-box">
          <Users size={28} className="text-cyan" />
          <div>
            <h1 className="guilds-page-title">GUILDS, ORGS & STUDIOS</h1>
            <p className="guilds-page-sub">
              Connect directly with verified Tier 1 esports franchises, AAA development studios, and collegiate programs.
            </p>
          </div>
        </div>

        <div className="guilds-search-input-box">
          <Search size={16} className="search-icon-inside" />
          <input 
            type="text" 
            placeholder="Search teams, titles, divisions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="guilds-search-field"
          />
        </div>
      </div>

      <div className="guilds-grid">
        {filtered.map((guild) => (
          <div key={guild.id} className="glass-card guild-card animate-fade-in">
            {/* Banner Header */}
            <div className="guild-card-banner">
              <img src={guild.banner} alt={guild.name} className="guild-banner-img" />
              <div className="guild-banner-grad" />
              <div className="guild-tag-badge">{guild.tag}</div>
            </div>

            {/* Guild Avatar & Meta */}
            <div className="guild-body">
              <div className="guild-avatar-row">
                <img src={guild.logo} alt={guild.name} className="guild-avatar" />
                <div className="guild-actions">
                  <button
                    onClick={() => toggleFollow(guild.id)}
                    className={`guild-follow-btn ${guild.isFollowing ? 'following' : ''}`}
                  >
                    {guild.isFollowing ? (
                      <>
                        <Check size={14} />
                        <span>Roster Scouted</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        <span>Follow Org</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="guild-name-meta">
                <div className="guild-title-row">
                  <h3 className="guild-name">{guild.name}</h3>
                  <span title="Verified Gaming Organization" style={{ display: 'inline-flex' }}>
                    <ShieldCheck size={16} className="text-cyan" />
                  </span>
                </div>
                <span className="guild-division">{guild.division}</span>
                <span className="guild-game-tag">{guild.game}</span>
              </div>

              <p className="guild-desc">{guild.description}</p>

              <div className="guild-stats-bar">
                <div className="guild-stat-item">
                  <span className="g-stat-num">{guild.membersCount}</span>
                  <span className="g-stat-lbl">Roster & Staff</span>
                </div>
                <div className="guild-stat-item">
                  <span className="g-stat-num text-emerald">{guild.openRoles}</span>
                  <span className="g-stat-lbl">Open Trials</span>
                </div>
              </div>

              {/* Roster Application CTA */}
              <div className="guild-footer-actions">
                <button
                  className="guild-apply-btn"
                  onClick={() => {
                    sounds.playClick();
                    onOpenApplyModal({
                      id: `job_guild_${guild.id}`,
                      title: `Starting Roster / Trialist (${guild.game})`,
                      organization: guild.name,
                      orgLogo: guild.logo,
                      category: 'esports',
                      gameOrEngine: guild.game,
                      salary: '$2,500 - $4,500 / mo',
                      region: 'North America',
                      isRemote: true,
                      tags: [guild.division, 'Tier 2 Circuit', 'Scrim Trials'],
                      description: `Trial inquiry for open slot in ${guild.name} ${guild.game} roster.`,
                      applicantsCount: guild.membersCount * 2,
                      postedAgo: 'Active',
                      status: 'Open'
                    });
                  }}
                >
                  <Briefcase size={14} />
                  <span>Submit Roster Inquiry</span>
                </button>

                {onSelectTab && (
                  <button
                    className="guild-scrim-btn"
                    onClick={() => {
                      sounds.playClick();
                      onSelectTab('scrims');
                    }}
                    title="Challenge this org on Scrim Radar"
                  >
                    <Crosshair size={14} />
                    <span>Request Scrim</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
