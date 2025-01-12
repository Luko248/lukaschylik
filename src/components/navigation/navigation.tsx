import { component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import type { NavigationProps } from "./navigatioin.types";
import Social from "../social/social";

const Navigation = component$<NavigationProps>(({ links }) => {
  return (
    <>
      <nav class="nav fixed top-0 text-center py-32 px-16 w-full z-50">
        <ul class="inline-flex justify-center gap-32 list-none m-0">
          {links &&
            links.map((link: LinkProps, index: number) => (
              <li key={index}>
                <Link
                  href={link.href}
                  title={link.text}
                  rel="internal"
                  class="nav__item text-white uppercase no-underline decoration-yellow decoration-4 underline-offset-8 hover:underline text-l">
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
