import { component$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";

const Icon = component$<IconProps>(({ name, classNames }) => {
  const classes = [
    `icon icon-${name}`,
    "fill-white",
    "w-6 md:w-8",
    "aspect-square",
    classNames,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg class={classes}>
      <use xlink:href={`#icon-${name}`} />
    </svg>
  );
});

export default Icon;
