import { component$ } from "@builder.io/qwik";
import { classNames } from "~/utils";
import { SectionTitleProps } from "./section.types";

const SectionTitle = component$<SectionTitleProps>(
  ({ text, className, dark }) => {
    return (
      <h2
        data-dark={dark}
        class={classNames(
          "content-fade-in",
          "relative",
          "text-5xl sm:text-6xl lg:text-9xl 2xl:text-[clamp(3rem,10svi,10rem)]",
          "mb-[5svb]",
          "font-extrabold uppercase leading-none tracking-widest",
          dark ? "text-black" : "text-transparent",
          className,
        )}>
        {text}
      </h2>
    );
  },
);

export default SectionTitle;
