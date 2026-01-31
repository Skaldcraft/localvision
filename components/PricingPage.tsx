import React, { useState } from 'react';
import Header from './Header';
import DocumentArrowDownIcon from './icons/DocumentArrowDownIcon';
import UserIcon from './icons/UserIcon';
import UsersIcon from './icons/UsersIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';
import CheckIcon from './icons/CheckIcon';

interface PricingPageProps {
  onBack: () => void;
}

const PricingCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  price: string;
  priceDescription: string;
  features: string[];
  ctaText: string;
  isFeatured?: boolean;
}> = ({ icon, title, price, priceDescription, features, ctaText, isFeatured = false }) => {
    const priceSuffix = price.toLowerCase() !== 'custom'
        ? (title.includes('Plan') ? '/mo' : '')
        : null;
    
    return (
        <div className={`flex h-full flex-col border rounded-3xl p-8 transition-all duration-300 ${isFeatured ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-2xl ${isFeatured ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-900 border border-slate-100'}`}>{icon}</div>
                <h3 className={`text-xl font-bold tracking-tight ${isFeatured ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            </div>
            <p className={`mb-6 text-sm font-medium leading-relaxed min-h-[4.5em] ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>{priceDescription}</p>
            <div className="mb-8 flex items-baseline min-h-[3.5em]">
                <span className={`font-extrabold tracking-tighter ${price.toLowerCase() === 'custom' ? 'text-4xl' : 'text-5xl'} ${isFeatured ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                {priceSuffix && <span className={`text-sm font-bold uppercase tracking-widest ml-2 ${isFeatured ? 'text-slate-500' : 'text-slate-400'}`}>{priceSuffix}</span>}
            </div>
            <ul className={`space-y-4 mb-10 flex-grow ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
            {features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm font-medium">
                    <CheckIcon className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${isFeatured ? 'text-cyan-400' : 'text-emerald-500'}`} />
                    <span>{feature}</span>
                </li>
            ))}
            </ul>
            <button className={`w-full py-4 font-bold rounded-2xl transition-all duration-300 transform active:scale-95 ${isFeatured ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                {ctaText}
            </button>
        </div>
    );
};

const SingleReportCard: React.FC<{
    features: string[];
}> = ({ features }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-5 text-center md:text-left">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hidden sm:block">
                    <DocumentArrowDownIcon className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Single Pro Report</h3>
                    <p className="text-slate-500 text-sm font-medium">Deep analysis for one specific location.</p>
                </div>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-slate-600 text-sm flex-grow font-medium">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="text-center md:text-right flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-10">
                <div className="mb-4">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tighter">19€</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-1"> / once</span>
                </div>
                <button className="w-full md:w-auto px-10 py-3.5 font-bold rounded-2xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all duration-300 active:scale-95">
                    Unlock Now
                </button>
            </div>
        </div>
    );
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const isAnnual = billingCycle === 'annually';

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-800 font-sans selection:bg-cyan-100">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#fdfbf7] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Pricing for every vision</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">Choose the plan that fits your business stage, from solo explorations to high-scale team intelligence.</p>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-16 p-1.5 bg-slate-100 rounded-2xl max-w-sm mx-auto border border-slate-200">
            <button onClick={() => setBillingCycle('monthly')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('annually')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 relative ${billingCycle === 'annually' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                Annually
                <span className="absolute top-0 right-0 -mt-2.5 -mr-4 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/20">Save 15%</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
             <PricingCard
              icon={<UserIcon className="w-6 h-6" />}
              title="Entrepreneur Plan"
              price={isAnnual ? "24€" : "29€"}
              priceDescription="Perfect for independent founders and small startups looking to validate multiple local markets."
              features={[
                "Unlimited basic analysis",
                "Full Pro insights (3/mo)",
                "Interactive AI Strategy Chat",
                "Save & track locations",
                "Standard export features",
              ]}
              ctaText="Start Scaling"
            />
            <PricingCard
              icon={<UsersIcon className="w-6 h-6" />}
              title="Team Intelligence"
              price={isAnnual ? "83€" : "99€"}
              priceDescription="Built for agencies, researchers, and expanding teams that need high-volume market clarity."
              features={[
                "All Entrepreneur features",
                "Shared team workspace",
                "Unlimited Pro Reports",
                "White-label PDF exporting",
                "Priority AI model access",
              ]}
              ctaText="Get Started"
              isFeatured={true}
            />
            <PricingCard
              icon={<CodeBracketIcon className="w-6 h-6" />}
              title="Enterprise API"
              price="Custom"
              priceDescription="Direct API access and bulk analysis for commercial real estate and regional franchising."
              features={[
                "Full API integration",
                "Mass territory analysis",
                "Custom data modeling",
                "Dedicated success manager",
                "SLA-backed performance",
              ]}
              ctaText="Contact Sales"
            />
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <SingleReportCard features={[
                "Full Pro data for one ZIP",
                "Extended competitor map",
                "Growth opportunity audit",
                "High-res PDF export"
            ]} />
          </div>
          
          <div className="text-center mt-20">
            <button onClick={onBack} className="text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm tracking-wide flex items-center justify-center gap-2 mx-auto">
              <span>&larr;</span> Return to Analysis
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;