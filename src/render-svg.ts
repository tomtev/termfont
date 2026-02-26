import type { PixelGrid } from "./grid.js";
import { gridWidth, gridHeight } from "./grid.js";
import {
  type RGB,
  type ColorMode,
  resolvePixelColor,
  rgbToHex,
} from "./colors.js";

export interface SVGRenderOptions {
  colorMode: ColorMode;
  pixelSize?: number;
  shadowMask?: boolean[][];
  shadowColor?: RGB;
  outlineMask?: boolean[][];
  outlineColor?: RGB;
}

interface Run {
  x: number;
  y: number;
  len: number;
}

/**
 * Collect horizontal runs from a pixel test function,
 * group by color hex, and emit one <path> per color.
 */
function collectPaths(
  w: number,
  h: number,
  px: number,
  test: (x: number, y: number) => boolean,
  colorFn: (x: number, y: number) => string,
  opacity?: number,
): string[] {
  const colorRuns = new Map<string, Run[]>();

  for (let y = 0; y < h; y++) {
    let x = 0;
    while (x < w) {
      if (!test(x, y)) { x++; continue; }
      const color = colorFn(x, y);
      const startX = x;
      // extend run while same color
      while (x < w && test(x, y) && colorFn(x, y) === color) x++;
      const runs = colorRuns.get(color);
      const run = { x: startX, y, len: x - startX };
      if (runs) runs.push(run);
      else colorRuns.set(color, [run]);
    }
  }

  const elements: string[] = [];
  for (const [color, runs] of colorRuns) {
    const d = runs
      .map((r) => `M${r.x * px},${r.y * px}h${r.len * px}v${px}h${-r.len * px}z`)
      .join("");
    const opacityAttr = opacity !== undefined ? ` opacity="${opacity}"` : "";
    elements.push(`  <path fill="${color}"${opacityAttr} d="${d}"/>`);
  }
  return elements;
}

export function renderSVG(grid: PixelGrid, options: SVGRenderOptions): string {
  const px = options.pixelSize ?? 16;
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const totalW = w * px;
  const totalH = h * px;

  const elements: string[] = [];

  // Shadow paths
  if (options.shadowMask) {
    const sc = rgbToHex(options.shadowColor || [30, 30, 30]);
    elements.push(
      ...collectPaths(
        w, h, px,
        (x, y) => !!(options.shadowMask![y]?.[x]) && !grid[y][x],
        () => sc,
        0.5,
      ),
    );
  }

  // Outline paths
  if (options.outlineMask) {
    const oc = rgbToHex(options.outlineColor || [80, 80, 80]);
    elements.push(
      ...collectPaths(
        w, h, px,
        (x, y) => !!(options.outlineMask![y]?.[x]) && !grid[y][x],
        () => oc,
      ),
    );
  }

  // Main pixel paths
  elements.push(
    ...collectPaths(
      w, h, px,
      (x, y) => grid[y][x],
      (x, y) => rgbToHex(resolvePixelColor(x, y, w, h, options.colorMode)),
    ),
  );

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">`,
    ...elements,
    `</svg>`,
  ].join("\n");
}
