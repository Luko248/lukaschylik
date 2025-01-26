import { Slot, component$ } from "@builder.io/qwik";
import { classNames } from "~/utils";
import { SectionProps } from "./section.types";

const Section = component$<SectionProps>(({ id, className }) => {
  return (
    <section
      id={id}
      class={classNames(
        "relative grid items-center min-h-screen bg-black",
        className,
      )}>
      <Slot />
    </section>
  );
});

export default Section;
