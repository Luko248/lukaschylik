import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

const Social = component$(() => {
  return (
    <nav class="fixed bottom-64 right-32 z-10">
      <ul class="inline-flex flex-col justify-center items-center gap-32">
        <li>
          <a
            href="https://www.linkedin.com/in/lukas-chylik/"
            rel="external"
            aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
        </li>
        <li>
          <a
            href="https://codepen.io/luko248"
            rel="external"
            aria-label="CodePen"
            target="_blank">
            <Icon name="codepen" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Luko248"
            rel="external"
            aria-label="GitHub"
            target="_blank">
            <Icon name="github" />
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Social;
