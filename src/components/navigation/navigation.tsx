import { component$ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { NavigationProps } from './navigatioin.types';

const Navigation = component$<NavigationProps>(({ small, links }) => {
  const nav = useNavigate();

  return <nav class="nav" data-small={small}>
    <div>
      {links && links.map(link =>
        <Link href={link.href}>{link.text}</Link>)}
    </div>
  </nav>
});

export default Navigation;