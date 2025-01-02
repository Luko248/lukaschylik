import { component$ } from "@builder.io/qwik";
import type { ReferenceProps } from "./reference.types";

const Reference = component$<ReferenceProps>(({ src, title, webURL, year }) => {
  return (
    <li>
      <a href={webURL} target="_blank" rel="noreferer">
        <strong>
          <span aria-label={title} />
          <sup>({year})</sup>
        </strong>
        <small>{webURL}</small>
        <div>
          <img src={src} alt={title} width={250} height={74} />
        </div>
      </a>
    </li>
  );
});

export default Reference;
