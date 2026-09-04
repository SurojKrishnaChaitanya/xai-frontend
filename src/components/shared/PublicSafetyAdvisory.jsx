import React from 'react';
import { ShieldCheck, BookOpen } from 'lucide-react';

export default function PublicSafetyAdvisory({ advisory }) {
  if (!advisory?.advisoryText) return null;

  return (
    <div className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Public Safety Advisory</h2>
        <span className="ml-auto text-[10px] font-mono font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
          NDMA-Grounded
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-700 bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
        {advisory.advisoryText}
      </p>

      {advisory.citedSources?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            <BookOpen className="w-3.5 h-3.5" />
            Sources
          </div>
          {advisory.citedSources.map((src, idx) => (
            <div key={idx} className="text-[11px] text-slate-500 pl-2 border-l-2 border-emerald-200">
              <span className="font-semibold text-slate-700">{src.source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}