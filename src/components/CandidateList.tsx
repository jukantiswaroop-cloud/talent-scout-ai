import React from 'react';
import { motion } from 'motion/react';
import { ShortlistedCandidate } from '../types';
import { Award, BrainCircuit, User } from 'lucide-react';

interface CandidateListProps {
  candidates: ShortlistedCandidate[];
  onSelect: (candidate: ShortlistedCandidate) => void;
  selectedId?: string;
}

export default function CandidateList({ candidates, onSelect, selectedId }: CandidateListProps) {
  return (
    <div className="space-y-3">
      {candidates.map((candidate, index) => (
        <motion.div
          key={candidate.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(candidate)}
          className={`group flex items-center gap-6 p-6 brutalist-card cursor-pointer relative overflow-hidden ${
            selectedId === candidate.id 
              ? 'border-brand-primary border-l-4' 
              : 'hover:bg-white/5 border-l-border-brand-border border-l-4'
          }`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none">
            <span className="text-8xl font-black">{index + 1}</span>
          </div>

          <div className="relative">
            <div className="w-16 h-16 bg-brand-bg flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10">
              {candidate.avatarUrl ? (
                 <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="text-white/20" size={24} />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p className="stats-mono font-bold uppercase group-hover:text-brand-primary transition-colors">{candidate.name}</p>
              {candidate.matchScore.overall >= 80 && (
                <span className="text-[8px] bg-brand-primary text-black px-1.5 py-0.5 font-black uppercase">Elite</span>
              )}
            </div>
            <p className="label-caps text-white/40 mt-1">{candidate.role}</p>
          </div>
          
          <div className="text-right shrink-0 flex flex-col items-end gap-2">
            <div>
              <p className="label-caps text-white/20 mb-1">Match Pct</p>
              <p className={`text-3xl font-black tracking-tighter ${
                candidate.matchScore.overall >= 80 ? 'text-brand-primary' : 'text-white'
              }`}>
                {candidate.matchScore.overall}%
              </p>
            </div>
            
            {candidate.outreach && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-right border-t border-white/10 pt-2"
              >
                <p className="label-caps text-brand-primary/40 text-[7px] mb-0.5">Interest Pct</p>
                <p className="text-xl font-bold text-brand-primary tracking-tighter leading-none">
                  {candidate.outreach.interestScore}%
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
