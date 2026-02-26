import type { PixelGrid } from "./grid.js";

export interface ShadowResult {
  grid: PixelGrid;
  shadowMask: boolean[][];
}

export function applyShadow(grid: PixelGrid, dx = 1, dy = 1): ShadowResult {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + Math.abs(dy);
  const newW = w + Math.abs(dx);

  const offsetX = dx < 0 ? Math.abs(dx) : 0;
  const offsetY = dy < 0 ? Math.abs(dy) : 0;
  const shadowOffsetX = dx > 0 ? dx : 0;
  const shadowOffsetY = dy > 0 ? dy : 0;

  const shadowMask: boolean[][] = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );

  // Place shadow - shifted copy of text at diagonal offset only
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x]) {
        const sy = y + shadowOffsetY;
        const sx = x + shadowOffsetX;
        if (sy < newH && sx < newW) {
          shadowMask[sy][sx] = true;
        }
      }
    }
  }

  // Foreground grid (expanded)
  const fgGrid: PixelGrid = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x]) {
        fgGrid[y + offsetY][x + offsetX] = true;
        shadowMask[y + offsetY][x + offsetX] = false; // fg overrides shadow
      }
    }
  }

  return { grid: fgGrid, shadowMask };
}

export function computeOutline(grid: PixelGrid): boolean[][] {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const outline: boolean[][] = Array.from({ length: h }, () =>
    new Array(w).fill(false),
  );

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (grid[y][x]) continue;
      const neighbors = [
        [y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1],
      ];
      for (const [ny, nx] of neighbors) {
        if (ny >= 0 && ny < h && nx >= 0 && nx < w && grid[ny][nx]) {
          outline[y][x] = true;
          break;
        }
      }
    }
  }

  return outline;
}

export function applyPadding(grid: PixelGrid, n: number): PixelGrid {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + n * 2;
  const newW = w + n * 2;
  const result: PixelGrid = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      result[y + n][x + n] = grid[y][x];
    }
  }
  return result;
}

export interface BorderResult {
  grid: PixelGrid;
  borderMask: boolean[][];
}

/**
 * Adds a pixel-art border frame around the grid.
 * Returns the expanded grid with border pixels filled and a mask identifying border pixels.
 */
export function applyBorder(grid: PixelGrid, thickness = 1): BorderResult {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + thickness * 2;
  const newW = w + thickness * 2;

  const result: PixelGrid = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );
  const borderMask: boolean[][] = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );

  // Copy original grid into center
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      result[y + thickness][x + thickness] = grid[y][x];
    }
  }

  // Draw border frame
  for (let y = 0; y < newH; y++) {
    for (let x = 0; x < newW; x++) {
      if (y < thickness || y >= newH - thickness || x < thickness || x >= newW - thickness) {
        result[y][x] = true;
        borderMask[y][x] = true;
      }
    }
  }

  return { grid: result, borderMask };
}

/**
 * Expand a mask to match a grid that has been expanded by n pixels on each side.
 */
export function expandMask(mask: boolean[][], n: number): boolean[][] {
  const h = mask.length;
  const w = mask[0]?.length ?? 0;
  const newH = h + n * 2;
  const newW = w + n * 2;
  const result: boolean[][] = Array.from({ length: newH }, () =>
    new Array(newW).fill(false),
  );
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      result[y + n][x + n] = mask[y][x];
    }
  }
  return result;
}
