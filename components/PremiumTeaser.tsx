import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import UsersIcon from './icons/UsersIcon';

interface PremiumTeaserProps {
  onUnlock: () => void;
}

const PremiumTeaser: React.FC<PremiumTeaserProps> = ({ onUnlock }) => {
  const features = [
    {
      icon: <ChartBarIcon className="w-6 h-6 text-slate-700" />,
      title: "Deep Analysis",
      description: "Upload business plans for data-backed professional reports.",
    },
    {
      icon: <UsersIcon className="w-6 h-6 text-slate-700" />,
      title: "Competitor Intel",
      description: "Real-time tracking of local competitors and market gaps.",
    },
    {
      icon: <SparklesIcon className="w-6 h-6 text-slate-700" />,
      title: "AI Strategy Chat",
      description: "Consult with our AI analyst to refine your local strategy.",
    },
  ];

  return (
    <section id="premium" className="mt-20 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <SparklesIcon className="w-32 h-32 text-slate-900" />
      </div>
      <div className="text-center relative z-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Maximize ROI with <span className="text-cyan-600">LocalVision Pro</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-12 font-medium">Get precision insights and interactive strategy tools built for modern entrepreneurs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100 transition-transform duration-300 hover:scale-105">{feature.icon}</div>
            <h4 className="font-bold text-slate-800 text-lg mb-2">{feature.title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button 
          onClick={onUnlock}
          className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 transition-all duration-300 transform active:scale-95 shadow-xl shadow-slate-900/10"
        >
          Unlock Profitable Insights
        </button>
      </div>
    </section>
  );
};

export default PremiumTeaser;