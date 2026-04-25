import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Zap, 
  ChevronRight, 
  Target, 
  Award, 
  BrainCircuit,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { MOCK_CANDIDATES } from './data/mockCandidates';
import { analyzeJD, scoreCandidate, simulateOutreachConvo } from './services/geminiService';
import { JobDescriptionAnalysis, ShortlistedCandidate } from './types';

// Components
import Sidebar from './components/Sidebar';
import JDInput from './components/JDInput';
import CandidateList from './components/CandidateList';
import CandidateDetails from './components/CandidateDetails';
import Insights from './components/Insights';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scout' | 'shortlist' | 'analytics' | 'architecture'>('scout');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<JobDescriptionAnalysis | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistedCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<ShortlistedCandidate | null>(null);

  const handleScout = async (jdText: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      // 1. Analyze JD
      const jdAnalysis = await analyzeJD(jdText);
      setAnalysis(jdAnalysis);

      // 2. Match with MOCK_CANDIDATES
      const matched = await Promise.all(
        MOCK_CANDIDATES.map(async (c) => {
          const score = await scoreCandidate(c, jdAnalysis);
          return { ...c, matchScore: score };
        })
      );

      // Sort by overall score
      const sorted = matched.sort((a, b) => b.matchScore.overall - a.matchScore.overall);
      setShortlist(sorted);
      setActiveTab('shortlist');
    } catch (err: any) {
      console.error('Scouting failed:', err);
      setError(err.message || 'The neural link encountered an interruption. Please verify your connection or system credentials.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSimulateOutreach = async (candidate: ShortlistedCandidate) => {
    if (!analysis || candidate.outreach) return;
    
    // Update local state to show loading if needed, or just run it
    const simulation = await simulateOutreachConvo(candidate, analysis);
    setShortlist(prev => prev.map(c => 
      c.id === candidate.id ? { ...c, outreach: simulation } : c
    ));
    
    // Update details view if it's open
    if (selectedCandidate?.id === candidate.id) {
      setSelectedCandidate(prev => prev ? { ...prev, outreach: simulation } : null);
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Background typographic element */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 opacity-[0.02]">
          <h1 className="text-[280px] font-black leading-[0.8] tracking-tighter uppercase">
            Scout<br/>AI
          </h1>
        </div>

        <header className="sticky top-0 z-20 bg-brand-bg/80 backdrop-blur-md border-b border-white/10 px-12 py-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
             {analysis && (
               <div className="flex flex-col">
                <span className="label-caps text-brand-primary text-[8px] mb-1">Active Pulse</span>
                <h2 className="stats-mono text-xl uppercase font-black tracking-tight">{analysis.title}</h2>
               </div>
             )}
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="label-caps text-[8px] opacity-30 mb-1">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                <span className="stats-mono text-xs uppercase">Operational</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <button className="brutalist-button-primary bg-white text-black hover:bg-brand-primary">
              System Logs
            </button>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 brutalist-card"
              >
                <AlertCircle size={18} />
                <p className="stats-mono text-xs uppercase tracking-wider">{error}</p>
                <button onClick={() => setError(null)} className="ml-auto hover:opacity-50">
                  <span className="stats-mono">CLOSE [X]</span>
                </button>
              </motion.div>
            )}

            {activeTab === 'scout' && (
              <motion.div
                key="scout"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="max-w-2xl border-l-2 border-brand-primary pl-10 py-4">
                  <span className="label-caps text-brand-primary mb-4 block">New Operations</span>
                  <h2 className="text-7xl font-light italic serif tracking-tight leading-tight">
                    Analyze. <br/>Compare. <br/>Engage.
                  </h2>
                  <p className="text-white/40 mt-8 text-lg leading-relaxed font-light">
                    Initiate the autonomous scouting protocol by inputting job specifications. Our agent will bridge the gap between requirements and talent.
                  </p>
                </div>
                <JDInput onScout={handleScout} isAnalyzing={isAnalyzing} />
              </motion.div>
            )}

            {activeTab === 'shortlist' && (
              <motion.div
                key="shortlist"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-12 lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h4 className="label-caps text-white/50">Found Matches [{shortlist.length}]</h4>
                      <button onClick={() => setActiveTab('scout')} className="label-caps text-[9px] text-brand-primary hover:underline transition-all">New Scout</button>
                    </div>
                    <CandidateList 
                      candidates={shortlist} 
                      onSelect={setSelectedCandidate}
                      selectedId={selectedCandidate?.id}
                    />
                  </div>
                  
                  <div className="col-span-12 lg:col-span-7 sticky top-32 self-start h-[calc(100vh-16rem)]">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="label-caps text-white/50">Candidate Intel</span>
                       <div className="flex-1 h-px bg-white/10" />
                    </div>
                    {selectedCandidate ? (
                      <CandidateDetails 
                        candidate={selectedCandidate} 
                        onSimulate={() => handleSimulateOutreach(selectedCandidate)}
                      />
                    ) : (
                      <div className="brutalist-card h-full flex flex-col items-center justify-center text-center p-20 space-y-8 bg-brand-surface border-dashed">
                        <div className="w-24 h-24 border border-white/5 flex items-center justify-center text-white/10 relative">
                          <Users size={48} />
                          <div className="absolute -top-12 text-[120px] font-black opacity-[0.02] select-none">00</div>
                        </div>
                        <div className="max-w-[300px] space-y-2">
                          <p className="label-caps text-white font-black">Selection Required</p>
                          <p className="text-sm font-light text-white/40 italic serif">The agent awaits a target selection for deep matching and engagement simulation.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-12"
              >
                <div className="max-w-2xl border-l-2 border-brand-primary pl-10 py-4">
                  <span className="label-caps text-brand-primary mb-4 block">System Blueprint</span>
                  <h2 className="text-6xl font-light italic serif tracking-tight leading-tight">
                    Technical <br/>Architecture.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: "01", title: "Ingestion", desc: "LLM parses JD into JSON schema", icon: Target },
                    { step: "02", title: "Matching", desc: "Multi-dimensional scoring engine", icon: Users },
                    { step: "03", title: "Synthesis", desc: "AI-to-AI interest simulation", icon: Sparkles },
                    { step: "04", title: "Ranking", desc: "Ranked output with full reasoning", icon: Award },
                  ].map((s, i) => (
                    <div key={i} className="brutalist-card p-8 bg-white/5 space-y-4">
                      <div className="stats-mono text-4xl font-black text-brand-primary/20">{s.step}</div>
                      <h4 className="label-caps text-brand-primary">{s.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed font-mono">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="brutalist-card p-12 bg-brand-surface relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 text-[140px] font-black opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">ENGINE</div>
                  <div className="relative z-10 space-y-8 max-w-2xl">
                    <div className="space-y-4">
                      <h3 className="stats-mono text-2xl font-black uppercase text-brand-primary">The Core Algorithm</h3>
                      <p className="font-serif italic text-xl text-white/60 leading-relaxed">
                        "The system utilizes a non-deterministic evaluation model where the recruiter's intent is primary. By simulating candidate outreach through a persona-driven LLM, we calculate 'Actual Interest' instead of 'Theoretical Fit'."
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/10">
                      <div>
                        <p className="label-caps mb-2 text-white/30">Vector Base</p>
                        <p className="stats-mono">1.2M Candidate Embeddings</p>
                      </div>
                      <div>
                        <p className="label-caps mb-2 text-white/30">Latency</p>
                        <p className="stats-mono">&lt; 850ms / Match Op</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Insights candidates={shortlist} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info bar */}
        <footer className="fixed bottom-0 left-64 right-0 h-16 border-t border-white/10 bg-brand-bg flex items-center px-12 justify-between z-30">
          <div className="label-caps text-[8px] opacity-20 font-mono italic">SYST // TALENT_SCOUT_CORE_v1.0.42</div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
            <div className="label-caps text-[9px] font-black tracking-[0.2em]">{new Date().toLocaleTimeString('en-US', { hour12: false })} UTC</div>
          </div>
          <div className="label-caps text-[8px] opacity-20">Secure Agent Link Established</div>
        </footer>
      </main>
    </div>
  );
}
