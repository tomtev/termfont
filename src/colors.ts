export type RGB = [number, number, number];

export type ColorMode =
  | { type: "solid"; color: RGB }
  | { type: "gradient"; from: RGB; to: RGB; via?: RGB; direction: "horizontal" | "vertical" }
  | { type: "rainbow" }
  | { type: "segments"; segments: Array<{ endX: number; mode: ColorMode }> };

const NAMED_COLORS: Record<string, RGB> = {
  black: [0, 0, 0],
  red: [255, 0, 0],
  green: [0, 200, 0],
  blue: [0, 100, 255],
  yellow: [255, 220, 0],
  cyan: [0, 220, 220],
  magenta: [200, 0, 200],
  white: [255, 255, 255],
  orange: [255, 140, 0],
  pink: [255, 105, 180],
  purple: [128, 0, 255],
  lime: [50, 255, 50],
  teal: [0, 128, 128],
  navy: [0, 0, 128],
  gold: [255, 200, 0],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  darkgray: [64, 64, 64],
  lightgray: [192, 192, 192],
  silver: [192, 192, 192],
  coral: [255, 100, 80],
  violet: [180, 60, 255],
};

export function parseColor(str: string): RGB {
  const lower = str.toLowerCase().trim();
  if (NAMED_COLORS[lower]) return NAMED_COLORS[lower];
  const hex = lower.startsWith("#") ? lower.slice(1) : lower;
  if (/^[0-9a-f]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  if (/^[0-9a-f]{3}$/.test(hex)) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
    ];
  }
  return [255, 255, 255];
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export function rgbToHex(rgb: RGB): string {
  return "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join("");
}

export function rgbToAnsiFg(rgb: RGB): string {
  return `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}

export function rgbToAnsiBg(rgb: RGB): string {
  return `\x1b[48;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}

export const ANSI_RESET = "\x1b[0m";

export function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

export function darken(rgb: RGB, amount: number): RGB {
  return [
    Math.round(rgb[0] * (1 - amount)),
    Math.round(rgb[1] * (1 - amount)),
    Math.round(rgb[2] * (1 - amount)),
  ];
}

export function lighten(rgb: RGB, amount: number): RGB {
  return [
    Math.round(rgb[0] + (255 - rgb[0]) * amount),
    Math.round(rgb[1] + (255 - rgb[1]) * amount),
    Math.round(rgb[2] + (255 - rgb[2]) * amount),
  ];
}

export function resolvePixelColor(
  x: number,
  y: number,
  w: number,
  h: number,
  mode: ColorMode,
): RGB {
  switch (mode.type) {
    case "solid":
      return mode.color;
    case "gradient": {
      const t =
        mode.direction === "horizontal"
          ? w > 1 ? x / (w - 1) : 0
          : h > 1 ? y / (h - 1) : 0;
      if (mode.via) {
        if (t < 0.5) return lerpRgb(mode.from, mode.via, t * 2);
        return lerpRgb(mode.via, mode.to, (t - 0.5) * 2);
      }
      return lerpRgb(mode.from, mode.to, t);
    }
    case "rainbow": {
      const t = w > 1 ? x / (w - 1) : 0;
      return hslToRgb(t * 360, 1, 0.55);
    }
    case "segments": {
      for (const seg of mode.segments) {
        if (x <= seg.endX) return resolvePixelColor(x, y, w, h, seg.mode);
      }
      const last = mode.segments[mode.segments.length - 1];
      return last ? resolvePixelColor(x, y, w, h, last.mode) : [255, 255, 255];
    }
  }
}
