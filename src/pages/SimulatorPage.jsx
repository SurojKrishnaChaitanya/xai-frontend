// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { Sliders, MapPin, BarChart2, TrendingUp, CloudRain, Wind, Thermometer, Droplets, ShieldAlert } from 'lucide-react';
// import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// export const SimulatorPage = () => {
//   const { selectedCity, simulatorParameters, setSimulatorParameters, currentRiskData, fetchRiskAnalysis } = useWeatherStore();

//   const handleSliderChange = (key, value) => {
//     setSimulatorParameters({ [key]: value });
//   };

//   useEffect(() => {
//     fetchRiskAnalysis(simulatorParameters);
//   }, [simulatorParameters, selectedCity]);

//   const simulatedScore = currentRiskData?.riskScore ?? selectedCity.riskScore;
//   const baselineScore = selectedCity.riskScore;

//   // Recharts Data for Baseline vs Simulated Comparison
//   const comparisonData = [
//     { name: 'Cloudburst', Baseline: Math.min(100, baselineScore + 5), Simulated: simulatedScore },
//     { name: 'Flash Flood', Baseline: Math.max(10, baselineScore - 12), Simulated: Math.min(100, Math.round(simulatedScore * 0.85)) },
//     { name: 'Thunderstorm', Baseline: Math.max(15, baselineScore - 5), Simulated: Math.min(100, Math.round(simulatedScore * 0.92)) },
//   ];

//   // +0h to +6h Simulated Nowcasting Forecast Trajectory
//   const trajectoryData = [
//     { hour: '+0h', score: simulatedScore },
//     { hour: '+1h', score: Math.min(100, Math.round(simulatedScore * 1.06)) },
//     { hour: '+2h', score: Math.min(100, Math.round(simulatedScore * 1.14)) },
//     { hour: '+3h', score: Math.min(100, Math.round(simulatedScore * 1.08)) },
//     { hour: '+4h', score: Math.max(10, Math.round(simulatedScore * 0.88)) },
//     { hour: '+5h', score: Math.max(10, Math.round(simulatedScore * 0.65)) },
//     { hour: '+6h', score: Math.max(5, Math.round(simulatedScore * 0.42)) },
//   ];

//   return (
//     <div className="p-6 space-y-6 bg-slate-50 min-h-screen text-slate-900">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-600 shadow-sm">
//             <Sliders className="w-6 h-6" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">What-If Scenario Simulator</h1>
//             <p className="text-xs text-slate-500">Interactive met-telemetry simulation and +0h to +6h dynamic projections</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-semibold text-slate-700">
//           <MapPin className="w-4 h-4 text-blue-600" />
//           <span>Simulation Target: <strong>{selectedCity.name}, {selectedCity.state}</strong></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Sliders Box */}
//         <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
//           <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
//             Simulation Met-Telemetry Parameters
//           </h2>

//           <div className="space-y-4">
//             <div className="space-y-1.5">
//               <div className="flex justify-between text-xs font-bold text-slate-700">
//                 <span className="flex items-center gap-1.5"><CloudRain className="w-4 h-4 text-blue-600" /> Precipitation Rate</span>
//                 <span className="font-mono text-blue-600">{simulatorParameters.precipitation} mm/hr</span>
//               </div>
//               <input type="range" min="0" max="150" value={simulatorParameters.precipitation} onChange={(e) => handleSliderChange('precipitation', Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer" />
//             </div>

//             <div className="space-y-1.5">
//               <div className="flex justify-between text-xs font-bold text-slate-700">
//                 <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-blue-600" /> Surface Wind Velocity</span>
//                 <span className="font-mono text-blue-600">{simulatorParameters.windSpeed} km/h</span>
//               </div>
//               <input type="range" min="0" max="180" value={simulatorParameters.windSpeed} onChange={(e) => handleSliderChange('windSpeed', Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer" />
//             </div>

//             <div className="space-y-1.5">
//               <div className="flex justify-between text-xs font-bold text-slate-700">
//                 <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-blue-600" /> Integrated Water Vapor (IWV)</span>
//                 <span className="font-mono text-blue-600">{simulatorParameters.iwv} kg/m²</span>
//               </div>
//               <input type="range" min="10" max="90" value={simulatorParameters.iwv} onChange={(e) => handleSliderChange('iwv', Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer" />
//             </div>

//             <div className="space-y-1.5">
//               <div className="flex justify-between text-xs font-bold text-slate-700">
//                 <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-blue-600" /> Cloud Top Temp Drop</span>
//                 <span className="font-mono text-blue-600">{simulatorParameters.cttDrop} °C/hr</span>
//               </div>
//               <input type="range" min="0" max="40" value={simulatorParameters.cttDrop} onChange={(e) => handleSliderChange('cttDrop', Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer" />
//             </div>
//           </div>
//         </div>

//         {/* Recharts Comparison Bar Chart */}
//         <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
//           <div className="flex justify-between items-center border-b border-slate-100 pb-3">
//             <div className="flex items-center gap-2">
//               <BarChart2 className="w-5 h-5 text-blue-600" />
//               <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Baseline vs Simulated Hazards</h2>
//             </div>
//           </div>

//           <div className="h-60 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                 <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
//                 <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} unit="%" />
//                 <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
//                 <Legend />
//                 <Bar dataKey="Baseline" fill="#94a3b8" radius={[6, 6, 0, 0]} />
//                 <Bar dataKey="Simulated" fill="#2563eb" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Recharts +0h to +6h Simulated Line Chart Trajectory */}
//       <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
//         <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//           <div className="flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-blue-600" />
//             <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">+0h to +6h Simulated Hazard Trajectory</h2>
//           </div>
//           <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">Simulated Curve</span>
//         </div>

//         <div className="h-60 w-full pt-2">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={trajectoryData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//               <XAxis dataKey="hour" stroke="#64748b" fontSize={11} tickLine={false} />
//               <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} unit="%" />
//               <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
//               <Line type="monotone" dataKey="score" name="Simulated Risk Score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: '#2563eb' }} activeDot={{ r: 7 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimulatorPage;

// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { mockTelemetry } from '../mock/mockTelemetry';
// import { Sliders, MapPin } from 'lucide-react';
// import ParameterSliders from '../components/Simulator/ParametersSliders';
// import RiskComparisionCanvas from '../components/Simulator/RiskComparisionCanvas';
// import SimulatorChat from '../components/simulator/SimulatorChat';

// export const SimulatorPage = () => {
//   const selectedRegion = useWeatherStore((state) => state.selectedRegion);
//   const currentRiskData = useWeatherStore((state) => state.currentRiskData);
//   const isLoading = useWeatherStore((state) => state.isLoading);
//   const syncSimulatorToRegionTelemetry = useWeatherStore((state) => state.syncSimulatorToRegionTelemetry);

//   // Seed sliders to the selected region's real telemetry whenever it changes,
//   // so the What-If baseline matches what Live Map/Risk Analysis show.
//   useEffect(() => {
//     if (selectedRegion) {
//       syncSimulatorToRegionTelemetry(mockTelemetry[selectedRegion.id]?.current);
//     }
//   }, [selectedRegion?.id]);

//   if (!selectedRegion) {
//     return <div className="p-6 text-sm text-slate-400">Select a region to run the simulator.</div>;
//   }

//   return (
//     <div className="p-6 space-y-6 bg-slate-50 min-h-screen text-slate-900">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-600 shadow-sm">
//             <Sliders className="w-6 h-6" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">What-If Scenario Simulator</h1>
//             <p className="text-xs text-slate-500">Adjust telemetry to see simulated model output, sent back for a new risk calculation.</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-semibold text-slate-700">
//           <MapPin className="w-4 h-4 text-blue-600" />
//           <span>Target: <strong>{selectedRegion.name}, {selectedRegion.state}</strong></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <ParameterSliders />
//           <SimulatorChat riskData={currentRiskData} />
//         </div>
//         <RiskComparisionCanvas riskData={currentRiskData} isLoading={isLoading} />
//       </div>
//     </div>
//   );
// };

// export default SimulatorPage;

// import React, { useEffect } from 'react';
// import { useWeatherStore } from '../store/useWeatherStore';
// import { mockTelemetry } from '../mock/mockTelemetry';
// import { Sliders, MapPin } from 'lucide-react';
// import ParameterSliders from '../components/Simulator/ParametersSliders';
// import RiskComparisionCanvas from '../components/Simulator/RiskComparisionCanvas';
// import SimulatorChat from '../components/Simulator/SimulatorChat';

// export const SimulatorPage = () => {
//   const selectedRegion = useWeatherStore((state) => state.selectedRegion);
//   const currentRiskData = useWeatherStore((state) => state.currentRiskData);
//   const isLoading = useWeatherStore((state) => state.isLoading);
//   const syncSimulatorToRegionTelemetry = useWeatherStore((state) => state.syncSimulatorToRegionTelemetry);
//   const setStreamPaused = useWeatherStore((state) => state.setStreamPaused);

//   useEffect(() => {
//     setStreamPaused(true);
//     return () => setStreamPaused(false);
//   }, []);


//   // Seed sliders to the selected region's real telemetry whenever it changes,
//   // so the What-If baseline matches what Live Map/Risk Analysis show.
//   useEffect(() => {
//     if (selectedRegion) {
//       syncSimulatorToRegionTelemetry(mockTelemetry[selectedRegion.id]?.current);
//     }
//   }, [selectedRegion?.id]);

//   if (!selectedRegion) {
//     return <div className="p-6 text-sm text-slate-400">Select a region to run the simulator.</div>;
//   }

//   return (
//     <div className="p-6 space-y-6 bg-slate-50 min-h-screen text-slate-900">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-600 shadow-sm">
//             <Sliders className="w-6 h-6" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">What-If Scenario Simulator</h1>
//             <p className="text-xs text-slate-500">Adjust telemetry to see simulated model output, sent back for a new risk calculation.</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-semibold text-slate-700">
//           <MapPin className="w-4 h-4 text-blue-600" />
//           <span>Target: <strong>{selectedRegion.name}, {selectedRegion.state}</strong></span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <ParameterSliders />
//           <SimulatorChat riskData={currentRiskData} />
//         </div>
//         <RiskComparisionCanvas riskData={currentRiskData} isLoading={isLoading} />
//       </div>
//     </div>
//   );
// };

// export default SimulatorPage;

import React, { useEffect } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { mockTelemetry } from '../mock/mockTelemetry';
import { Sliders, MapPin } from 'lucide-react';
import ParameterSliders from '../components/Simulator/ParametersSliders.jsx';
import RiskComparisionCanvas from '../components/Simulator/RiskComparisionCanvas';
import SimulatorChat from '../components/Simulator/SimulatorChat';

export const SimulatorPage = () => {
  const selectedRegion = useWeatherStore((state) => state.selectedRegion);
  const currentRiskData = useWeatherStore((state) => state.currentRiskData);
  const isLoading = useWeatherStore((state) => state.isLoading);
  const syncSimulatorToRegionTelemetry = useWeatherStore((state) => state.syncSimulatorToRegionTelemetry);
  const setStreamPaused = useWeatherStore((state) => state.setStreamPaused);

  useEffect(() => {
    setStreamPaused(true);
    return () => setStreamPaused(false);
  }, [setStreamPaused]);

  useEffect(() => {
    if (selectedRegion && mockTelemetry[selectedRegion.id]?.current) {
      syncSimulatorToRegionTelemetry(mockTelemetry[selectedRegion.id].current);
    }
  }, [selectedRegion, syncSimulatorToRegionTelemetry]);

  if (!selectedRegion) {
    return (
      <div className="p-6 text-sm text-slate-500 bg-slate-50 min-h-screen">
        Select a region to run the simulator.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen text-slate-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-600 shadow-sm">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">What-If Scenario Simulator</h1>
            <p className="text-xs text-slate-500">Adjust telemetry to see simulated model output, sent back for a new risk calculation.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-semibold text-slate-700">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>Target: <strong>{selectedRegion.name}, {selectedRegion.state}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ParameterSliders />
          <SimulatorChat riskData={currentRiskData} />
        </div>
        <RiskComparisionCanvas riskData={currentRiskData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SimulatorPage;