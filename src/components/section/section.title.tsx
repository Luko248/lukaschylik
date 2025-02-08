import { component$ } from "@builder.io/qwik";
import { classNames } from "~/utils";
import { SectionTitleProps } from "./section.types";

const SectionTitle = component$<SectionTitleProps>(({ text, className }) => {
  return (
    <h2
      class={classNames(
        "text-5xl md:text-7xl lg:text-[clamp(3rem,14svb,10rem)] mb-4 font-extrabold uppercase leading-none text-black tracking-widest relative color-transparent content-fade-in",
        className,
      )}>
      {text}
    </h2>
  );
});

export default SectionTitle;
