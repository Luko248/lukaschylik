import { component$ } from "@builder.io/qwik";
import * as stylex from "@stylexjs/stylex";
import { ReferenceProps } from "./reference.types";
import STYLE from "./styles/reference.styles";

const Reference = component$<ReferenceProps>(
  ({ src, title, webURL, year, styles }) => {
    return (
      <li {...stylex.props(styles)}>
        <a
          href={webURL}
          target="_blank"
          rel="noreferer"
          {...stylex.props(STYLE.reference)}
        >
          <strong {...stylex.props(STYLE.title)}>
            {title}
            <sup {...stylex.props(STYLE.year)}>({year})</sup>
          </strong>
          <small {...stylex.props(STYLE.url)}>{webURL}</small>
          <img src={src} alt={title} width={250} height={74} {...stylex.props(STYLE.picture)}/>
        </a>
      </li>
    );
  }
);

export default Reference;
