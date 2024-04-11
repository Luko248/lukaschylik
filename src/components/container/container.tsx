import { Slot, component$ } from "@builder.io/qwik";
import { attrs, create } from "@stylexjs/stylex";
import { ContainerProps } from "./container.types";
import { gap } from "~/vars.stylex";

const styles = create({
  container: {
    inlineSize: "min(calc(1440px - 2rem), 100%)",
    marginInline: "auto",
  },
});

const Container = component$<ContainerProps>(({ className }) => {
  return <div {...attrs(styles.container)}>
    <Slot />
  </div>
});



export default Container;