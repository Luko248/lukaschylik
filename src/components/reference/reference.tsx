import { component$ } from "@builder.io/qwik";
import type { ReferenceProps } from "./reference.types";

const Reference = component$<ReferenceProps>(({ src, title, webURL, year }) => {
  return (
    <li class="relative flex justify-between items-center gap-2 text-white py-2 border-b border-white uppercase isolate hover:z-10 first:border-t">
      <a
        href={webURL}
        target="_blank"
        rel="noreferer"
        class="flex justify-between items-center gap-2 text-white no-underline">
        <strong class="flex gap-2 font-medium text-2xl leading-normal max-h-12 overflow-hidden relative z-20">
          <span
            aria-label={title}
            class="before:content-[attr(aria-label)] before:flex before:flex-col before:text-white before:transition-transform before:duration-300 before:ease-in-out before:translate-y-0 hover:before:translate-y-[-100%]">
            {title}
          </span>
          <sup class="text-xs translate-y-2 tracking-wider leading-none">
            {year}
          </sup>
        </strong>
        <small class="text-base opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
          {webURL}
        </small>
        <div class="absolute flex flex-col justify-center opacity-0 hover:opacity-100 inset-1/2 translate-x-80 translate-y-half bg-gray-700 p-4 aspect-square rounded-full isolate z-10">
          <img src={src} alt={title} width={250} height={74} class="block" />
        </div>
      </a>
    </li>
  );
});

export default Reference;
