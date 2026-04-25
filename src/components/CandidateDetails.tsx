import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShortlistedCandidate } from '../types';
import { 
  Award, 
  BrainCircuit, 
  ChevronRight, 
  MessageSquare, 
  Sparkles, 
  History,
  TrendingUp,
  Fingerprint,
  Loader2,
  Send
} from 'lucide-react';

interface CandidateDetailsProps {
  candidate: ShortlistedCandidate;
  onSimulate: () => void;
}

export default function CandidateDetails({ candidate, onSimulate }: CandidateDetailsProps) {
  const [simulating, setSimulating] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'match' | 'outreach'>('match');

  const runSimulation = async () => {
    setSimulating(true);
    await onSimulate();
    setSimulating(false);
    setActiveSubTab('outreach');
  };

  return (
    <div className="brutalist-card overflow-hidden h-full flex flex-col bg-brand-surface border-white/10">
      <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-bg flex items-center justify-center border border-white/10 group overflow-hidden">
             {candidate.avatarUrl ? (
                 <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              ) : (
                <Fingerprint className="text-brand-primary" size={28} />
              )}
          </div>
          <div>
            <h3 className="stats-mono text-2xl font-black uppercase text-white leading-none">{candidate.name}</h3>
            <span className="label-caps text-white/40 mt-2 block">{candidate.role}</span>
          </div>
        </div>
        <div className="flex bg-white/5 p-1">
          <button 
            onClick={() => setActiveSubTab('match')}
            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'match' ? 'bg-brand-primary text-black' : 'text-white/40 hover:text-white'}`}
          >
            Analysis
          </button>
          <button 
            onClick={() => setActiveSubTab('outreach')}
            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'outreach' ? 'bg-brand-primary text-black' : 'text-white/40 hover:text-white'}`}
          >
            Outreach
          </button>
        </div>
      </div>

      <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeSubTab === 'match' ? (
            <motion.div
              key="match"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                <div className="bg-brand-surface p-6">
                  <div className="flex items-center gap-2 mb-4 text-white/40">
                    <History size={14} />
                    <span className="label-caps text-[8px]">Tech Match</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-brand-primary">{candidate.matchScore.technicalFit}%</span>
                  </div>
                </div>
                <div className="bg-brand-surface p-6">
                  <div className="flex items-center gap-2 mb-4 text-white/40">
                    <TrendingUp size={14} />
                    <span className="label-caps text-[8px]">Culture Fit</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-brand-primary">{candidate.matchScore.culturalFit}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="label-caps text-brand-primary text-[9px] flex items-center gap-2">
                  <BrainCircuit size={14} />
                  Agent Reasoning
                </h4>
                <div className="p-6 border-l-2 border-brand-primary bg-white/5 font-serif italic text-lg leading-relaxed text-white/80">
                  "{candidate.matchScore.explanation}"
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="label-caps text-white/20 text-[9px]">Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {!candidate.outreach && (
                <div className="pt-6">
                  <button 
                    onClick={runSimulation}
                    disabled={simulating}
                    className="brutalist-button-primary w-full flex items-center justify-center gap-4 disabled:opacity-20"
                  >
                    {simulating ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <MessageSquare size={16} />
                    )}
                    {simulating ? 'Synthesizing Interest...' : 'Phase 2: Simulate Outreach'}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="outreach"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col space-y-8"
            >
              {candidate.outreach ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="bg-brand-primary text-black p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="label-caps text-[9px]">Interest Analysis</span>
                      </div>
                      <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-black leading-none">{candidate.outreach.interestScore}%</span>
                        <div className="p-1 px-2 border-2 border-black/10 label-caps text-[8px] font-black">Verified</div>
                      </div>
                      <p className="font-serif italic text-lg mt-6 leading-tight">
                        {candidate.outreach.summary}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 flex-1">
                     <h4 className="label-caps text-white/20 text-[9px] border-b border-white/10 pb-4">Simulation Logs</h4>
                     <div className="space-y-6">
                        {candidate.outreach.messages.map((msg, idx) => (
                          <div key={idx} className={`flex flex-col ${msg.role === 'agent' ? 'items-start' : 'items-end'}`}>
                            <span className="label-caps text-[7px] mb-2 opacity-30">{msg.role === 'agent' ? 'A.I. Scout' : candidate.name}</span>
                            <div className={`max-w-[90%] p-4 text-xs font-mono border ${
                              msg.role === 'agent' 
                                ? 'bg-white/5 border-white/10 text-white/60' 
                                : 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 opacity-40">
                  <MessageSquare className="mb-4" size={40} />
                  <p className="label-caps text-xs">Awaiting Outreach Protocol</p>
                  <button 
                    onClick={runSimulation}
                    className="text-[10px] text-brand-primary font-black uppercase mt-4 hover:underline"
                  >
                    Initiate Phase 2
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
