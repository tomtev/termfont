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

  // Flood-fill from edges to find outer background pixels
  const outer: boolean[][] = Array.from({ length: h }, () =>
    new Array(w).fill(false),
  );
  const queue: [number, number][] = [];

  // Seed from all edge pixels that are empty
  for (let y = 0; y < h; y++) {
    if (!grid[y][0]) { outer[y][0] = true; queue.push([y, 0]); }
    if (!grid[y][w - 1]) { outer[y][w - 1] = true; queue.push([y, w - 1]); }
  }
  for (let x = 0; x < w; x++) {
    if (!grid[0][x] && !outer[0][x]) { outer[0][x] = true; queue.push([0, x]); }
    if (!grid[h - 1][x] && !outer[h - 1][x]) { outer[h - 1][x] = true; queue.push([h - 1, x]); }
  }

  // BFS flood fill through empty pixels
  while (queue.length > 0) {
    const [cy, cx] = queue.shift()!;
    for (const [ny, nx] of [[cy - 1, cx], [cy + 1, cx], [cy, cx - 1], [cy, cx + 1]]) {
      if (ny >= 0 && ny < h && nx >= 0 && nx < w && !outer[ny][nx] && !grid[ny][nx]) {
        outer[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }

  // Outline = outer empty pixels adjacent (8-connected) to a filled pixel
  const outline: boolean[][] = Array.from({ length: h }, () =>
    new Array(w).fill(false),
  );

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!outer[y][x]) continue;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue;
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < h && nx >= 0 && nx < w && grid[ny][nx]) {
            outline[y][x] = true;
            break;
          }
        }
        if (outline[y][x]) break;
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
