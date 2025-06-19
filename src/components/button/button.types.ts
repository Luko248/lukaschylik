import type { PropFunction } from "@builder.io/qwik";

// Extend HTMLButtonElement to include command attributes
declare global {
  interface NewHTMLButtonElement {
    command?: string;
    commandfor?: string;
    close?: string;
  }
}

export interface ButtonProps extends NewHTMLButtonElement {
  onClick$?: PropFunction<() => void>;
  variant: "primary" | "secondary" | "plain";
  size?: "sm" | "md";
  disabled?: boolean;
  icon?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
  href?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self" | "_parent" | "_top";
  iconOnly?: boolean;
}
