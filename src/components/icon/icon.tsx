import { component$, useSignal, useVisibleTask$, useContext, useTask$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";
import { IconsLoadedContext } from "./iconSet";

/**
 * Icon component that renders SVG icons from a sprite
 * This component displays SVG icons by referencing definitions in the IconSet sprite.
 * It handles the visibility of icons based on whether the sprite has been loaded,
 * ensuring icons are only displayed when their definitions are available in the DOM.
 * Uses Qwik's useTask$ and useVisibleTask$ for proper lifecycle management.
 * 
 * @component
 * @param {IconProps} props - Component properties passed to the Qwik component
 * @param {string} props.name - The name of the icon to display (must match an id in the sprite)
 * @param {string} [props.cls] - Optional CSS class to apply to the icon
 * @param {string} [props.size] - Optional size for the icon (e.g., "1rem", "24px")
 * @param {string} [props.color] - Optional color for the icon
 * @returns {JSX.Element} SVG element that references the icon from the sprite
 */
const Icon = component$<IconProps>(({ name, cls, size, color }) => {
  const iconVisible = useSignal(false);
  const iconsContext = useContext(IconsLoadedContext, { loaded: false });
  
  const classes = [
    `icon icon-${name}`,
    "aspect-square",
    "transition-colors duration-200",
    cls,
  ]
    .filter(Boolean)
    .join(" ");

  useTask$(({ track }) => {
    const isLoaded = track(() => iconsContext.loaded);
    if (isLoaded) {
      iconVisible.value = true;
    }
  });

  useVisibleTask$(() => {
    if (!iconVisible.value) {
      iconVisible.value = true;
    }
  });

  return (
    <svg 
      class={classes} 
      style={{ 
        "--icon_size": size, 
        "--icon_color": color,
        "opacity": iconVisible.value ? "1" : "0",
        "transition": "opacity 0.2s ease-in-out"
      }}
    >
      <use xlink:href={`#icon-${name}`} />
    </svg>
  );
});

export default Icon;
