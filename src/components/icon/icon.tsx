import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { IconProps } from "./icon.types";

/**
 * Icon component that renders SVG icons from a sprite.
 * This component displays SVG icons by referencing definitions from an IconSet component,
 * which should be rendered in a higher-level layout (e.g., root layout).
 * The icon initially renders with opacity 0 and becomes visible (opacity 1)
 * when the component enters the viewport, managed by `useVisibleTask$`.
 * This approach assumes the SVG definitions from IconSet are available in the DOM by that time.
 *
 * @component
 * @param {IconProps} props - Component properties passed to the Qwik component.
 * @param {string} props.name - The name of the icon to display (must match an id in the sprite).
 * @param {string} [props.cls] - Optional CSS class to apply to the icon.
 * @param {string} [props.size] - Optional size for the icon (e.g., "1rem", "24px").
 * @param {string} [props.color] - Optional color for the icon.
 * @returns {JSX.Element} An SVG element that references the icon from the sprite.
 */
const Icon = component$<IconProps>(({ name, cls, size, color }) => {
  const iconVisible = useSignal(false); // Manages the opacity state

  const classes = [
    `icon icon-${name}`,
    "aspect-square",
    "transition-colors duration-200",
    cls,
  ]
    .filter(Boolean)
    .join(" ");

  // When the icon component becomes visible in the viewport,
  // set its opacity to 1 to make it appear.
  useVisibleTask$(() => {
    iconVisible.value = true;
  });

  return (
    <svg
      class={classes}
      style={{
        "--icon_size": size,
        "--icon_color": color,
        opacity: iconVisible.value ? "1" : "0", // Controlled by iconVisible signal
        transition: "opacity 0.2s ease-in-out",
      }}>
      <use xlink:href={`#icon-${name}`} />
    </svg>
  );
});

export default Icon;
