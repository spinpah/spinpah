const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const ChevronUp = () => (
  <svg width="18" height="18" {...base}><path d="m18 15-6-6-6 6" /></svg>
);
export const ChevronDown = () => (
  <svg width="18" height="18" {...base}><path d="m6 9 6 6 6-6" /></svg>
);
export const ArrowRight = () => (
  <svg width="14" height="14" {...base}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
export const ArrowLeft = () => (
  <svg width="18" height="18" {...base}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);
export const ArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} {...base}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
export const Plus = () => (
  <svg width="24" height="24" {...base} strokeWidth={1.4}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
);
