import * as stylex from "@stylexjs/stylex";

export const color = stylex.defineVars({
  black: "var(--color-black)",
  white: "var(--color-white)",
  transparent: "var(--color-transparent)",
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary--hover)",
  secondary: "var(--color-secondary)",
  info: "var(--color-info)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  grey: "var(--color-grey)",
  border: "var(--color-border)",
  background: "var(--color-background)",
  textLight: "var(--color-text-light)",
  textDark: "var(--color-text-dark)"
});

export const gap = stylex.defineVars({
  default: "var(--gap)",
  space2: "var(--gap-space-2)",
  space4: "var(--gap-space-4)",
  space8: "var(--gap-space-8)",
  space16: "var(--gap-space-16)",
  space24: "var(--gap-space-24)",
  space32: "var(--gap-space-32)",
  space40: "var(--gap-space-40)",
  auto: "auto",
});

export const border = stylex.defineVars({
  width1: "var(--border-width-1)",
  width2: "var(--border-width-2)",
  radius2: "var(--radius-2)",
  radius4: "var(--radius-4)",
  radius8: "var(--radius-8)",
  radius16: "var(--radius-16)",
  radiusNone: "var(--radius-none)",
  radiusCircle: "var(--radius-circle)",
  radiusFull: "var(--radius-full)",
});

export const boxShadow = stylex.defineVars({
  x: "var(--shadow-x)",
  y: "var(--shadow-y)",
  radius2: "var(--shadow-radius-2)",
  radius4: "var(--shadow-radius-4)",
  radius8: "var(--shadow-radius-8)",
  radius16: "var(--shadow-radius-16)",
  radius24: "var(--shadow-radius-24)",
});

export const animation = stylex.defineVars({
  time: "var(--trans-time)",
  function: "var(--trans-fnc)",
});

export const media = stylex.defineVars({
  widthMobileS: "var(--width-mobile-m)",
  widthMobile: "var(--width-mobile-xl)",
  widthTablet: "var(--width-tablet)",
  widthDesktopS: "var(--width-desktop-s)",
  widthDesktopL: "var(--width-desktop-l)",
  widthDesktopHd: "var(--width-desktop-hd)",
  widthDesktopFullHd: "var(--width-desktop-full-hd)",
  widthDesktop2k: "var(--width-desktop-2k)",
  widthDesktop4k: "var(--width-desktop-4k)",
});