import { component$ } from "@builder.io/qwik";
// import { attrs, create, props } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { CardProps } from "./card.types";
import { gap, media, color } from "../../vars.stylex";

const STYLE = stylex.create({
  card: {
    marginInline: gap.auto,
  },
  inner: {
    marginInline: gap.auto,
  },
  innerFront: {
    marginInline: gap.auto,
  },
  innerBack: {
    marginInline: gap.auto,
  },
  tite: {
    color: color.primary,
  },
  description: {
    color: color.primary,
  },
  link: {
    color: color.primary,
  },
});

const Card = component$<CardProps>(
  ({ src, title, description, webURL, styles }) => {
    return (
      <div {...stylex.props(STYLE.card, styles)}>
        <div {...stylex.props(STYLE.inner)}>
          <div {...stylex.props(STYLE.innerFront)}>
            <img src={src} alt={title} width="250" />
          </div>
          <div {...stylex.props(STYLE.innerBack)}>
            <h3 {...stylex.props(STYLE.tite)}>{title}</h3>
            <p {...stylex.props(STYLE.description)}>{description}</p>
            <a href={webURL} target="_blank" rel="noreferrer" {...stylex.props(STYLE.link)}>Visit</a>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
