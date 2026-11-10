import React from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  ShieldCheck, 
  Crosshair, 
  Briefcase, 
  X
} from 'lucide-react';
import type { NotificationItem } from '../types';
import { sounds } from '../utils/audio';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'scout': return <ShieldCheck size={16} className="text-emerald" />;
      case 'scrim': return <Crosshair size={16} className="text-cyan" />;
      case 'vouch': return <ShieldCheck size={16} className="text-rose" />;
      case 'job': return <Briefcase size={16} className="text-gold" />;
      default: return <Bell size={16} className="text-muted" />;
    }
  };

  const list = notifications || [];
  const unreadCount = list.filter(n => !n.read).length;

  return (
    <div className="notif-dropdown-wrapper">
      <div className="glass-card notif-dropdown-card animate-fade-in">
        {/* Header */}
        <div className="notif-header">
          <div className="notif-title-row">
            <Bell size={16} className="text-rose" />
            <span className="notif-title">NOTIFICATIONS</span>
            {unreadCount > 0 && (
              <span className="notif-pill-unread">{unreadCount} New</span>
            )}
          </div>
          <div className="notif-actions-top">
            {unreadCount > 0 && (
              <button 
                className="notif-top-btn" 
                onClick={() => { sounds.playClick(); onMarkAllRead(); }}
                title="Mark all as read"
              >
                <CheckCheck size={14} />
              </button>
            )}
            <button 
              className="notif-top-btn" 
              onClick={() => { sounds.playClick(); onClearAll(); }}
              title="Clear all notifications"
            >
              <Trash2 size={14} />
            </button>
            <button className="notif-top-btn" onClick={onClose}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="notif-list">
          {list.length === 0 ? (
            <div className="notif-empty">
              <span>All caught up! No active alerts.</span>
            </div>
          ) : (
            list.map((n) => (
              <div 
                key={n.id}
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  onSelectNotification(n);
                }}
              >
                <div className="notif-icon-box">{getIcon(n.type)}</div>
                <div className="notif-content">
                  <div className="notif-headline-row">
                    <span className="notif-item-title">{n.title}</span>
                    <span className="notif-time">{n.timeAgo}</span>
                  </div>
                  <p className="notif-desc">{n.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="notif-footer">
          <span>Synced with Riot & Steam Telemetry</span>
        </div>
      </div>
    </div>
  );
};
