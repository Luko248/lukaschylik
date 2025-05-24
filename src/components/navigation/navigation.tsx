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
          "flex justify-between items-center text-center",
          "py-4 md:py-8 px-8",
          "w-full z-90",
          state.isOpen && "nav--open",
        )}
        aria-label="Main navigation">
        <a
          href="/"
          role="menuitem"
          class={cls(
            "nav__logo",
            "relative z-20",
            "flex items-center",
            "no-underline",
            "transition-opacity duration-300 ease-in-out hover:opacity-80",
          )}>
          <img 
            src="/images/logos/references/logo.svg" 
            alt="LCH Logo" 
            width="100" 
            height="60" 
            class="mr-2"
            loading="eager"
          />
        </a>
        <ul
          id="navigation-menu"
          class={cls(
            "nav__list",
            "fixed md:relative inset-0 md:inset-auto h-screen md:h-auto",
            "align-baseline items-center content-center gap-16 md:gap-8",
            "md:flex-row md:justify-center py-4 px-8 rounded-full",
            "backdrop-blur-sm",
            "transition-colors duration-200 ease-in-out",
            "list-none m-0",
          )}
          role="menu">
          {links &&
            links.map((link: LinkProps, index: number) => {
              // Check if this link is the blog link and we're on a blog page
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
                      "text-lg md:text-l lg:text-xl",
                      "text-white ",
                      "decoration-secondary decoration-5 underline-offset-8",
                      "no-underline hover:underline",
                      isActive && "underline",
                    )}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
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
        aria-expanded={state.isOpen ? "true" : "false"}
        aria-controls="navigation-menu"
        title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
        onClick$={toggleMenu}></button>
    </>
  );
});

export default Navigation;
