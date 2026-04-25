import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  BarChart2, 
  Settings, 
  LogOut,
  Target,
  BrainCircuit
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'scout', label: 'AI Scout', icon: Target },
    { id: 'shortlist', label: 'Shortlist', icon: Users },
    { id: 'architecture', label: 'Protocol', icon: BrainCircuit },
    { id: 'analytics', label: 'Insights', icon: BarChart2 },
  ];

  return (
    <aside className="w-64 bg-[#050505] text-white flex flex-col border-r border-white/10">
      <div className="p-8">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-black tracking-tighter uppercase leading-none">Scout.</span>
          <span className="label-caps text-brand-primary opacity-80">AI Recruitment</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        <div className="space-y-1 mb-8">
          <p className="label-caps opacity-20 text-[8px] px-6 mb-4">Core Protocols</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-brand-primary"
                />
              )}
              <item.icon size={18} className={activeTab === item.id ? 'text-brand-primary' : 'opacity-40 group-hover:opacity-100'} />
              <span className="label-caps">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-8 border-t border-white/10 space-y-6">
        <div className="space-y-1">
          <p className="label-caps opacity-30 text-[8px]">Session Auth</p>
          <p className="font-mono text-sm uppercase">Jane Doe</p>
        </div>
        <button className="flex items-center gap-3 text-white/40 hover:text-red-500 transition-colors label-caps text-[9px]">
          <LogOut size={14} />
          <span>Terminate</span>
        </button>
      </div>
    </aside>
  );
}
