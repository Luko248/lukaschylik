import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

const Social = component$(() => {
  return (
    <nav class="social fixed bottom-8 md:bottom-16 right-2 md:right-4 lg:right-8 z-50 mix-blend-difference">
      <ul class="inline-flex flex-col justify-center items-center gap-6 ms:gap-8">
        <li class="group">
          <a
            href="https://www.linkedin.com/in/lukas-chylik/"
            rel="external"
            aria-label="Odkaz na môj LinkedIn"
            target="_blank">
            <Icon
              name="linkedin"
              cls="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out lg:w-8"
            />
          </a>
        </li>
        <li class="group">
          <a
            href="https://codepen.io/luko248"
            rel="external"
            aria-label="Odkaz na môj CodePen"
            target="_blank">
            <Icon
              name="codepen"
              cls="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out lg:w-8"
            />
          </a>
        </li>
        <li class="group">
          <a
            href="https://github.com/Luko248"
            rel="external"
            aria-label="Odkaz na môj github"
            target="_blank">
            <Icon
              name="github"
              cls="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out lg:w-8"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Social;
