import { component$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import { SectionTitleProps } from "./section.types";

const SectionTitle = component$<SectionTitleProps>(
  ({ text, className, dark }) => {
    return (
      <h2
        data-dark={dark}
        class={cls(
          "content-fade-in",
          "relative z-10",
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[clamp(3rem,6.5svi,7rem)] 2xl:text-[clamp(3rem,7svi,8rem)] 3xl:text-[clamp(3rem,8svi,10rem)]",
          "mb-[5svb]",
          "font-sans",
          "font-extrabold uppercase leading-none tracking-widest",
          "text-black",
          className,
        )}>
        {text}
      </h2>
    );
  },
);

export default SectionTitle;
