export interface Electron {
  orbitR: number;
  phase: number;
  speed: number;
}

export interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  baseRadius: number;
  color: [number, number, number];
  electrons?: Electron[];
}

export interface Bond {
  a: number;
  b: number;
  created: number;
  curved: boolean;
  ctrlOffsetX: number;
  ctrlOffsetY: number;
}

export interface Pulse {
  x: number;
  y: number;
  start: number;
  life: number;
}

export interface Burst {
  x: number;
  y: number;
  start: number;
  life: number;
}

export interface ParticleConfig {
  baseNodeCount: number;
  mobileNodeCount: number;
  maxVelocity: number;
  linkDistance: number;
  maxCurvedBondDistance: number;
  lineOpacityBase: number;
  nodeRadiusBase: number;
  depthZMin: number;
  depthZMax: number;
  atomTypes: Array<{ key: string; weight: number; radius: number; color: [number, number, number] }>;
  electronChance: number;
  electronOrbitRadiusRange: [number, number];
  electronCountRange: [number, number];
  electronSpeedBase: number;
  repelRadius: number;
  inertiaLerp: number;
  colorCycleSpeed: number;
  colorStops: [number, number, number][];
  bondStabilityMs: number;
  curvedBondProbability: number;
  parallaxFactor: number;
  pulseEveryMs: number;
  pulseLife: number;
  pulseScale: number;
  energyBurstChancePerFrame: number;
  energyBurstLife: number;
  energyBurstScale: number;
  microJitter: number;
  fpsCheckInterval: number;
  minFps: number;
}

export interface PointerState {
  x: number;
  y: number;
  inertX: number;
  inertY: number;
  active: boolean;
  attract: boolean;
}

export type DensityMode = 'light' | 'normal' | 'high';