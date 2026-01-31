import React from 'react';
import { AnalysisResult, BusinessIdea, CompetitorAnalysis, AreaProfile, Competitor, GroundingSource } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import UsersIcon from './icons/UsersIcon';
import MapPinIcon from './icons/MapPinIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import LightBulbIcon from './icons/LightBulbIcon';
import StarIcon from './icons/StarIcon';
import GlobeAltIcon from './icons/GlobeAltIcon';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="mt-12 space-y-10 animate-pulse">
    <div className="bg-white border border-slate-100 rounded-3xl p-8">
      <div className="h-6 bg-slate-100 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-50 rounded-2xl"></div>)}
      </div>
    </div>
    <div className="space-y-8">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8">
          <div className="flex justify-between">
            <div className="w-2/3 space-y-3">
              <div className="h-8 bg-slate-100 rounded w-3/4"></div>
              <div className="h-5 bg-slate-50 rounded w-1/2"></div>
            </div>
            <div className="w-24 h-24 bg-slate-50 rounded-full"></div>
          </div>
          <div className="mt-8 h-4 bg-slate-50 rounded w-full"></div>
          <div className="mt-4 h-4 bg-slate-50 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  </div>
);

const ViabilityScore: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  let colorClass = 'text-emerald-500';
  if (score < 75) colorClass = 'text-amber-500';
  if (score < 50) colorClass = 'text-orange-500';

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-slate-100"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={colorClass}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${colorClass}`}>{score}%</span>
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">VIABILITY</span>
      </div>
    </div>
  );
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon 
          key={star} 
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
        />
      ))}
    </div>
  );
};

const CompetitorCard: React.FC<{ competitor: Competitor }> = ({ competitor }) => {
    const getPresenceValue = (presence: string) => {
        switch (presence.toLowerCase()) {
            case 'strong': return 100;
            case 'weak': return 35;
            case 'inactive': return 10;
            default: return 50;
        }
    };

    const presenceColor = competitor.onlinePresence.toLowerCase() === 'strong' ? 'bg-cyan-500' : 'bg-amber-500';

    return (
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h5 className="font-bold text-slate-800 leading-tight">{competitor.name}</h5>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{competitor.estimatedSize}</p>
            </div>
            <div className="text-right">
                <div className="flex flex-col items-end">
                  <RatingStars rating={competitor.simulatedRating} />
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                    {competitor.simulatedRating.toFixed(1)} • {competitor.reviewCount} reviews
                  </p>
                </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Online Presence</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase">{competitor.onlinePresence}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${presenceColor} transition-all duration-1000`} 
                style={{ width: `${getPresenceValue(competitor.onlinePresence)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h6 className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-wider">Strengths</h6>
              <ul className="space-y-1.5">
                {competitor.strengths.map((s, j) => <li key={j} className="text-[13px] text-slate-600 flex items-start font-medium leading-snug"><span className="text-emerald-500 mr-2 font-bold">•</span>{s}</li>)}
              </ul>
            </div>
            <div>
              <h6 className="text-[10px] font-bold text-rose-600 uppercase mb-2 tracking-wider">Weaknesses</h6>
              <ul className="space-y-1.5">
                {competitor.weaknesses.map((w, j) => <li key={j} className="text-[13px] text-slate-600 flex items-start font-medium leading-snug"><span className="text-rose-400 mr-2 font-bold">•</span>{w}</li>)}
              </ul>
            </div>
          </div>
        </div>
    );
};

const CompetitorAnalysisSection: React.FC<{ analysis: CompetitorAnalysis }> = ({ analysis }) => (
  <div className="mt-10 pt-8 border-t border-slate-100">
    <h4 className="font-bold text-slate-800 mb-4 flex items-center">
      <UsersIcon className="w-5 h-5 mr-3 text-cyan-600" />
      Competitive Intelligence
    </h4>
    <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed italic">"{analysis.summary}"</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {analysis.competitors.map((competitor, i) => (
        <CompetitorCard key={i} competitor={competitor} />
      ))}
    </div>
  </div>
);

const BusinessIdeaCard: React.FC<{ idea: BusinessIdea }> = ({ idea }) => (
  <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200">
    <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
      <div>
        <span className="inline-block bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">{idea.ideaType}</span>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{idea.businessName}</h3>
        <p className="text-slate-500 font-bold text-sm tracking-wide">Investment: {idea.initialInvestment}</p>
      </div>
      <div className="flex-shrink-0">
        <ViabilityScore score={idea.viabilityScore} />
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="space-y-6">
            <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Strategy Justification</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{idea.justification}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Local Synergy</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{idea.synergyWithExistingBusinesses}</p>
            </div>
        </div>

        <div className="space-y-6">
            <div>
                <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center">
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Key Advantages
                </h4>
                <ul className="space-y-3">
                {idea.pros.map((pro, i) => <li key={i} className="text-slate-600 text-sm flex items-start font-medium"><span className="text-emerald-500 mr-3 mt-1">•</span>{pro}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center">
                    <XIcon className="w-4 h-4 mr-2" />
                    Strategic Risks
                </h4>
                <ul className="space-y-3">
                {idea.cons.map((con, i) => <li key={i} className="text-slate-600 text-sm flex items-start font-medium"><span className="text-rose-400 mr-3 mt-1">•</span>{con}</li>)}
                </ul>
            </div>
        </div>
    </div>
    {idea.competitorAnalysis && <CompetitorAnalysisSection analysis={idea.competitorAnalysis} />}
  </div>
);

const AreaProfileCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; isHighlighted?: boolean }> = ({ icon, title, children, isHighlighted = false }) => (
    <div className={`p-6 rounded-2xl h-full transition-all duration-300 ${isHighlighted ? 'bg-cyan-50 border border-cyan-100' : 'bg-white border border-slate-100'}`}>
        <div className="flex items-center space-x-3 mb-3">
            <div className={`flex-shrink-0 p-2 rounded-xl ${isHighlighted ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                {icon}
            </div>
            <h4 className={`text-sm font-bold uppercase tracking-wide ${isHighlighted ? 'text-cyan-700' : 'text-slate-800'}`}>{title}</h4>
        </div>
        <p className={`text-sm leading-relaxed font-medium ${isHighlighted ? 'text-cyan-800' : 'text-slate-500'}`}>{children}</p>
    </div>
);

const AreaProfileSection: React.FC<{ profile: AreaProfile }> = ({ profile }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AreaProfileCard icon={<UsersIcon className="w-4 h-4" />} title="Demographics">
            {profile.demographicsSummary}
        </AreaProfileCard>
        <AreaProfileCard icon={<TrendingUpIcon className="w-4 h-4" />} title="Economy">
            {profile.economicIndicators}
        </AreaProfileCard>
        <AreaProfileCard icon={<BriefcaseIcon className="w-4 h-4" />} title="Ecosystem">
            {profile.localBusinessEcosystem}
        </AreaProfileCard>
        <AreaProfileCard icon={<LightBulbIcon className="w-4 h-4" />} title="Market Gaps" isHighlighted>
            {profile.untappedOpportunities}
        </AreaProfileCard>
    </div>
);

const GroundingSourcesSection: React.FC<{ sources: GroundingSource[] }> = ({ sources }) => (
  <div className="mt-12 p-8 bg-slate-50 border border-slate-200 rounded-3xl">
    <div className="flex items-center gap-3 mb-6">
      <GlobeAltIcon className="w-5 h-5 text-slate-400" />
      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Verification Sources</h4>
    </div>
    <div className="flex flex-wrap gap-3">
      {sources.map((source, i) => (
        <a 
          key={i} 
          href={source.uri} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm"
        >
          {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
        </a>
      ))}
    </div>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, result }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="mt-12 bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl text-center shadow-sm">
        <p className="font-bold text-lg mb-1">Analysis Error</p>
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
        <div className="mt-12 text-center text-slate-400 py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-white/30">
            <MapPinIcon className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="font-semibold tracking-tight">Your personalized market report will appear here.</p>
        </div>
    );
  }

  return (
    <div className="mt-16 space-y-16">
      <section id="area-profile">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4 px-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <MapPinIcon className="w-6 h-6"/>
          </div>
          Locality Profile
        </h3>
        <AreaProfileSection profile={result.areaProfile} />
      </section>

      <section id="business-ideas">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4 px-2">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
            <LightBulbIcon className="w-6 h-6" />
          </div>
          Strategic Business Models
        </h3>
        <div className="space-y-10">
          {result.businessIdeas.map((idea, i) => (
            <BusinessIdeaCard key={i} idea={idea} />
          ))}
        </div>
      </section>

      {result.sources && result.sources.length > 0 && (
        <GroundingSourcesSection sources={result.sources} />
      )}
    </div>
  );
};

export default ResultsDisplay;