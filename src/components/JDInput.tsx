import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Wand2 } from 'lucide-react';

interface JDInputProps {
  onScout: (text: string) => void;
  isAnalyzing: boolean;
}

export default function JDInput({ onScout, isAnalyzing }: JDInputProps) {
  const [text, setText] = useState('');

  const sampleJDs = [
    { label: 'Senior Frontend', content: 'We are looking for a Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and modern CSS. You will lead the development of our core web platform and mentor junior developers.' },
    { label: 'AI Researcher', content: 'Seeking an AI Research Scientist specialized in NLP and LLMs. Must have a Ph.D. and experience with PyTorch. You will contribute to original research and integrate state-of-the-art models into our products.' },
  ];

  return (
    <div className="space-y-6">
      <div className="brutalist-card p-2 relative">
        <div className="absolute -top-3 left-6 px-3 bg-brand-bg label-caps text-[8px] text-brand-primary">
          Requirements Input
        </div>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="INPUT JOB DESCRIPTION SPECIFICATIONS..."
            className="w-full h-80 pt-8 pb-8 pl-8 pr-52 bg-transparent resize-none focus:outline-none stats-mono text-white/90 placeholder:text-white/10"
          />
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {sampleJDs.map((sample) => (
              <button
                key={sample.label}
                onClick={() => setText(sample.content)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/40 label-caps text-[8px] border border-white/10 transition-colors text-right"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4 label-caps text-[8px] opacity-30 italic serif font-light">
            <Sparkles size={14} className="text-brand-primary" />
            Engaging scouting protocol...
          </div>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={!text.trim() || isAnalyzing}
            onClick={() => onScout(text)}
            className={`brutalist-button-primary flex items-center gap-3 ${
              !text.trim() || isAnalyzing ? 'opacity-20 pointer-events-none' : ''
            }`}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                   <Wand2 size={16} />
                </motion.div>
                Analysing
              </>
            ) : (
              <>
                <TargetIcon size={16} />
                Execute Scout
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function TargetIcon({ size }: { size: number }) {
  return <Send size={size} />;
}
