import { component$ } from "@builder.io/qwik";
import type { ReferenceProps } from "./reference.types";

const Reference = component$<ReferenceProps>(({ src, title, webURL, year }) => {
  return (
    <li class="border-b border-white isolate hover:z-10 first:border-t relative">
      <a
        href={webURL}
        target="_blank"
        rel="noreferer"
        class="reference group flex justify-between items-center gap-2 text-white py-16 no-underline">
        <strong class="flex gap-16 font-medium text-3xl leading-normal overflow-hidden relative z-20 tracking-wide uppercase">
          <span
            aria-label={title}
            class="transition-colors duration-300 ease-in-out group-hover:text-yellow">
            {title}
          </span>
          <sup class="text-xs translate-y-16 tracking-wider leading-none">
            {year}
          </sup>
        </strong>
        <small class="text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-yellow">
          {webURL}
        </small>
      </a>
    </li>
  );
});

export default Reference;
