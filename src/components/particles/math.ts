export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function weightedPick<T extends { weight: number }>(arr: T[]): T {
  const total = arr.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * total;
  for (const item of arr) {
    if (r < item.weight) return item;
    r -= item.weight;
  }
  return arr[arr.length - 1];
}

export function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function distSq(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}