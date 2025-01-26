import { component$, useStore, $ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import type { NavigationProps } from "./navigatioin.types";
import Social from "../social/social";

const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  return (
    <>
      <nav
        class="nav fixed top-0 flex justify-between text-center py-8 px-1 w-full z-50 px-32"
        data-open={state.isOpen}>
        <a
          href="/"
          role="menuitem"
          class="nav__logo text-white text-2xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
          Home
        </a>
        <ul
          class="nav__list inline-flex justify-center align-baseline items-start opacity-0 gap-12 list-none m-0"
          role="menu">
          {links &&
            links.map((link: LinkProps, index: number) => (
              <li key={index}>
                <Link
                  role="menuitem"
                  href={link.href}
                  title={link.text}
                  rel="internal"
                  class=" text-white text-xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
        </ul>

        <button
          type="button"
          class="nav__toggler w-16 h-16 bg-secondary text-white cursor-pointer"
          aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick$={toggleMenu}></button>
      </nav>
      <Social />
    </>
  );
});

export default Navigation;
