import { component$ } from '@builder.io/qwik';
import { Link, type LinkProps } from '@builder.io/qwik-city';
import type { NavigationProps } from './navigatioin.types';

const Navigation = component$<NavigationProps>(({ small, links }) => {
  return (
    <nav data-small={small} class="fixed inset-x-1/2 top-0 grid place-items-center w-full translate-x-[-50%] text-white z-50">
      <ul class="inline-flex justify-center gap-4 list-none m-0 translate-y-[5svb] p-0 py-6 px-8 rounded-full bg-[hsla(0,0%,30%,0.5)] backdrop-blur-[8px]">
        {links && links.map((link: LinkProps, index: number) => (
          <li key={index} class="px-2 transition-transform duration-300 hover:scale-110">
            <Link href={link.href} class="text-white no-underline decoration-[.15em] decoration-[#4dffef] underline-offset-[.25em] uppercase hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;
