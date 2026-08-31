// import { create } from 'zustand';
// import { predictSevereWeather } from '../services/mlInferenceService';
// import { websocketService } from '../services/webSocketService';

// export const INDIAN_CITIES = [
//   { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, riskScore: 88, primaryHazard: 'Cloudburst' },
//   { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, riskScore: 78, primaryHazard: 'Flash Flood' },
//   { id: 'guwahati', name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, riskScore: 72, primaryHazard: 'Thunderstorm' },
//   { id: 'delhi', name: 'New Delhi', state: 'Delhi NCR', lat: 28.6139, lng: 77.2090, riskScore: 54, primaryHazard: 'Thunderstorm' },
//   { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, riskScore: 65, primaryHazard: 'Flash Flood' },
//   { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, riskScore: 32, primaryHazard: 'Nominal' },
//   { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, riskScore: 48, primaryHazard: 'Flash Flood' },
// ];

// export const useWeatherStore = create((set, get) => ({
//   cities: INDIAN_CITIES,
//   selectedCity: INDIAN_CITIES[0], // Default: Shimla
//   activeLayer: 'cloudburst', // Options: 'cloudburst', 'flash_flood', 'thunderstorm'
//   currentRiskData: null,
//   isLoading: false,
//   error: null,
//   isConnectedToWS: false,

//   simulatorParameters: {
//     precipitation: 65,
//     windSpeed: 75,
//     iwv: 60,
//     cttDrop: 18,
//   },

//   // City selection updates global context for all report pages
//   setSelectedCity: (cityObj) => {
//     set({ selectedCity: cityObj });
//     get().fetchRiskAnalysis();
//   },

//   setActiveLayer: (layer) => set({ activeLayer: layer }),

//   setSimulatorParameters: (params) => {
//     set((state) => ({
//       simulatorParameters: { ...state.simulatorParameters, ...params },
//     }));
//   },

//   fetchRiskAnalysis: async (telemetry) => {
//     const city = get().selectedCity;
//     const telemetryParams = telemetry || get().simulatorParameters;

//     set({ isLoading: true, error: null });
//     try {
//       const payload = {
//         cityId: city.id,
//         cityName: city.name,
//         lat: city.lat,
//         lng: city.lng,
//         timestamp: new Date().toISOString(),
//         telemetry: telemetryParams,
//       };

//       const result = await predictSevereWeather(payload);
//       set({ currentRiskData: result, isLoading: false });
//     } catch (err) {
//       set({ error: err.message || 'Failed to fetch risk analysis', isLoading: false });
//     }
//   },

//   connectWebSocket: () => {
//     const city = get().selectedCity;
//     websocketService.disconnect();

//     websocketService.connect(
//       city.id,
//       (incomingFrame) => {
//         set({ currentRiskData: { ...incomingFrame, cityName: city.name } });
//       },
//       (status) => set({ isConnectedToWS: status })
//     );
//   },

//   disconnectWebSocket: () => {
//     websocketService.disconnect();
//     set({ isConnectedToWS: false });
//   },
// }));

// export default useWeatherStore;

import { create } from 'zustand';
import { mockAlerts } from '../mock/mockAlerts';
import { predictSevereWeather } from '../services/mlInferenceService';
import { websocketService } from '../services/webSocketService';

// Single source of truth for region metadata — derived from mockAlerts so
// there is exactly one region list shared by every page (Live Map, Risk
// Analysis, Simulator, XAI Reports, Alert Ticker, Historical Data).
function formatRegionObject(regionIdOrObj) {
  if (!regionIdOrObj) return null;

  const regionId = typeof regionIdOrObj === 'string' ? regionIdOrObj : regionIdOrObj.regionId;
  const alert = mockAlerts.find((a) => a.regionId === regionId);
  if (!alert) return null;

  return {
    id: alert.regionId,
    name: alert.regionName,
    state: alert.state,
    lat: alert.lat,
    lng: alert.lng,
    hazardType: alert.hazardType,
    riskScore: alert.riskScore,
    severity: alert.severity,
  };
}

function getDefaultRegion() {
  const activeAlerts = mockAlerts.filter((a) => a.status === 'active');
  const highest = [...activeAlerts].sort((a, b) => b.riskScore - a.riskScore)[0];
  return formatRegionObject((highest || mockAlerts[0]).regionId);
}

export const useWeatherStore = create((set, get) => ({
  // ---- Region selection — single shared source across all 6 pages ----
  regions: mockAlerts.map((a) => formatRegionObject(a.regionId)),
  selectedRegion: getDefaultRegion(),

  setSelectedRegion: (regionIdOrObj) =>
    set({ selectedRegion: formatRegionObject(regionIdOrObj) }),

  // ---- Live Map forecast lead-time scrubber (+2h to +6h, per problem statement) ----
  forecastHorizon: { min: 2, max: 6, value: 2 },

  setForecastHorizonValue: (value) =>
    set((state) => ({
      forecastHorizon: {
        ...state.forecastHorizon,
        value: Math.min(Math.max(value, state.forecastHorizon.min), state.forecastHorizon.max),
      },
    })),

  // ---- Live Map hazard layer + render style ----
  mapLayers: {
    activeHazard: 'all', // 'all' | 'thunderstorm' | 'cloudburst' | 'flashFlood'
    renderStyle: 'heatmap', // 'heatmap' | 'contour'
  },

  setActiveHazard: (activeHazard) =>
    set((state) => ({ mapLayers: { ...state.mapLayers, activeHazard } })),

  setRenderStyle: (renderStyle) =>
    set((state) => ({ mapLayers: { ...state.mapLayers, renderStyle } })),

  // ---- Live model/inference output (mock now, real backend later — see
  // mlInferenceService.js for the swap point) ----
  currentRiskData: null,
  isLoading: false,
  error: null,
  isConnectedToWS: false,
  streamPaused: false,
  setStreamPaused: (paused) => set({ streamPaused: paused }),

  // ---- What-If Simulator parameters — full predictive matrix, matches the
  // problem statement's three ingredients (moisture, instability, kinematics) ----
  simulatorParameters: {
    precipitation: 60, // mm/h
    windSpeed: 40,      // km/h
    iwv: 45,            // kg/m²
    cape: 1800,         // J/kg
    cin: -15,           // J/kg
    cttDrop: 8,          // °C/30min
  },

  setSimulatorParameters: (params) =>
    set((state) => ({ simulatorParameters: { ...state.simulatorParameters, ...params } })),

  // Seeds the simulator to the currently selected region's real telemetry —
  // called on region change so the sliders start from a realistic baseline.
  syncSimulatorToRegionTelemetry: (telemetry) => {
    if (!telemetry) return;
    set((state) => ({
      simulatorParameters: {
        ...state.simulatorParameters,
        precipitation: telemetry.rainfallRate ?? state.simulatorParameters.precipitation,
        windSpeed: telemetry.windGust ?? state.simulatorParameters.windSpeed,
        iwv: telemetry.iwv ?? state.simulatorParameters.iwv,
        cape: telemetry.cape ?? state.simulatorParameters.cape,
        cin: telemetry.cin ?? state.simulatorParameters.cin,
        cttDrop: telemetry.cttDrop30m ?? state.simulatorParameters.cttDrop,
      },
    }));
  },

  // ---- Core inference call — this is the single place a real backend
  // connects. Swap happens entirely inside mlInferenceService.js via
  // VITE_USE_REAL_MODEL; nothing here needs to change when that flips. ----
  fetchRiskAnalysis: async (telemetryOverride) => {
    const region = get().selectedRegion;
    if (!region) return;

    const telemetry = telemetryOverride || get().simulatorParameters;

    set({ isLoading: true, error: null });
    try {
      const payload = {
        regionId: region.id,
        regionName: region.name,
        lat: region.lat,
        lng: region.lng,
        timestamp: new Date().toISOString(),
        telemetry,
      };

      const result = await predictSevereWeather(payload);
      set({ currentRiskData: result, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch risk analysis', isLoading: false });
    }
  },

  // ---- Live nowcast WebSocket stream (mock-generated now, real socket
  // later — toggle lives in webSocketService.js) ----
  connectWebSocket: () => {
    const region = get().selectedRegion;
    if (!region) return;
    websocketService.disconnect();

    websocketService.connect(
      region.id,
      region,
      (frame) => set({currentRiskData: frame}),
      (status) => set({ isConnectedToWS: status })
    );
  },

  disconnectWebSocket: () => {
    websocketService.disconnect();
    set({ isConnectedToWS: false });
  },

  // ---- Alert Ticker filters ----
  alertFilters: {
    hazardType: 'all',
    severity: 'all',
    status: 'active',
    searchQuery: '',
  },

  setAlertFilters: (filters) =>
    set((state) => ({ alertFilters: { ...state.alertFilters, ...filters } })),

  // ---- Historical Replay playback ----
  replayState: {
    isPlaying: false,
    speed: 1,
    currentEventId: null,
    currentFrameIndex: 0,
  },

  setReplayState: (partial) =>
    set((state) => ({ replayState: { ...state.replayState, ...partial } })),
}));

export default useWeatherStore;