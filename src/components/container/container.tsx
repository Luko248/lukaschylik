import { Slot, component$ } from "@builder.io/qwik";
import type { ContainerProps } from "./container.types";

const Container = component$<ContainerProps>(({ 
  size = "md" 
}) => {

  const sizeClasses = {
    sm: "max-w-[calc(1024px-2rem)] w-full",
    md: "max-w-[calc(1440px-2rem)] w-full",
    lg: "max-w-[calc(1920px-2rem)] w-full",
  };

  return <div class={`mx-auto relative isolate ${sizeClasses[size]}`}>
    <Slot />
  </div>
});

export default Container;