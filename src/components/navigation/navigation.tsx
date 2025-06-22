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
import Logo from "../../assets/images/logo.svg?jsx";
import { Button } from "../button";
import { Icon } from "../icon";
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
          "py-2 md:py-0 px-4 md:px-18",
          "md:backdrop-blur-sm",
          "bg-white dark:bg-black md:bg-white dark:md:bg-black-alpha-80",
          "w-full z-[100]",
          state.isOpen && "nav--open",
        )}
        aria-label="Main navigation">
        <a
          href="/"
          role="menuitem"
          class={cls(
            "nav__logo",
            "relative z-[101]",
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
            width="120"
            height="60"
          />
        </a>
        <ul
          id="navigation-menu"
          class={cls(
            "nav__list",
            "fixed md:relative inset-0 md:inset-auto h-screen md:h-auto z-[90]",
            "align-baseline items-center content-center gap-10 md:gap-8",
            "md:flex-row md:justify-center py-6 px-8",
            "backdrop-blur-md md:backdrop-blur-none bg-black-alpha-70 md:bg-transparent",
            "list-none m-0",
            !isHydrated.value && "invisible md:visible",
            state.isOpen ? "grid" : "hidden md:flex",
          )}>
          {links?.map((link: NavigationLinkProps) => {
            const isActive = link.href === "/blog" && isBlogPage;

            return (
              <li key={link.href}>
                <Link
                  role="menuitem"
                  href={link.href}
                  title={link.text}
                  rel="internal"
                  onClick$={closeMenuOnMobile}
                  data-active={isActive}
                  class={cls(
                    "flex justify-center items-center flex-nowrap gap-3",
                    "text-xl md:text-l lg:text-xl",
                    "text-black dark:text-white",
                    "decoration-secondary decoration-3 underline-offset-8",
                    "no-underline hover:underline",
                    isActive && "underline",
                  )}>
                  {link.text}
                  {link.icon && <Icon name={link.icon} size="1.25rem" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div class="flex gap-4 items-center">
          <Button
            variant="secondary"
            size="sm"
            title="Rezervácia"
            className="relative z-[101]"
            onClick$={dialogContext.showDialog}>
            Rezervácia
          </Button>
          <button
            type="button"
            class={cls(
              "nav__toggler relative",
              "w-10 h-10",
              "z-[101]",
              "text-white cursor-pointer visible md:invisible",
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
