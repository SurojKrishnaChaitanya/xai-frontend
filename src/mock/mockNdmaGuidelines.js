// Local corpus of NDMA-style public safety guidance, chunked and tagged.
// Stands in for the real system's vector-embedded NDMA document store.
// A real backend would replace this with actual retrieval against
// embedded official documents — the shape (chunks with tags + text)
// stays the same either way.

export const ndmaGuidelines = [
  {
    id: 'ndma-thunder-1',
    source: 'NDMA Thunderstorm & Lightning Guidelines',
    tags: ['thunderstorm', 'lightning', 'severe', 'high'],
    text: 'Follow the 30/30 rule: if the time between seeing lightning and hearing thunder is 30 seconds or less, seek shelter immediately, and remain indoors for at least 30 minutes after the last clap of thunder.',
  },
  {
    id: 'ndma-thunder-2',
    source: 'NDMA Thunderstorm & Lightning Guidelines',
    tags: ['thunderstorm', 'lightning', 'moderate', 'high', 'severe'],
    text: 'Do not shelter under isolated trees or tall structures during a thunderstorm. Avoid open fields, hilltops, and metal fences. If caught outdoors with no shelter, crouch low with feet together.',
  },
  {
    id: 'ndma-flood-1',
    source: 'NDMA Flood Safety Guidelines',
    tags: ['flashFlood', 'severe', 'high'],
    text: 'Move immediately to higher ground if flash flood warnings are issued. Do not attempt to walk, swim, or drive through flowing water — six inches of moving water can knock down an adult.',
  },
  {
    id: 'ndma-flood-2',
    source: 'NDMA Flood Safety Guidelines',
    tags: ['flashFlood', 'moderate', 'high', 'severe'],
    text: 'Disconnect electrical appliances and move valuables to higher shelves before evacuating flood-prone low-lying areas. Keep emergency contacts and a battery-powered radio accessible.',
  },
  {
    id: 'ndma-cloudburst-1',
    source: 'NDMA Cloudburst & Hill Area Advisory',
    tags: ['cloudburst', 'severe', 'high'],
    text: 'In hill and mountain regions, avoid travel along riverbeds, narrow gorges, and steep slopes during heavy rainfall warnings, as cloudbursts can trigger sudden flash floods and landslides with minimal warning.',
  },
  {
    id: 'ndma-cloudburst-2',
    source: 'NDMA Cloudburst & Hill Area Advisory',
    tags: ['cloudburst', 'moderate', 'high', 'severe'],
    text: 'Residents in landslide-prone zones should monitor cracks in walls or ground near slopes, and evacuate to designated relief shelters if instructed by local disaster management authorities.',
  },
  {
    id: 'ndma-general-1',
    source: 'NDMA General Severe Weather Advisory',
    tags: ['thunderstorm', 'cloudburst', 'flashFlood', 'low', 'moderate', 'high', 'severe'],
    text: 'Keep mobile phones charged and monitor official IMD/NDMA alerts. Avoid non-essential travel during active severe weather warnings for your district.',
  },
];

// Simple deterministic keyword-overlap retrieval — no embeddings, no API
// call, no external dependency. Real backend would swap this for actual
// vector similarity search against embedded documents.
export function retrieveGuidelines(hazardType, severity, topK = 2) {
  const scored = ndmaGuidelines.map((chunk) => {
    let score = 0;
    if (chunk.tags.includes(hazardType)) score += 2;
    if (chunk.tags.includes(severity)) score += 1;
    return { ...chunk, score };
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}