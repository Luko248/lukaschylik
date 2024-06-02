import { component$ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { NavigationProps } from './navigatioin.types';
import { color, gap, borderRradius } from '../../vars.stylex';
import stylex, { create } from '@stylexjs/stylex';

const STYLE = create({
  nav: {
    position: "fixed",
    inset: "0 auto auto 50%",
    display: "grid",
    placeItems: "center",
    inlineSize: "100%",
    translate: "-50%",
    color: color.white,
    zIndex: 1000,
  },
  menu: {
    display: "inline-flex",
    justifyContent: "center",
    gap: gap.l,
    listStyle: "none",
    margin: 0,
    translate: "0 5svb",
    padding: 0,
    paddingBlock: gap.xl,
    paddingInline: gap.xxl,
    borderRadius: borderRradius.full,
    backgroundColor: "hsla(0, 0%, 30%, 0.5)",
    backdropFilter: "blur(8px)",
  },
  li: {
    paddingInline: gap.m,
    textDecoration: "none",
    transition: "scale 0.3s",
    ":hover": {
      scale: "1.1",
    }
  },
  link: {
    color: color.white,
    textDecoration: "none",
    textDecorationThickness: ".15em",
    textDecorationColor: "#4dffef",
    textDecorationStyle: "solid",
    textUnderlineOffset: ".25em",
    textTransform: "uppercase",
    ":hover": {
      textDecoration: "underline",
    }
  }
});
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