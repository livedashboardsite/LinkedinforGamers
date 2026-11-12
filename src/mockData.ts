import type { UserProfile, Post, JobOpportunity, GuildTeam, NotificationItem } from './types';
import { 
  SENTINELS_LOGO, 
  CYBERFORGE_LOGO, 
  MYTHIC_LOGO, 
  APEX_NEBULA_LOGO, 
  USC_TROJAN_LOGO, 
  CLOUD9_LOGO, 
  CYBER_ARENA_BANNER 
} from './utils/logos';

export const initialProfile: UserProfile = {
  id: 'usr_vortex_01',
  gamertag: 'VORTEX',
  realName: 'Kai "Vortex" Chen',
  handle: '@vortex_fps',
  title: 'Tier 1 Valorant IGL // Gameplay Systems Dev (UE5)',
  bio: 'Competitive In-Game Leader & Gameplay Systems Developer. Ex-Sentinels Academy trialist. Specializing in high-pressure mid-round shotcalling and responsive Unreal Engine 5 networking. Looking for VCT Challengers rosters & Studio gameplay roles.',
  location: 'Los Angeles, CA // NA East/Central',
  level: 48,
  currentXp: 14200,
  nextLevelXp: 15000,
  avatarUrl: '/assets/avatar.jpg',
  bannerUrl: CYBER_ARENA_BANNER,
  status: 'LFR (Looking for Roster)',
  radarStats: [
    { label: 'Mechanics / Aim', value: 94, key: 'aim' },
    { label: 'Tactical IGL / Sense', value: 97, key: 'igl' },
    { label: 'Clutch / Composure', value: 92, key: 'clutch' },
    { label: 'Zero Tilt / PMA', value: 90, key: 'pma' },
    { label: 'Team Synergy', value: 95, key: 'synergy' },
    { label: 'Engine Dev (UE5)', value: 88, key: 'dev' },
  ],
  verifiedAccounts: [
    { platform: 'riot', name: 'Riot Games', badge: 'Radiant #142', rank: 'Top 0.01% NA', verified: true, color: '#ff4655' },
    { platform: 'faceit', name: 'Faceit CS2', badge: 'Level 10', rank: '2,940 ELO', verified: true, color: '#ff5500' },
    { platform: 'steam', name: 'Steam Veteran', badge: '12 Year Service', rank: '380 Games // 98% Badges', verified: true, color: '#171a21' },
    { platform: 'twitch', name: 'Twitch Partner', badge: 'Partnered Creator', rank: '48.5K Followers', verified: true, color: '#9146ff' },
    { platform: 'github', name: 'GitHub Dev', badge: 'Game Dev Core', rank: '1.2k Stars // UE5 Plugins', verified: true, color: '#6e40c9' },
  ],
  commendations: [
    { id: 'c1', name: 'Ice in the Veins (Clutch)', count: 184, icon: '❄️', description: 'Consistently wins 1v2 and 1v3 rounds in overtime with calm communication.' },
    { id: 'c2', name: 'Tactical Shotcaller (IGL)', count: 142, icon: '🧠', description: 'Calculated rotations, reads opponent utility cooldowns like a playbook.' },
    { id: 'c3', name: 'Zero Tilt / Positive Mental', count: 215, icon: '🛡️', description: 'Maintains elite focus, resets squad morale after round deficits.' },
    { id: 'c4', name: 'Frame-Perfect Code (UE5)', count: 96, icon: '⚡', description: 'Rock-solid client-side prediction and 0-alloc gameplay ticks.' },
  ],
  rosterHistory: [
    {
      id: 'rh1',
      role: 'Initiator / Secondary Caller',
      team: 'Sentinels Academy',
      logo: SENTINELS_LOGO,
      period: 'Jan 2025 - Present',
      tier: 'VCT NA Challengers',
      highlights: ['Top 4 Open Qualifier Stage 1', '+18.4 Clutch Success Rate', 'Spearheaded Sova lineup protocols']
    },
    {
      id: 'rh2',
      role: 'Lead Gameplay Engineer',
      team: 'CyberForge Studios (Indie)',
      logo: CYBERFORGE_LOGO,
      period: '2024 - 2025',
      tier: 'PC / Steam Title',
      highlights: ['Engineered multiplayer rollback netcode', 'Shipped Steam demo with 85,000 wishlist conversions']
    },
    {
      id: 'rh3',
      role: 'IGL & Duelist',
      team: 'Cloud9 Gauntlet Contender',
      logo: CLOUD9_LOGO,
      period: '2023 - 2024',
      tier: 'Tier 2 Circuit',
      highlights: ['Grand Finals Runner Up', 'Tournament MVP Award (1.38 VLR Rating)']
    }
  ],
  clips: [
    {
      id: 'clip_01',
      title: '1v4 Overtime Match Point Ace Clutch on Haven (Radiant Lobby)',
      game: 'Valorant',
      views: '124.5K',
      duration: '0:42',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      category: 'Clutch'
    },
    {
      id: 'clip_02',
      title: 'Unreal Engine 5.5 Custom Networked Hitscan & Motion Matching Demo',
      game: 'Indie Dev Showcase',
      views: '48.2K',
      duration: '1:15',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      category: 'Dev Showcase'
    },
    {
      id: 'clip_03',
      title: 'VCT Qualifier Round 24 Split-second Spike Ninja Defuse',
      game: 'Valorant',
      views: '89.1K',
      duration: '0:35',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
      category: 'Tournament OT'
    }
  ],
  hardware: [
    { category: 'Processor', name: 'Intel Core i9-14900KS // Custom Loop' },
    { category: 'Graphics Card', name: 'NVIDIA GeForce RTX 4090 24GB' },
    { category: 'Display', name: 'BenQ ZOWIE XL2566K 360Hz DyAc+' },
    { category: 'Input Mouse', name: 'Razer Viper V3 Pro @ 4000Hz Polling' },
    { category: 'Keyboard', name: 'Wooting 60HE (Rapid Trigger 0.1mm)' },
    { category: 'Surface Pad', name: 'Artisan Ninja FX Zero XSoft' }
  ]
};

export const initialPosts: Post[] = [
  {
    id: 'post_01',
    author: {
      name: 'Kai "Vortex" Chen',
      handle: '@vortex_fps',
      avatar: '/assets/avatar.jpg',
      title: 'Tier 1 Valorant IGL // Gameplay Systems Dev',
      isVerified: true,
      rankBadge: 'Radiant #142'
    },
    timeAgo: '2h ago',
    postType: 'lfg',
    content: '🚨 ANNOUNCEMENT // FREE AGENT & LFR: Mutually parting ways with Sentinels Academy on good terms. Huge love to the boys! \n\nI am officially entering the Free Agency transfer portal for VCT 2026 NA Challengers as an Initiator / IGL. Also open to Senior Combat Engineering contracts (UE5 C++). Verified stats & full match VODs pinned on my Character Sheet. DMs or scout inquiries open!',
    tags: ['#FreeAgent', '#VCTChallengers', '#ValorantEsports', '#LFG', '#UnrealEngine'],
    media: {
      type: 'image',
      url: '/assets/banner.jpg',
      caption: 'Main Stage VCT NA Open Qualifiers — Nexus Arena'
    },
    reactions: { gg: 342, clutch: 120, vouched: 95, brain: 64 },
    commentsCount: 3,
    sharesCount: 31,
    comments: [
      {
        id: 'c_01_1',
        author: {
          name: 'Tarik "The Major Champ" Celik',
          handle: '@tarik',
          avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
          rankBadge: 'Major MVP'
        },
        content: 'Huge vouch for Kai. Played multiple 10-mans with him and his mid-round info calling is legitimately Tier 1 level. Whoever signs him is getting an absolute general.',
        timeAgo: '1h ago',
        upvotes: 84
      },
      {
        id: 'c_01_2',
        author: {
          name: 'Sentinels Contenders Staff',
          handle: '@sentinels_staff',
          avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&auto=format&fit=crop&q=60',
          rankBadge: 'Scout'
        },
        content: 'Pleasure working with you this split Kai! Any Tier 2 roster looking for an disciplined IGL should reach out to him immediately.',
        timeAgo: '1h ago',
        upvotes: 42
      },
      {
        id: 'c_01_3',
        author: {
          name: 'Elena "Aegis" Rostova',
          handle: '@aegis_3d',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          rankBadge: 'Staff Pick'
        },
        content: 'Rooting for you Kai! Let me know if you need custom team jersey renders or streaming overlays.',
        timeAgo: '30m ago',
        upvotes: 19
      }
    ]
  },
  {
    id: 'post_02',
    author: {
      name: 'CyberForge Interactive',
      handle: '@cyberforge_games',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      title: 'AAA Indie Studio // Steam Top Wishlist',
      isVerified: true,
      rankBadge: 'Verified Studio'
    },
    timeAgo: '5h ago',
    postType: 'devlog',
    content: '🛠️ DEVLOG 08 // Netcode Breakthrough: We just stress-tested our 64-player tactical tactical shooter build across transatlantic servers (Frankfurt <-> Ashburn). Using deterministic rollback and spatial replication, packet overhead dropped by 42%. \n\nWe are actively hiring 2x Unreal Engine Network Engineers! See our listing in the Opportunities tab.',
    tags: ['#Gamedev', '#UnrealEngine5', '#Netcode', '#IndieDev', '#Hiring'],
    reactions: { gg: 512, clutch: 44, vouched: 180, brain: 290 },
    commentsCount: 2,
    sharesCount: 76,
    comments: [
      {
        id: 'c_02_1',
        author: {
          name: 'Kai "Vortex" Chen',
          handle: '@vortex_fps',
          avatar: '/assets/avatar.jpg',
          rankBadge: 'Radiant #142'
        },
        content: '42% packet overhead drop on transatlantic tick replication is incredible. Are you utilizing Iris replication system in UE5.5 or custom buffer serialization?',
        timeAgo: '4h ago',
        upvotes: 38
      },
      {
        id: 'c_02_2',
        author: {
          name: 'CyberForge Interactive',
          handle: '@cyberforge_games',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
          rankBadge: 'Studio Dev'
        },
        content: '@vortex_fps Hybrid Iris + custom quantized delta vectors for client projectiles! DM us if you want to test our build.',
        timeAgo: '3h ago',
        upvotes: 27
      }
    ]
  },
  {
    id: 'post_03',
    author: {
      name: 'Tarik "The Major Champ" Celik',
      handle: '@tarik',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
      title: 'Content Creator & Major Winner // Sentinels',
      isVerified: true,
      rankBadge: 'Major MVP'
    },
    timeAgo: '9h ago',
    postType: 'clip_drop',
    content: 'Vouched for @vortex_fps in 10-mans last night. His Haven mid-round calls are actually unhinged in the best way possible. Some org in VCT needs to lock him into a contract before qualifiers start. That 1v4 OT round was disgusting.',
    tags: ['#Vouched', '#ProScrims', '#Valorant', '#Respect'],
    reactions: { gg: 1840, clutch: 620, vouched: 840, brain: 310 },
    commentsCount: 1,
    sharesCount: 145,
    comments: [
      {
        id: 'c_03_1',
        author: {
          name: 'Kai "Vortex" Chen',
          handle: '@vortex_fps',
          avatar: '/assets/avatar.jpg',
          rankBadge: 'Radiant #142'
        },
        content: 'Appreciate the gas Tarik! GG on the Haven OT win, that flash assist was picture perfect.',
        timeAgo: '7h ago',
        upvotes: 112
      }
    ]
  },
  {
    id: 'post_04',
    author: {
      name: 'Elena "Aegis" Rostova',
      handle: '@aegis_3d',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      title: 'Lead Character & Weapon Artist // Riot Games Alumni',
      isVerified: true,
      rankBadge: 'Staff Pick'
    },
    timeAgo: '1d ago',
    postType: 'milestone',
    content: '🎉 Just dropped my new Sci-Fi Cybernetic Blade Bundle on the Nexus Asset Vault! 14k tris, game-ready, fully rigged with custom emissive shader graphs. Open for freelance weapon skin concepts for upcoming tactical titles.',
    tags: ['#GameArt', '#3DModeling', '#Blender3D', '#SubstancePainter', '#Freelance'],
    reactions: { gg: 420, clutch: 85, vouched: 130, brain: 154 },
    commentsCount: 0,
    sharesCount: 42,
    comments: []
  }
];

export const initialJobs: JobOpportunity[] = [
  {
    id: 'job_01',
    title: 'VCT NA Challengers - Starting Initiator / Flex',
    organization: 'Sentinels Contenders',
    orgLogo: SENTINELS_LOGO,
    category: 'esports',
    gameOrEngine: 'Valorant',
    salary: '$3,500 - $5,500 / mo + Prize Split',
    region: 'North America (Bootcamp in LA)',
    isRemote: false,
    requiredRank: 'Radiant (Peak 700+ RR)',
    tags: ['Tier 2 Esports', 'Paid Contract', 'Housing Included', 'VLR 1.15+'],
    description: 'Looking for an elite Initiator (Sova, Fade, Breach, Tejo) with proven Tier 2 tournament experience and vocal communication. Immediate scrim trials starting this Friday.',
    applicantsCount: 42,
    postedAgo: '3h ago',
    status: 'Urgent Trial',
    applied: false,
    saved: false
  },
  {
    id: 'job_02',
    title: 'Senior Multiplayer Network Engineer (Rollback / UE5)',
    organization: 'CyberForge Interactive',
    orgLogo: CYBERFORGE_LOGO,
    category: 'studio',
    gameOrEngine: 'Unreal Engine 5.5',
    salary: '$140,000 - $185,000 / yr + Equity',
    region: 'Worldwide / Remote',
    isRemote: true,
    tags: ['C++', 'Netcode', 'Spatial Replication', 'Steam FPS'],
    description: 'Lead the netcode architecture for our upcoming 64-player tactical tactical shooter. Experience writing custom replication graphs and lag compensation systems required.',
    applicantsCount: 19,
    postedAgo: '5h ago',
    status: 'Open',
    applied: false,
    saved: true
  },
  {
    id: 'job_03',
    title: 'Tier 1 CS2 In-Game Leader (IGL) // ESEA Premier',
    organization: 'Mythic Esports Club',
    orgLogo: MYTHIC_LOGO,
    category: 'esports',
    gameOrEngine: 'Counter-Strike 2',
    salary: '$4,000 / mo + Bootcamp Travel',
    region: 'NA Central / Dallas Server',
    isRemote: true,
    requiredRank: 'Faceit Level 10 (2,800+ ELO)',
    tags: ['CS2 Premier', 'Vocal Shotcaller', 'Anti-Stratting'],
    description: 'Seeking a calm, experienced shotcaller who can command execute timings, utility management, and mid-round adaptations. High composure required.',
    applicantsCount: 28,
    postedAgo: '1d ago',
    status: 'Final Interviews',
    applied: false,
    saved: false
  },
  {
    id: 'job_04',
    title: 'Lead Technical 3D Weapon & Shader Artist',
    organization: 'Apex Nebula Studios',
    orgLogo: APEX_NEBULA_LOGO,
    category: 'studio',
    gameOrEngine: 'Blender & Unreal Engine',
    salary: '$115,000 - $145,000 / yr',
    region: 'Remote (US / EU Timezones)',
    isRemote: true,
    tags: ['Hard Surface', 'Custom Shaders', 'Weapon Skins'],
    description: 'Design first-person weapon models, procedural inspection animations, and emissive sci-fi skin lines for our competitive hero shooter.',
    applicantsCount: 31,
    postedAgo: '2d ago',
    status: 'Open',
    applied: false,
    saved: false
  },
  {
    id: 'job_05',
    title: 'Dedicated Collegiate Valorant Head Coach',
    organization: 'USC Trojan Gaming Varsity',
    orgLogo: USC_TROJAN_LOGO,
    category: 'creator',
    gameOrEngine: 'Valorant',
    salary: '$55,000 / yr + Tuition Stipend',
    region: 'Los Angeles, CA',
    isRemote: false,
    tags: ['Collegiate VCT', 'VOD Review', 'Player Development'],
    description: 'Lead the university varsity Valorant program across CVAL tournaments, scout high school prospects, and manage weekly scrim structures.',
    applicantsCount: 14,
    postedAgo: '3d ago',
    status: 'Open',
    applied: false,
    saved: false
  }
];

export const initialGuilds: GuildTeam[] = [
  {
    id: 'guild_01',
    name: 'Sentinels Contenders',
    tag: 'SEN-ACAD',
    logo: SENTINELS_LOGO,
    banner: CYBER_ARENA_BANNER,
    division: 'VCT NA Challengers Tier 2',
    game: 'Valorant',
    membersCount: 12,
    openRoles: 2,
    description: 'The official academy & player incubation division for Sentinels. Competing across NA Challengers Open Qualifiers.',
    isFollowing: true
  },
  {
    id: 'guild_02',
    name: 'CyberForge Interactive',
    tag: 'CYBERFORGE',
    logo: CYBERFORGE_LOGO,
    banner: CYBER_ARENA_BANNER,
    division: 'AAA Indie Game Development',
    game: 'Unreal Engine 5.5',
    membersCount: 34,
    openRoles: 4,
    description: 'Veteran developers building next-generation tactical multiplayer experiences with deterministic physics and rollback netcode.',
    isFollowing: false
  },
  {
    id: 'guild_03',
    name: 'Mythic CS2 Roster',
    tag: 'MYTHIC',
    logo: MYTHIC_LOGO,
    banner: CYBER_ARENA_BANNER,
    division: 'ESEA Premier Division',
    game: 'Counter-Strike 2',
    membersCount: 8,
    openRoles: 1,
    description: 'Premier competitive CS2 roster fielding veteran North American talent. Focused on Major RMR qualification pathways.',
    isFollowing: false
  },
  {
    id: 'guild_04',
    name: 'USC Trojan Varsity Esports',
    tag: 'USC-VARSITY',
    logo: USC_TROJAN_LOGO,
    banner: CYBER_ARENA_BANNER,
    division: 'National Collegiate Athletic Gaming',
    game: 'Multi-Title Program',
    membersCount: 65,
    openRoles: 3,
    description: 'Premier collegiate gaming varsity organization offering athletic gaming scholarships, varsity gym facilities, and VCT pipelines.',
    isFollowing: false
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'scout',
    title: 'Scout Review: Sentinels Contenders',
    description: 'Lead Scout reviewed your Character Sheet and telemetry stats for the Starting Initiator trial.',
    timeAgo: '15m ago',
    read: false,
    actionTab: 'jobs'
  },
  {
    id: 'notif_2',
    type: 'vouch',
    title: 'New Commendation from Tarik',
    description: 'Tarik endorsed your "Ice in the Veins (Clutch)" attribute after last night\'s 10-man lobby.',
    timeAgo: '1h ago',
    read: false,
    actionTab: 'profile'
  },
  {
    id: 'notif_3',
    type: 'scrim',
    title: '5v5 Scrim Ready in NA Central',
    description: 'Sentinels Contenders accepted Bo3 Tactical Scrim on Haven/Ascent.',
    timeAgo: '2h ago',
    read: false,
    actionTab: 'scrims'
  },
  {
    id: 'notif_4',
    type: 'job',
    title: 'CyberForge Studio opened 2 roles',
    description: 'Senior Multiplayer Network Engineer (Rollback/UE5) is now accepting applications.',
    timeAgo: '5h ago',
    read: true,
    actionTab: 'jobs'
  }
];
