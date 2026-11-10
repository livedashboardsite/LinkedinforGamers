import React, { useState } from 'react';
import { 
  Send, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Brain, 
  MessageSquare, 
  Share2, 
  Radio, 
  Sparkles, 
  Trophy, 
  Check, 
  ThumbsUp, 
  Image as ImageIcon
} from 'lucide-react';
import type { Post, UserProfile, PostComment } from '../types';
import { sounds } from '../utils/audio';

interface ThePlazaProps {
  posts: Post[];
  profile: UserProfile;
  onAddPost: (newPost: Post) => void;
  onReaction: (postId: string, reactionType: 'gg' | 'clutch' | 'vouched' | 'brain') => void;
  onAddComment: (postId: string, commentText: string) => void;
  onSelectTab: (tab: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims') => void;
  onOpenAI?: () => void;
}

export const ThePlaza: React.FC<ThePlazaProps> = ({
  posts,
  profile,
  onAddPost,
  onReaction,
  onAddComment,
  onSelectTab,
  onOpenAI
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState<Post['postType']>('lfg');
  const [selectedTag, setSelectedTag] = useState<string>('#FreeAgent');
  const [includeBanner, setIncludeBanner] = useState(false);
  
  // Interactive comments state: which post comments are expanded
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post_01': true // First post comments open by default
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const availableTags = ['#FreeAgent', '#VCTChallengers', '#Gamedev', '#UE5Netcode', '#LFGScrims', '#ClutchClip'];

  const handlePostSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!postText.trim()) return;

    sounds.playSuccess();

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        name: profile.realName,
        handle: profile.handle,
        avatar: profile.avatarUrl,
        title: profile.title,
        isVerified: true,
        rankBadge: profile?.verifiedAccounts?.[0]?.badge || 'Radiant #142'
      },
      timeAgo: 'Just now',
      postType,
      content: postText,
      tags: [selectedTag, '#NexusVerified'],
      media: includeBanner ? {
        type: 'image',
        url: profile.bannerUrl,
        caption: 'Verified Match Highlight & Telemetry Snapshot'
      } : undefined,
      reactions: { gg: 1, clutch: 0, vouched: 1, brain: 0 },
      commentsCount: 0,
      sharesCount: 0,
      comments: []
    };

    onAddPost(newPost);
    setPostText('');
    setIncludeBanner(false);
  };

  // Keyboard shortcut to broadcast: Cmd/Ctrl + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handlePostSubmit();
    }
  };

  const toggleComments = (postId: string) => {
    sounds.playClick();
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    sounds.playSuccess();
    onAddComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleSharePost = (postId: string) => {
    sounds.playSuccess();
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(`${window.location.origin}/#plaza-${postId}`).catch(() => {});
      }
    } catch {
      // safe fallback for mobile
    }
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2500);
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'roster_move') return post.postType === 'roster_move' || post.postType === 'lfg';
    if (filter === 'devlog') return post.postType === 'devlog';
    if (filter === 'clip_drop') return post.postType === 'clip_drop';
    return true;
  });

  return (
    <div className="plaza-layout">
      {/* Main Feed Column */}
      <div className="plaza-feed-column">
        {/* Streamlined Post Creation Box */}
        <div className="glass-card compose-card">
          <div className="compose-top-row">
            <div className="compose-avatar-frame">
              <img src={profile.avatarUrl} alt={profile.gamertag} className="compose-avatar" />
              <span className="compose-online-dot" />
            </div>
            <div className="compose-input-wrapper">
              <textarea
                placeholder="Broadcast a milestone, scrim result, devlog update, or LFG availability... (⌘+Enter to broadcast)"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                className="compose-textarea"
              />
            </div>
          </div>

          <div className="compose-controls-row">
            {/* Post Category Segmented Pills */}
            <div className="post-type-selector">
              <button
                type="button"
                className={`type-chip ${postType === 'lfg' ? 'active' : ''}`}
                onClick={() => { sounds.playClick(); setPostType('lfg'); }}
              >
                <Radio size={12} />
                <span>LFG / Free Agent</span>
              </button>
              <button
                type="button"
                className={`type-chip ${postType === 'devlog' ? 'active' : ''}`}
                onClick={() => { sounds.playClick(); setPostType('devlog'); }}
              >
                <Sparkles size={12} />
                <span>Devlog</span>
              </button>
              <button
                type="button"
                className={`type-chip ${postType === 'clip_drop' ? 'active' : ''}`}
                onClick={() => { sounds.playClick(); setPostType('clip_drop'); }}
              >
                <Zap size={12} />
                <span>Clutch Clip</span>
              </button>
            </div>

            <div className="compose-actions-right">
              <button
                type="button"
                className={`compose-attach-btn ${includeBanner ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setIncludeBanner(!includeBanner);
                }}
                title="Attach match banner snapshot"
              >
                <ImageIcon size={13} />
                <span>{includeBanner ? 'Banner Attached' : 'Attach Banner'}</span>
              </button>

              <button
                onClick={() => handlePostSubmit()}
                disabled={!postText.trim()}
                className="btn-glow-primary compose-submit-btn"
              >
                <Send size={13} />
                <span>Broadcast</span>
              </button>
            </div>
          </div>

          {/* Quick Tag Pills (Cleaned up horizontal scroll) */}
          <div className="compose-tags-strip">
            <span className="tags-label">Tags:</span>
            <div className="tags-scroll-row">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-pill ${selectedTag === tag ? 'selected' : ''}`}
                  onClick={() => { sounds.playHover(); setSelectedTag(tag); }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Feed Filter Bar */}
        <div className="feed-filter-bar">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilter('all'); }}
            >
              All Signals
            </button>
            <button 
              className={`filter-btn ${filter === 'roster_move' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilter('roster_move'); }}
            >
              Roster & Free Agents
            </button>
            <button 
              className={`filter-btn ${filter === 'devlog' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilter('devlog'); }}
            >
              Game Devlogs
            </button>
            <button 
              className={`filter-btn ${filter === 'clip_drop' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setFilter('clip_drop'); }}
            >
              Clutch VODs
            </button>
          </div>
        </div>

        {/* Post Items */}
        <div className="posts-list">
          {filteredPosts.map((post) => {
            const isCommentsOpen = !!expandedComments[post.id];
            const currentComments = post.comments || [];

            return (
              <article key={post.id} className="glass-card post-card animate-fade-in">
                {/* Post Header */}
                <div className="post-header">
                  <div className="post-author-block">
                    <img src={post.author.avatar} alt={post.author.name} className="post-author-avatar" />
                    <div className="post-author-meta">
                      <div className="post-name-row">
                        <span className="post-author-name">{post.author.name}</span>
                        {post.author.isVerified && (
                          <span title="Verified Gamer Passport" style={{ display: 'inline-flex' }}>
                            <ShieldCheck size={14} className="verified-icon" />
                          </span>
                        )}
                        {post.author.rankBadge && (
                          <span className="post-rank-badge">{post.author.rankBadge}</span>
                        )}
                      </div>
                      <div className="post-author-sub">
                        <span>{post.author.title}</span>
                        <span className="dot-divider">•</span>
                        <span className="post-time">{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="post-category-tag">
                    {post.postType === 'lfg' && <span className="cat-pill lfg-pill">LFG // FREE AGENT</span>}
                    {post.postType === 'devlog' && <span className="cat-pill devlog-pill">DEVLOG // UE5</span>}
                    {post.postType === 'clip_drop' && <span className="cat-pill clip-pill">CLUTCH DROP</span>}
                    {post.postType === 'milestone' && <span className="cat-pill milestone-pill">ASSET VAULT</span>}
                  </div>
                </div>

                {/* Post Body */}
                <div className="post-content">
                  <p>{post.content}</p>
                </div>

                {/* Media Preview if exists */}
                {post.media && (
                  <div className="post-media-container">
                    <img src={post.media.url} alt="Post media" className="post-media-img" />
                    {post.media.caption && (
                      <div className="post-media-caption">{post.media.caption}</div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="post-tags-list">
                  {(post.tags || []).map((t, idx) => (
                    <span key={idx} className="post-tag-item">{t}</span>
                  ))}
                </div>

                {/* Interactive Reactions Bar */}
                <div className="post-actions-bar">
                  <div className="reactions-group">
                    <button
                      className={`reaction-btn ${post.userReaction === 'gg' ? 'active-reaction' : ''}`}
                      onClick={() => {
                        sounds.playClick();
                        onReaction(post.id, 'gg');
                      }}
                      title="Good Game (GG)"
                    >
                      <Flame size={15} />
                      <span>GG</span>
                      <span className="reaction-count">{post.reactions?.gg ?? 0}</span>
                    </button>

                    <button
                      className={`reaction-btn ${post.userReaction === 'clutch' ? 'active-reaction' : ''}`}
                      onClick={() => {
                        sounds.playClick();
                        onReaction(post.id, 'clutch');
                      }}
                      title="Ice in the Veins / Clutch"
                    >
                      <Zap size={15} />
                      <span>Clutch</span>
                      <span className="reaction-count">{post.reactions?.clutch ?? 0}</span>
                    </button>

                    <button
                      className={`reaction-btn ${post.userReaction === 'vouched' ? 'active-reaction' : ''}`}
                      onClick={() => {
                        sounds.playClick();
                        onReaction(post.id, 'vouched');
                      }}
                      title="Teammate Vouched"
                    >
                      <ShieldCheck size={15} />
                      <span>Vouched</span>
                      <span className="reaction-count">{post.reactions?.vouched ?? 0}</span>
                    </button>

                    <button
                      className={`reaction-btn ${post.userReaction === 'brain' ? 'active-reaction' : ''}`}
                      onClick={() => {
                        sounds.playClick();
                        onReaction(post.id, 'brain');
                      }}
                      title="200 IQ Shotcall"
                    >
                      <Brain size={15} />
                      <span>Big Brain</span>
                      <span className="reaction-count">{post.reactions?.brain ?? 0}</span>
                    </button>
                  </div>

                  <div className="post-meta-counts">
                    <button 
                      className={`meta-count-btn ${isCommentsOpen ? 'active' : ''}`}
                      onClick={() => toggleComments(post.id)}
                      title="Toggle Comments"
                    >
                      <MessageSquare size={14} />
                      <span>{post.commentsCount || currentComments.length}</span>
                    </button>
                    <button 
                      className="meta-count-btn" 
                      onClick={() => handleSharePost(post.id)}
                      title="Share Post Link"
                    >
                      {copiedPostId === post.id ? <Check size={14} className="text-emerald" /> : <Share2 size={14} />}
                      <span>{copiedPostId === post.id ? 'Copied' : post.sharesCount}</span>
                    </button>
                  </div>
                </div>

                {/* Expandable Comments Section */}
                {isCommentsOpen && (
                  <div className="post-comments-section animate-fade-in">
                    {/* Add Comment Input */}
                    <form 
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      className="comment-form-row"
                    >
                      <img src={profile.avatarUrl} alt="Avatar" className="comment-my-avatar" />
                      <input
                        type="text"
                        placeholder="Write a vouch or reply..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        className="comment-text-input"
                      />
                      <button 
                        type="submit" 
                        disabled={!commentInputs[post.id]?.trim()}
                        className="comment-submit-btn"
                      >
                        Reply
                      </button>
                    </form>

                    {/* Existing Comments */}
                    <div className="comments-stream">
                      {currentComments.length === 0 ? (
                        <div className="comments-empty">
                          <span>No replies yet. Be the first to vouch or comment!</span>
                        </div>
                      ) : (
                        currentComments.map((c: PostComment) => (
                          <div key={c.id} className="comment-item">
                            <img src={c.author.avatar} alt={c.author.name} className="comment-author-avatar" />
                            <div className="comment-bubble">
                              <div className="comment-bubble-header">
                                <div className="comment-author-info">
                                  <span className="comment-author-name">{c.author.name}</span>
                                  {c.author.rankBadge && (
                                    <span className="comment-badge">{c.author.rankBadge}</span>
                                  )}
                                </div>
                                <span className="comment-time">{c.timeAgo}</span>
                              </div>
                              <p className="comment-body">{c.content}</p>
                              <div className="comment-footer">
                                <button 
                                  className="comment-upvote-btn"
                                  onClick={() => sounds.playClick()}
                                >
                                  <ThumbsUp size={11} />
                                  <span>{c.upvotes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Real-Time Gaming Portal */}
      <aside className="plaza-sidebar">
        {/* Free Agency Transfer Portal */}
        <div className="glass-card sidebar-card">
          <div className="sidebar-card-header">
            <Radio className="pulse-icon" size={15} />
            <h3 className="sidebar-card-title">TRANSFER PORTAL</h3>
            <span className="live-badge">LIVE</span>
          </div>

          <div className="transfer-list">
            <div className="transfer-item">
              <span className="transfer-tag roster-in">SIGNING</span>
              <div className="transfer-detail">
                <strong>Zekken</strong> extended contract with <strong>Sentinels</strong> through 2027.
              </div>
              <span className="transfer-time">1h ago</span>
            </div>

            <div className="transfer-item">
              <span className="transfer-tag roster-fa">FREE AGENT</span>
              <div className="transfer-detail">
                <strong>Vortex // Kai</strong> listed on NA Challengers Free Agency board.
              </div>
              <span className="transfer-time">2h ago</span>
            </div>

            <div className="transfer-item">
              <span className="transfer-tag roster-bounty">BOUNTY</span>
              <div className="transfer-detail">
                <strong>CyberForge</strong> offered $4,000 for UE5 Rollback Network Specialist.
              </div>
              <span className="transfer-time">5h ago</span>
            </div>
          </div>

          <button 
            className="sidebar-action-btn"
            onClick={() => onSelectTab('jobs')}
          >
            Explore Roster Openings →
          </button>
        </div>

        {/* AI Scout Quick Card */}
        {onOpenAI && (
          <div className="glass-card sidebar-card ai-sidebar-card">
            <div className="sidebar-card-header">
              <Sparkles size={15} className="text-emerald" />
              <h3 className="sidebar-card-title">AI CAREER CO-PILOT</h3>
            </div>
            <p className="scrim-desc">
              Get an instant Tier 1 Esports Scout review of your Character Sheet or draft tailored cover pitches.
            </p>
            <button 
              className="btn-glow-primary scrim-init-btn"
              onClick={onOpenAI}
            >
              Launch AI Scout Audit
            </button>
          </div>
        )}

        {/* Quick Scrim Matchmaker Card */}
        <div className="glass-card sidebar-card scrim-sidebar-card">
          <div className="sidebar-card-header">
            <Trophy size={15} className="text-gold" />
            <h3 className="sidebar-card-title">FAST SCRIM QUEUE</h3>
          </div>
          <p className="scrim-desc">
            Find high-ELO 5v5 tactical scrims or 10-mans with verified MMR anti-tilt guarantee.
          </p>
          <div className="scrim-quick-stats">
            <div className="scrim-stat-pill">
              <span className="stat-label">Active Teams:</span>
              <span className="stat-value text-cyan">28 In Queue</span>
            </div>
            <div className="scrim-stat-pill">
              <span className="stat-label">Avg Ping:</span>
              <span className="stat-value text-emerald">14ms NA</span>
            </div>
          </div>
          <button 
            className="btn-glow-primary scrim-init-btn"
            onClick={() => onSelectTab('scrims')}
          >
            Enter Tactical Scrim Radar
          </button>
        </div>
      </aside>
    </div>
  );
};
