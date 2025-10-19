import { component$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import type { ReferenceProps } from "./reference.types";

const Reference = component$<ReferenceProps>(({ title, webURL, type }) => {
  return (
    <li class="border-b border-black/30 dark:border-white/30 md:border-black dark:md:border-white isolate hover:z-10 first:border-t relative">
      <a
        href={webURL}
        target="_blank"
        rel="noreferer"
        class="reference group flex just justify-between items-center gap-4 py-2 no-underline"
      >
        <strong
          class={cls(
            "relative",
            "flex w-full lg:w-auto justify-between gap-4",
            "text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl",
            "font-medium leading-normal tracking-wide uppercase whitespace-nowrap",
            "overflow-hidden z-20"
          )}
        >
          <span
            class="relative text-transparent duration-300 ease-in-out"
            title={title}
          >
            {title}
          </span>
          <small class="text-[10px] md:text-xs pt-1 lg:pt-1 xl:pt-2 2xl:pt-3 3xl:pt-4 text-black dark:text-white tracking-wider leading-none">
            {type}
          </small>
        </strong>
      </a>
    </li>
  );
});

export default Reference;
