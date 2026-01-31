import React, { useState } from 'react';

interface FreeAnalysisFormProps {
  onAnalyze: (postalCode: string, city: string, capital: string, context: string) => void;
  isLoading: boolean;
}

const FreeAnalysisForm: React.FC<FreeAnalysisFormProps> = ({ onAnalyze, isLoading }) => {
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [capital, setCapital] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode && city && capital) {
      onAnalyze(postalCode, city, capital, context);
    }
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all duration-200 font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label htmlFor="postal-code" className="block text-sm font-semibold text-slate-600 mb-2 ml-1">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g., 28013"
            required
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="city" className="block text-sm font-semibold text-slate-600 mb-2 ml-1">City / Locality</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Madrid"
            required
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="capital" className="block text-sm font-semibold text-slate-600 mb-2 ml-1">Available Capital (€)</label>
          <input
            type="text"
            id="capital"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="e.g., 20000"
            required
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="context" className="block text-sm font-semibold text-slate-600 mb-2 ml-1">Optional Context</label>
        <textarea
          id="context"
          rows={3}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., Focused on high-traffic areas, interested in eco-friendly retail..."
          className={inputClasses}
        ></textarea>
      </div>
      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isLoading || !postalCode || !city || !capital}
          className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-slate-900/10"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Data...
            </span>
          ) : 'Generate Business Intelligence'}
        </button>
      </div>
    </form>
  );
};

export default FreeAnalysisForm;