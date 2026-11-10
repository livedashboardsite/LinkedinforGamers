import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  X, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Code2, 
  Trophy, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import type { UserProfile, JobOpportunity } from '../types';
import { sounds } from '../utils/audio';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  jobs: JobOpportunity[];
  onApplyPitch?: (jobId: string, pitchText: string) => void;
}

export const AIModal: React.FC<AIModalProps> = ({
  isOpen,
  onClose,
  profile,
  jobs,
  onApplyPitch
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'pitch' | 'architecture'>('audit');
  
  // Audit State
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  // Pitch State
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [selectedTone, setSelectedTone] = useState<'tactical' | 'aggressive' | 'technical'>('tactical');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen) return null;

  const handleRunAudit = () => {
    sounds.playClick();
    setIsAuditing(true);
    setAuditDone(false);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditDone(true);
      sounds.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00F5D4', '#FF206E', '#FBFF12']
      });
    }, 1400);
  };

  const handleGeneratePitch = () => {
    sounds.playClick();
    setIsGeneratingPitch(true);
    setCopiedPitch(false);

    const targetJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

    setTimeout(() => {
      setIsGeneratingPitch(false);
      sounds.playSuccess();

      let pitch = '';
      if (selectedTone === 'tactical') {
        pitch = `Dear ${targetJob.organization} Scouting Staff,\n\nI am formally submitting my verified Character Sheet for the ${targetJob.title} opening. As a ${profile.verifiedAccounts[0]?.badge || 'Radiant'} competitor with a verified 97/100 Tactical IGL and 94/100 Mechanics rating on Nexus, I specialize in disciplined mid-round shotcalling and round-reset composure. In my recent trial with Sentinels Academy, I held an 18.4% clutch win rate in overtime rounds. My telemetry logs, crosshair placement stats, and uncompressed match VODs are verified on my passport.\n\nI am ready for immediate scrim trials.\n\nRespectfully,\n${profile.realName} (${profile.gamertag})`;
      } else if (selectedTone === 'aggressive') {
        pitch = `To ${targetJob.organization} Management,\n\nIf you need an immediate impact player for ${targetJob.title}, look at my match telemetry: Radiant #142, 94 Aim rating, and over 180 verified overtime clutch commendations. I do not play for stats—I play for round wins and late-game rounds where most crumble. My character sheet has zero fluff and full API verification from Riot and Steam. Put me in the server this Friday against your current starters and check the scoreboard.\n\nReady when you are.\n${profile.gamertag}`;
      } else {
        pitch = `Greetings ${targetJob.organization} Engineering & Production Leads,\n\nI am writing to express my strong interest in the ${targetJob.title} position. Combining high-tier competitive gaming insight (${profile.verifiedAccounts[0]?.badge}) with deep Unreal Engine 5 multiplayer systems development (88/100 Matrix), I bridge the gap between pro players and game feel. I have engineered deterministic rollback netcode, custom client prediction, and low-latency networking architectures that cut packet replication overhead by 42%. Attached is my live telemetry portfolio and GitHub repositories.\n\nBest regards,\n${profile.realName}`;
      }

      setGeneratedPitch(pitch);
    }, 1100);
  };

  const handleCopyPitch = () => {
    sounds.playSuccess();
    navigator.clipboard?.writeText(generatedPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-card modal-container ai-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="ai-badge-icon">
              <Bot size={20} className="text-emerald" />
            </div>
            <div>
              <h2 className="modal-title">NEXUS AI SCOUT & CAREER CO-PILOT</h2>
              <span className="modal-subtitle">Autonomous Telemetry Analytics & Pro Career Intelligence</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Sub-Nav Tabs */}
        <div className="ai-modal-tabs">
          <button 
            className={`ai-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => { sounds.playClick(); setActiveTab('audit'); }}
          >
            <Trophy size={15} />
            <span>Profile Scout Audit</span>
          </button>
          <button 
            className={`ai-tab-btn ${activeTab === 'pitch' ? 'active' : ''}`}
            onClick={() => { sounds.playClick(); setActiveTab('pitch'); }}
          >
            <Zap size={15} />
            <span>AI Application Pitch</span>
          </button>
          <button 
            className={`ai-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => { sounds.playClick(); setActiveTab('architecture'); }}
          >
            <Code2 size={15} />
            <span>Full-Stack AI Blueprint</span>
          </button>
        </div>

        {/* Tab 1: Scout Audit */}
        {activeTab === 'audit' && (
          <div className="ai-tab-content">
            <div className="ai-audit-hero">
              <div className="ai-hero-meta">
                <span className="ai-tag-pill">MULTIMODAL TELEMETRY AGENT</span>
                <h3 className="ai-section-title">Esports Franchise Scout Evaluation</h3>
                <p className="ai-desc">
                  Simulates a Tier 1 Scouting Director evaluating your verified Riot/Steam rank, radar polygon stats, match clutch rate, and tournament history.
                </p>
              </div>
              <button 
                className="btn-glow-primary ai-action-btn"
                onClick={handleRunAudit}
                disabled={isAuditing}
              >
                {isAuditing ? (
                  <>
                    <Sparkles className="animate-spin" size={16} />
                    <span>Analyzing Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Bot size={16} />
                    <span>Run AI Scout Audit</span>
                  </>
                )}
              </button>
            </div>

            {auditDone ? (
              <div className="ai-audit-results animate-fade-in">
                {/* Scout Score Banner */}
                <div className="audit-score-card">
                  <div className="score-badge-circle">
                    <span className="score-letter">A+</span>
                    <span className="score-val">96.8</span>
                  </div>
                  <div className="score-info">
                    <div className="score-tier-tag">TIER 1 PROSPECT // VCT CHALLENGERS READY</div>
                    <h4 className="score-headline">"Exceptional shotcaller with rare high-pressure overtime poise."</h4>
                    <span className="score-sub">Scouted against 2,400+ active Radiant & Contenders profiles.</span>
                  </div>
                </div>

                {/* Analysis Grid */}
                <div className="audit-points-grid">
                  <div className="audit-box strength-box">
                    <div className="box-header text-emerald">
                      <ShieldCheck size={16} />
                      <strong>Verified Core Strengths</strong>
                    </div>
                    <ul>
                      <li><strong>IGL Cohesion (97/100):</strong> Mid-round rotations and utility timing place in the 99.4th percentile.</li>
                      <li><strong>Clutch Composure (92/100):</strong> 18.4% 1vX win-rate under 2-man deficits in Tier 2 events.</li>
                      <li><strong>Hybrid Engineering (88/100):</strong> Rare dual capability in both pro shotcalling and UE5 netcode systems.</li>
                    </ul>
                  </div>

                  <div className="audit-box growth-box">
                    <div className="box-header text-lemon">
                      <Zap size={16} />
                      <strong>Scout Recommendations</strong>
                    </div>
                    <ul>
                      <li>Upload 1 additional 1080p 60fps POV VOD showcasing Haven Defense setup comms.</li>
                      <li>Expand secondary Initiator pool (Tejo / Fade) to compliment primary Sova mastery.</li>
                      <li>Target upcoming Friday scrim slots with Sentinels Contenders or Mythic.</li>
                    </ul>
                  </div>
                </div>

                {/* Recommended Matches */}
                <div className="audit-recommended-orgs">
                  <span className="rec-label">Top Recommended Roster & Studio Openings:</span>
                  <div className="rec-orgs-chips">
                    <span className="rec-chip">Sentinels Contenders (98% Synergy)</span>
                    <span className="rec-chip">CyberForge UE5 Netcode (94% Synergy)</span>
                    <span className="rec-chip">Cloud9 Challengers (91% Synergy)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ai-audit-placeholder">
                <Bot size={44} className="placeholder-icon text-muted" />
                <h4>No Audit Executed Yet</h4>
                <p>Click "Run AI Scout Audit" above to synthesize your stats into a complete scouting dossier.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Application Pitch */}
        {activeTab === 'pitch' && (
          <div className="ai-tab-content">
            <div className="pitch-controls-row">
              <div className="pitch-control-item">
                <label className="pitch-lbl">Select Target Opportunity:</label>
                <select 
                  value={selectedJobId} 
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="pitch-select"
                >
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>
                      {j.organization} — {j.title} ({j.salary})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pitch-control-item">
                <label className="pitch-lbl">Tone & Angle:</label>
                <div className="tone-selector">
                  <button 
                    type="button" 
                    className={`tone-btn ${selectedTone === 'tactical' ? 'active' : ''}`}
                    onClick={() => setSelectedTone('tactical')}
                  >
                    Tactical Team Player
                  </button>
                  <button 
                    type="button" 
                    className={`tone-btn ${selectedTone === 'aggressive' ? 'active' : ''}`}
                    onClick={() => setSelectedTone('aggressive')}
                  >
                    Competitive Alpha
                  </button>
                  <button 
                    type="button" 
                    className={`tone-btn ${selectedTone === 'technical' ? 'active' : ''}`}
                    onClick={() => setSelectedTone('technical')}
                  >
                    Systems Specialist
                  </button>
                </div>
              </div>

              <button 
                className="btn-glow-primary pitch-generate-btn"
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch}
              >
                {isGeneratingPitch ? (
                  <>
                    <Sparkles className="animate-spin" size={15} />
                    <span>Drafting...</span>
                  </>
                ) : (
                  <>
                    <Zap size={15} />
                    <span>Generate Pitch</span>
                  </>
                )}
              </button>
            </div>

            {generatedPitch ? (
              <div className="pitch-output-box animate-fade-in">
                <div className="pitch-output-header">
                  <div className="pitch-badge">
                    <Sparkles size={14} className="text-emerald" />
                    <span>AI-Generated Cover Pitch for {jobs.find(j => j.id === selectedJobId)?.organization}</span>
                  </div>
                  <button className="copy-pitch-btn" onClick={handleCopyPitch}>
                    {copiedPitch ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea 
                  className="pitch-textarea"
                  value={generatedPitch}
                  onChange={(e) => setGeneratedPitch(e.target.value)}
                  rows={8}
                />

                <div className="pitch-actions-footer">
                  <span className="pitch-tip">Tip: You can edit the text directly before copying or applying!</span>
                  {onApplyPitch && (
                    <button 
                      className="btn-glow-primary apply-now-btn"
                      onClick={() => {
                        sounds.playSuccess();
                        onApplyPitch(selectedJobId, generatedPitch);
                        onClose();
                      }}
                    >
                      <span>Insert Directly into Application</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="ai-audit-placeholder">
                <Zap size={44} className="placeholder-icon text-muted" />
                <h4>Generate a Custom Application Pitch</h4>
                <p>Select a job and tone, then click "Generate Pitch" to create an impactful submission.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Full-Stack AI Blueprint */}
        {activeTab === 'architecture' && (
          <div className="ai-tab-content blueprint-content">
            <div className="blueprint-header">
              <span className="ai-tag-pill">BACKEND & AI ARCHITECTURE</span>
              <h3 className="ai-section-title">How To Wire This Up to Live AI & Databases</h3>
              <p className="ai-desc">
                Follow this architecture to drop this frontend into GitHub, deploy to Vercel, and connect Supabase / PostgreSQL + Google Gemini or OpenAI.
              </p>
            </div>

            <div className="blueprint-pipeline-row">
              <div className="bp-step">
                <span className="bp-num">1</span>
                <strong>Frontend (Vite / React)</strong>
                <p>User interactions, audio synthesis, dynamic radar stats, and verified game passports.</p>
              </div>
              <div className="bp-arrow">→</div>
              <div className="bp-step">
                <span className="bp-num">2</span>
                <strong>API Layer (Next.js / Express)</strong>
                <p>Vercel Serverless Functions or Node backend with rate limiting & JWT session checks.</p>
              </div>
              <div className="bp-arrow">→</div>
              <div className="bp-step">
                <span className="bp-num">3</span>
                <strong>Gemini / OpenAI API</strong>
                <p>Multimodal clip analysis, prompt orchestration, and personalized scouting feedback.</p>
              </div>
              <div className="bp-arrow">→</div>
              <div className="bp-step">
                <span className="bp-num">4</span>
                <strong>Supabase / Postgres (pgvector)</strong>
                <p>Persistent storage for profiles, comments, jobs, and vector embeddings for matchmaking.</p>
              </div>
            </div>

            <div className="blueprint-code-block">
              <div className="code-block-header">
                <span>api/ai-scout.ts (Vercel Serverless Function / Next.js API Route)</span>
                <span className="code-lang">TypeScript</span>
              </div>
              <pre className="code-snippet">
{`import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { profile, targetJob } = await req.json();

  const prompt = \`You are a Tier 1 Esports Scout. Evaluate this player:
Gamertag: \${profile.gamertag}
Aim: \${profile.radarStats.find(s => s.key === 'aim')?.value}/100
IGL Sense: \${profile.radarStats.find(s => s.key === 'igl')?.value}/100
Clutch: \${profile.radarStats.find(s => s.key === 'clutch')?.value}/100
Target Role: \${targetJob.title} at \${targetJob.organization}

Generate: 
1) Scout Grade (A+ to C)
2) 3 tactical strengths
3) 2 growth recommendations
4) Custom application pitch\`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
  });

  return Response.json({ result: response.text });
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
