#!/usr/bin/env node
import { composeText, getWordBoundaries } from "./grid.js";
import { renderTerminal } from "./render-terminal.js";
import type { Size } from "./render-terminal.js";
import { renderSVG } from "./render-svg.js";
import { applyShadow, computeOutline, applyPadding, applyBorder, expandMask } from "./decorations.js";
import { parseColor, type ColorMode, type RGB } from "./colors.js";
import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const flags = new Set<string>();
const opts: Record<string, string> = {};
let input: string | undefined;

for (const arg of args) {
  if (arg.startsWith("--")) {
    const eqIdx = arg.indexOf("=");
    if (eqIdx !== -1) {
      opts[arg.slice(2, eqIdx)] = arg.slice(eqIdx + 1);
      flags.add(arg.slice(2, eqIdx));
    } else {
      flags.add(arg.slice(2));
    }
  } else if (arg === "-h") {
    flags.add("help");
  } else if (!input) {
    input = arg;
  }
}

if (flags.has("help") || flags.has("h") || !input) {
  console.log(`Usage: termfont <text> [options]

Generate block-based text art for terminal or SVG.

Arguments:
  <text>                Text to render (use quotes for spaces)

Options:
  --color=<color>       Text color (name or hex, default: white)
                        Use commas for per-word colors (e.g. cyan,gray)
  --gradient=<a,b>      Gradient from color A to B (e.g. red,yellow)
  --rainbow             Rainbow color mode
  --font=<name>         Font: sans (default), serif, slim, bold, narrow, block
  --size=<size>         Size: sm, md (default), lg
  --compact             Half-block mode (sm is always compact)
  --shadow              Add drop shadow
  --shadow-color=<c>    Shadow color (default: gray)
  --outline             Add outline around text
  --border              Add pixel-art border frame
  --padding=<n>         Padding around text (default: 1)
  --svg                 Output SVG instead of terminal
  --size-px=<n>         SVG pixel size (default: 16)
  --out=<file>          Write output to file
  -h, --help            Show this help`);
  process.exit(input ? 0 : 1);
}

// Parse size
const size = (opts.size || "md") as Size;

// Compose text to pixel grid (strip | separator before rendering)
const fontName = opts.font || "sans";
const renderText = input.replace(/\|/g, "");
let grid = composeText(renderText, { font: fontName });

// Parse color mode
let colorMode: ColorMode;
if (flags.has("rainbow")) {
  colorMode = { type: "rainbow" };
} else if (opts.gradient) {
  const parts = opts.gradient.split(",");
  const from = parseColor(parts[0]);
  const to = parseColor(parts[parts.length - 1]);
  const via = parts.length >= 3 ? parseColor(parts[1]) : undefined;
  const direction = (opts.direction === "vertical" ? "vertical" : "horizontal") as "horizontal" | "vertical";
  colorMode = { type: "gradient", from, to, via, direction };
} else if (opts.color && opts.color.includes(",")) {
  // Per-word colors: --color=cyan,gray
  const colors = opts.color.split(",");
  const boundaries = getWordBoundaries(input, { font: fontName });
  const padAmount = parseInt(opts.padding || "1", 10);
  const segments = colors.map((c, i) => ({
    endX: (boundaries[i] ?? Infinity) + padAmount,
    mode: { type: "solid" as const, color: parseColor(c) },
  }));
  colorMode = { type: "segments", segments };
} else {
  const color = parseColor(opts.color || "white");
  colorMode = { type: "solid", color };
}

// Apply padding
const isSvg = flags.has("svg");
const padAmount = isSvg ? 0 : parseInt(opts.padding || "1", 10);
if (padAmount > 0) {
  grid = applyPadding(grid, padAmount);
}

// Apply decorations
let shadowMask: boolean[][] | undefined;
let outlineMask: boolean[][] | undefined;
let borderMask: boolean[][] | undefined;

if (flags.has("outline")) {
  outlineMask = computeOutline(grid);
}

if (flags.has("border") && !isSvg) {
  // Expand existing masks before applying border
  if (outlineMask) outlineMask = expandMask(outlineMask, 1);
  if (shadowMask) shadowMask = expandMask(shadowMask, 1);
  const borderResult = applyBorder(grid, 1);
  grid = borderResult.grid;
  borderMask = borderResult.borderMask;
}

if (flags.has("shadow")) {
  // Expand border mask if present
  if (borderMask) borderMask = expandMask(borderMask, 1);
  if (outlineMask) outlineMask = expandMask(outlineMask, 1);
  const result = applyShadow(grid, 1, 1);
  grid = result.grid;
  shadowMask = result.shadowMask;
}

// Render
if (flags.has("svg")) {
  const pixelSize = parseInt(opts["size-px"] || "16", 10);
  const svg = renderSVG(grid, {
    colorMode,
    pixelSize: isNaN(pixelSize) ? 16 : pixelSize,
    shadowMask,
    outlineMask,
  });

  if (opts.out) {
    writeFileSync(opts.out, svg);
    console.log(`Written to ${opts.out}`);
  } else {
    console.log(svg);
  }
} else {
  let shadowColor: RGB | ColorMode = [50, 50, 50];
  if (opts["shadow-gradient"]) {
    const sp = opts["shadow-gradient"].split(",");
    const from = parseColor(sp[0]);
    const to = parseColor(sp[sp.length - 1]);
    const via = sp.length >= 3 ? parseColor(sp[1]) : undefined;
    shadowColor = { type: "gradient", from, to, via, direction: "horizontal" };
  } else if (opts["shadow-color"]) {
    shadowColor = parseColor(opts["shadow-color"]);
  }

  const lines = renderTerminal(grid, {
    colorMode,
    compact: flags.has("compact"),
    size,
    shadowMask,
    shadowColor,
    outlineMask,
    borderMask,
  });

  console.log(lines.join("\n"));
}
