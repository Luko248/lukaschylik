import { component$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";

const Icon = component$<IconProps>(({ name, cls, size, color }) => {
  const classes = [
    `icon icon-${name}`,
    "aspect-square",
    "transition-colors duration-200",
    cls,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg class={classes} style={{ "--icon_size": size, "--icon_color": color }}>
      <use xlink:href={`#icon-${name}`} />
    </svg>
  );
});

export default Icon;
