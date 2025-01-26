import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

const Social = component$(() => {
  return (
    <nav class="social fixed bottom-16 right-8 z-50">
      <ul class="inline-flex flex-col justify-center items-center gap-8">
        <li class="group">
          <a
            href="https://www.linkedin.com/in/lukas-chylik/"
            rel="external"
            aria-label="Odkaz na môj LinkedIn"
            target="_blank"
            class="hover:scale-110 transition-transform duration-250 ease-in-out">
            <Icon
              name="linkedin"
              classNames="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out"
            />
          </a>
        </li>
        <li class="group">
          <a
            href="https://codepen.io/luko248"
            rel="external"
            aria-label="Odkaz na môj CodePen"
            target="_blank"
            class="hover:scale-110 transition-transform duration-250 ease-in-out">
            <Icon
              name="codepen"
              classNames="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out"
            />
          </a>
        </li>
        <li class="group">
          <a
            href="https://github.com/Luko248"
            rel="external"
            aria-label="Odkaz na môj github"
            target="_blank"
            class="hover:scale-110 transition-transform duration-250 ease-in-out">
            <Icon
              name="github"
              classNames="scale-100 group-hover:scale-120 transition-transform duration-250 ease-in-out"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Social;
