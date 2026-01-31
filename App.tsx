import React, { useState } from 'react';
import Header from './components/Header';
import FreeAnalysisForm from './components/FreeAnalysisForm';
import ResultsDisplay from './components/ResultsDisplay';
import PremiumTeaser from './components/PremiumTeaser';
import UpgradeCta from './components/UpgradeCta';
import PricingPage from './components/PricingPage';
import ChatBot from './components/ChatBot';
import { getBusinessAnalysis } from './services/geminiService';
import { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'analysis' | 'pricing'>('analysis');

  const handleAnalysis = async (postalCode: string, city: string, capital: string, context: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await getBusinessAnalysis(postalCode, city, capital, context);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'pricing') {
    return <PricingPage onBack={() => setView('analysis')} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-800 font-sans selection:bg-cyan-100">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#fdfbf7] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section id="free-analysis" className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-300">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-2 tracking-tight">Free Viability Analysis</h2>
            <p className="text-center text-slate-500 mb-8 font-medium">Identify lucrative local business opportunities with real-time AI research.</p>
            <FreeAnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          </section>

          <ResultsDisplay
            isLoading={isLoading}
            error={error}
            result={analysisResult}
          />

          {analysisResult && !isLoading ? (
            <UpgradeCta 
              onUpgradeClick={() => setView('pricing')}
            />
          ) : (
            <PremiumTeaser onUnlock={() => setView('pricing')} />
          )}
        </div>
      </main>
      
      <footer className="text-center py-10 text-slate-400 text-sm border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-20">
        <p className="font-medium tracking-wide">&copy; {new Date().getFullYear()} LocalVision. Precision market intelligence.</p>
      </footer>

      {/* Persistent ChatBot Assistant */}
      <ChatBot />
    </div>
  );
}

export default App;