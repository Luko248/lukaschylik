import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

const Social = component$(() => {
  return (
    <nav class="social fixed bottom-64 right-32 z-10">
      <ul class="inline-flex flex-col justify-center items-center gap-32 ">
        <li>
          <a
            href="https://www.linkedin.com/in/lukas-chylik/"
            rel="external"
            aria-label="Odkaz na môj LinkedIn"
            target="_blank"
            class="hover:signal">
            <Icon
              name="linkedin"
              classNames="scale-100 signal:scale-120 transition-scale duration-250 ease-in-out"
            />
          </a>
        </li>
        <li>
          <a
            href="https://codepen.io/luko248"
            rel="external"
            aria-label="Odkaz na môj CodePen"
            target="_blank"
            class="hover:signal">
            <Icon
              name="codepen"
              classNames="scale-100 signal:scale-120 transition-scale duration-250 ease-in-out"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Luko248"
            rel="external"
            aria-label="Odkaz na môj github"
            target="_blank"
            class="hover:signal">
            <Icon
              name="github"
              classNames="scale-100 signal:scale-120 transition-scale duration-250 ease-in-out"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Social;
