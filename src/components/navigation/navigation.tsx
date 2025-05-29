import { component$, useStore, $ } from "@builder.io/qwik";
import { Link, useLocation, type LinkProps } from "@builder.io/qwik-city";
import Social from "../social/social";
import { cls } from "~/utils";
import { NavigationProps } from "./navigation.types";

const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });
  const location = useLocation();

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  const closeMenuOnMobile = $(() => {
    if (window.innerWidth < 768) {
      state.isOpen = false;
    }
  });

  // Check if current path is blog or blog detail page
  const isBlogPage = location.url.pathname.startsWith("/blog");

  return (
    <>
      <nav
        class={cls(
          "nav",
          "sticky top-0",
          "flex justify-between items-center",
          "md:grid md:grid-cols-[120px_auto_120px] justify-between items-stretch",
          "text-center",
          "py-2 md:py-0 px-4 md:px-8",
          "md:backdrop-blur-sm",
          "bg-black md:bg-black-alpha-70",
          "w-full z-90",
          state.isOpen && "nav--open",
        )}
        aria-label="Main navigation">
        <a
          href="/"
          role="menuitem"
          class={cls(
            "nav__logo",
            "relative z-90",
            "w-[60px] md:w-[120px]",
            "flex items-center",
            "no-underline",
            "px-0 md:px-4",
            "hover:opacity-80",
          )}>
          <img
            class="w-full max-w-full"
            src="/images/logos/logo.svg"
            alt="Lukáš Chylík Logo"
            width="80"
            height="40"
            loading="eager"
          />
        </a>
        <ul
          id="navigation-menu"
          class={cls(
            "nav__list",
            "fixed md:relative inset-0 md:inset-auto h-screen md:h-auto z-80",
            "align-baseline items-center content-center gap-10 md:gap-8",
            "md:flex-row md:justify-center py-6 px-8",
            "backdrop-blur-md bg-black-alpha-70 md:bg-transparent",
            "list-none m-0",
          )}
          role="menu">
          {links &&
            links.map((link: LinkProps, index: number) => {
              const isActive = link.href === "/blog" && isBlogPage;

              return (
                <li key={index}>
                  <Link
                    role="menuitem"
                    href={link.href}
                    title={link.text}
                    rel="internal"
                    onClick$={closeMenuOnMobile}
                    data-active={isActive}
                    class={cls(
                      "text-xl md:text-l lg:text-xl",
                      "text-white ",
                      "decoration-secondary decoration-3 underline-offset-8",
                      "no-underline hover:underline",
                      isActive && "underline",
                    )}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
        </ul>
        <button
          type="button"
          class={cls(
            "nav__toggler relative",
            "w-10 h-10",
            "z-90",
            "text-white cursor-pointer visible md:invisible",
            state.isOpen && "nav__toggler--open",
          )}
          aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          aria-expanded={state.isOpen ? "true" : "false"}
          aria-controls="navigation-menu"
          title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick$={toggleMenu}></button>
      </nav>
    </>
  );
});

export default Navigation;
