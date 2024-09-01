import { Slot, component$ } from "@builder.io/qwik";
import * as stylex from "@stylexjs/stylex";
import { ContainerProps } from "./container.types";
import { STYLE, SIZES } from "./styles/container.styles";

const Container = component$<ContainerProps>(({ size = "md", styles }) => {
  return <div {...stylex.props(STYLE.default, SIZES[size], styles)}>
    <Slot />
  </div>
});

export default Container;