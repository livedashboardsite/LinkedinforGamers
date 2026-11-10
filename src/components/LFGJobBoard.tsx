import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  Gamepad2,
  Users,
  Code,
  Bookmark,
  Bot,
  ArrowRight
} from 'lucide-react';
import type { JobOpportunity } from '../types';
import { sounds } from '../utils/audio';

interface LFGJobBoardProps {
  jobs: JobOpportunity[];
  onOpenApplyModal: (job: JobOpportunity) => void;
  onToggleSaveJob?: (jobId: string) => void;
  onOpenAIWithJob?: (job: JobOpportunity) => void;
}

export const LFGJobBoard: React.FC<LFGJobBoardProps> = ({
  jobs,
  onOpenApplyModal,
  onToggleSaveJob,
  onOpenAIWithJob
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredJobs = jobs.filter(job => {
    if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;
    if (selectedRegion !== 'all') {
      if (selectedRegion === 'remote' && !job.isRemote) return false;
      if (selectedRegion === 'na' && !job.region.toLowerCase().includes('north america') && !job.region.toLowerCase().includes('la')) return false;
      if (selectedRegion === 'saved' && !job.saved) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (job.title || '').toLowerCase().includes(q);
      const matchOrg = (job.organization || '').toLowerCase().includes(q);
      const matchEngine = (job.gameOrEngine || '').toLowerCase().includes(q);
      const matchTags = (job.tags || []).some(t => (t || '').toLowerCase().includes(q));
      if (!matchTitle && !matchOrg && !matchEngine && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="job-board-container">
      {/* Sleek Header Banner */}
      <div className="glass-card job-header-banner">
        <div>
          <div className="job-title-row">
            <Briefcase className="job-header-icon" />
            <h1 className="job-page-title">LFG & CAREER MARKETPLACE</h1>
            <span className="live-scout-badge">SCOUTS ACTIVE</span>
          </div>
          <p className="job-page-subtitle">
            Verified team roster trials, AAA studio contracts, creator sponsorships, and indie dev rev-share bounties.
          </p>
        </div>

        {/* Quick Stats Counter */}
        <div className="job-header-stats">
          <div className="header-stat-box">
            <span className="stat-num text-cyan">42</span>
            <span className="stat-desc">Open Roster Slots</span>
          </div>
          <div className="header-stat-box">
            <span className="stat-num text-emerald">$480K+</span>
            <span className="stat-desc">Monthly Prize & Salary</span>
          </div>
          <div className="header-stat-box">
            <span className="stat-num text-gold">98%</span>
            <span className="stat-desc">Scout Response Rate</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-card job-controls-card">
        {/* Search bar */}
        <div className="job-search-input-wrap">
          <Search size={16} className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search roles: 'Initiator', 'Unreal Engine 5 Netcode', 'Lead Caster', 'Shader'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="job-search-input"
          />
        </div>

        {/* Filter categories */}
        <div className="job-filter-row">
          <div className="filter-chips-group">
            <button
              className={`job-chip ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedCategory('all'); }}
            >
              All Openings ({jobs.length})
            </button>
            <button
              className={`job-chip ${selectedCategory === 'esports' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedCategory('esports'); }}
            >
              <Gamepad2 size={12} />
              <span>Esports & Rosters</span>
            </button>
            <button
              className={`job-chip ${selectedCategory === 'studio' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedCategory('studio'); }}
            >
              <Code size={12} />
              <span>Studio & Dev</span>
            </button>
            <button
              className={`job-chip ${selectedCategory === 'creator' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedCategory('creator'); }}
            >
              <Users size={12} />
              <span>Creator & Coaching</span>
            </button>
          </div>

          <div className="filter-chips-group">
            <button
              className={`job-chip ${selectedRegion === 'all' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedRegion('all'); }}
            >
              All Regions
            </button>
            <button
              className={`job-chip ${selectedRegion === 'remote' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedRegion('remote'); }}
            >
              Remote Only
            </button>
            <button
              className={`job-chip ${selectedRegion === 'saved' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setSelectedRegion('saved'); }}
            >
              <Bookmark size={12} />
              <span>Saved Roles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Listings List */}
      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="glass-card jobs-empty-card">
            <ShieldAlert size={36} className="text-muted" />
            <h3>No Opportunities Found</h3>
            <p>Try broadening your search query or reset the filter parameters.</p>
            <button 
              className="btn-secondary"
              onClick={() => {
                sounds.playClick();
                setSelectedCategory('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="glass-card job-item-card animate-fade-in">
              <div className="job-card-main">
                <img src={job.orgLogo} alt={job.organization} className="job-org-logo" />

                <div className="job-info-block">
                  <div className="job-top-meta">
                    <span className="job-org-name">{job.organization}</span>
                    <span className="dot-divider">•</span>
                    <span className="job-posted-time">{job.postedAgo}</span>
                    <span className={`job-status-pill status-${job.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {job.status}
                    </span>
                  </div>

                  <h3 className="job-title-text">{job.title}</h3>

                  <div className="job-sub-specs">
                    <span className="spec-item text-emerald">
                      <DollarSign size={13} />
                      <strong>{job.salary}</strong>
                    </span>
                    <span className="spec-item">
                      <MapPin size={13} />
                      {job.region}
                    </span>
                    {job.isRemote && (
                      <span className="remote-badge">🌐 100% Remote</span>
                    )}
                    {job.requiredRank && (
                      <span className="rank-req-badge">
                        🏆 Req: <strong>{job.requiredRank}</strong>
                      </span>
                    )}
                  </div>

                  <p className="job-description-text">{job.description}</p>

                  <div className="job-tags-row">
                    {(job.tags || []).map((tag, idx) => (
                      <span key={idx} className="job-tag-chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="job-actions-col">
                <div className="job-applicants-note">
                  <Users size={12} />
                  <span>{job.applicantsCount} Verified Applicants</span>
                </div>

                {job.applied ? (
                  <button className="btn-applied-status" disabled>
                    <CheckCircle2 size={15} />
                    <span>Applied with Passport</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenApplyModal(job);
                    }}
                    className="btn-glow-primary job-apply-btn"
                  >
                    <span>Apply with Passport</span>
                    <ArrowRight size={14} />
                  </button>
                )}

                {/* AI Pitch Shortcut */}
                {onOpenAIWithJob && (
                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      onOpenAIWithJob(job);
                    }}
                    className="btn-ai-pitch-shortcut"
                    title="Generate tailored application pitch using AI"
                  >
                    <Bot size={13} className="text-emerald" />
                    <span>Draft Pitch with AI</span>
                  </button>
                )}

                {/* Bookmark Toggle */}
                {onToggleSaveJob && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onToggleSaveJob(job.id);
                    }}
                    className={`btn-save-job ${job.saved ? 'saved' : ''}`}
                    title={job.saved ? 'Remove Bookmark' : 'Save Job Opportunity'}
                  >
                    <Bookmark size={13} fill={job.saved ? 'currentColor' : 'none'} />
                    <span>{job.saved ? 'Bookmarked' : 'Save'}</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
