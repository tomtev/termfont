<p align="center">
  <img src="gallery/logo.svg" alt="termtype" />
</p>

<p align="center">
  Block-based text art generator for terminal and SVG.
</p>

## Install

```sh
npm install termtype
```

## CLI

```sh
termtype "Hello" --color=cyan
termtype "Hello World" --font=block --gradient=red,yellow
termtype "Logo" --rainbow --shadow
termtype "Icon" --svg --out=icon.svg
```

### Options

```
termtype <text> [options]

Arguments:
  <text>                Text to render (use quotes for spaces)

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

### Fonts

| Font | Style | Width |
|------|-------|-------|
| `sans` | Clean default | 5px |
| `serif` | Decorative serifs | 5px |
| `slim` | Thin strokes | 5px |
| `bold` | Heavy weight | 6px |
| `narrow` | Condensed | 3px |
| `block` | Chunky geometric | 7px |

### Per-word colors

Use commas to assign colors to words:

```sh
termtype "Hello World" --color=cyan,gold
```

Use `|` as a zero-width color separator (no space between words):

```sh
termtype "open|code" --color=cyan,gray
```

### SVG output

SVGs render as flat pixel art on a transparent background -- ready to use on websites:

```sh
termtype "Logo" --svg --color=cyan --out=logo.svg
```

Same-color pixels are merged into single `<path>` elements for minimal file size.

## API

```ts
import { composeText, renderTerminal, renderSVG, applyPadding, applyShadow } from "termtype";

const grid = composeText("Hello", { font: "block" });
const padded = applyPadding(grid, 1);

// Terminal output
const lines = renderTerminal(padded, {
  colorMode: { type: "solid", color: [0, 220, 220] },
});
console.log(lines.join("\n"));

// SVG output
const svg = renderSVG(grid, {
  colorMode: { type: "rainbow" },
  pixelSize: 16,
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
{ type: "segments", segments: [{ endX: 20, mode: { type: "solid", color: [0, 220, 220] } }] }
```

### Named colors

`white` `black` `red` `green` `blue` `yellow` `cyan` `magenta` `orange` `pink` `purple` `lime` `teal` `navy` `gold` `gray` `coral` `violet` `silver` `darkgray` `lightgray`

## License

MIT
