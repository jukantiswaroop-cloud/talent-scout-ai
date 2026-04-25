import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Target, 
  Globe, 
  Cpu, 
  Activity,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { ShortlistedCandidate } from '../types';
import { exportToCSV } from '../utils/export';

interface InsightsProps {
  candidates: ShortlistedCandidate[];
}

export default function Insights({ candidates }: InsightsProps) {
  // If no candidates, show placeholder/global insights
  const hasData = candidates.length > 0;

  // Derive some stats if data exists
  const avgTechnical = hasData 
    ? Math.round(candidates.reduce((acc, c) => acc + c.matchScore.technicalFit, 0) / candidates.length)
    : 78;
  
  const avgInterest = hasData
    ? Math.round(candidates.reduce((acc, c) => acc + (c.outreach?.interestScore || 0), 0) / candidates.filter(c => c.outreach).length || 62)
    : 62;

  const distributionData = [
    { range: '90-100', count: candidates.filter(c => c.matchScore.overall >= 90).length || 4 },
    { range: '80-89', count: candidates.filter(c => c.matchScore.overall >= 80 && c.matchScore.overall < 90).length || 12 },
    { range: '70-79', count: candidates.filter(c => c.matchScore.overall >= 70 && c.matchScore.overall < 80).length || 8 },
    { range: '60-69', count: candidates.filter(c => c.matchScore.overall < 70).length || 3 },
  ];

  const sentimentData = [
    { name: 'Highly Interested', value: candidates.filter(c => (c.outreach?.interestScore || 0) > 80).length || 5, color: '#FF3B3F' },
    { name: 'Neutral', value: candidates.filter(c => (c.outreach?.interestScore || 0) >= 50 && (c.outreach?.interestScore || 0) <= 80).length || 15, color: '#333333' },
    { name: 'Low Engagement', value: candidates.filter(c => (c.outreach?.interestScore || 0) < 50).length || 7, color: '#1a1a1a' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div className="max-w-2xl border-l-2 border-brand-primary pl-10 py-4">
          <span className="label-caps text-brand-primary mb-4 block">Market Intelligence</span>
          <h2 className="text-6xl font-light italic serif tracking-tight leading-tight">
            Talent <br/>Density & Flow.
          </h2>
        </div>
        <button 
          onClick={() => exportToCSV(candidates)} 
          className="brutalist-button-primary bg-white text-black hover:bg-brand-primary flex items-center gap-2 px-6"
        >
          <Download size={16} />
          <span className="label-caps">Export Dataset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Metric Card 1 */}
        <div className="brutalist-card p-8 bg-brand-surface border-brand-primary/20 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-brand-primary">
            <TrendingUp size={24} />
          </div>
          <p className="label-caps opacity-40 mb-2">Avg. Tech Alignment</p>
          <div className="flex items-baseline gap-2">
            <h4 className="stats-mono text-5xl font-black">{avgTechnical}%</h4>
            <span className="text-xs text-green-500 font-mono flex items-center">
              <ArrowUpRight size={12} /> +4.2%
            </span>
          </div>
          <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${avgTechnical}%` }}
              className="h-full bg-brand-primary"
            />
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="brutalist-card p-8 bg-brand-surface border-brand-primary/20 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-brand-primary">
            <Activity size={24} />
          </div>
          <p className="label-caps opacity-40 mb-2">Simulated Interest</p>
          <div className="flex items-baseline gap-2">
            <h4 className="stats-mono text-5xl font-black">{avgInterest}%</h4>
            <span className="text-xs text-red-500 font-mono flex items-center">
              VULNERABLE
            </span>
          </div>
          <p className="text-[9px] font-mono text-white/30 mt-4 leading-tight uppercase font-black">
            High market competition detected for this skill profile
          </p>
        </div>

        {/* Metric Card 3 */}
        <div className="brutalist-card p-8 bg-brand-surface border-brand-primary/20 flex flex-col justify-between">
          <p className="label-caps opacity-40">Talent Scarcity</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center stats-mono text-[10px]">
              <span>LOW</span>
              <span>MED</span>
              <span className="text-brand-primary">CRITICAL</span>
            </div>
            <div className="grid grid-cols-10 gap-1 h-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`h-full ${i < 8 ? 'bg-brand-primary' : 'bg-white/5'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart 1: Distribution */}
        <div className="brutalist-card p-8 bg-brand-surface">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="label-caps text-brand-primary tracking-widest">Match Distribution</h4>
              <p className="text-[10px] font-mono opacity-30">Frequency of overall match scores</p>
            </div>
            <div className="stats-mono text-[10px] items-center flex gap-2">
              <div className="w-2 h-2 bg-brand-primary" /> SCOUT_DATA
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <XAxis 
                  dataKey="range" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF3B3F', borderRadius: '0', fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ color: '#FF3B3F' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#FF3B3F" 
                  shape={(props: any) => {
                    const { x, y, width, height } = props;
                    return (
                      <rect 
                        x={x} 
                        y={y} 
                        width={width - 4} 
                        height={height} 
                        fill="#FF3B3F"
                        className="hover:fill-white transition-colors"
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Engagement */}
        <div className="brutalist-card p-8 bg-brand-surface">
           <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="label-caps text-brand-primary tracking-widest">Engagement Sentiment</h4>
              <p className="text-[10px] font-mono opacity-30">Weighted results from outreach simulations</p>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #FF3B3F', borderRadius: '0', fontFamily: 'JetBrains Mono' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 px-8">
              {sentimentData.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3" style={{ backgroundColor: s.color }} />
                  <div>
                    <p className="stats-mono text-[10px] leading-none uppercase">{s.name}</p>
                    <p className="text-[14px] font-black">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="brutalist-card p-12 bg-white/5 border-dashed relative group">
        <div className="absolute top-0 right-0 p-8">
          <Globe size={40} className="text-brand-primary opacity-20" />
        </div>
        <div className="max-w-3xl space-y-6">
          <h5 className="label-caps text-brand-primary">Narrative Analysis</h5>
          <p className="font-serif italic text-2xl text-white/50 leading-relaxed">
            "The current market exhibits a high concentration of senior expertise, but a severe deficit in cross-functional adaptability. Our simulations indicate that while skills are present, misalignment with long-term mission objectives is the primary attrition risk for this mandate."
          </p>
          <div className="flex gap-4">
             <div className="stats-mono text-[9px] bg-brand-primary text-white py-1 px-2">RISK: HIGH</div>
             <div className="stats-mono text-[9px] bg-white/10 text-white py-1 px-2">MARKET_LIQUIDITY: NORMAL</div>
          </div>
        </div>
      </div>
    </div>
  );
}
