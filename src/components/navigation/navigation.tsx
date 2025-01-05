import { component$ } from '@builder.io/qwik';
import { Link, type LinkProps } from '@builder.io/qwik-city';
import type { NavigationProps } from './navigatioin.types';

const Navigation = component$<NavigationProps>(({ small, links }) => {
  return (
    <nav data-small={small} class="fixed top-0 text-center py-32 px-16 w-full z-50">
      <ul class="inline-flex justify-center gap-32 list-none m-0">
        {links && links.map((link: LinkProps, index: number) => (
          <li key={index}>
            <Link href={link.href} title={link.text} rel="internal" class="text-white uppercase no-underline underline-offset-4 hover:underline text-l">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;
