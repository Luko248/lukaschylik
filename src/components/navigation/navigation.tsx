import { component$, useStore, $ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import type { NavigationProps } from "./navigatioin.types";
import Social from "../social/social";

const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  const handleToggleClass = (isOpen: boolean) => {
    const classList = [
      "nav__toggler relative w-16 h-16 text-white cursor-pointer visible md:invisible",
      isOpen && "nav__toggler--open",
    ]
      .filter(Boolean)
      .join(" ");

    return classList;
  };

  const handleMenuClass = () => {
    const classList = [
      "nav__list",
      "absolute top-full inset-0 min-h-screen text-center align-baseline items-center gap-12 list-none m-0",
      "md:relative md:top-auto md:inset-auto md:min-h-auto md:flex-row md:justify-center",
    ]
      .filter(Boolean)
      .join(" ");

    return classList;
  };

  return (
    <>
      <nav
        class={`nav fixed top-0 flex justify-between text-center py-4 md:py-8 px-8 w-full z-50 backdrop-blur-md ${state.isOpen ? "nav--open" : ""}`}>
        <a
          href="/"
          role="menuitem"
          class="nav__logo text-white text-2xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
          Home
        </a>
        <ul class={handleMenuClass()} role="menu">
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
          class={handleToggleClass(state.isOpen)}
          aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick$={toggleMenu}></button>
      </nav>
      <Social />
    </>
  );
});

export default Navigation;
