import React, { useState } from 'react';
import { X, Save, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types';
import { sounds } from '../utils/audio';

interface EditProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  onSave
}) => {
  const [gamertag, setGamertag] = useState(profile.gamertag);
  const [realName, setRealName] = useState(profile.realName);
  const [title, setTitle] = useState(profile.title);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [status, setStatus] = useState<UserProfile['status']>(profile.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    onSave({
      gamertag,
      realName,
      title,
      bio,
      location,
      status
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card modal-container modal-edit-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Sparkles className="text-cyan" size={20} />
            <h2 className="modal-title">EDIT CHARACTER SHEET</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-two-col">
            <div className="form-group">
              <label className="form-label">Gamertag / Callout Name</label>
              <input
                type="text"
                value={gamertag}
                onChange={(e) => setGamertag(e.target.value)}
                className="modal-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Real Name / Handle</label>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="modal-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Professional Gaming & Dev Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="e.g. Tier 1 Valorant IGL // Gameplay Systems Dev (UE5)"
              required
            />
          </div>

          <div className="form-two-col">
            <div className="form-group">
              <label className="form-label">Location / Ping Region</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="modal-input"
                placeholder="e.g. Los Angeles, CA // NA East"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Current Availability Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as UserProfile['status'])}
                className="modal-select"
              >
                <option value="LFR (Looking for Roster)">🟢 LFR (Looking for Roster)</option>
                <option value="Open to Studio Roles">🔵 Open to Studio Roles (UE5)</option>
                <option value="Contracted">🔴 Contracted / Active</option>
                <option value="Sub Only">🟡 Substitute / Loan Only</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Character Bio & Playstyle Summary</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="modal-textarea"
              placeholder="Describe your competitive history, leadership style, or game engine specialties..."
            />
          </div>

          <div className="modal-actions-row">
            <button type="button" onClick={onClose} className="btn-ghost-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-glow-primary">
              <Save size={15} />
              <span>Save Character Sheet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
