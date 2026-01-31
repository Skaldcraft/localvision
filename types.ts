export interface Competitor {
  name: string;
  estimatedSize: string; // e.g., 'Small (1-5 employees)', 'Local Chain'
  onlinePresence: string; // e.g., 'Strong', 'Weak', 'Inactive'
  simulatedRating: number; // Changed to number for visualization (1-5)
  reviewCount: number; // New field for visualization
  strengths: string[];
  weaknesses: string[];
}

export interface CompetitorAnalysis {
  summary: string;
  competitors: Competitor[];
}

export interface BusinessIdea {
  businessName: string;
  ideaType: string; // e.g., 'Tech-Enabled Service', 'Niche Retail', 'Community Hub'
  viabilityScore: number;
  initialInvestment: string;
  pros: string[];
  cons: string[];
  justification: string;
  synergyWithExistingBusinesses: string;
  competitorAnalysis?: CompetitorAnalysis;
}

export interface AreaProfile {
    demographicsSummary: string;
    economicIndicators: string;
    localBusinessEcosystem: string;
    untappedOpportunities: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  areaProfile: AreaProfile;
  businessIdeas: BusinessIdea[];
  sources?: GroundingSource[];
}