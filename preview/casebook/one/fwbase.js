const FWST = {
  same:   {fill:"var(--panel)",       stroke:"var(--line-2)", sw:1,   ink:"var(--ink-2)",     sub:"var(--ink-3)", o:1},
  changed:{fill:"var(--accent-soft)", stroke:"var(--accent)", sw:1.6, ink:"var(--ink)",       sub:"var(--ink-2)", o:1},
  added:  {fill:"var(--accent)",      stroke:"var(--accent)", sw:1.6, ink:"var(--on-accent)", sub:"var(--on-accent)", o:1},
  filled: {fill:"var(--panel)",       stroke:"var(--line-2)", sw:1,   ink:"var(--ink)",       sub:"var(--ink-2)", o:1},
  dropped:{fill:"var(--panel)",       stroke:"var(--line-2)", sw:1,   ink:"var(--ink-3)",     sub:"var(--dim)", o:.55, dash:"3 3"}
};
const FWZ_MIN = 0.1, FWZ_MAX = 6;
const NODES = [
 {id:"decision", x:250, y:14,  w:170, h:38},
 {id:"rev",      x:60,  y:90,  w:160, h:40},
 {id:"cost",     x:440, y:90,  w:160, h:40},
 {id:"vol",      x:14,  y:170, w:125, h:40},
 {id:"price",    x:150, y:170, w:115, h:40},
 {id:"opex",     x:392, y:170, w:115, h:40},
 {id:"capex",    x:518, y:170, w:125, h:40},
 {id:"profit",   x:60,  y:250, w:160, h:40},
 {id:"pay",      x:440, y:250, w:160, h:40}
];
const EDGES = [["decision","rev"],["decision","cost"],["rev","vol"],["rev","price"],
               ["cost","opex"],["cost","capex"],["vol","profit"],["opex","profit"],
               ["capex","pay"],["profit","pay"]];
