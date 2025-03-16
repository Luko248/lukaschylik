import { component$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";

const Icon = component$<IconProps>(({ name, cls }) => {
  const classes = [
    `icon icon-${name}`,
    "fill-white",
    "w-5",
    "aspect-square",
    cls,
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
