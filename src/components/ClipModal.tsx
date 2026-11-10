import React, { useState } from 'react';
import { X, Play, Pause, Zap, Share2, Flame } from 'lucide-react';
import type { ClipItem } from '../types';
import { sounds } from '../utils/audio';

interface ClipModalProps {
  clip: ClipItem;
  onClose: () => void;
}

export const ClipModal: React.FC<ClipModalProps> = ({ clip, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [clutchReacted, setClutchReacted] = useState(false);

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleClutchReact = () => {
    sounds.playSuccess();
    setClutchReacted(!clutchReacted);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card modal-container clip-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Zap className="text-cyan" size={18} />
            <h3 className="modal-title">{clip.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Video Player Theater */}
        <div className="clip-theater-player">
          <img src={clip.thumbnail} alt={clip.title} className="theater-bg-image" />
          <div className="theater-overlay-scanline" />

          {/* Simulated HUD elements */}
          <div className="theater-hud-top">
            <span className="hud-badge-game">{clip.game}</span>
            <span className="hud-badge-telemetry">128 TICK TELEMETRY SYNCED</span>
          </div>

          <div className="theater-center-action" onClick={togglePlay}>
            <button className="theater-play-btn">
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="#FF206E" />}
            </button>
          </div>

          {/* Telemetry overlay bottom */}
          <div className="theater-telemetry-bar">
            <div className="telemetry-item">
              <span className="t-lbl">Reaction Time:</span>
              <span className="t-val text-emerald">142ms</span>
            </div>
            <div className="telemetry-item">
              <span className="t-lbl">Crosshair Placement:</span>
              <span className="t-val text-cyan">98.2% Head-level</span>
            </div>
            <div className="telemetry-item">
              <span className="t-lbl">Clutch Win Probability:</span>
              <span className="t-val text-gold">4.2% (Won 1v4)</span>
            </div>
          </div>
        </div>

        {/* Clip Meta & Interactions */}
        <div className="clip-modal-footer">
          <div className="clip-footer-left">
            <span className="clip-modal-views">{clip.views} views</span>
            <span className="dot-divider">•</span>
            <span className="clip-modal-duration">Length: {clip.duration}</span>
            <span className="dot-divider">•</span>
            <span className="clip-modal-cat text-cyan">{clip.category}</span>
          </div>

          <div className="clip-footer-actions">
            <button
              onClick={handleClutchReact}
              className={`btn-ghost-secondary ${clutchReacted ? 'active-clutch' : ''}`}
            >
              <Flame size={16} className={clutchReacted ? 'text-crimson' : ''} />
              <span>{clutchReacted ? 'Vouched Clutch!' : 'Vouch Clutch'}</span>
            </button>
            <button className="btn-ghost-secondary" onClick={() => sounds.playClick()}>
              <Share2 size={16} />
              <span>Export Clip Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
