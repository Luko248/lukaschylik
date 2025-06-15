import { component$ } from "@builder.io/qwik";
import Icon from "../icon/icon";

const Social = component$(() => {
  return (
    <>
      <button
        type="button"
        {...({
          commandfor: "socialPopover",
          command: "toggle-popover",
        } as any)}
        id="menuButton"
        aria-describedby="socialPopover"
        aria-label="Zobraziť sociálne média"
        class="social group fixed bottom-4 md:bottom-8 right-2 md:right-4 lg:right-8 z-50 transition-transform grid place-items-center ratio-1/1 text-black bg-white duration-200 rounded-full p-2 m-0 border-0 anchor/social cursor-pointer">
        <Icon
          name="share"
          cls="scale-100 group-hover:scale-110 transition-transform duration-250 ease-in-out w-4 md:w-6"
        />
      </button>
      <nav
        {...({
          popover: "",
          closedby: "any",
        } as any)}
        id="socialPopover"
        class="mix-blend-difference bg-transparent fixed anchored/social anchored-top-center p-2 m-0 mb-4"
        closedby="any">
        <ul
          class="inline-flex flex-col justify-center items-center gap-6 ms:gap-8"
          role="dialog">
          <li class="group">
            <a
              href="https://www.linkedin.com/in/lukas-chylik/"
              rel="external"
              aria-label="Odkaz na môj LinkedIn"
              target="_blank">
              <Icon
                name="linkedin"
                cls="scale-100 group-hover:scale-110 transition-transform duration-250 ease-in-out w-6 xl:w-8 text-white"
              />
            </a>
          </li>
          <li class="group">
            <a
              href="https://discord.gg/yXfUhRjx"
              rel="external"
              aria-label="Odkaz na CSS CzechoSlovakia Discord"
              target="_blank">
              <Icon
                name="discord"
                cls="scale-100 group-hover:scale-110 transition-transform duration-250 ease-in-out w-6 xl:w-8 text-white"
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
                cls="scale-100 group-hover:scale-110 transition-transform duration-250 ease-in-out w-6 xl:w-8 text-white"
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
                cls="scale-100 group-hover:scale-110 transition-transform duration-250 ease-in-out w-6 xl:w-8 text-white"
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
});

export default Social;
