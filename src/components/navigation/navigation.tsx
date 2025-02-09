import { component$, useStore, $ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import Social from "../social/social";
import { classNames } from "~/utils";
import { NavigationProps } from "./navigation.types";

const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  return (
    <>
      <nav
        class={`nav fixed top-0 flex justify-between text-center py-4 md:py-8 px-8 w-full z-40 md:backdrop-blur-md ${state.isOpen ? "nav--open" : ""}`}>
        <a
          href="/"
          role="menuitem"
          class="nav__logo relative z-20 text-white text-3xl md:text-xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
          Home
        </a>
        <ul
          class={classNames(
            "nav__list",
            "fixed md:relative inset-0 md:inset-auto",
            "align-baseline items-center content-center gap-16 md:gap-8",
            "md:flex-row md:justify-center",
            "bg-menu md:bg-transparent backdrop-blur-lg md:backdrop-blur-none",
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
                  class="text-white text-2xl md:text-xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
        </ul>

        <button
          type="button"
          class={classNames(
            "nav__toggler relative w-10 h-10 text-white cursor-pointer visible md:invisible",
            state.isOpen && "nav__toggler--open",
          )}
          aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick$={toggleMenu}></button>
      </nav>
      <Social />
    </>
  );
});

export default Navigation;
