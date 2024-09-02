import { component$ } from "@builder.io/qwik";
import { props } from "@stylexjs/stylex";
import { ReferenceProps } from "./reference.types";
import STYLE from "./styles/reference.styles";

const Reference = component$<ReferenceProps>(
  ({ src, title, webURL, year, styles }) => {
    return (
      <li {...props(styles)}>
        <a
          href={webURL}
          target="_blank"
          rel="noreferer"
          {...props(STYLE.reference)}
        >
          <strong {...props(STYLE.titleWrrapper)}>
            <span aria-label={title} {...props(STYLE.title)}/>
            <sup {...props(STYLE.year)}>({year})</sup>
          </strong>
          <small {...props(STYLE.url)}>{webURL}</small>
         <div {...props(STYLE.pictureWrapper)}>
          <img src={src} alt={title} width={250} height={74} {...props(STYLE.picture)}/>
         </div>
        </a>
      </li>
    );
  }
);

export default Reference;
