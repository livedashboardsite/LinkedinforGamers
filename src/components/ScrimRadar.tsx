import React, { useState, useEffect } from 'react';
import { 
  Crosshair, 
  Wifi, 
  ShieldCheck, 
  Check, 
  X, 
  Play, 
  RefreshCw,
  Trophy,
  Users,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio';

export const ScrimRadar: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('NA Central (Chicago)');
  const [selectedFormat, setSelectedFormat] = useState('5v5 Tactical');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const [matchedLobby, setMatchedLobby] = useState<{
    teamName: string;
    avgElo: string;
    region: string;
    ping: string;
    map: string;
  } | null>(null);

  const [matchAccepted, setMatchAccepted] = useState(false);

  // Search Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (searching) {
      timer = setInterval(() => {
        setSearchTime(prev => {
          if (prev >= 3 && !matchedLobby) {
            // trigger match found
            sounds.playSuccess();
            setMatchedLobby({
              teamName: 'Sentinels Contenders',
              avgElo: 'Radiant 650+ RR',
              region: selectedRegion,
              ping: '14ms',
              map: 'Haven / Ascent (Bo3)'
            });
            setSearching(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [searching, matchedLobby, selectedRegion]);

  const showToast = (msg: string) => {
    sounds.playSuccess();
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const startSearch = () => {
    sounds.playClick();
    setSearching(true);
    setSearchTime(0);
    setMatchedLobby(null);
    setMatchAccepted(false);
  };

  const cancelSearch = () => {
    sounds.playClick();
    setSearching(false);
    setSearchTime(0);
  };

  const acceptMatch = () => {
    sounds.playSuccess();
    setMatchAccepted(true);
  };

  return (
    <div className="scrim-radar-view">
      {/* Toast notification banner */}
      {actionNotice && (
        <div className="scrim-toast animate-slide-down">
          <CheckCircle2 size={16} className="text-emerald" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="glass-card scrim-hero-banner">
        <div className="scrim-title-block">
          <Crosshair className="scrim-radar-icon-pulse" size={28} />
          <div>
            <h1 className="scrim-main-title">TACTICAL SCRIM & DUO RADAR</h1>
            <p className="scrim-main-sub">
              Zero-friction matchmaking for competitive teams. Instant MMR balancing, anti-toxicity verification, and dedicated 128-tick servers.
            </p>
          </div>
        </div>

        <div className="radar-status-chips">
          <div className="radar-chip">
            <Wifi size={14} className="text-emerald" />
            <span>Server Ping: <strong>14ms ({selectedRegion.split(' ')[0]})</strong></span>
          </div>
          <div className="radar-chip">
            <Users size={14} className="text-cyan" />
            <span>Active Scrim Teams: <strong>36 Online</strong></span>
          </div>
        </div>
      </div>

      {/* Scrim Config Strip */}
      <div className="glass-card scrim-config-strip">
        <div className="scrim-config-item">
          <span className="cfg-label"><MapPin size={13} /> Target Region:</span>
          <select 
            value={selectedRegion}
            onChange={(e) => { sounds.playClick(); setSelectedRegion(e.target.value); }}
            className="scrim-cfg-select"
          >
            <option value="NA Central (Chicago)">NA Central (Chicago — 14ms)</option>
            <option value="NA East (Ashburn)">NA East (Ashburn — 21ms)</option>
            <option value="NA West (Oregon)">NA West (Oregon — 34ms)</option>
            <option value="EU West (Frankfurt)">EU West (Frankfurt — 88ms)</option>
          </select>
        </div>

        <div className="scrim-config-item">
          <span className="cfg-label"><Crosshair size={13} /> Format:</span>
          <select 
            value={selectedFormat}
            onChange={(e) => { sounds.playClick(); setSelectedFormat(e.target.value); }}
            className="scrim-cfg-select"
          >
            <option value="5v5 Tactical">5v5 Tactical (Bo3 Match)</option>
            <option value="10-Man Inhouse">10-Man Verified Inhouse</option>
            <option value="Duo Queue">Competitive Duo Finder</option>
          </select>
        </div>
      </div>

      <div className="scrim-radar-layout">
        {/* Animated Sweep Radar Display */}
        <div className="glass-card radar-screen-card">
          <div className="radar-viewport">
            {/* Concentric rings */}
            <div className="radar-circle circle-1" />
            <div className="radar-circle circle-2" />
            <div className="radar-circle circle-3" />
            <div className="radar-crosshair-v" />
            <div className="radar-crosshair-h" />

            {/* Sweep hand */}
            <div className={`radar-sweep-beam ${searching ? 'active-sweep' : ''}`} />

            {/* Simulated blips on the radar */}
            <div className="radar-blip blip-1" title="Sentinels Academy (Radiant)" />
            <div className="radar-blip blip-2" title="Cloud9 Trials" />
            <div className="radar-blip blip-3" title="G2 Youth" />
            <div className="radar-blip blip-player" title="You (Radiant #142)" />

            <div className="radar-center-label">
              <span>{selectedRegion.toUpperCase()} // 128 TICK</span>
            </div>
          </div>

          {/* Radar Control Panel */}
          <div className="radar-controls">
            {!searching && !matchedLobby && (
              <button 
                onClick={startSearch}
                className="btn-glow-primary radar-search-cta"
              >
                <Play size={18} />
                <span>Initialize Scrim Matchmaking ({selectedFormat})</span>
              </button>
            )}

            {searching && (
              <div className="searching-indicator-row animate-fade-in">
                <RefreshCw className="spin-icon text-cyan" size={20} />
                <span className="searching-text">
                  Scanning for Radiant/Immortal 3 Scrim Rosters in {selectedRegion}... ({searchTime}s)
                </span>
                <button 
                  onClick={cancelSearch} 
                  className="btn-ghost-danger"
                >
                  <X size={15} /> Cancel
                </button>
              </div>
            )}

            {/* Matched Lobby Dialog */}
            {matchedLobby && (
              <div className="glass-card match-found-box animate-fade-in">
                <div className="match-found-header">
                  <Trophy size={20} className="text-gold" />
                  <span className="match-found-title">TACTICAL SCRIM FOUND!</span>
                </div>

                <div className="match-lobby-details">
                  <div className="match-row">
                    <span className="m-label">Opponent:</span>
                    <strong className="m-val text-cyan">{matchedLobby.teamName}</strong>
                  </div>
                  <div className="match-row">
                    <span className="m-label">Tier / MMR:</span>
                    <strong className="m-val text-gold">{matchedLobby.avgElo}</strong>
                  </div>
                  <div className="match-row">
                    <span className="m-label">Server / Ping:</span>
                    <strong className="m-val text-emerald">{matchedLobby.region} ({matchedLobby.ping})</strong>
                  </div>
                  <div className="match-row">
                    <span className="m-label">Format:</span>
                    <strong className="m-val">{matchedLobby.map}</strong>
                  </div>
                </div>

                {!matchAccepted ? (
                  <div className="match-actions-row">
                    <button 
                      onClick={acceptMatch} 
                      className="btn-glow-primary accept-match-btn"
                    >
                      <Check size={18} />
                      <span>Accept Scrim Challenge</span>
                    </button>
                    <button 
                      onClick={() => setMatchedLobby(null)} 
                      className="btn-ghost-secondary"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <div className="match-confirmed-banner animate-fade-in">
                    <ShieldCheck size={20} className="text-emerald" />
                    <span>SCRIM CONFIRMED! Dedicated 128-tick server dispatched to team Discord.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Scrim Board Sidebar */}
        <div className="glass-card scrim-rooms-sidebar">
          <div className="sidebar-card-header">
            <h3 className="sidebar-card-title">LIVE SCRIM LOBBIES</h3>
            <span className="live-badge">REAL-TIME</span>
          </div>

          <div className="scrim-rooms-list">
            <div className="scrim-room-card">
              <div className="scrim-room-top">
                <span className="room-title">Radiant 10-Man Practice</span>
                <span className="room-players text-cyan">9/10 Players</span>
              </div>
              <p className="room-desc">Looking for 1x Initiator with mic. Server: Ashburn (18ms). Anti-tilt enforced.</p>
              <button 
                onClick={() => showToast("Joined 10-Man Lobby! Voice credentials sent to client.")}
                className="room-join-btn"
              >
                Join Slot →
              </button>
            </div>

            <div className="scrim-room-card">
              <div className="scrim-room-top">
                <span className="room-title">VCT Challengers Bo3 Scrim</span>
                <span className="room-players text-gold">Ready for Opponent</span>
              </div>
              <p className="room-desc">CyberForge Contenders ready for Tier 2 Scrim. Maps: Sunset & Lotus.</p>
              <button 
                onClick={() => showToast("Scrim challenge dispatched to CyberForge Contenders!")}
                className="room-join-btn"
              >
                Challenge Team →
              </button>
            </div>

            <div className="scrim-room-card">
              <div className="scrim-room-top">
                <span className="room-title">Duo Queue Radiant Push</span>
                <span className="room-players text-emerald">1/2 Players</span>
              </div>
              <p className="room-desc">Peak 820 RR Jett main looking for vocal Sova / Fade duo partner.</p>
              <button 
                onClick={() => showToast("Duo party invite sent via Riot Client API!")}
                className="room-join-btn"
              >
                Send Invite →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
