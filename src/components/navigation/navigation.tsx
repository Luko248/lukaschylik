import { component$ } from '@builder.io/qwik';
import { Link, type LinkProps } from '@builder.io/qwik-city';
import type { NavigationProps } from './navigatioin.types';

const Navigation = component$<NavigationProps>(({ small, links }) => {
  return (
    <nav data-small={small}>
      <ul>
        {links && links.map((link: LinkProps, index: number) => (
          <li key={index}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;