import { Slot, component$ } from "@builder.io/qwik";
import type { ContainerProps } from "./container.types";

const Container = component$<ContainerProps>(({ 
  size = "md" 
}) => {
  return <div data-size={size}>
    <Slot />
  </div>
});

export default Container;