import { component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import type { NavigationProps } from "./navigatioin.types";
import Social from "../social/social";

const Navigation = component$<NavigationProps>(({ links }) => {
  return (
    <>
      <nav class="nav fixed top-0 text-center py-8 px-1 w-full z-50 backdrop-blur-md">
        <ul class="nav__list inline-flex justify-center opacity-0 gap-12 list-none m-0">
          {links &&
            links.map((link: LinkProps, index: number) => (
              <li key={index}>
                <Link
                  href={link.href}
                  title={link.text}
                  rel="internal"
                  class=" text-white text-xl uppercase no-underline decoration-secondary decoration-5 underline-offset-8 hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <Social />
    </>
  );
});

export default Navigation;
