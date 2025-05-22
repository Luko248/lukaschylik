import { Slot, component$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import { SectionProps } from "./section.types";

const Section = component$<SectionProps>(
  ({ id, className, centerContent = true, fullHeight = true }) => {
    return (
      <section
        id={id}
        class={cls(
          "relative bg-black py-10 md:py-[8svb]",
          centerContent && "grid items-center",
          fullHeight && "min-h-screen",
          className,
        )}>
        <Slot />
      </section>
    );
  },
);

export default Section;
