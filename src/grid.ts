import { getFont, getGlyph, type FontDef } from "./fonts.js";

export type PixelGrid = boolean[][];

export interface ComposeOptions {
  font?: string;
  letterSpacing?: number;
  wordSpacing?: number;
  lineSpacing?: number;
}

export function composeText(text: string, options: ComposeOptions = {}): PixelGrid {
  const font = getFont(options.font || "sans");
  const glyphW = font.width;
  const glyphH = font.height;
  const letterSpacing = options.letterSpacing ?? font.spacing ?? 1;
  const wordSpacing = options.wordSpacing ?? (font.spacing ? font.spacing + 1 : 3);
  const lineSpacing = options.lineSpacing ?? 1;

  const lines = text.split("\n");
  const lineGrids: PixelGrid[] = [];
  let maxWidth = 0;

  for (const line of lines) {
    const lineGrid = composeLine(line, font, glyphW, glyphH, letterSpacing, wordSpacing);
    lineGrids.push(lineGrid);
    if (lineGrid[0] && lineGrid[0].length > maxWidth) {
      maxWidth = lineGrid[0].length;
    }
  }

  const result: PixelGrid = [];
  for (let i = 0; i < lineGrids.length; i++) {
    const lineGrid = lineGrids[i];
    for (const row of lineGrid) {
      const padded = [...row];
      while (padded.length < maxWidth) padded.push(false);
      result.push(padded);
    }
    if (i < lineGrids.length - 1) {
      for (let s = 0; s < lineSpacing; s++) {
        result.push(new Array(maxWidth).fill(false));
      }
    }
  }

  return result;
}

function composeLine(
  line: string,
  font: FontDef,
  glyphW: number,
  glyphH: number,
  letterSpacing: number,
  wordSpacing: number,
): PixelGrid {
  const grid: PixelGrid = Array.from({ length: glyphH }, () => [] as boolean[]);

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (i > 0) {
      const spacing = char === " " || line[i - 1] === " " ? 0 : letterSpacing;
      for (let row = 0; row < glyphH; row++) {
        for (let s = 0; s < spacing; s++) {
          grid[row].push(false);
        }
      }
    }

    if (char === " ") {
      for (let row = 0; row < glyphH; row++) {
        for (let s = 0; s < wordSpacing; s++) {
          grid[row].push(false);
        }
      }
      continue;
    }

    const glyph = getGlyph(font, char);
    for (let row = 0; row < glyphH; row++) {
      const glyphRow = glyph[row] || ".".repeat(glyphW);
      for (let col = 0; col < glyphW; col++) {
        grid[row].push(glyphRow[col] === "#");
      }
    }
  }

  return grid;
}

export function gridWidth(grid: PixelGrid): number {
  return grid[0]?.length ?? 0;
}

export function gridHeight(grid: PixelGrid): number {
  return grid.length;
}

/**
 * Returns the ending x-coordinate for each segment.
 * Segments are split by spaces or `|` (pipe = zero-width color boundary).
 */
export function getWordBoundaries(text: string, options: ComposeOptions = {}): number[] {
  const font = getFont(options.font || "sans");
  const glyphW = font.width;
  const letterSpacing = options.letterSpacing ?? font.spacing ?? 1;
  const wordSpacing = options.wordSpacing ?? (font.spacing ? font.spacing + 1 : 3);

  // Split on | first, then track spaces within
  const segments = text.split("|");
  const boundaries: number[] = [];
  let x = 0;
  let isFirst = true;

  for (let si = 0; si < segments.length; si++) {
    const seg = segments[si];
    const words = seg.split(" ");
    for (let wi = 0; wi < words.length; wi++) {
      const word = words[wi];
      if (wi > 0) {
        // space between words within a segment
        x += wordSpacing;
      }
      for (let ci = 0; ci < word.length; ci++) {
        if (!isFirst) x += letterSpacing;
        x += glyphW;
        isFirst = false;
      }
    }
    boundaries.push(x - 1);
  }

  return boundaries;
}
