import { component$ } from "@builder.io/qwik";
import type { ReferenceProps } from "./reference.types";

const Reference = component$<ReferenceProps>(
  ({ title, webURL, type, website }) => {
    return (
      <li class="border-b border-white isolate hover:z-10 first:border-t relative">
        <a
          href={webURL}
          target="_blank"
          rel="noreferer"
          class="reference group flex justify-between items-center gap-4 py-2 no-underline">
          <strong class="flex gap-4 font-medium text-5xl leading-normal overflow-hidden relative z-20 tracking-wide uppercase">
            <span
              aria-label={title}
              class="relative text-tramsparent duration-300 ease-in-out">
              {title}
            </span>
            <sup class="text-xs translate-y-6 text-white tracking-wider leading-none">
              {type}
            </sup>
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
