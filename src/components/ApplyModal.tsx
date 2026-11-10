import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import type { JobOpportunity, UserProfile } from '../types';
import { sounds } from '../utils/audio';

interface ApplyModalProps {
  job: JobOpportunity;
  profile: UserProfile;
  onClose: () => void;
  onSuccess: (jobId: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  profile,
  onClose,
  onSuccess
}) => {
  const [pitch, setPitch] = useState(
    `Hey ${job.organization} staff, I am excited about the ${job.title} role. My Character Sheet includes verified Radiant match logs, VCT qualifier VODs, and deep experience with mid-round calling and high-pressure clutch situations.`
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setSubmitted(true);

    // Fire brand celebration confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FF206E', '#FBFF12', '#FFFFFF', '#0C0F0A']
    });

    setTimeout(() => {
      onSuccess(job.id);
      onClose();
    }, 2200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Sparkles className="text-cyan" size={20} />
            <h2 className="modal-title">APPLY WITH CHARACTER SHEET</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-success-state">
            <CheckCircle2 size={54} className="text-emerald animate-bounce" />
            <h3 className="success-title">APPLICATION DISPATCHED!</h3>
            <p className="success-sub">
              Your verified Character Sheet, telemetry stats, and pitch have been sent directly to the scouting staff at <strong>{job.organization}</strong>.
            </p>
            <div className="telemetry-badge">
              <ShieldCheck size={16} />
              <span>Verified Identity Signed: {profile.gamertag} // {profile.verifiedAccounts[0]?.badge}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Target Job Info Card */}
            <div className="job-summary-card">
              <img src={job.orgLogo} alt={job.organization} className="modal-job-logo" />
              <div>
                <h4 className="modal-job-role">{job.title}</h4>
                <div className="modal-job-org">{job.organization} • {job.salary}</div>
              </div>
            </div>

            {/* Attached Character Passport Snapshot */}
            <div className="attached-passport-box">
              <div className="passport-box-header">
                <FileText size={14} className="text-cyan" />
                <span className="passport-box-title">Attached Verified Gamer Passport</span>
              </div>
              <div className="passport-stats-mini-row">
                <div className="mini-stat">
                  <span className="lbl">Identity:</span>
                  <span className="val">{profile.gamertag} (Lvl {profile.level})</span>
                </div>
                <div className="mini-stat">
                  <span className="lbl">Verified Rank:</span>
                  <span className="val text-gold">Radiant #142 (Top 0.01%)</span>
                </div>
                <div className="mini-stat">
                  <span className="lbl">Commendations:</span>
                  <span className="val text-cyan">637 Vouches</span>
                </div>
                <div className="mini-stat">
                  <span className="lbl">Netcode/Dev:</span>
                  <span className="val text-emerald">UE5 C++ Verified</span>
                </div>
              </div>
            </div>

            {/* Pitch Textarea */}
            <div className="form-group">
              <label className="form-label">
                Pitch Note to Head Coach / Studio Lead:
              </label>
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={4}
                className="modal-textarea"
                required
              />
            </div>

            {/* Telemetry verification checkboxes */}
            <div className="form-checkbox-row">
              <input type="checkbox" id="attachTelemetry" defaultChecked />
              <label htmlFor="attachTelemetry" className="checkbox-label">
                Attach my official Riot telemetry, Faceit match logs, and clutch VODs
              </label>
            </div>

            <div className="modal-actions-row">
              <button type="button" onClick={onClose} className="btn-ghost-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-glow-primary">
                <Send size={15} />
                <span>Submit Application & Notify Scouts</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
