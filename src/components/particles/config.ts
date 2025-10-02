import { ParticleConfig } from './types';

export const BASE_CONFIG: ParticleConfig = {
  baseNodeCount: 95,
  mobileNodeCount: 52,
  maxVelocity: 0.24,
  linkDistance: 185,
  maxCurvedBondDistance: 150,
  lineOpacityBase: 0.30,
  nodeRadiusBase: 1.2,
  depthZMin: 0.55,
  depthZMax: 1.0,
  atomTypes: [
    { key: 'H', weight: 30, radius: 0.8, color: [180, 220, 255] },
    { key: 'C', weight: 22, radius: 1.5, color: [120, 170, 255] },
    { key: 'O', weight: 18, radius: 1.7, color: [255, 150, 120] },
    { key: 'N', weight: 14, radius: 1.4, color: [160, 130, 255] },
    { key: 'X', weight: 16, radius: 2.0, color: [255, 210, 90] }
  ],
  electronChance: 0.34,
  electronOrbitRadiusRange: [6, 18],
  electronCountRange: [1, 3],
  electronSpeedBase: 0.0016,
  repelRadius: 160,
  inertiaLerp: 0.09,
  colorCycleSpeed: 0.00016,
  colorStops: [
    [56, 189, 248],
    [99, 102, 241],
    [168, 85, 247],
    [14, 165, 233],
    [59, 130, 246]
  ],
  bondStabilityMs: 1850,
  curvedBondProbability: 0.16,
  parallaxFactor: 0.12,
  pulseEveryMs: 1350,
  pulseLife: 900,
  pulseScale: 2.25,
  energyBurstChancePerFrame: 0.0035,
  energyBurstLife: 950,
  energyBurstScale: 3.8,
  microJitter: 0.0009,
  fpsCheckInterval: 2500,
  minFps: 34
};

export const DENSITY_SCALE: Record<'light' | 'normal' | 'high', number> = {
  light: 0.55,
  normal: 1.0,
  high: 1.25
};