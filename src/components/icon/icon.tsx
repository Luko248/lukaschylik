import { component$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";

const Icon = component$<IconProps>(({ name }) => {
  return (
    <svg class={`icon icon-${name} fill-white w-32 aspect-square`}>
      <use xlink:href={`#icon-${name}`} />
    </svg>
  );
});

export default Icon;
