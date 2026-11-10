export interface VerifiedAccount {
  platform: 'riot' | 'steam' | 'faceit' | 'twitch' | 'github' | 'discord';
  name: string;
  badge: string;
  rank: string;
  verified: boolean;
  color: string;
}

export interface RadarStat {
  label: string;
  value: number; // 0 - 100
  key: string;
}

export interface Commendation {
  id: string;
  name: string;
  count: number;
  icon: string;
  description: string;
  userVouched?: boolean;
}

export interface RosterExperience {
  id: string;
  role: string;
  team: string;
  logo: string;
  period: string;
  tier: string;
  highlights: string[];
}

export interface ClipItem {
  id: string;
  title: string;
  game: string;
  views: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  category: 'Clutch' | 'Dev Showcase' | 'Tournament OT';
}

export interface UserProfile {
  id: string;
  gamertag: string;
  realName: string;
  handle: string;
  title: string;
  bio: string;
  location: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  avatarUrl: string;
  bannerUrl: string;
  status: 'LFR (Looking for Roster)' | 'Contracted' | 'Open to Studio Roles' | 'Sub Only';
  radarStats: RadarStat[];
  verifiedAccounts: VerifiedAccount[];
  commendations: Commendation[];
  rosterHistory: RosterExperience[];
  clips: ClipItem[];
  hardware: { category: string; name: string }[];
}

export interface PostComment {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    rankBadge?: string;
  };
  content: string;
  timeAgo: string;
  upvotes: number;
  userUpvoted?: boolean;
}

export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    title: string;
    isVerified: boolean;
    rankBadge?: string;
  };
  timeAgo: string;
  content: string;
  postType: 'milestone' | 'roster_move' | 'devlog' | 'clip_drop' | 'lfg';
  tags: string[];
  media?: {
    type: 'image' | 'video' | 'card';
    url: string;
    caption?: string;
  };
  reactions: {
    gg: number;
    clutch: number;
    vouched: number;
    brain: number;
  };
  userReaction?: 'gg' | 'clutch' | 'vouched' | 'brain';
  commentsCount: number;
  sharesCount: number;
  comments?: PostComment[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  organization: string;
  orgLogo: string;
  category: 'esports' | 'studio' | 'creator' | 'bounty';
  gameOrEngine: string;
  salary: string;
  region: string;
  isRemote: boolean;
  requiredRank?: string;
  tags: string[];
  description: string;
  applicantsCount: number;
  postedAgo: string;
  status: 'Open' | 'Urgent Trial' | 'Final Interviews';
  applied?: boolean;
  saved?: boolean;
}

export interface GuildTeam {
  id: string;
  name: string;
  tag: string;
  logo: string;
  banner: string;
  division: string;
  game: string;
  membersCount: number;
  openRoles: number;
  description: string;
  isFollowing?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'scout' | 'scrim' | 'vouch' | 'job' | 'system';
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  actionTab?: 'plaza' | 'profile' | 'jobs' | 'guilds' | 'scrims';
}
