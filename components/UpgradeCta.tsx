import React from 'react';
import RocketLaunchIcon from './icons/RocketLaunchIcon';
import SparklesIcon from './icons/SparklesIcon';

interface UpgradeCtaProps {
  onUpgradeClick: () => void;
}

const UpgradeCta: React.FC<UpgradeCtaProps> = ({ onUpgradeClick }) => {
  return (
    <section id="upgrade-cta" className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-12 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>
      <div className="text-center relative z-10">
        <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <RocketLaunchIcon className="w-8 h-8 text-cyan-400" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Ready to scale this vision?
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-10 font-medium text-lg leading-relaxed">
          Unlock the complete <span className="text-cyan-400 font-bold">Pro Report</span> for this specific analysis or join our premium community for unlimited market deep-dives.
        </p>
        <button 
          onClick={onUpgradeClick}
          className="px-12 py-5 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-slate-50 focus:ring-4 focus:ring-white/20 transition-all duration-300 transform active:scale-95 shadow-xl"
        >
          <SparklesIcon className="w-5 h-5 inline-block mr-2 -mt-1" />
          View Pro Plans & Full Reports
        </button>
      </div>
    </section>
  );
};

export default UpgradeCta;