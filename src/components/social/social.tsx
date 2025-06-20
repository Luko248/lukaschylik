import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { cls } from "~/utils";
import Icon from "../icon/icon";
import SocialItem from "./socialItem";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/lukas-chylik/",
    label: "Odkaz na môj LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://discord.gg/yXfUhRjx",
    label: "Odkaz na CSS CzechoSlovakia Discord",
    icon: "discord",
  },
  {
    href: "https://codepen.io/luko248",
    label: "Odkaz na môj CodePen",
    icon: "codepen",
  },
  {
    href: "https://github.com/Luko248",
    label: "Odkaz na môj github",
    icon: "github",
  },
] as const;

const Social = component$(() => {
  const isOpen = useSignal(false);
  const menuRef = useSignal<HTMLDivElement>();
  const buttonRef = useSignal<HTMLButtonElement>();

  const closeMenu = $(() => (isOpen.value = false));
  const toggleMenu = $(() => (isOpen.value = !isOpen.value));

  // Close when clicking outside
  useOnDocument(
    "click",
    $((event) => {
      if (!isOpen.value) return;

      const target = event.target as Node;
      const clickedOutside =
        menuRef.value &&
        !menuRef.value.contains(target) &&
        !buttonRef.value?.contains(target);

      if (clickedOutside) closeMenu();
    }),
  );

  // Close on Escape key
  useOnDocument(
    "keydown",
    $((event) => {
      if (event.key === "Escape" && isOpen.value) closeMenu();
    }),
  );

  return (
    <div
      ref={menuRef}
      class={cls(
        "social fixed bottom-4 right-2 z-[200] grid place-items-center w-10 h-10 ratio-1/1",
        "md:bottom-8 md:right-4 lg:right-8 mix-blend-difference",
      )}
      data-open={isOpen.value}>
      <ul
        id="socialMenu"
        class="absolute inset-0 m-0 p-0 list-none z-10"
        aria-hidden={!isOpen.value}>
        {SOCIAL_LINKS.map((item) => (
          <SocialItem key={item.icon} {...item} />
        ))}
      </ul>
      <button
        type="button"
        id="menuButton"
        onClick$={toggleMenu}
        aria-label={
          isOpen.value ? "Zavrieť sociálne siete" : "Otvoriť sociálne siete"
        }
        aria-expanded={isOpen.value}
        aria-controls="socialMenu"
        class={cls(
          "absolute w-10 h-10",
          "group grid place-items-center",
          "m-0 cursor-pointer z-10",
          "bg-white rounded-full",
          "transition-colors duration-200 focus:outline-none",
        )}>
        <Icon
          name="share"
          cls={cls(
            "w-4 md:w-5",
            "transition-transform duration-250 ease-in-out group-hover:scale-110",
            isOpen.value && "scale-110",
          )}
        />
      </button>
    </div>
  );
});

export default Social;
