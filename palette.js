const SHADES = ["Paper","Ivory","Stone","Clay","Taupe","Dusk","Slate","Charcoal","Ink"];
const TINTS = [
  {id:"paper", nm:"Paper",  light:["#f6f4f0","#fffefc","#e2ded6"], dark:["#16151a","#1e1d24","#2e2c37"]},
  {id:"white", nm:"Plain",  light:["#ffffff","#fbfbfa","#e6e4df"], dark:["#101014","#191920","#2a2a33"]},
  {id:"sand",  nm:"Sand",   light:["#f1e9da","#fdf9f1","#ded2bd"], dark:["#1b1813","#242019","#363026"]},
  {id:"mist",  nm:"Mist",   light:["#eef1f2","#fdfefe","#dbe1e3"], dark:["#13181a","#1b2124","#2b3235"]},
  {id:"rose",  nm:"Rose",   light:["#f7eeee","#fffcfc","#e6d6d6"], dark:["#1b1416","#241b1e","#352a2e"]}
];
const SHADE_LIGHT = 5;
const SHADE_DEFAULT = 2;
const SH_DARKEN = "#9d988e", SH_LIGHTEN = "#4c4a58", SH_MAX = 0.42;
const INK_LIGHT = ["#1b1a21","#4a4855","#77748a"];
const INK_DARK  = ["#f0eef4","#bab6c6","#8b8799"];
const INK_TGT   = [9.0, 6.4, 5.1];
const ACC_KEYS  = ["accent","booth","warn","ours"];
const ACC_LIGHT = ["#0f6b63","#8c1230","#9a5b00","#5b3ea8"];
const ACC_DARK  = ["#63cfc2","#e07189","#e0a955","#b79ae8"];
const REST_LIGHT = {"--line-2":"#cfc9be","--kellogg":"#4e2a84","--accent-soft":"#d9ebe8",
  "--accent-line":"#8cc3bb","--warn-soft":"#f6e6c8","--ours-soft":"#e9e3f7",
  "--dim":"#b9b4ab","--on-accent":"#ffffff",
  "--shadow":"0 1px 2px rgba(27,26,33,.06), 0 8px 24px -16px rgba(27,26,33,.3)"};
const REST_DARK  = {"--line-2":"#3d3a48","--kellogg":"#b79ae8","--accent-soft":"#12312e",
  "--accent-line":"#2e6f68","--warn-soft":"#3a2d16","--ours-soft":"#2a2140",
  "--dim":"#4d4a5c","--on-accent":"#0d1a19",
  "--shadow":"0 1px 2px rgba(0,0,0,.4), 0 10px 30px -18px rgba(0,0,0,.8)"};
