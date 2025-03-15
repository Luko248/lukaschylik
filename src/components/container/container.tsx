import { Slot, component$ } from "@builder.io/qwik";
import type { ContainerProps } from "./container.types";
import { cls } from "~/utils";

const Container = component$<ContainerProps>(({ size = "md", className }) => {
  const sizeClasses = {
    sm: "max-w-[calc(1024px-2rem)] w-full",
    md: "max-w-[calc(1440px-2rem)] w-full",
    lg: "max-w-[calc(1920px-2rem)] w-full",
    full: "max-w-[calc(100%-10svi)] w-full",
  };

  return (
    <div class={cls("mx-auto relative isolate", sizeClasses[size], className)}>
      <Slot />
    </div>
  );
});

export default Container;
