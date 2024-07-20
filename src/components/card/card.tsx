import { component$ } from "@builder.io/qwik";
// import { attrs, create, props } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { CardProps } from "./card.types";
import { gap, media, color } from "../../vars.stylex";
import STYLE from "./card.styles";


const Card = component$<CardProps>(
  ({ src, title, webURL, styles }) => {
    return (
      <div {...stylex.props(STYLE.card, styles)}>
        <div {...stylex.props(STYLE.inner)}>
          <div {...stylex.props(STYLE.face, STYLE.faceFront)}>
            <img src={src} alt={title} width={250} height={74} />
          </div>
          <div {...stylex.props(STYLE.face, STYLE.faceBack)}>
            <a href={webURL} target="_blank" rel="noreferrer" {...stylex.props(STYLE.link)}>Show website</a>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
