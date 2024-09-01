import { component$ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { NavigationProps } from './navigatioin.types';
import stylex from '@stylexjs/stylex';
import STYLE from './styles/navigation.styles';

const Navigation = component$<NavigationProps>(({ small, links }) => {
  const nav = useNavigate();

  return <nav {...stylex.props(STYLE.nav)} data-small={small}>
    <ul {...stylex.props(STYLE.menu)}>
      {links && links.map(link =>
        <li {...stylex.props(STYLE.li)}>
          <Link href={link.href} {...stylex.props(STYLE.link)}> {link.text}</Link>
        </li>
      )}
    </ul>
  </nav >
});

export default Navigation;