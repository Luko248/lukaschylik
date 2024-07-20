import { Slot, component$ } from "@builder.io/qwik";
// import { attrs, create, props } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { ContainerProps } from "./container.types";
import { gap, media } from "../../vars.stylex";

const BASE = stylex.create({
  default: {
    marginInline: gap.auto,
    position: "relative",
    isolation: "isolate",
  }
});

const SIZES = stylex.create({
  sm: {
    inlineSize: `min(calc(${media.widthDesktopS} - 2rem), 100%)`
  },
  md: {
    inlineSize: `min(calc(${media.widthDesktopHd} - 2rem), 100%)`
  },
  lg: {
    inlineSize: `min(calc(${media.widthDesktopFullHd} - 2rem), 100%)`
  }
});

const Container = component$<ContainerProps>(({ size = "md", styles }) => {
  return <div {...stylex.props(BASE.default, SIZES[size], styles)}>
    <Slot />
  </div>
});



export default Container;