import { component$, useStore, $ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import Social from "../social/social";
import { cls } from "~/utils";
import { NavigationProps } from "./navigation.types";

const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  const closeMenuOnMobile = $(() => {
    if (window.innerWidth < 768) {
      state.isOpen = false;
    }
  });

  return (
    <>
      <nav
        class={cls(
          "nav",
          "fixed top-0",
          "flex justify-between items-center text-center",
          "py-4 md:py-8 px-8",
          "w-full z-90",
          "md:backdrop-blur-md",
          "md:mix-blend-difference",
          state.isOpen && "nav--open",
        )}>
        <a
          href="/"
          role="menuitem"
          class={cls(
            "nav__logo",
            "relative z-20",
            "text-lg md:text-l lg:text-xl",
            "text-white uppercase",
            "decoration-secondary decoration-5 underline-offset-8",
            "no-underline hover:underline",
          )}>
          Domov
        </a>
        <ul
          class={cls(
            "nav__list",
            "fixed md:relative inset-0 md:inset-auto h-screen md:h-auto",
            "align-baseline items-center content-center gap-16 md:gap-8",
            "md:flex-row md:justify-center",
            "bg-black/70 backdrop-blur-md md:bg-transparent ",
            "backdrop-blur-lg md:backdrop-blur-none",
            "list-none m-0",
          )}
          role="menu">
          {links &&
            links.map((link: LinkProps, index: number) => (
              <li key={index}>
                <Link
                  role="menuitem"
                  href={link.href}
                  title={link.text}
                  rel="internal"
                  onClick$={closeMenuOnMobile}
                  class={cls(
                    "text-lg md:text-l lg:text-xl",
                    "text-white uppercase",
                    "decoration-secondary decoration-5 underline-offset-8",
                    "no-underline hover:underline",
                  )}>
                  {link.text}
                </Link>
              </li>
            ))}
        </ul>
        <span></span>
      </nav>
      <button
        type="button"
        class={cls(
          "nav__toggler fixed md:relative top-4 right-4",
          "w-10 h-10",
          "mix-blend-difference md:mix-blend-normal",
          "text-white cursor-pointer visible md:invisible",
          state.isOpen && "nav__toggler--open",
          "z-90",
        )}
        aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
        title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
        onClick$={toggleMenu}></button>
      <Social />
    </>
  );
});

export default Navigation;
