import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { cls, DialogContext } from "~/utils";
import Logo from "~/images/logos/logo.svg?jsx";
import { Button } from "../button";
import { Icon } from "../icon";
import { ThemeSwitch } from "../themeSwitch";
import type { NavigationLinkProps, NavigationProps } from "./navigation.types";

/**
 * Navigation component with mobile menu functionality
 * Handles responsive navigation with proper state management
 */
const Navigation = component$<NavigationProps>(({ links }) => {
  const state = useStore({ isOpen: false });
  const isHydrated = useSignal(false);
  const location = useLocation();
  const dialogContext = useContext(DialogContext);

  // Ensure proper hydration
  useVisibleTask$(() => {
    isHydrated.value = true;
  });

  const toggleMenu = $(() => {
    state.isOpen = !state.isOpen;
  });

  const closeMenuOnMobile = $(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      state.isOpen = false;
    }
  });

  // Scroll lock handled via CSS in _navigation.scss using :has(.nav--open)

  // Check if current path is blog or blog detail page
  const isBlogPage = location.url.pathname.startsWith("/blog");

  return (
    <>
      <nav
        class={cls(
          "nav",
          "sticky inset-x-0 top-0",
          "flex justify-between items-center",
          "md:grid md:grid-cols-[auto_1fr_auto] justify-between items-stretch",
          "text-center",
          "py-2 md:py-0 px-4 md:px-18",
          "md:backdrop-blur-sm",
          "bg-white dark:bg-black md:bg-white dark:md:bg-black/80",
          "w-full z-[200] h-[56px] md:h-[76px]",
          state.isOpen && "nav--open",
        )}
        aria-label="Main navigation">
        <a
          href="/"
          role="menuitem"
          class={cls(
            "nav__logo",
            "relative",
            "w-[110px] md:w-[140px]",
            "flex items-center",
            "no-underline",
            "transition-opacity duration-200",
            "opacity-100 hover:opacity-80",
          )}>
          <Logo
            class="w-full max-w-full"
            role="img"
            aria-label="Lukáš Chylík Logo"
            width="140"
            height="60"
          />
        </a>
        <ul
          id="navigation-menu"
          class={cls(
            "nav__list",
            "fixed md:relative inset-[var(--nav_height)_0_0_0] md:inset-auto h-auto z-100",
            "align-baseline items-center content-center gap-10 md:gap-8",
            "md:flex-row md:justify-center py-6 px-8",
            "backdrop-blur-md md:backdrop-blur-none bg-white/70 dark:bg-black/70 md:bg-transparent dark:md:bg-transparent",
            "list-none m-0",
            !isHydrated.value && "invisible md:visible",
            state.isOpen ? "grid" : "hidden md:flex",
          )}>
          {links?.map((link: NavigationLinkProps) => {
            const href = link.href ?? "";
            const isActive = href === "/blog" && isBlogPage;
            const isHashLink = href.includes("#");

            return (
              <li key={href || link.text}>
                {isHashLink ? (
                  <a
                    role="menuitem"
                    href={href}
                    title={link.text}
                    onClick$={closeMenuOnMobile}
                    data-active={isActive}
                    class={cls(
                      "flex justify-center items-center flex-nowrap gap-3 whitespace-nowrap",
                      "text-xl md:text-sm lg:text-base 3xl:text-lg",
                      "text-black dark:text-white",
                      "decoration-secondary decoration-3 underline-offset-8",
                      "no-underline hover:underline active:underline",
                      isActive && "underline",
                    )}>
                    {link.text}
                    {link.icon && <Icon name={link.icon} size="1.25rem" />}
                  </a>
                ) : (
                  <Link
                    role="menuitem"
                    href={href || "/"}
                    title={link.text}
                    rel="internal"
                    onClick$={closeMenuOnMobile}
                    data-active={isActive}
                    class={cls(
                      "flex justify-center items-center flex-nowrap gap-3 whitespace-nowrap",
                      "text-xl md:text-sm lg:text-base 3xl:text-lg",
                      "text-black dark:text-white",
                      "decoration-secondary decoration-3 underline-offset-8",
                      "no-underline hover:underline",
                      isActive && "underline",
                    )}>
                    {link.text}
                    {link.icon && <Icon name={link.icon} size="1.25rem" />}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div class="flex gap-4 items-center">
          <ThemeSwitch />
          <Button
            variant="secondary"
            size="sm"
            title="Rezervácia"
            className="relative"
            onClick$={dialogContext.showDialog}>
            Rezervácia
          </Button>
          <button
            type="button"
            class={cls(
              "nav__toggler relative",
              "w-10 h-10",
              "text-white cursor-pointer grid md:hidden",
              state.isOpen && "nav__toggler--open",
            )}
            aria-label={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
            aria-expanded={state.isOpen ? "true" : "false"}
            aria-controls="navigation-menu"
            title={state.isOpen ? "Zavrieť menu" : "Otvoriť menu"}
            onClick$={toggleMenu}></button>
        </div>
      </nav>
    </>
  );
});

export default Navigation;
