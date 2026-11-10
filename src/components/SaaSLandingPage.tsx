import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Crosshair, 
  Code, 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Trophy, 
  Briefcase,
  Sun, 
  Moon,
  Menu,
  X
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface SaaSLandingPageProps {
  onLaunchApp: (initialTab?: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const SaaSLandingPage: React.FC<SaaSLandingPageProps> = ({ 
  onLaunchApp, 
  theme = 'dark', 
  onToggleTheme 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="saas-landing">
      {/* Top Banner Notice */}
      <div className="saas-top-banner">
        <span className="saas-badge-glow">NEW</span>
        <span className="saas-top-banner-text">Nexus 2.0 is live: Riot Games & Steam API telemetry verification now active</span>
        <button 
          onClick={() => { sounds.playClick(); onLaunchApp('profile'); }}
          className="saas-top-banner-link"
        >
          Explore Live Product Demo <ArrowRight size={13} />
        </button>
      </div>

      {/* SaaS Navigation */}
      <header className="saas-header">
        <div className="saas-header-container">
          <div className="saas-brand" onClick={() => { sounds.playClick(); onLaunchApp('plaza'); }}>
            <div className="saas-logo-icon">
              <Crosshair size={18} />
            </div>
            <span className="saas-logo-text">nexus<span className="text-emerald">.gg</span></span>
          </div>

          <nav className="saas-nav-links">
            <a href="#features" className="saas-nav-item">Features</a>
            <a href="#comparison" className="saas-nav-item">Why Nexus</a>
            <a href="#personas" className="saas-nav-item">Who It's For</a>
            <a href="#pricing" className="saas-nav-item">Pricing</a>
          </nav>

          <div className="saas-header-actions">
            {onToggleTheme && (
              <button 
                onClick={onToggleTheme}
                className="saas-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            )}
            <button 
              onClick={() => { sounds.playClick(); onLaunchApp('profile'); }}
              className="saas-btn-text"
            >
              Sign In
            </button>
            <button 
              onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
              className="saas-btn-primary desktop-launch-btn"
            >
              <span>Launch App UI</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button 
              className="saas-mobile-menu-btn"
              onClick={() => {
                sounds.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle mobile navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {isMobileMenuOpen && (
          <div className="saas-mobile-menu-drawer animate-fade-in">
            <a 
              href="#features" 
              className="mobile-drawer-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#comparison" 
              className="mobile-drawer-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why Nexus
            </a>
            <a 
              href="#personas" 
              className="mobile-drawer-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who It's For
            </a>
            <a 
              href="#pricing" 
              className="mobile-drawer-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="mobile-drawer-actions">
              <button 
                onClick={() => {
                  sounds.playSuccess();
                  setIsMobileMenuOpen(false);
                  onLaunchApp('profile');
                }}
                className="saas-btn-primary w-full"
              >
                <span>Launch App UI</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="saas-hero-section">
        <div className="saas-container saas-hero-content">
          <div className="saas-pill-tag">
            <Sparkles size={13} className="text-emerald" />
            <span>The Universal Career Layer for Gaming & Esports</span>
          </div>

          <h1 className="saas-hero-title">
            Where <span className="highlight-text-emerald">proof of skill</span> replaces the corporate resume.
          </h1>

          <p className="saas-hero-subtitle">
            Traditional LinkedIn kills gaming culture with buzzwords. Discord loses persistent reputation in noisy channels. Nexus gives players, indie devs, and esports orgs a verified character sheet, telemetry portfolio, and talent marketplace.
          </p>

          <div className="saas-hero-ctas">
            <button 
              onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
              className="saas-btn-primary saas-btn-lg"
            >
              <span>Launch Product Model UI</span>
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => { sounds.playClick(); onLaunchApp('jobs'); }}
              className="saas-btn-secondary saas-btn-lg"
            >
              <Briefcase size={17} />
              <span>Explore LFG & Careers</span>
            </button>
          </div>

          {/* Social Proof Logos */}
          <div className="saas-social-proof">
            <span className="proof-label">Trusted by players, scouts, and studios across:</span>
            <div className="proof-logos-row">
              <span className="proof-badge">SENTINELS CONTENDERS</span>
              <span className="proof-badge">RIOT GAMES ECOSYSTEM</span>
              <span className="proof-badge">CYBERFORGE INTERACTIVE</span>
              <span className="proof-badge">VCT NA OPEN CIRCUIT</span>
              <span className="proof-badge">UNREAL ENGINE CREATORS</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="saas-container hero-preview-wrapper">
          <div className="saas-mockup-frame">
            <div className="mockup-header-bar">
              <div className="mockup-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="mockup-url-bar">
                <span>nexus.gg/app/vortex</span>
              </div>
              <div className="mockup-action">
                <button 
                  onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
                  className="mockup-open-btn"
                >
                  Open Full Interactive UI →
                </button>
              </div>
            </div>

            {/* Teaser Preview Body */}
            <div className="mockup-body-preview" onClick={() => onLaunchApp('profile')}>
              <div className="mockup-hero-row">
                <div className="mockup-user-info">
                  <div className="mockup-avatar-wrap">
                    <img src="/assets/avatar.jpg" alt="Avatar" className="mockup-avatar" />
                    <span className="mockup-lvl">LVL 48</span>
                  </div>
                  <div>
                    <div className="mockup-name-row">
                      <span className="mockup-name">VORTEX // Kai Chen</span>
                      <ShieldCheck size={16} className="text-emerald" />
                      <span className="mockup-rank">RADIANT #142</span>
                    </div>
                    <span className="mockup-title">Tier 1 Valorant IGL // Gameplay Systems Dev (UE5)</span>
                  </div>
                </div>

                <div className="mockup-stats-chips">
                  <div className="m-chip">
                    <span className="m-chip-lbl">Commendations</span>
                    <span className="m-chip-val text-emerald">637 Vouches</span>
                  </div>
                  <div className="m-chip">
                    <span className="m-chip-lbl">Aim / Mechanics</span>
                    <span className="m-chip-val">94 / 100</span>
                  </div>
                  <div className="m-chip">
                    <span className="m-chip-lbl">Status</span>
                    <span className="m-chip-val text-emerald">🟢 LFR Available</span>
                  </div>
                </div>
              </div>

              <div className="mockup-tabs-strip">
                <span className="m-tab active">Character Sheet (Attributes)</span>
                <span className="m-tab">The Plaza (Feed)</span>
                <span className="m-tab">LFG & Careers (14 Active)</span>
                <span className="m-tab">Scrim Radar (Live)</span>
              </div>

              <div className="mockup-overlay-prompt">
                <div className="prompt-card">
                  <Sparkles size={20} className="text-emerald" />
                  <div>
                    <strong>Interactive Sandbox Ready</strong>
                    <p>Click anywhere or hit "Launch App UI" to test the live product model.</p>
                  </div>
                  <button className="prompt-btn">Enter App →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Why Old Platforms Fail */}
      <section id="comparison" className="saas-section saas-comparison-section">
        <div className="saas-container">
          <div className="saas-section-header">
            <span className="saas-section-tag">THE PROBLEM & THE CURE</span>
            <h2 className="saas-section-title">Gaming doesn't fit in a corporate spreadsheet.</h2>
            <p className="saas-section-desc">
              Here is why traditional networking platforms and chat apps fail gamers, and how Nexus fixes it.
            </p>
          </div>

          <div className="comparison-grid">
            {/* Traditional LinkedIn */}
            <div className="comparison-card comp-bad">
              <div className="comp-card-top">
                <XCircle className="comp-icon-bad" size={20} />
                <h3 className="comp-title">Traditional LinkedIn</h3>
              </div>
              <ul className="comp-list">
                <li><XCircle size={15} /> "Thrilled to announce" fake humility culture</li>
                <li><XCircle size={15} /> Zero verified game telemetry or rank APIs</li>
                <li><XCircle size={15} /> Meaningless endorsements ("Good at Microsoft Word")</li>
                <li><XCircle size={15} /> Portfolios limited to static PDFs and dead text</li>
                <li><XCircle size={15} /> No scrim scheduling, duo finder, or roster trees</li>
              </ul>
            </div>

            {/* Discord */}
            <div className="comparison-card comp-neutral">
              <div className="comp-card-top">
                <XCircle className="comp-icon-neutral" size={20} />
                <h3 className="comp-title">Discord & LFG Channels</h3>
              </div>
              <ul className="comp-list">
                <li><XCircle size={15} /> Messages buried under 50 server channels in minutes</li>
                <li><XCircle size={15} /> Zero persistent reputation across different teams</li>
                <li><XCircle size={15} /> Toxic players evade bans with fresh burner accounts</li>
                <li><XCircle size={15} /> No contracts, verified salaries, or scout tracking</li>
                <li><XCircle size={15} /> Unsearchable archives of clips and dev logs</li>
              </ul>
            </div>

            {/* Nexus */}
            <div className="comparison-card comp-winner">
              <div className="comp-winner-tag">THE REPUTATION ENGINE</div>
              <div className="comp-card-top">
                <CheckCircle2 className="comp-icon-winner" size={20} />
                <h3 className="comp-title">Nexus // The Gamer Passport</h3>
              </div>
              <ul className="comp-list">
                <li><CheckCircle2 size={15} /> Riot, Steam, Faceit API telemetry sync</li>
                <li><CheckCircle2 size={15} /> Dynamic RPG Character Sheet & 6-Axis Radar Matrix</li>
                <li><CheckCircle2 size={15} /> Peer vouches with round-specific proof</li>
                <li><CheckCircle2 size={15} /> 128-tick verified Scrim Radar matchmaking</li>
                <li><CheckCircle2 size={15} /> Verified Tier 1 contracts & AAA studio bounties</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section id="features" className="saas-section saas-features-section">
        <div className="saas-container">
          <div className="saas-section-header">
            <span className="saas-section-tag">ENGINEERED FOR GAMERS</span>
            <h2 className="saas-section-title">Everything you need to turn passion into a career.</h2>
          </div>

          <div className="bento-grid">
            {/* Bento 1: Character Sheet */}
            <div className="bento-card bento-wide">
              <div className="bento-content">
                <div className="bento-icon-pill"><Sparkles size={16} /></div>
                <h3 className="bento-title">The Verified Character Sheet</h3>
                <p className="bento-desc">
                  An RPG-style player passport that consolidates your competitive ranks, mechanical stats, clutch rate, and tournament history into one undeniable portfolio.
                </p>
                <div className="bento-tags">
                  <span>Riot Games Sync</span>
                  <span>Faceit Level 10</span>
                  <span>Steam Service</span>
                  <span>Hardware Telemetry</span>
                </div>
              </div>
              <div className="bento-visual visual-radar" onClick={() => onLaunchApp('profile')}>
                <div className="visual-radar-graphic">
                  <div className="mini-polygon" />
                  <span className="mini-stat-label">97 IGL</span>
                  <span className="mini-stat-label-2">94 AIM</span>
                </div>
              </div>
            </div>

            {/* Bento 2: Scrim Radar */}
            <div className="bento-card">
              <div className="bento-icon-pill"><Crosshair size={16} /></div>
              <h3 className="bento-title">Tactical Scrim Radar</h3>
              <p className="bento-desc">
                Find 5v5 team scrims matched by average team MMR, ping location, and schedule. Zero toxicity tolerance.
              </p>
              <div className="bento-stat-highlight">
                <span className="highlight-number text-cyan">14ms</span>
                <span className="highlight-desc">Average Match Ping NA</span>
              </div>
            </div>

            {/* Bento 3: LFG Job Board */}
            <div className="bento-card">
              <div className="bento-icon-pill"><Briefcase size={16} /></div>
              <h3 className="bento-title">LFG & Studio Marketplace</h3>
              <p className="bento-desc">
                Apply to VCT Challengers rosters, AAA multiplayer studios, and creator management teams with your Character Sheet.
              </p>
              <div className="bento-stat-highlight">
                <span className="highlight-number text-emerald">$480K+</span>
                <span className="highlight-desc">Active Monthly Salaries</span>
              </div>
            </div>

            {/* Bento 4: The Plaza Feed */}
            <div className="bento-card bento-wide">
              <div className="bento-content">
                <div className="bento-icon-pill"><Gamepad2 size={16} /></div>
                <h3 className="bento-title">The Plaza // Gaming Culture Without Corporate Cringe</h3>
                <p className="bento-desc">
                  Post devlogs, clutch clips, roster movements, and free agency drops. React with GG, Clutch, Vouched, or Big Brain—no fake corporate applause.
                </p>
                <div className="bento-tags">
                  <span>Free Agent Drops</span>
                  <span>Unreal Engine 5 Devlogs</span>
                  <span>Clutch Clips</span>
                </div>
              </div>
              <div className="bento-reactions-mock">
                <div className="mock-react-chip"><Zap size={14} /> <span>120 Clutch</span></div>
                <div className="mock-react-chip"><ShieldCheck size={14} /> <span>95 Vouched</span></div>
                <div className="mock-react-chip"><Trophy size={14} /> <span>342 GG</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Personas */}
      <section id="personas" className="saas-section saas-personas-section">
        <div className="saas-container">
          <div className="saas-section-header">
            <span className="saas-section-tag">WHO USES NEXUS</span>
            <h2 className="saas-section-title">Built for three distinct gaming pillars.</h2>
          </div>

          <div className="personas-grid">
            <div className="persona-card">
              <div className="persona-icon-wrap"><Gamepad2 size={24} /></div>
              <h3 className="persona-title">Esports Athletes & Free Agents</h3>
              <p className="persona-desc">
                Ditch outdated Word resumes. Provide scouts with verified VOD clips, match telemetry, peak ELO, and teammate vouch history.
              </p>
              <ul className="persona-perks">
                <li>✓ Verified rank badges (Top 0.01%)</li>
                <li>✓ Anti-toxicity reliability score</li>
                <li>✓ Direct scout read receipts</li>
              </ul>
            </div>

            <div className="persona-card">
              <div className="persona-icon-wrap"><Code size={24} /></div>
              <h3 className="persona-title">Game Developers & 3D Artists</h3>
              <p className="persona-desc">
                Let studios play your WebGL demos in-profile, inspect 3D shader graphs, and verify your shipped Steam/Epic titles.
              </p>
              <ul className="persona-perks">
                <li>✓ Playable in-browser builds</li>
                <li>✓ Shader and Netcode bounties</li>
                <li>✓ Indie rev-share team recruitment</li>
              </ul>
            </div>

            <div className="persona-card">
              <div className="persona-icon-wrap"><Trophy size={24} /></div>
              <h3 className="persona-title">Franchises, Scouts & Studios</h3>
              <p className="persona-desc">
                Stop sifting through hundreds of untrusted Discord DMs. Filter applicants by verified MMR, server ping, and character role.
              </p>
              <ul className="persona-perks">
                <li>✓ 1-Click candidate evaluation</li>
                <li>✓ Verified contract histories</li>
                <li>✓ Private scrim coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="saas-section saas-pricing-section">
        <div className="saas-container">
          <div className="saas-section-header">
            <span className="saas-section-tag">MEMBERSHIP TIERS</span>
            <h2 className="saas-section-title">Transparent pricing for players and studios.</h2>
          </div>

          <div className="pricing-grid">
            {/* Free */}
            <div className="pricing-card">
              <div className="tier-header">
                <span className="tier-name">PLAYER PASSPORT</span>
                <span className="tier-price">$0 <span>/ forever</span></span>
                <p className="tier-sub">Essential identity for competitive gamers and indie contributors.</p>
              </div>
              <ul className="tier-features">
                <li>✓ Verified Riot, Steam, Faceit sync</li>
                <li>✓ Dynamic Character Sheet profile</li>
                <li>✓ Public LFG application access</li>
                <li>✓ Community Plaza feed</li>
              </ul>
              <button 
                onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
                className="tier-btn-secondary"
              >
                Create Player Card
              </button>
            </div>

            {/* Pro Athlete / Dev */}
            <div className="pricing-card featured-tier">
              <div className="featured-badge">MOST POPULAR</div>
              <div className="tier-header">
                <span className="tier-name">PRO FREE AGENT</span>
                <span className="tier-price">$9 <span>/ month</span></span>
                <p className="tier-sub">For athletes and developers actively seeking contracts and teams.</p>
              </div>
              <ul className="tier-features">
                <li>✓ Everything in Player Passport</li>
                <li>✓ Priority Scrim Radar matchmaking</li>
                <li>✓ Scout read receipts & profile analytics</li>
                <li>✓ 4K Highlight Clip Vault (unlimited)</li>
                <li>✓ Verified Free Agent badge on Plaza</li>
              </ul>
              <button 
                onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
                className="saas-btn-primary tier-cta"
              >
                Launch Pro Trial
              </button>
            </div>

            {/* Studio / Org */}
            <div className="pricing-card">
              <div className="tier-header">
                <span className="tier-name">STUDIO & FRANCHISE</span>
                <span className="tier-price">$49 <span>/ month</span></span>
                <p className="tier-sub">For esports teams, indie studios, and AAA recruitment leads.</p>
              </div>
              <ul className="tier-features">
                <li>✓ Verified Org / Studio page</li>
                <li>✓ Unlimited LFG and bounty listings</li>
                <li>✓ Telemetry scout search engine</li>
                <li>✓ Roster management & alumni portal</li>
                <li>✓ Dedicated scrim server slots</li>
              </ul>
              <button 
                onClick={() => { sounds.playClick(); onLaunchApp('guilds'); }}
                className="tier-btn-secondary"
              >
                Explore Org Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="saas-cta-banner-section">
        <div className="saas-container">
          <div className="saas-cta-banner-card">
            <h2 className="cta-banner-title">Ready to claim your gamer passport?</h2>
            <p className="cta-banner-sub">
              Experience the working prototype now. Explore the Character Sheet, broadcast on the Plaza, apply for contracts, and test the Scrim Radar.
            </p>
            <button 
              onClick={() => { sounds.playSuccess(); onLaunchApp('profile'); }}
              className="saas-btn-primary saas-btn-lg"
            >
              <span>Enter Product Model UI</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* SaaS Footer */}
      <footer className="saas-footer">
        <div className="saas-container saas-footer-content">
          <div className="saas-footer-brand">
            <span className="saas-logo-text">nexus<span className="text-emerald">.gg</span></span>
            <p className="saas-footer-desc">The universal career layer for the gaming and esports ecosystem.</p>
          </div>
          <div className="saas-footer-links">
            <button onClick={() => onLaunchApp('profile')} className="f-link">Character Sheet</button>
            <button onClick={() => onLaunchApp('plaza')} className="f-link">The Plaza</button>
            <button onClick={() => onLaunchApp('jobs')} className="f-link">LFG Opportunities</button>
            <button onClick={() => onLaunchApp('scrims')} className="f-link">Scrim Radar</button>
          </div>
          <div className="saas-footer-bottom">
            <span>© 2026 Nexus Gaming Networks, Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
