#!/usr/bin/env node

// src/fonts.ts
var SANS = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
  G: [".####", "#....", "#....", "#.###", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", ".#.#.", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
  "0": [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."],
  "1": ["..#..", ".##..", "..#..", "..#..", "..#..", "..#..", ".###."],
  "2": [".###.", "#...#", "....#", "..##.", ".#...", "#....", "#####"],
  "3": [".###.", "#...#", "....#", "..##.", "....#", "#...#", ".###."],
  "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
  "5": ["#####", "#....", "####.", "....#", "....#", "#...#", ".###."],
  "6": [".###.", "#....", "#....", "####.", "#...#", "#...#", ".###."],
  "7": ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."],
  "8": [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
  "9": [".###.", "#...#", "#...#", ".####", "....#", "....#", ".###."],
  "!": ["..#..", "..#..", "..#..", "..#..", "..#..", ".....", "..#.."],
  "?": [".###.", "#...#", "....#", "..##.", "..#..", ".....", "..#.."],
  ".": [".....", ".....", ".....", ".....", ".....", ".....", "..#.."],
  ",": [".....", ".....", ".....", ".....", ".....", "..#..", ".#..."],
  ":": [".....", "..#..", ".....", ".....", ".....", "..#..", "....."],
  ";": [".....", "..#..", ".....", ".....", ".....", "..#..", ".#..."],
  "-": [".....", ".....", ".....", "#####", ".....", ".....", "....."],
  "+": [".....", "..#..", "..#..", "#####", "..#..", "..#..", "....."],
  "=": [".....", ".....", "#####", ".....", "#####", ".....", "....."],
  "/": ["....#", "....#", "...#.", "..#..", ".#...", "#....", "#...."],
  "(": ["..#..", ".#...", "#....", "#....", "#....", ".#...", "..#.."],
  ")": ["..#..", "...#.", "....#", "....#", "....#", "...#.", "..#.."],
  "'": ["..#..", "..#..", ".....", ".....", ".....", ".....", "....."],
  '"': [".#.#.", ".#.#.", ".....", ".....", ".....", ".....", "....."],
  "#": [".#.#.", "#####", ".#.#.", ".#.#.", ".#.#.", "#####", ".#.#."],
  "@": [".###.", "#...#", "#.###", "#.#.#", "#.##.", "#....", ".####"],
  "&": [".##..", "#..#.", ".##..", ".#...", "#.#.#", "#..#.", ".##.#"],
  "*": [".....", ".#.#.", "..#..", "#####", "..#..", ".#.#.", "....."],
  _: [".....", ".....", ".....", ".....", ".....", ".....", "#####"],
  "<": ["...#.", "..#..", ".#...", "#....", ".#...", "..#..", "...#."],
  ">": [".#...", "..#..", "...#.", "....#", "...#.", "..#..", ".#..."],
  "[": [".###.", ".#...", ".#...", ".#...", ".#...", ".#...", ".###."],
  "]": [".###.", "...#.", "...#.", "...#.", "...#.", "...#.", ".###."],
  "%": ["##..#", "##.#.", "..#..", "..#..", "..#..", ".#.##", "#..##"],
  "^": ["..#..", ".#.#.", "#...#", ".....", ".....", ".....", "....."],
  "~": [".....", ".....", ".#...", "#.#.#", "...#.", ".....", "....."],
  $: ["..#..", ".####", "#.#..", ".###.", "..#.#", "####.", "..#.."]
};
var SERIF = { ...SANS };
SERIF.A = ["..#..", ".#.#.", "#...#", "#####", "#...#", "#...#", "#...#"];
SERIF.B = [".##..", "#..#.", "#..#.", "#.##.", "#...#", "#...#", ".###."];
SERIF.C = [".###.", "#....", "#....", "#....", "#....", "#....", ".###."];
SERIF.D = ["###..", "#..#.", "#...#", "#...#", "#...#", "#..#.", ".##.."];
SERIF.E = [".####", "#....", "#....", ".###.", "#....", "#....", ".####"];
SERIF.F = [".####", "#....", "#....", ".###.", "#....", "#....", ".#..."];
SERIF.G = [".###.", "#....", "#....", "#.###", "#...#", ".#..#", "..##."];
SERIF.H = ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"];
SERIF.I = [".###.", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."];
SERIF.J = ["..###", "...#.", "...#.", "...#.", "...#.", ".#.#.", "..#.."];
SERIF.K = ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"];
SERIF.L = ["#....", "#....", "#....", "#....", "#....", ".#...", ".####"];
SERIF.M = ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"];
SERIF.N = ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"];
SERIF.O = [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."];
SERIF.P = [".###.", "#...#", "#...#", ".###.", "#....", "#....", ".#..."];
SERIF.R = [".###.", "#...#", "#...#", ".###.", "#.#..", "#..#.", "#...#"];
SERIF.S = [".####", "#....", ".#...", "..#..", "...#.", "....#", "####."];
SERIF.T = ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."];
SERIF.U = ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."];
SERIF.X = ["#...#", ".#.#.", "..#..", "..#..", "..#..", ".#.#.", "#...#"];
SERIF.Y = ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", ".###."];
var SLIM = {
  A: ["..#..", ".#.#.", "#...#", "#...#", "#####", "#...#", "#...#"],
  B: ["###..", "#..#.", "#..#.", "###..", "#..#.", "#..#.", "###.."],
  C: [".###.", "#....", "#....", "#....", "#....", "#....", ".###."],
  D: ["###..", "#..#.", "#...#", "#...#", "#...#", "#..#.", "###.."],
  E: ["#####", "#....", "#....", "###..", "#....", "#....", "#####"],
  F: ["#####", "#....", "#....", "###..", "#....", "#....", "#...."],
  G: [".###.", "#....", "#....", "#..##", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: [".###.", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."],
  J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#..#.", "#.#..", "##...", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".###.", "#....", "#....", ".###.", "....#", "....#", ".###."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", ".#.#.", ".#.#.", "..#..", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", ".#.#.", ".#.#."],
  X: ["#...#", ".#.#.", "..#..", "..#..", "..#..", ".#.#.", "#...#"],
  Y: ["#...#", ".#.#.", "..#..", "..#..", "..#..", "..#..", "..#.."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"]
};
for (const k of Object.keys(SANS)) {
  if (!(k in SLIM))
    SLIM[k] = SANS[k];
}
function addLowercase(g) {
  for (let c = 97;c <= 122; c++) {
    const lo = String.fromCharCode(c);
    const up = String.fromCharCode(c - 32);
    if (!g[lo] && g[up])
      g[lo] = g[up];
  }
}
addLowercase(SANS);
addLowercase(SERIF);
addLowercase(SLIM);
var NARROW = {
  A: [".#.", "###", "#.#", "###", "#.#", "#.#", "#.#"],
  B: ["##.", "#.#", "#.#", "##.", "#.#", "#.#", "##."],
  C: [".##", "#..", "#..", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "#.#", "#.#", "##."],
  E: ["###", "#..", "#..", "##.", "#..", "#..", "###"],
  F: ["###", "#..", "#..", "##.", "#..", "#..", "#.."],
  G: [".##", "#..", "#..", "#.#", "#.#", "#.#", ".#."],
  H: ["#.#", "#.#", "#.#", "###", "#.#", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  J: [".##", "..#", "..#", "..#", "..#", "#.#", ".#."],
  K: ["#.#", "#.#", "##.", "##.", "#.#", "#.#", "#.#"],
  L: ["#..", "#..", "#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "###", "#.#", "#.#", "#.#", "#.#"],
  N: ["#.#", "###", "###", "#.#", "#.#", "#.#", "#.#"],
  O: [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "#.#", "##.", "#..", "#..", "#.."],
  Q: [".#.", "#.#", "#.#", "#.#", "#.#", ".#.", "..#"],
  R: ["##.", "#.#", "#.#", "##.", "#.#", "#.#", "#.#"],
  S: [".##", "#..", "#..", ".#.", "..#", "..#", "##."],
  T: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", ".#."],
  U: ["#.#", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
  V: ["#.#", "#.#", "#.#", "#.#", "#.#", ".#.", ".#."],
  W: ["#.#", "#.#", "#.#", "#.#", "###", "###", "#.#"],
  X: ["#.#", "#.#", ".#.", ".#.", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#.", ".#.", ".#."],
  Z: ["###", "..#", "..#", ".#.", "#..", "#..", "###"],
  " ": ["...", "...", "...", "...", "...", "...", "..."],
  "0": [".#.", "#.#", "#.#", "#.#", "#.#", "#.#", ".#."],
  "1": [".#.", "##.", ".#.", ".#.", ".#.", ".#.", "###"],
  "2": [".#.", "#.#", "..#", ".#.", "#..", "#..", "###"],
  "3": ["##.", "..#", "..#", ".#.", "..#", "..#", "##."],
  "4": ["#.#", "#.#", "#.#", "###", "..#", "..#", "..#"],
  "5": ["###", "#..", "#..", "##.", "..#", "..#", "##."],
  "6": [".##", "#..", "#..", "##.", "#.#", "#.#", ".#."],
  "7": ["###", "..#", "..#", ".#.", ".#.", ".#.", ".#."],
  "8": [".#.", "#.#", "#.#", ".#.", "#.#", "#.#", ".#."],
  "9": [".#.", "#.#", "#.#", ".##", "..#", "..#", "##."],
  "!": [".#.", ".#.", ".#.", ".#.", ".#.", "...", ".#."],
  "?": [".#.", "#.#", "..#", ".#.", ".#.", "...", ".#."],
  ".": ["...", "...", "...", "...", "...", "...", ".#."],
  ",": ["...", "...", "...", "...", "...", ".#.", "#.."],
  ":": ["...", ".#.", "...", "...", "...", ".#.", "..."],
  "-": ["...", "...", "...", "###", "...", "...", "..."],
  "+": ["...", ".#.", ".#.", "###", ".#.", ".#.", "..."],
  "/": ["..#", "..#", ".#.", ".#.", ".#.", "#..", "#.."],
  "'": [".#.", ".#.", "...", "...", "...", "...", "..."]
};
addLowercase(NARROW);
var BLOCK_UC = {
  A: ["#######", "##...##", "##...##", "#######", "##...##", "##...##", "##...##"],
  B: ["######.", "##...##", "##...##", "######.", "##...##", "##...##", "######."],
  C: ["#######", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"],
  D: ["######.", "##...##", "##...##", "##...##", "##...##", "##...##", "######."],
  E: ["#######", "##.....", "##.....", "#####..", "##.....", "##.....", "#######"],
  F: ["#######", "##.....", "##.....", "#####..", "##.....", "##.....", "##....."],
  G: ["#######", "##.....", "##.....", "##..###", "##...##", "##...##", "#######"],
  H: ["##...##", "##...##", "##...##", "#######", "##...##", "##...##", "##...##"],
  I: ["#######", "..###..", "..###..", "..###..", "..###..", "..###..", "#######"],
  J: ["#######", "....##.", "....##.", "....##.", "....##.", "##..##.", "######."],
  K: ["##...##", "##..##.", "##.##..", "####...", "##.##..", "##..##.", "##...##"],
  L: ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "#######"],
  M: ["##...##", "###.###", "##.#.##", "##.#.##", "##...##", "##...##", "##...##"],
  N: ["##...##", "###..##", "###..##", "##.#.##", "##..###", "##..###", "##...##"],
  O: ["#######", "##...##", "##...##", "##...##", "##...##", "##...##", "#######"],
  P: ["######.", "##...##", "##...##", "######.", "##.....", "##.....", "##....."],
  Q: ["#######", "##...##", "##...##", "##...##", "##.#.##", "##..##.", "#####.#"],
  R: ["######.", "##...##", "##...##", "######.", "##.##..", "##..##.", "##...##"],
  S: ["#######", "##.....", "##.....", "#######", ".....##", ".....##", "#######"],
  T: ["#######", "..###..", "..###..", "..###..", "..###..", "..###..", "..###.."],
  U: ["##...##", "##...##", "##...##", "##...##", "##...##", "##...##", "#######"],
  V: ["##...##", "##...##", "##...##", "##...##", ".##.##.", ".##.##.", "..###.."],
  W: ["##...##", "##...##", "##...##", "##.#.##", "##.#.##", "###.###", "##...##"],
  X: ["##...##", "##...##", ".##.##.", "..###..", ".##.##.", "##...##", "##...##"],
  Y: ["##...##", "##...##", ".##.##.", "..###..", "..###..", "..###..", "..###.."],
  Z: ["#######", "....##.", "...##..", "..##...", ".##....", "##.....", "#######"]
};
var BLOCK = {};
for (const [char, rows] of Object.entries(BLOCK_UC)) {
  BLOCK[char] = [...rows, ".......", "......."];
}
BLOCK.a = [".......", ".......", "#######", ".....##", "#######", "##...##", "#######", ".......", "......."];
BLOCK.b = ["##.....", "##.....", "######.", "##...##", "##...##", "##...##", "######.", ".......", "......."];
BLOCK.c = [".......", ".......", "#######", "##.....", "##.....", "##.....", "#######", ".......", "......."];
BLOCK.d = [".....##", ".....##", "#######", "##...##", "##...##", "##...##", "#######", ".......", "......."];
BLOCK.e = [".......", ".......", "#######", "##...##", "#######", "##.....", "#######", ".......", "......."];
BLOCK.f = ["..#####", "..##...", "..##...", "#######", "..##...", "..##...", "..##...", ".......", "......."];
BLOCK.g = [".......", ".......", "#######", "##...##", "##...##", "##...##", "#######", ".....##", "#######"];
BLOCK.h = ["##.....", "##.....", "######.", "##...##", "##...##", "##...##", "##...##", ".......", "......."];
BLOCK.i = ["..###..", ".......", ".####..", "..###..", "..###..", "..###..", ".#####.", ".......", "......."];
BLOCK.j = ["...###.", ".......", "..####.", "...###.", "...###.", "...###.", "...###.", "##.###.", "######."];
BLOCK.k = ["##.....", "##.....", "##..##.", "##.##..", "####...", "##.##..", "##..##.", ".......", "......."];
BLOCK.l = [".####..", "..###..", "..###..", "..###..", "..###..", "..###..", ".#####.", ".......", "......."];
BLOCK.m = [".......", ".......", "###.##.", "##.#.##", "##.#.##", "##...##", "##...##", ".......", "......."];
BLOCK.n = [".......", ".......", "######.", "##...##", "##...##", "##...##", "##...##", ".......", "......."];
BLOCK.o = [".......", ".......", "#######", "##...##", "##...##", "##...##", "#######", ".......", "......."];
BLOCK.p = [".......", ".......", "######.", "##...##", "##...##", "##...##", "######.", "##.....", "##....."];
BLOCK.q = [".......", ".......", ".######", "##...##", "##...##", "##...##", ".######", ".....##", ".....##"];
BLOCK.r = [".......", ".......", "##.####", "###....", "##.....", "##.....", "##.....", ".......", "......."];
BLOCK.s = [".......", ".......", "#######", "##.....", "#######", ".....##", "#######", ".......", "......."];
BLOCK.t = ["..##...", "..##...", "#######", "..##...", "..##...", "..##...", "..#####", ".......", "......."];
BLOCK.u = [".......", ".......", "##...##", "##...##", "##...##", "##...##", "#######", ".......", "......."];
BLOCK.v = [".......", ".......", "##...##", "##...##", "##...##", ".##.##.", "..###..", ".......", "......."];
BLOCK.w = [".......", ".......", "##...##", "##...##", "##.#.##", "##.#.##", ".##.##.", ".......", "......."];
BLOCK.x = [".......", ".......", "##...##", ".##.##.", "..###..", ".##.##.", "##...##", ".......", "......."];
BLOCK.y = [".......", ".......", "##...##", "##...##", "##...##", "#######", ".....##", ".....##", "#######"];
BLOCK.z = [".......", ".......", "#######", "....##.", "..###..", ".##....", "#######", ".......", "......."];
BLOCK[" "] = [".......", ".......", ".......", ".......", ".......", ".......", ".......", ".......", "......."];
BLOCK["0"] = ["#######", "##..###", "##.#.##", "##.#.##", "##.#.##", "###..##", "#######", ".......", "......."];
BLOCK["1"] = ["..###..", ".####..", "..###..", "..###..", "..###..", "..###..", "#######", ".......", "......."];
BLOCK["2"] = ["#######", "##...##", ".....##", "..####.", ".##....", "##.....", "#######", ".......", "......."];
BLOCK["3"] = ["#######", "##...##", ".....##", "#######", ".....##", "##...##", "#######", ".......", "......."];
BLOCK["4"] = ["....##.", "...###.", "..#.##.", ".#..##.", "#######", "....##.", "....##.", ".......", "......."];
BLOCK["5"] = ["#######", "##.....", "######.", ".....##", ".....##", "##...##", "#######", ".......", "......."];
BLOCK["6"] = ["#######", "##.....", "##.....", "######.", "##...##", "##...##", "#######", ".......", "......."];
BLOCK["7"] = ["#######", ".....##", "....##.", "...##..", "..##...", "..##...", "..##...", ".......", "......."];
BLOCK["8"] = ["#######", "##...##", "##...##", "#######", "##...##", "##...##", "#######", ".......", "......."];
BLOCK["9"] = ["#######", "##...##", "##...##", "#######", ".....##", ".....##", "#######", ".......", "......."];
BLOCK["!"] = ["..###..", "..###..", "..###..", "..###..", "..###..", ".......", "..###..", ".......", "......."];
BLOCK["?"] = [".#####.", "##...##", ".....##", "..####.", "..###..", ".......", "..###..", ".......", "......."];
BLOCK["."] = [".......", ".......", ".......", ".......", ".......", ".......", "..###..", ".......", "......."];
BLOCK[","] = [".......", ".......", ".......", ".......", ".......", "..###..", ".##....", ".......", "......."];
BLOCK[":"] = [".......", ".......", "..###..", ".......", ".......", "..###..", ".......", ".......", "......."];
BLOCK["-"] = [".......", ".......", ".......", "#######", ".......", ".......", ".......", ".......", "......."];
BLOCK["+"] = [".......", "..###..", "..###..", "#######", "..###..", "..###..", ".......", ".......", "......."];
BLOCK["/"] = [".....##", "....##.", "...##..", "..##...", ".##....", "##.....", "##.....", ".......", "......."];
BLOCK["'"] = ["..###..", "..###..", ".......", ".......", ".......", ".......", ".......", ".......", "......."];
BLOCK["_"] = [".......", ".......", ".......", ".......", ".......", ".......", "#######", ".......", "......."];
function bolden(glyphs) {
  const result = {};
  for (const [char, rows] of Object.entries(glyphs)) {
    result[char] = rows.map((row) => {
      const out = [];
      for (let i = 0;i < row.length; i++) {
        out.push(row[i]);
      }
      out.push(".");
      for (let i = row.length;i >= 0; i--) {
        if (out[i] === "#" && i + 1 < out.length) {
          out[i + 1] = "#";
        }
      }
      return out.join("");
    });
  }
  return result;
}
var BOLD = bolden(SANS);
addLowercase(BOLD);
var FONTS = {
  sans: { width: 5, height: 7, glyphs: SANS },
  serif: { width: 5, height: 7, glyphs: SERIF },
  slim: { width: 5, height: 7, glyphs: SLIM },
  bold: { width: 6, height: 7, glyphs: BOLD },
  narrow: { width: 3, height: 7, glyphs: NARROW },
  block: { width: 7, height: 9, glyphs: BLOCK, spacing: 2 }
};
function getFont(name) {
  return FONTS[name] || FONTS.sans;
}
function getGlyph(font, char) {
  return font.glyphs[char] || font.glyphs["?"] || Array(font.height).fill(".".repeat(font.width));
}

// src/grid.ts
function composeText(text, options = {}) {
  const font = getFont(options.font || "sans");
  const glyphW = font.width;
  const glyphH = font.height;
  const letterSpacing = options.letterSpacing ?? font.spacing ?? 1;
  const wordSpacing = options.wordSpacing ?? (font.spacing ? font.spacing + 1 : 3);
  const lineSpacing = options.lineSpacing ?? 1;
  const lines = text.split(`
`);
  const lineGrids = [];
  let maxWidth = 0;
  for (const line of lines) {
    const lineGrid = composeLine(line, font, glyphW, glyphH, letterSpacing, wordSpacing);
    lineGrids.push(lineGrid);
    if (lineGrid[0] && lineGrid[0].length > maxWidth) {
      maxWidth = lineGrid[0].length;
    }
  }
  const result = [];
  for (let i = 0;i < lineGrids.length; i++) {
    const lineGrid = lineGrids[i];
    for (const row of lineGrid) {
      const padded = [...row];
      while (padded.length < maxWidth)
        padded.push(false);
      result.push(padded);
    }
    if (i < lineGrids.length - 1) {
      for (let s = 0;s < lineSpacing; s++) {
        result.push(new Array(maxWidth).fill(false));
      }
    }
  }
  return result;
}
function composeLine(line, font, glyphW, glyphH, letterSpacing, wordSpacing) {
  const grid = Array.from({ length: glyphH }, () => []);
  for (let i = 0;i < line.length; i++) {
    const char = line[i];
    if (i > 0) {
      const spacing = char === " " || line[i - 1] === " " ? 0 : letterSpacing;
      for (let row = 0;row < glyphH; row++) {
        for (let s = 0;s < spacing; s++) {
          grid[row].push(false);
        }
      }
    }
    if (char === " ") {
      for (let row = 0;row < glyphH; row++) {
        for (let s = 0;s < wordSpacing; s++) {
          grid[row].push(false);
        }
      }
      continue;
    }
    const glyph = getGlyph(font, char);
    for (let row = 0;row < glyphH; row++) {
      const glyphRow = glyph[row] || ".".repeat(glyphW);
      for (let col = 0;col < glyphW; col++) {
        grid[row].push(glyphRow[col] === "#");
      }
    }
  }
  return grid;
}
function gridWidth(grid) {
  return grid[0]?.length ?? 0;
}
function gridHeight(grid) {
  return grid.length;
}
function getWordBoundaries(text, options = {}) {
  const font = getFont(options.font || "sans");
  const glyphW = font.width;
  const letterSpacing = options.letterSpacing ?? font.spacing ?? 1;
  const wordSpacing = options.wordSpacing ?? (font.spacing ? font.spacing + 1 : 3);
  const segments = text.split("|");
  const boundaries = [];
  let x = 0;
  let isFirst = true;
  for (let si = 0;si < segments.length; si++) {
    const seg = segments[si];
    const words = seg.split(" ");
    for (let wi = 0;wi < words.length; wi++) {
      const word = words[wi];
      if (wi > 0) {
        x += wordSpacing;
      }
      for (let ci = 0;ci < word.length; ci++) {
        if (!isFirst)
          x += letterSpacing;
        x += glyphW;
        isFirst = false;
      }
    }
    boundaries.push(x - 1);
  }
  return boundaries;
}

// src/colors.ts
var NAMED_COLORS = {
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
  violet: [180, 60, 255]
};
function parseColor(str) {
  const lower = str.toLowerCase().trim();
  if (NAMED_COLORS[lower])
    return NAMED_COLORS[lower];
  const hex = lower.startsWith("#") ? lower.slice(1) : lower;
  if (/^[0-9a-f]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  }
  if (/^[0-9a-f]{3}$/.test(hex)) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16)
    ];
  }
  return [255, 255, 255];
}
function hslToRgb(h, s, l) {
  h = (h % 360 + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}
function rgbToHex(rgb) {
  return "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join("");
}
function rgbToAnsiFg(rgb) {
  return `\x1B[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}
function rgbToAnsiBg(rgb) {
  return `\x1B[48;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}
var ANSI_RESET = "\x1B[0m";
function lerpRgb(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t)
  ];
}
function darken(rgb, amount) {
  return [
    Math.round(rgb[0] * (1 - amount)),
    Math.round(rgb[1] * (1 - amount)),
    Math.round(rgb[2] * (1 - amount))
  ];
}
function resolvePixelColor(x, y, w, h, mode) {
  switch (mode.type) {
    case "solid":
      return mode.color;
    case "gradient": {
      const t = mode.direction === "horizontal" ? w > 1 ? x / (w - 1) : 0 : h > 1 ? y / (h - 1) : 0;
      if (mode.via) {
        if (t < 0.5)
          return lerpRgb(mode.from, mode.via, t * 2);
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
        if (x <= seg.endX)
          return resolvePixelColor(x, y, w, h, seg.mode);
      }
      const last = mode.segments[mode.segments.length - 1];
      return last ? resolvePixelColor(x, y, w, h, last.mode) : [255, 255, 255];
    }
  }
}

// src/render-terminal.ts
function resolveShadow(sc, x, y, w, h) {
  if (!sc)
    return [60, 60, 60];
  if (Array.isArray(sc))
    return sc;
  return resolvePixelColor(x, y, w, h, sc);
}
function renderTerminal(grid, options) {
  if (options.compact || options.size === "sm") {
    return renderCompact(grid, options);
  }
  return renderFull(grid, options);
}
function renderFull(grid, options) {
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const chars = options.size === "lg" ? 4 : 2;
  const rowRepeat = options.size === "lg" ? 2 : 1;
  const block = "█".repeat(chars);
  const space = " ".repeat(chars);
  const lines = [];
  for (let y = 0;y < h; y++) {
    let line = "";
    for (let x = 0;x < w; x++) {
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
    for (let r = 0;r < rowRepeat; r++) {
      lines.push(rendered);
    }
  }
  return lines;
}
function renderCompact(grid, options) {
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const lines = [];
  for (let y = 0;y < h; y += 2) {
    let line = "";
    let bgActive = false;
    for (let x = 0;x < w; x++) {
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
        line += rgbToAnsiFg(topColor) + rgbToAnsiBg(botColor) + "▀";
        bgActive = true;
      } else {
        if (bgActive) {
          line += ANSI_RESET;
          bgActive = false;
        }
        if (topPixel) {
          const topColor = getCompactColor(topOn, topShadow, topOutline, x, y, w, h, options);
          line += rgbToAnsiFg(topColor) + "▀";
        } else if (botPixel) {
          const botColor = getCompactColor(botOn, botShadow, botOutline, x, y + 1, w, h, options);
          line += rgbToAnsiFg(botColor) + "▄";
        } else {
          line += " ";
        }
      }
    }
    lines.push(line + ANSI_RESET);
  }
  return lines;
}
function getCompactColor(isOn, isShadow, isOutline, x, y, w, h, options) {
  if (isOn)
    return resolvePixelColor(x, y, w, h, options.colorMode);
  if (isShadow)
    return resolveShadow(options.shadowColor, x, y, w, h);
  if (isOutline)
    return darken(resolvePixelColor(x, y, w, h, options.colorMode), 0.7);
  return [0, 0, 0];
}

// src/render-svg.ts
function collectPaths(w, h, px, test, colorFn, opacity) {
  const colorRuns = new Map;
  for (let y = 0;y < h; y++) {
    let x = 0;
    while (x < w) {
      if (!test(x, y)) {
        x++;
        continue;
      }
      const color = colorFn(x, y);
      const startX = x;
      while (x < w && test(x, y) && colorFn(x, y) === color)
        x++;
      const runs = colorRuns.get(color);
      const run = { x: startX, y, len: x - startX };
      if (runs)
        runs.push(run);
      else
        colorRuns.set(color, [run]);
    }
  }
  const elements = [];
  for (const [color, runs] of colorRuns) {
    const d = runs.map((r) => `M${r.x * px},${r.y * px}h${r.len * px}v${px}h${-r.len * px}z`).join("");
    const opacityAttr = opacity !== undefined ? ` opacity="${opacity}"` : "";
    elements.push(`  <path fill="${color}"${opacityAttr} d="${d}"/>`);
  }
  return elements;
}
function renderSVG(grid, options) {
  const px = options.pixelSize ?? 16;
  const w = gridWidth(grid);
  const h = gridHeight(grid);
  const totalW = w * px;
  const totalH = h * px;
  const elements = [];
  if (options.shadowMask) {
    const sc = rgbToHex(options.shadowColor || [30, 30, 30]);
    elements.push(...collectPaths(w, h, px, (x, y) => !!options.shadowMask[y]?.[x] && !grid[y][x], () => sc, 0.5));
  }
  if (options.outlineMask) {
    const oc = rgbToHex(options.outlineColor || [80, 80, 80]);
    elements.push(...collectPaths(w, h, px, (x, y) => !!options.outlineMask[y]?.[x] && !grid[y][x], () => oc));
  }
  elements.push(...collectPaths(w, h, px, (x, y) => grid[y][x], (x, y) => rgbToHex(resolvePixelColor(x, y, w, h, options.colorMode))));
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">`,
    ...elements,
    `</svg>`
  ].join(`
`);
}

// src/decorations.ts
function applyShadow(grid, dx = 1, dy = 1) {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + Math.abs(dy);
  const newW = w + Math.abs(dx);
  const offsetX = dx < 0 ? Math.abs(dx) : 0;
  const offsetY = dy < 0 ? Math.abs(dy) : 0;
  const shadowOffsetX = dx > 0 ? dx : 0;
  const shadowOffsetY = dy > 0 ? dy : 0;
  const shadowMask = Array.from({ length: newH }, () => new Array(newW).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      if (grid[y][x]) {
        const sy = y + shadowOffsetY;
        const sx = x + shadowOffsetX;
        if (sy < newH && sx < newW) {
          shadowMask[sy][sx] = true;
        }
      }
    }
  }
  const fgGrid = Array.from({ length: newH }, () => new Array(newW).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      if (grid[y][x]) {
        fgGrid[y + offsetY][x + offsetX] = true;
        shadowMask[y + offsetY][x + offsetX] = false;
      }
    }
  }
  return { grid: fgGrid, shadowMask };
}
function computeOutline(grid) {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const outline = Array.from({ length: h }, () => new Array(w).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      if (grid[y][x])
        continue;
      const neighbors = [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1]
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
function applyPadding(grid, n) {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + n * 2;
  const newW = w + n * 2;
  const result = Array.from({ length: newH }, () => new Array(newW).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      result[y + n][x + n] = grid[y][x];
    }
  }
  return result;
}
function applyBorder(grid, thickness = 1) {
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const newH = h + thickness * 2;
  const newW = w + thickness * 2;
  const result = Array.from({ length: newH }, () => new Array(newW).fill(false));
  const borderMask = Array.from({ length: newH }, () => new Array(newW).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      result[y + thickness][x + thickness] = grid[y][x];
    }
  }
  for (let y = 0;y < newH; y++) {
    for (let x = 0;x < newW; x++) {
      if (y < thickness || y >= newH - thickness || x < thickness || x >= newW - thickness) {
        result[y][x] = true;
        borderMask[y][x] = true;
      }
    }
  }
  return { grid: result, borderMask };
}
function expandMask(mask, n) {
  const h = mask.length;
  const w = mask[0]?.length ?? 0;
  const newH = h + n * 2;
  const newW = w + n * 2;
  const result = Array.from({ length: newH }, () => new Array(newW).fill(false));
  for (let y = 0;y < h; y++) {
    for (let x = 0;x < w; x++) {
      result[y + n][x + n] = mask[y][x];
    }
  }
  return result;
}

// src/cli.ts
import { writeFileSync } from "node:fs";
var args = process.argv.slice(2);
var flags = new Set;
var opts = {};
var input;
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
var size = opts.size || "md";
var fontName = opts.font || "sans";
var renderText = input.replace(/\|/g, "");
var grid = composeText(renderText, { font: fontName });
var colorMode;
if (flags.has("rainbow")) {
  colorMode = { type: "rainbow" };
} else if (opts.gradient) {
  const parts = opts.gradient.split(",");
  const from = parseColor(parts[0]);
  const to = parseColor(parts[parts.length - 1]);
  const via = parts.length >= 3 ? parseColor(parts[1]) : undefined;
  const direction = opts.direction === "vertical" ? "vertical" : "horizontal";
  colorMode = { type: "gradient", from, to, via, direction };
} else if (opts.color && opts.color.includes(",")) {
  const colors = opts.color.split(",");
  const boundaries = getWordBoundaries(input, { font: fontName });
  const padAmount = parseInt(opts.padding || "1", 10);
  const segments = colors.map((c, i) => ({
    endX: (boundaries[i] ?? Infinity) + padAmount,
    mode: { type: "solid", color: parseColor(c) }
  }));
  colorMode = { type: "segments", segments };
} else {
  const color = parseColor(opts.color || "white");
  colorMode = { type: "solid", color };
}
var isSvg = flags.has("svg");
var padAmount = isSvg ? 0 : parseInt(opts.padding || "1", 10);
if (padAmount > 0) {
  grid = applyPadding(grid, padAmount);
}
var shadowMask;
var outlineMask;
var borderMask;
if (flags.has("outline")) {
  outlineMask = computeOutline(grid);
}
if (flags.has("border") && !isSvg) {
  if (outlineMask)
    outlineMask = expandMask(outlineMask, 1);
  if (shadowMask)
    shadowMask = expandMask(shadowMask, 1);
  const borderResult = applyBorder(grid, 1);
  grid = borderResult.grid;
  borderMask = borderResult.borderMask;
}
if (flags.has("shadow")) {
  if (borderMask)
    borderMask = expandMask(borderMask, 1);
  if (outlineMask)
    outlineMask = expandMask(outlineMask, 1);
  const result = applyShadow(grid, 1, 1);
  grid = result.grid;
  shadowMask = result.shadowMask;
}
if (flags.has("svg")) {
  const pixelSize = parseInt(opts["size-px"] || "16", 10);
  const svg = renderSVG(grid, {
    colorMode,
    pixelSize: isNaN(pixelSize) ? 16 : pixelSize,
    shadowMask,
    outlineMask
  });
  if (opts.out) {
    writeFileSync(opts.out, svg);
    console.log(`Written to ${opts.out}`);
  } else {
    console.log(svg);
  }
} else {
  let shadowColor = [50, 50, 50];
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
    borderMask
  });
  console.log(lines.join(`
`));
}
