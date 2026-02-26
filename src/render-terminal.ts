import type { PixelGrid } from "./grid.js";
import { gridWidth, gridHeight } from "./grid.js";
import {
  type RGB,
  type ColorMode,
  resolvePixelColor,
  rgbToAnsiFg,
  rgbToAnsiBg,
  darken,
  ANSI_RESET,
} from "./colors.js";

export type Size = "sm" | "md" | "lg";

export interface TerminalRenderOptions {
  colorMode: ColorMode;
  compact?: boolean;
  size?: Size;
  shadowMask?: boolean[][];
  shadowColor?: RGB | ColorMode;
  outlineMask?: boolean[][];
  borderMask?: boolean[][];
  borderColor?: RGB;
}

function resolveShadow(sc: RGB | ColorMode | undefined, x: number, y: number, w: number, h: number): RGB {
  if (!sc) return [60, 60, 60];
  if (Array.isArray(sc)) return sc;
  return resolvePixelColor(x, y, w, h, sc);
}

export function renderTerminal(
  grid: PixelGrid,
  options: TerminalRenderOptions,
): string[] {
  if (options.compact || options.size === "sm") {
    return renderCompact(grid, options);
  }
  return renderFull(grid, options);
}

function renderFull(grid: PixelGrid, options: TerminalRenderOptions): string[] {
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const chars = options.size === "lg" ? 4 : 2;
  const rowRepeat = options.size === "lg" ? 2 : 1;
  const block = "\u2588".repeat(chars);
  const space = " ".repeat(chars);
  const lines: string[] = [];

  for (let y = 0; y < h; y++) {
    let line = "";
    for (let x = 0; x < w; x++) {
      if (grid[y][x]) {
        if (options.borderMask?.[y]?.[x]) {
          const bc = options.borderColor || resolvePixelColor(x, y, w, h, options.colorMode);
          line += rgbToAnsiFg(bc) + block;
        } else {
          const color = resolvePixelColor(x, y, w, h, options.colorMode);
          line += rgbToAnsiFg(color) + block;
        }
      } else if (options.shadowMask?.[y]?.[x]) {
        const sc = resolveShadow(options.shadowColor, x, y, w, h);
        line += rgbToAnsiFg(sc) + block;
      } else if (options.outlineMask?.[y]?.[x]) {
        const base = resolvePixelColor(x, y, w, h, options.colorMode);
        line += rgbToAnsiFg(darken(base, 0.7)) + block;
      } else {
        line += space;
      }
    }
    const rendered = line + ANSI_RESET;
    for (let r = 0; r < rowRepeat; r++) {
      lines.push(rendered);
    }
  }

  return lines;
}

function renderCompact(grid: PixelGrid, options: TerminalRenderOptions): string[] {
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const lines: string[] = [];

  for (let y = 0; y < h; y += 2) {
    let line = "";
    let bgActive = false;

    for (let x = 0; x < w; x++) {
      const topOn = grid[y]?.[x] ?? false;
      const botOn = grid[y + 1]?.[x] ?? false;
      const topShadow = options.shadowMask?.[y]?.[x] ?? false;
      const botShadow = options.shadowMask?.[y + 1]?.[x] ?? false;
      const topOutline = options.outlineMask?.[y]?.[x] ?? false;
      const botOutline = options.outlineMask?.[y + 1]?.[x] ?? false;

      const topPixel = topOn || topShadow || topOutline;
      const botPixel = botOn || botShadow || botOutline;

      if (topPixel && botPixel) {
        const topColor = getCompactColor(topOn, topShadow, topOutline, x, y, w, h, options);
        const botColor = getCompactColor(botOn, botShadow, botOutline, x, y + 1, w, h, options);
        line += rgbToAnsiFg(topColor) + rgbToAnsiBg(botColor) + "\u2580";
        bgActive = true;
      } else {
        if (bgActive) {
          line += ANSI_RESET;
          bgActive = false;
        }
        if (topPixel) {
          const topColor = getCompactColor(topOn, topShadow, topOutline, x, y, w, h, options);
          line += rgbToAnsiFg(topColor) + "\u2580";
        } else if (botPixel) {
          const botColor = getCompactColor(botOn, botShadow, botOutline, x, y + 1, w, h, options);
          line += rgbToAnsiFg(botColor) + "\u2584";
        } else {
          line += " ";
        }
      }
    }
    lines.push(line + ANSI_RESET);
  }

  return lines;
}

function getCompactColor(
  isOn: boolean,
  isShadow: boolean,
  isOutline: boolean,
  x: number,
  y: number,
  w: number,
  h: number,
  options: TerminalRenderOptions,
): RGB {
  if (isOn) return resolvePixelColor(x, y, w, h, options.colorMode);
  if (isShadow) return resolveShadow(options.shadowColor, x, y, w, h);
  if (isOutline) return darken(resolvePixelColor(x, y, w, h, options.colorMode), 0.7);
  return [0, 0, 0];
}
