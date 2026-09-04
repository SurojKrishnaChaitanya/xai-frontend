import { retrieveGuidelines } from '../mock/mockNdmaGuidelines';

const USE_REAL_MODEL = import.meta.env.VITE_USE_REAL_MODEL === 'true';
const API_BASE_URL = import.meta.env.VITE_ML_MODEL_API_URL || 'http://localhost:8000';

/**
 * Generates a localized public safety advisory by retrieving the most
 * relevant NDMA guideline chunks and synthesizing them into a short,
 * citation-backed warning — mirrors the real system's RAG pipeline:
 * (quantitative forecast + geospatial context + XAI insight) → retrieval
 * → constrained generation.
 *
 * A real backend swap here posts the same payload to an LLM/RAG endpoint
 * and is expected to return { advisoryText, citedSources: [] } in the same
 * shape as the mock branch below.
 */
export async function generateAdvisory({ regionName, hazardType, severity, riskScore }) {
  if (!USE_REAL_MODEL) {
    const chunks = retrieveGuidelines(hazardType, severity, 2);

    const advisoryText = chunks.length
      ? `${regionName}: ${chunks.map((c) => c.text).join(' ')}`
      : `${regionName}: Monitor official IMD/NDMA channels for updates as this ${hazardType} risk (${riskScore}/100) develops.`;

    const citedSources = chunks.map((c) => ({ source: c.source, snippet: c.text }));

    return { advisoryText, citedSources };
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ regionName, hazardType, severity, riskScore }),
  });

  if (!response.ok) {
    throw new Error(`Advisory HTTP Error ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}