import { component$ } from "@builder.io/qwik";
import type { ReferenceProps } from "./reference.types";
import { cls } from "~/utils";

const Reference = component$<ReferenceProps>(
  ({ title, webURL, type, website }) => {
    return (
      <li class="border-b border-white isolate hover:z-10 first:border-t relative">
        <a
          href={webURL}
          target="_blank"
          rel="noreferer"
          class="reference group flex just justify-between items-center gap-4 py-2 no-underline">
          <strong
            class={cls(
              /* Layout */
              "flex justify-between gap-4",
              /* Typography */
              "font-medium text-xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl leading-normal tracking-wide uppercase whitespace-nowrap",
              /* Positioning */
              "overflow-hidden relative z-20",
            )}>
            <span
              aria-label={title}
              class="relative text-tramsparent duration-300 ease-in-out">
              {title}
            </span>
            <small class="text-xs text-white tracking-wider leading-none">
              {type}
            </small>
          </strong>
          <small
            class="relative text-base text-transparent"
            aria-label={website}>
            {website}
          </small>
        </a>
      </li>
    );
  },
);

export default Reference;
