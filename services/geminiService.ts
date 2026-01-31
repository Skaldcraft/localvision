import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GroundingSource } from '../types';

export const getBusinessAnalysis = async (
  postalCode: string,
  city: string,
  capital: string,
  context: string
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const systemInstruction = `You are 'LocalVision AI', an expert business analyst and market researcher specializing in hyper-local business viability. 
  Your purpose is to provide deeply insightful, data-driven strategies. 
  You MUST use Google Search to find current demographic trends, active competitors, and local economic news for the specific area provided.
  Always look for real businesses currently operating in or near the zip code.
  Structure your entire response in JSON format.`;
  
  const userPrompt = `Analyze business potential for ZIP: ${postalCode}, ${city}. Capital: ${capital} EUR. Context: ${context || 'None'}.
  Provide an in-depth area analysis and 3-4 innovative business ideas. 
  For competitors, use REAL data found via search. 
  Return JSON only.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      areaProfile: {
        type: Type.OBJECT,
        properties: {
            demographicsSummary: { type: Type.STRING },
            economicIndicators: { type: Type.STRING },
            localBusinessEcosystem: { type: Type.STRING },
            untappedOpportunities: { type: Type.STRING },
        },
        required: ["demographicsSummary", "economicIndicators", "localBusinessEcosystem", "untappedOpportunities"]
      },
      businessIdeas: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING },
            ideaType: { type: Type.STRING },
            viabilityScore: { type: Type.INTEGER },
            initialInvestment: { type: Type.STRING },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            justification: { type: Type.STRING },
            synergyWithExistingBusinesses: { type: Type.STRING },
            competitorAnalysis: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                competitors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      estimatedSize: { type: Type.STRING },
                      onlinePresence: { type: Type.STRING },
                      simulatedRating: { type: Type.NUMBER, description: "Rating from 1.0 to 5.0" },
                      reviewCount: { type: Type.INTEGER, description: "Number of reviews" },
                      strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                      weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ["name", "estimatedSize", "onlinePresence", "simulatedRating", "reviewCount", "strengths", "weaknesses"],
                  },
                },
              },
              required: ["summary", "competitors"],
            },
          },
          required: ["businessName", "ideaType", "viabilityScore", "initialInvestment", "pros", "cons", "justification", "synergyWithExistingBusinesses", "competitorAnalysis"],
        },
      },
    },
    required: ["areaProfile", "businessIdeas"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString) as AnalysisResult;

    // Extract grounding sources
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          sources.push({ title: chunk.web.title, uri: chunk.web.uri });
        }
      });
    }

    // Deduplicate sources
    const uniqueSources = Array.from(new Set(sources.map(s => s.uri)))
      .map(uri => sources.find(s => s.uri === uri)!);

    return { ...result, sources: uniqueSources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis. Please try again.");
  }
};