// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { 
//   ShieldAlert, 
//   Activity, 
//   Zap, 
//   CloudRain, 
//   Wind, 
//   TrendingUp, 
//   Info, 
//   Layers,
//   Clock
// } from 'lucide-react';

// export const RiskAnalysisPage = () => {
//   const { selectedCity, currentRiskData, isLoading, fetchRiskAnalysis } = useWeatherStore();

//   useEffect(() => {
//     fetchRiskAnalysis();
//   }, [selectedCity?.id]);

//   const riskData = currentRiskData || {
//     overallRiskScore: selectedCity?.riskScore || 50,
//     riskLevel: (selectedCity?.riskScore || 50) > 75 ? 'CRITICAL' : 'HIGH',
//     primaryHazard: selectedCity?.primaryHazard || 'Cloudburst',
//     confidenceIndex: '94.2%',
//     metrics: {
//       cloudburstProbability: 88,
//       flashFloodRisk: 76,
//       galeWindRisk: 54,
//       precipitationRate: '65 mm/h',
//       windSpeed: '75 km/h',
//       iwvMoisture: '60 kg/m²',
//       cttDropRate: '-18°C/h',
//     },
//     hourlyTrend: [
//       { time: 'Now', risk: 75 },
//       { time: '+1h', risk: 82 },
//       { time: '+2h', risk: 89 },
//       { time: '+3h', risk: 85 },
//       { time: '+4h', risk: 68 },
//       { time: '+5h', risk: 55 },
//       { time: '+6h', risk: 42 },
//     ],
//     featureImportance: [
//       { feature: 'Precipitation Rate', impact: 32 },
//       { feature: 'Cloud Top Temp Drop', impact: 28 },
//       { feature: 'Integrated Water Vapor (IWV)', impact: 18 },
//       { feature: 'Wind Shear Speed', impact: 14 },
//       { feature: 'Topographic Elevation Shielding', impact: -12 },
//     ],
//     xaiExplanation: `0–6h nowcast model projects peak hazard intensity for ${selectedCity?.name || 'Target Zone'} within the next 2-3 hours.`,
//   };

//   const getRiskTheme = (score) => {
//     if (score > 75) return { text: 'text-rose-600', badge: 'bg-rose-500' };
//     if (score > 45) return { text: 'text-amber-600', badge: 'bg-amber-500' };
//     return { text: 'text-emerald-600', badge: 'bg-emerald-500' };
//   };

//   const theme = getRiskTheme(riskData.overallRiskScore);

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//         <div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">XAI Nowcasting Engine</span>
//             {isLoading && <span className="text-xs text-amber-600 font-semibold animate-pulse">• Running ML Inference...</span>}
//           </div>
//           <h1 className="text-2xl font-black text-slate-900">{selectedCity?.name || 'Shimla'} — Severe Weather Nowcast</h1>
//           <p className="text-xs text-slate-500">{selectedCity?.state || 'Himachal Pradesh'} • 0 to +6h Window • Model Confidence: {riskData.confidenceIndex}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold text-white ${theme.badge} shadow-sm`}>
//             {riskData.riskLevel} SEVERITY
//           </span>
//         </div>
//       </div>

//       {/* Hero KPIs */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Overall Risk Score</span>
//             <ShieldAlert className={`w-5 h-5 ${theme.text}`} />
//           </div>
//           <div className="mt-4">
//             <div className="flex items-baseline gap-1">
//               <span className={`text-4xl font-black font-mono ${theme.text}`}>{riskData.overallRiskScore}</span>
//               <span className="text-slate-400 font-bold text-sm">/ 100</span>
//             </div>
//             <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
//               <div className={`h-full ${theme.badge} transition-all duration-500`} style={{ width: `${riskData.overallRiskScore}%` }} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Cloudburst Prob.</span>
//             <CloudRain className="w-5 h-5 text-blue-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-3xl font-black text-slate-900 font-mono">{riskData.metrics.cloudburstProbability}%</span>
//             <p className="text-[11px] text-slate-500 mt-1">Primary Hazard: <strong className="text-slate-700">{riskData.primaryHazard}</strong></p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Flash Flood Risk</span>
//             <Activity className="w-5 h-5 text-amber-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-3xl font-black text-slate-900 font-mono">{riskData.metrics.flashFloodRisk}%</span>
//             <p className="text-[11px] text-slate-500 mt-1">Precipitation: <strong className="text-slate-700">{riskData.metrics.precipitationRate}</strong></p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Gale Wind Risk</span>
//             <Wind className="w-5 h-5 text-teal-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-3xl font-black text-slate-900 font-mono">{riskData.metrics.galeWindRisk}%</span>
//             <p className="text-[11px] text-slate-500 mt-1">Wind Shear: <strong className="text-slate-700">{riskData.metrics.windSpeed}</strong></p>
//           </div>
//         </div>
//       </div>

//       {/* Main Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* 0 to +6 Hour Nowcasting Chart */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex justify-between items-center border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <Clock className="w-5 h-5 text-blue-600" />
//               <h2 className="text-sm font-bold text-slate-900">0 to +6 Hour Nowcast Window</h2>
//             </div>
//             <span className="text-[11px] font-semibold text-slate-400">High-Resolution Short-Range Projection</span>
//           </div>

//           <div className="h-56 w-full pt-4 relative">
//             <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
//               <defs>
//                 <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
//                   <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
//                 </linearGradient>
//               </defs>

//               <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
//               <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
//               <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

//               <polygon
//                 fill="url(#riskGrad)"
//                 points={`
//                   0,140 
//                   ${riskData.hourlyTrend.map((pt, idx) => `${(idx / (riskData.hourlyTrend.length - 1)) * 500},${140 - (pt.risk * 1.2)}`).join(' ')} 
//                   500,140
//                 `}
//               />

//               <polyline
//                 fill="none"
//                 stroke="#ef4444"
//                 strokeWidth="3"
//                 points={riskData.hourlyTrend.map((pt, idx) => `${(idx / (riskData.hourlyTrend.length - 1)) * 500},${140 - (pt.risk * 1.2)}`).join(' ')}
//               />

//               {riskData.hourlyTrend.map((pt, idx) => {
//                 const cx = (idx / (riskData.hourlyTrend.length - 1)) * 500;
//                 const cy = 140 - (pt.risk * 1.2);
//                 return (
//                   <g key={idx}>
//                     <circle cx={cx} cy={cy} r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />
//                     <text x={cx} y={cy - 10} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="700">
//                       {pt.risk}
//                     </text>
//                   </g>
//                 );
//               })}
//             </svg>

//             <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-4 px-1">
//               {riskData.hourlyTrend.map((pt, i) => (
//                 <span key={i} className={i === 0 ? 'text-blue-600 font-extrabold' : ''}>{pt.time}</span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* SHAP Importance */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Zap className="w-5 h-5 text-amber-500" />
//             <h2 className="text-sm font-bold text-slate-900">SHAP Feature Impact</h2>
//           </div>
//           <p className="text-[11px] text-slate-500">Feature contributions to the inference score:</p>
//           <div className="space-y-3.5 pt-1">
//             {riskData.featureImportance.map((item, idx) => (
//               <div key={idx} className="space-y-1 text-xs">
//                 <div className="flex justify-between font-semibold text-slate-700">
//                   <span>{item.feature}</span>
//                   <span className={item.impact > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
//                     {item.impact > 0 ? `+${item.impact}%` : `${item.impact}%`}
//                   </span>
//                 </div>
//                 <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//                   <div
//                     className={`h-full rounded-full ${item.impact > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}
//                     style={{ width: `${Math.min(100, Math.abs(item.impact) * 2.5)}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Diagnostics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
//           <div className="flex items-center gap-2 text-blue-400">
//             <Info className="w-5 h-5" />
//             <h3 className="text-sm font-bold uppercase tracking-wider">XAI Diagnostic Summary</h3>
//           </div>
//           <p className="text-xs leading-relaxed text-slate-300">
//             {riskData.xaiExplanation}
//           </p>
//           <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-400 font-mono border-t border-slate-800">
//             <span>IWV: {riskData.metrics.iwvMoisture}</span>
//             <span>•</span>
//             <span>CTT Drop: {riskData.metrics.cttDropRate}</span>
//             <span>•</span>
//             <span>Wind Shear: {riskData.metrics.windSpeed}</span>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Layers className="w-5 h-5 text-blue-600" />
//             <h3 className="text-sm font-bold text-slate-900">Telemetry Feeds</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//               <span className="text-[10px] text-slate-400 block font-medium">Precipitation</span>
//               <span className="font-bold text-slate-800">{riskData.metrics.precipitationRate}</span>
//             </div>
//             <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//               <span className="text-[10px] text-slate-400 block font-medium">Wind Speed</span>
//               <span className="font-bold text-slate-800">{riskData.metrics.windSpeed}</span>
//             </div>
//             <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//               <span className="text-[10px] text-slate-400 block font-medium">IWV Vapor</span>
//               <span className="font-bold text-slate-800">{riskData.metrics.iwvMoisture}</span>
//             </div>
//             <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//               <span className="text-[10px] text-slate-400 block font-medium">CTT Drop Rate</span>
//               <span className="font-bold text-slate-800">{riskData.metrics.cttDropRate}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiskAnalysisPage;

// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { ShieldAlert, Activity, Zap, CloudRain, Wind, Info, Layers, Clock } from 'lucide-react';

// export const RiskAnalysisPage = () => {
//   const selectedRegion = useWeatherStore((state) => state.selectedRegion);
//   const currentRiskData = useWeatherStore((state) => state.currentRiskData);
//   const isLoading = useWeatherStore((state) => state.isLoading);
//   const fetchRiskAnalysis = useWeatherStore((state) => state.fetchRiskAnalysis);

//   useEffect(() => {
//     if (selectedRegion) fetchRiskAnalysis();
//   }, [selectedRegion?.id]);

//   if (!selectedRegion) {
//     return <div className="p-6 text-sm text-slate-400">Select a region to view risk analysis.</div>;
//   }

//   const riskData = currentRiskData || { riskScore: selectedRegion.riskScore, hazardType: selectedRegion.hazardType, confidence: 0.85 };
//   const hourlyTrend = riskData.hourlyTrend || [];
//   const featureImportance = riskData.featureImportance || [];
//   const metrics = riskData.metrics || {};

//   const getRiskTheme = (score) => {
//     if (score > 75) return { text: 'text-rose-600', badge: 'bg-rose-500' };
//     if (score > 45) return { text: 'text-amber-600', badge: 'bg-amber-500' };
//     return { text: 'text-emerald-600', badge: 'bg-emerald-500' };
//   };
//   const theme = getRiskTheme(riskData.riskScore);

//   const maxRisk = hourlyTrend.length ? Math.max(...hourlyTrend.map((p) => p.risk)) : 100;

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//         <div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">XAI Nowcasting Engine</span>
//             {isLoading && <span className="text-xs text-amber-600 font-semibold animate-pulse">• Running ML Inference...</span>}
//           </div>
//           <h1 className="text-2xl font-black text-slate-900">{selectedRegion.name} — Severe Weather Nowcast</h1>
//           <p className="text-xs text-slate-500">
//             {selectedRegion.state} • +2h to +6h Window • Model Confidence: {((riskData.confidence ?? 0.85) * 100).toFixed(1)}%
//           </p>
//         </div>
//         <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold text-white ${theme.badge} shadow-sm uppercase`}>
//           {selectedRegion.severity} severity
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Overall Risk Score</span>
//             <ShieldAlert className={`w-5 h-5 ${theme.text}`} />
//           </div>
//           <div className="mt-4">
//             <div className="flex items-baseline gap-1">
//               <span className={`text-4xl font-black font-mono ${theme.text}`}>{riskData.riskScore}</span>
//               <span className="text-slate-400 font-bold text-sm">/ 100</span>
//             </div>
//             <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
//               <div className={`h-full ${theme.badge}`} style={{ width: `${riskData.riskScore}%` }} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Primary Hazard</span>
//             <CloudRain className="w-5 h-5 text-blue-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 capitalize">{riskData.hazardType}</span>
//             <p className="text-[11px] text-slate-500 mt-1">Precipitation: <strong className="text-slate-700">{metrics.precipitationRate ?? '—'}</strong></p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">IWV Moisture</span>
//             <Activity className="w-5 h-5 text-amber-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 font-mono">{metrics.iwvMoisture ?? '—'}</span>
//             <p className="text-[11px] text-slate-500 mt-1">CAPE: <strong className="text-slate-700">{metrics.cape ?? '—'}</strong></p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">Wind / CTT</span>
//             <Wind className="w-5 h-5 text-teal-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 font-mono">{metrics.windSpeed ?? '—'}</span>
//             <p className="text-[11px] text-slate-500 mt-1">CTT Drop: <strong className="text-slate-700">{metrics.cttDropRate ?? '—'}</strong></p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex justify-between items-center border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <Clock className="w-5 h-5 text-blue-600" />
//               <h2 className="text-sm font-bold text-slate-900">+2h to +6h Nowcast Window</h2>
//             </div>
//           </div>
//           <div className="h-56 w-full pt-4 relative">
//             <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
//               <defs>
//                 <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
//                   <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
//                 </linearGradient>
//               </defs>
//               {hourlyTrend.length > 0 && (
//                 <>
//                   <polygon
//                     fill="url(#riskGrad)"
//                     points={`0,140 ${hourlyTrend.map((pt, idx) => `${(idx / (hourlyTrend.length - 1)) * 500},${140 - (pt.risk / maxRisk) * 110}`).join(' ')} 500,140`}
//                   />
//                   <polyline
//                     fill="none" stroke="#ef4444" strokeWidth="3"
//                     points={hourlyTrend.map((pt, idx) => `${(idx / (hourlyTrend.length - 1)) * 500},${140 - (pt.risk / maxRisk) * 110}`).join(' ')}
//                   />
//                   {hourlyTrend.map((pt, idx) => {
//                     const cx = (idx / (hourlyTrend.length - 1)) * 500;
//                     const cy = 140 - (pt.risk / maxRisk) * 110;
//                     return (
//                       <g key={idx}>
//                         <circle cx={cx} cy={cy} r="4" fill="#fff" stroke="#ef4444" strokeWidth="2.5" />
//                         <text x={cx} y={cy - 10} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="700">{pt.risk}</text>
//                       </g>
//                     );
//                   })}
//                 </>
//               )}
//             </svg>
//             <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-4 px-1">
//               {hourlyTrend.map((pt, i) => <span key={i}>+{pt.hour}h</span>)}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Zap className="w-5 h-5 text-amber-500" />
//             <h2 className="text-sm font-bold text-slate-900">Feature Impact</h2>
//           </div>
//           <div className="space-y-3.5 pt-1">
//             {featureImportance.map((item, idx) => (
//               <div key={idx} className="space-y-1 text-xs">
//                 <div className="flex justify-between font-semibold text-slate-700">
//                   <span>{item.feature}</span>
//                   <span className={item.impact > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
//                     {item.impact > 0 ? `+${item.impact}` : item.impact}
//                   </span>
//                 </div>
//                 <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//                   <div className={`h-full rounded-full ${item.impact > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, Math.abs(item.impact) * 2)}%` }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
//           <div className="flex items-center gap-2 text-blue-400">
//             <Info className="w-5 h-5" />
//             <h3 className="text-sm font-bold uppercase tracking-wider">XAI Diagnostic Summary</h3>
//           </div>
//           <p className="text-xs leading-relaxed text-slate-300">{riskData.xaiExplanation}</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Layers className="w-5 h-5 text-blue-600" />
//             <h3 className="text-sm font-bold text-slate-900">Telemetry Feeds</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             {Object.entries(metrics).map(([key, val]) => (
//               <div key={key} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//                 <span className="text-[10px] text-slate-400 block font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
//                 <span className="font-bold text-slate-800">{val}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiskAnalysisPage;

// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { ShieldAlert, Activity, Zap, CloudRain, Wind, Info, Layers, Clock } from 'lucide-react';
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from 'recharts';

// export const RiskAnalysisPage = () => {
//   const selectedRegion = useWeatherStore((state) => state.selectedRegion);
//   const currentRiskData = useWeatherStore((state) => state.currentRiskData);
//   const isLoading = useWeatherStore((state) => state.isLoading);
//   const fetchRiskAnalysis = useWeatherStore((state) => state.fetchRiskAnalysis);

//   useEffect(() => {
//     if (selectedRegion) fetchRiskAnalysis();
//   }, [selectedRegion?.id, fetchRiskAnalysis]);

//   if (!selectedRegion) {
//     return (
//       <div className="p-6 text-sm text-slate-500 bg-slate-50 min-h-screen">
//         Select a region to view risk analysis.
//       </div>
//     );
//   }

//   const riskData = currentRiskData || {
//     riskScore: selectedRegion.riskScore,
//     hazardType: selectedRegion.hazardType,
//     confidence: 0.85,
//   };
//   const hourlyTrend = riskData.hourlyTrend || [];
//   const featureImportance = riskData.featureImportance || [];
//   const metrics = riskData.metrics || {};

//   const getRiskTheme = (score) => {
//     if (score > 75) {
//       return {
//         text: 'text-rose-600',
//         badge: 'bg-rose-500',
//         stroke: '#f43f5e',
//         fillGrad: '#f43f5e',
//       };
//     }
//     if (score > 45) {
//       return {
//         text: 'text-amber-600',
//         badge: 'bg-amber-500',
//         stroke: '#f59e0b',
//         fillGrad: '#f59e0b',
//       };
//     }
//     return {
//       text: 'text-emerald-600',
//       badge: 'bg-emerald-500',
//       stroke: '#10b981',
//       fillGrad: '#10b981',
//     };
//   };

//   const theme = getRiskTheme(riskData.riskScore);

//   const chartData = hourlyTrend.map((item) => ({
//     hour: `+${item.hour}h`,
//     risk: item.risk,
//   }));

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white/95 backdrop-blur-md p-3 border border-slate-200 shadow-xl rounded-xl text-xs font-semibold">
//           <p className="text-slate-500 mb-1">{label} Forecast Window</p>
//           <div className="flex items-center gap-2">
//             <span
//               className="w-2.5 h-2.5 rounded-full"
//               style={{ backgroundColor: theme.stroke }}
//             />
//             <span className="text-slate-700">Risk Score:</span>
//             <span className="font-mono text-sm font-bold text-slate-900">
//               {payload[0].value} / 100
//             </span>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen text-slate-900">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//         <div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
//               XAI Nowcasting Engine
//             </span>
//             {isLoading && (
//               <span className="text-xs text-amber-600 font-semibold animate-pulse">
//                 • Running ML Inference...
//               </span>
//             )}
//           </div>
//           <h1 className="text-2xl font-black text-slate-900">
//             {selectedRegion.name} — Severe Weather Nowcast
//           </h1>
//           <p className="text-xs text-slate-500">
//             {selectedRegion.state} • +2h to +6h Window • Model Confidence:{' '}
//             {((riskData.confidence ?? 0.85) * 100).toFixed(1)}%
//           </p>
//         </div>
//         <span
//           className={`px-3.5 py-1.5 rounded-xl text-xs font-bold text-white ${theme.badge} shadow-sm uppercase`}
//         >
//           {selectedRegion.severity} severity
//         </span>
//       </div>

//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">
//               Overall Risk Score
//             </span>
//             <ShieldAlert className={`w-5 h-5 ${theme.text}`} />
//           </div>
//           <div className="mt-4">
//             <div className="flex items-baseline gap-1">
//               <span className={`text-4xl font-black font-mono ${theme.text}`}>
//                 {riskData.riskScore}
//               </span>
//               <span className="text-slate-400 font-bold text-sm">/ 100</span>
//             </div>
//             <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
//               <div
//                 className={`h-full ${theme.badge}`}
//                 style={{ width: `${riskData.riskScore}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">
//               Primary Hazard
//             </span>
//             <CloudRain className="w-5 h-5 text-blue-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 capitalize">
//               {riskData.hazardType}
//             </span>
//             <p className="text-[11px] text-slate-500 mt-1">
//               Precipitation:{' '}
//               <strong className="text-slate-700">
//                 {metrics.precipitationRate ?? '—'}
//               </strong>
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">
//               IWV Moisture
//             </span>
//             <Activity className="w-5 h-5 text-amber-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 font-mono">
//               {metrics.iwvMoisture ?? '—'}
//             </span>
//             <p className="text-[11px] text-slate-500 mt-1">
//               CAPE:{' '}
//               <strong className="text-slate-700">
//                 {metrics.cape ?? '—'}
//               </strong>
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
//           <div className="flex justify-between items-start">
//             <span className="text-xs font-bold text-slate-400 uppercase">
//               Wind / CTT
//             </span>
//             <Wind className="w-5 h-5 text-teal-500" />
//           </div>
//           <div className="mt-4">
//             <span className="text-xl font-black text-slate-900 font-mono">
//               {metrics.windSpeed ?? '—'}
//             </span>
//             <p className="text-[11px] text-slate-500 mt-1">
//               CTT Drop:{' '}
//               <strong className="text-slate-700">
//                 {metrics.cttDropRate ?? '—'}
//               </strong>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Panel Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recharts Area Chart */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex justify-between items-center border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <Clock className="w-5 h-5 text-blue-600" />
//               <h2 className="text-sm font-bold text-slate-900">
//                 +2h to +6h Nowcast Window
//               </h2>
//             </div>
//             <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
//               Live Trajectory
//             </span>
//           </div>

//           <div className="h-64 w-full pt-2">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart
//                 data={chartData}
//                 margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
//               >
//                 <defs>
//                   <linearGradient id="nowcastGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor={theme.fillGrad} stopOpacity={0.4} />
//                     <stop offset="95%" stopColor={theme.fillGrad} stopOpacity={0.0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#f1f5f9"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="hour"
//                   stroke="#94a3b8"
//                   fontSize={12}
//                   fontWeight={600}
//                   tickLine={false}
//                   axisLine={{ stroke: '#e2e8f0' }}
//                 />
//                 <YAxis
//                   stroke="#94a3b8"
//                   fontSize={12}
//                   fontWeight={600}
//                   tickLine={false}
//                   axisLine={false}
//                   domain={[0, 100]}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area
//                   type="monotone"
//                   dataKey="risk"
//                   stroke={theme.stroke}
//                   strokeWidth={3.5}
//                   fillOpacity={1}
//                   fill="url(#nowcastGradient)"
//                   dot={{
//                     r: 5,
//                     fill: '#ffffff',
//                     stroke: theme.stroke,
//                     strokeWidth: 3,
//                   }}
//                   activeDot={{
//                     r: 7,
//                     fill: theme.stroke,
//                     stroke: '#ffffff',
//                     strokeWidth: 2,
//                   }}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Feature Impact Panel */}
//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Zap className="w-5 h-5 text-amber-500" />
//             <h2 className="text-sm font-bold text-slate-900">Feature Impact</h2>
//           </div>
//           <div className="space-y-3.5 pt-1">
//             {featureImportance.map((item, idx) => (
//               <div key={idx} className="space-y-1 text-xs">
//                 <div className="flex justify-between font-semibold text-slate-700">
//                   <span>{item.feature}</span>
//                   <span
//                     className={
//                       item.impact > 0
//                         ? 'text-rose-600 font-bold'
//                         : 'text-emerald-600 font-bold'
//                     }
//                   >
//                     {item.impact > 0 ? `+${item.impact}` : item.impact}
//                   </span>
//                 </div>
//                 <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//                   <div
//                     className={`h-full rounded-full ${
//                       item.impact > 0 ? 'bg-rose-500' : 'bg-emerald-500'
//                     }`}
//                     style={{ width: `${Math.min(100, Math.abs(item.impact) * 2)}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Diagnostics & Feeds */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
//           <div className="flex items-center gap-2 text-blue-400">
//             <Info className="w-5 h-5" />
//             <h3 className="text-sm font-bold uppercase tracking-wider">
//               XAI Diagnostic Summary
//             </h3>
//           </div>
//           <p className="text-xs leading-relaxed text-slate-300">
//             {riskData.xaiExplanation}
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
//           <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
//             <Layers className="w-5 h-5 text-blue-600" />
//             <h3 className="text-sm font-bold text-slate-900">Telemetry Feeds</h3>
//           </div>
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             {Object.entries(metrics).map(([key, val]) => (
//               <div key={key} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
//                 <span className="text-[10px] text-slate-400 block font-medium capitalize">
//                   {key.replace(/([A-Z])/g, ' $1')}
//                 </span>
//                 <span className="font-bold text-slate-800">{val}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiskAnalysisPage;

import React, { useEffect } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { ShieldAlert, Activity, Zap, CloudRain, Wind, Info, Layers, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from 'recharts';

export const RiskAnalysisPage = () => {
  const selectedRegion = useWeatherStore((state) => state.selectedRegion);
  const currentRiskData = useWeatherStore((state) => state.currentRiskData);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const fetchRiskAnalysis = useWeatherStore((state) => state.fetchRiskAnalysis);

  useEffect(() => {
    if (selectedRegion) fetchRiskAnalysis();
  }, [selectedRegion?.id]);

  if (!selectedRegion) {
    return <div className="p-6 text-sm text-slate-400">Select a region to view risk analysis.</div>;
  }

  const riskData = currentRiskData || { 
    riskScore: selectedRegion.riskScore, 
    hazardType: selectedRegion.hazardType, 
    confidence: 0.85 
  };
  const hourlyTrend = riskData.hourlyTrend || [];
  const featureImportance = riskData.featureImportance || [];
  const metrics = riskData.metrics || {};

  // Theme helper providing Tailwind classes and explicit Hex codes for Recharts
  const getRiskTheme = (score) => {
    if (score > 75) return { text: 'text-rose-600', badge: 'bg-rose-500', hex: '#f43f5e' };
    if (score > 45) return { text: 'text-amber-600', badge: 'bg-amber-500', hex: '#f59e0b' };
    return { text: 'text-emerald-600', badge: 'bg-emerald-500', hex: '#10b981' };
  };

  const theme = getRiskTheme(riskData.riskScore);

  // Recharts formatted dataset
  const chartData = hourlyTrend.map((pt) => ({
    time: `+${pt.hour}h`,
    risk: pt.risk,
  }));

  // Sleek Glassmorphism Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200/80 text-xs space-y-1">
          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
            Forecast {label}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.hex }} />
            <span className="font-black text-slate-900 text-sm">
              {payload[0].value} <span className="text-slate-400 font-medium text-xs">/ 100 Risk</span>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">XAI Nowcasting Engine</span>
            {isLoading && <span className="text-xs text-amber-600 font-semibold animate-pulse">• Running ML Inference...</span>}
          </div>
          <h1 className="text-2xl font-black text-slate-900">{selectedRegion.name} — Severe Weather Nowcast</h1>
          <p className="text-xs text-slate-500">
            {selectedRegion.state} • +2h to +6h Window • Model Confidence: {((riskData.confidence ?? 0.85) * 100).toFixed(1)}%
          </p>
        </div>
        <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold text-white ${theme.badge} shadow-sm uppercase`}>
          {selectedRegion.severity} severity
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase">Overall Risk Score</span>
            <ShieldAlert className={`w-5 h-5 ${theme.text}`} />
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black font-mono ${theme.text}`}>{riskData.riskScore}</span>
              <span className="text-slate-400 font-bold text-sm">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
              <div className={`h-full ${theme.badge}`} style={{ width: `${riskData.riskScore}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase">Primary Hazard</span>
            <CloudRain className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-xl font-black text-slate-900 capitalize">{riskData.hazardType}</span>
            <p className="text-[11px] text-slate-500 mt-1">Precipitation: <strong className="text-slate-700">{metrics.precipitationRate ?? '—'}</strong></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase">IWV Moisture</span>
            <Activity className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <span className="text-xl font-black text-slate-900 font-mono">{metrics.iwvMoisture ?? '—'}</span>
            <p className="text-[11px] text-slate-500 mt-1">CAPE: <strong className="text-slate-700">{metrics.cape ?? '—'}</strong></p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-400 uppercase">Wind / CTT</span>
            <Wind className="w-5 h-5 text-teal-500" />
          </div>
          <div className="mt-4">
            <span className="text-xl font-black text-slate-900 font-mono">{metrics.windSpeed ?? '—'}</span>
            <p className="text-[11px] text-slate-500 mt-1">CTT Drop: <strong className="text-slate-700">{metrics.cttDropRate ?? '—'}</strong></p>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Vibrant Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">+2h to +6h Nowcast Window</h2>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Dynamic Risk Trajectory
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 25, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="nowcastRiskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.hex} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={theme.hex} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke={theme.hex}
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill="url(#nowcastRiskGrad)"
                  dot={{
                    r: 5,
                    fill: '#ffffff',
                    stroke: theme.hex,
                    strokeWidth: 3,
                  }}
                  activeDot={{
                    r: 7,
                    fill: theme.hex,
                    stroke: '#ffffff',
                    strokeWidth: 3,
                  }}
                >
                  <LabelList
                    dataKey="risk"
                    position="top"
                    offset={12}
                    fill="#334155"
                    fontSize={12}
                    fontWeight={800}
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Impact List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900">Feature Impact</h2>
          </div>
          <div className="space-y-3.5 pt-1">
            {featureImportance.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{item.feature}</span>
                  <span className={item.impact > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {item.impact > 0 ? `+${item.impact}` : item.impact}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.impact > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, Math.abs(item.impact) * 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
          <div className="flex items-center gap-2 text-blue-400">
            <Info className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">XAI Diagnostic Summary</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{riskData.xaiExplanation}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Telemetry Feeds</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(metrics).map(([key, val]) => (
              <div key={key} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-bold text-slate-800">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisPage;