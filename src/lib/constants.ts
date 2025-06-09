export const VIEWING_DISTANCE_OPTIONS = [
  { label: "近距离 / 触屏", value: "close" },
  { label: "中距离 / 键鼠", value: "medium" },
  { label: "远距离 / 遥控", value: "far" },
] as const;

export type ViewingDistance = typeof VIEWING_DISTANCE_OPTIONS[number]["value"];

export const VIEWING_DISTANCE_DIVISORS: Record<ViewingDistance, number> = {
  close: 150,
  medium: 110,
  far: 40,
};

export const PREFERRED_CANVAS_WIDTH_OPTIONS = [
  { label: "375px (1倍)", value: "375" },
  { label: "750px (2倍)", value: "750" },
  { label: "1125px (3倍)", value: "1125" },
] as const;

export type PreferredCanvasWidth = typeof PREFERRED_CANVAS_WIDTH_OPTIONS[number]["value"];

export const PREFERRED_CANVAS_WIDTH_MULTIPLIERS: Record<PreferredCanvasWidth, number> = {
  "375": 1,
  "750": 2,
  "1125": 3,
};

export const BASE_FONT_SIZE = 12;
