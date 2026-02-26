export { composeText, gridWidth, gridHeight, getWordBoundaries } from "./grid.js";
export type { PixelGrid, ComposeOptions } from "./grid.js";

export { renderTerminal } from "./render-terminal.js";
export type { TerminalRenderOptions, Size } from "./render-terminal.js";

export { renderSVG } from "./render-svg.js";
export type { SVGRenderOptions } from "./render-svg.js";

export {
  applyShadow,
  computeOutline,
  applyPadding,
  applyBorder,
  expandMask,
} from "./decorations.js";
export type { BorderResult, ShadowResult } from "./decorations.js";

export {
  parseColor,
  hslToRgb,
  rgbToHex,
  rgbToAnsiFg,
  rgbToAnsiBg,
  lerpRgb,
  darken,
  lighten,
  resolvePixelColor,
  ANSI_RESET,
} from "./colors.js";
export type { RGB, ColorMode } from "./colors.js";

export { getFont, getGlyph } from "./fonts.js";
export type { Glyph, FontDef } from "./fonts.js";
