<p align="center">
  <img src="gallery/logo.svg" alt="termfont" />
</p>

<p align="center">
  Block-based text art generator for terminal and SVG.
</p>

## Install

```sh
npm install termfont
```

Or run directly with npx:

```sh
npx termfont "Hello" --color=cyan
```

## Examples

### Solid colors

<img src="gallery/ex-hello-sans.svg" alt="Hello" />

```sh
npx termfont "Hello" --font=sans --color=white
```

<img src="gallery/ex-arcade.svg" alt="ARCADE" />

```sh
npx termfont "ARCADE" --font=block --color=lime
```

<img src="gallery/ex-quizai.svg" alt="Quiz.ai" />

```sh
npx termfont "Quiz.ai" --font=block --color=gold
```

<img src="gallery/ex-hack.svg" alt="hack" />

```sh
npx termfont "hack" --font=block --color=lime
```

### Gradients

<img src="gallery/ex-sunset.svg" alt="sunset" />

```sh
npx termfont "sunset" --font=bold --gradient=orange,pink,purple
```

<img src="gallery/ex-neon.svg" alt="NEON" />

```sh
npx termfont "NEON" --font=block --gradient=purple,cyan,lime
```

<img src="gallery/ex-fire.svg" alt="fire" />

```sh
npx termfont "fire" --font=block --gradient=red,yellow
```

<img src="gallery/ex-ice.svg" alt="ice" />

```sh
npx termfont "ice" --font=block --gradient=white,cyan,blue
```

### Rainbow

<img src="gallery/ex-rainbow.svg" alt="rainbow" />

```sh
npx termfont "rainbow" --font=bold --rainbow
```

### Per-word colors

<img src="gallery/ex-opencode.svg" alt="opencode" />

```sh
npx termfont "open|code" --font=block --color=cyan,gray
```

Use `|` as a zero-width color separator (no space between words). Use commas to assign colors to words.

### Effects

<img src="gallery/ex-retro.svg" alt="RETRO" />

```sh
npx termfont "RETRO" --font=block --color=coral --shadow
```

<img src="gallery/ex-outline.svg" alt="outline" />

```sh
npx termfont "outline" --font=bold --color=cyan --outline
```

### Fonts

<img src="gallery/ex-hello-sans.svg" alt="sans" />

```sh
npx termfont "Hello" --font=sans
```

<img src="gallery/ex-gold-serif.svg" alt="serif" />

```sh
npx termfont "GOLD" --font=serif --color=gold
```

<img src="gallery/ex-slim.svg" alt="slim" />

```sh
npx termfont "slim" --font=slim --color=pink
```

<img src="gallery/ex-narrow.svg" alt="narrow" />

```sh
npx termfont "NARROW" --font=narrow --color=violet
```

<img src="gallery/ex-arcade.svg" alt="block" />

```sh
npx termfont "ARCADE" --font=block --color=lime
```

| Font | Style | Width |
|------|-------|-------|
| `sans` | Clean default | 5px |
| `serif` | Decorative serifs | 5px |
| `slim` | Thin strokes | 5px |
| `bold` | Heavy weight | 6px |
| `narrow` | Condensed | 3px |
| `block` | Chunky geometric | 7px |

### Sizes

Terminal output supports three sizes:

```sh
# Small - compact half-block rendering
npx termfont "Hello" --size=sm

# Medium (default) - full block characters
npx termfont "Hello" --size=md

# Large - double-width, double-height blocks
npx termfont "Hello" --size=lg
```

### SVG output

SVGs render as flat pixel art on a transparent background, ready to use on websites. Same-color pixels are merged into single `<path>` elements for minimal file size.

```sh
# Save to file
npx termfont "Logo" --svg --color=cyan --out=logo.svg

# Custom pixel size
npx termfont "Big" --svg --font=block --color=gold --size-px=24 --out=big.svg

# Gradient SVG
npx termfont "Neon" --svg --font=block --gradient=purple,cyan --out=neon.svg
```

## CLI

```
termfont <text> [options]

Options:
  --color=<color>       Text color (name or hex, default: white)
                        Use commas for per-word colors (e.g. cyan,gray)
  --gradient=<a,b>      Gradient from color A to B (e.g. red,yellow)
                        Supports 3-stop: --gradient=red,yellow,green
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
  -h, --help            Show this help
```

## API

```ts
import {
  composeText,
  renderTerminal,
  renderSVG,
  applyPadding,
  applyShadow,
  computeOutline,
  parseColor,
} from "termfont";
```

### Terminal output

```ts
import { composeText, renderTerminal, applyPadding } from "termfont";

const grid = composeText("Hello", { font: "block" });
const padded = applyPadding(grid, 1);

const lines = renderTerminal(padded, {
  colorMode: { type: "solid", color: [0, 220, 220] },
});
console.log(lines.join("\n"));
```

### SVG output

```ts
import { composeText, renderSVG } from "termfont";

const grid = composeText("Hello", { font: "block" });
const svg = renderSVG(grid, {
  colorMode: { type: "rainbow" },
  pixelSize: 16,
});
// svg is a string ready to write to a file or embed in HTML
```

### Gradients

```ts
import { composeText, renderTerminal, applyPadding } from "termfont";

const grid = composeText("Fire", { font: "block" });
const padded = applyPadding(grid, 1);

const lines = renderTerminal(padded, {
  colorMode: {
    type: "gradient",
    from: [255, 0, 0],
    to: [255, 255, 0],
    direction: "horizontal",
  },
});
console.log(lines.join("\n"));
```

### 3-stop gradient

```ts
const lines = renderTerminal(padded, {
  colorMode: {
    type: "gradient",
    from: [128, 0, 255],
    via: [0, 220, 220],
    to: [50, 255, 50],
    direction: "horizontal",
  },
});
```

### Shadow

```ts
import { composeText, renderTerminal, applyPadding, applyShadow } from "termfont";

let grid = composeText("Shadow", { font: "block" });
grid = applyPadding(grid, 1);
const { grid: shadowed, shadowMask } = applyShadow(grid, 1, 1);

const lines = renderTerminal(shadowed, {
  colorMode: { type: "solid", color: [255, 100, 80] },
  shadowMask,
  shadowColor: [80, 80, 80],
});
console.log(lines.join("\n"));
```

### Outline

```ts
import { composeText, renderTerminal, applyPadding, computeOutline } from "termfont";

let grid = composeText("Outline", { font: "bold" });
grid = applyPadding(grid, 1);
const outlineMask = computeOutline(grid);

const lines = renderTerminal(grid, {
  colorMode: { type: "solid", color: [0, 220, 220] },
  outlineMask,
});
console.log(lines.join("\n"));
```

### Per-word colors

```ts
import { composeText, renderTerminal, applyPadding, getWordBoundaries, parseColor } from "termfont";

const text = "open|code";
const fontName = "block";
const grid = composeText(text.replace(/\|/g, ""), { font: fontName });
const padded = applyPadding(grid, 1);
const boundaries = getWordBoundaries(text, { font: fontName });

const lines = renderTerminal(padded, {
  colorMode: {
    type: "segments",
    segments: [
      { endX: boundaries[0] + 1, mode: { type: "solid", color: parseColor("cyan") } },
      { endX: Infinity, mode: { type: "solid", color: parseColor("gray") } },
    ],
  },
});
console.log(lines.join("\n"));
```

### Compact mode

```ts
const lines = renderTerminal(padded, {
  colorMode: { type: "solid", color: [255, 255, 255] },
  compact: true, // half-block rendering, half the height
});
```

### Color modes

```ts
// Solid
{ type: "solid", color: [255, 0, 0] }

// Gradient (2 or 3 stops)
{ type: "gradient", from: [255, 0, 0], to: [255, 255, 0], direction: "horizontal" }
{ type: "gradient", from: [255, 0, 0], via: [255, 255, 0], to: [0, 255, 0], direction: "horizontal" }

// Rainbow
{ type: "rainbow" }

// Per-segment
{ type: "segments", segments: [
  { endX: 20, mode: { type: "solid", color: [0, 220, 220] } },
  { endX: Infinity, mode: { type: "solid", color: [128, 128, 128] } },
]}
```

### Named colors

`white` `black` `red` `green` `blue` `yellow` `cyan` `magenta` `orange` `pink` `purple` `lime` `teal` `navy` `gold` `gray` `coral` `violet` `silver` `darkgray` `lightgray`

## License

MIT
