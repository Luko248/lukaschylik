import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";
import { cls } from "~/utils";
import { Icon } from "../icon";

/**
 * Button component with multiple variants and sizes
 * Supports both button and anchor elements
 */
const Button = component$<ButtonProps>(
  ({
    size = "md",
    variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    className,
    iconOnly,
    title,
    href,
    rel,
    target,
    type = "button",
    icon,
  }) => {
    // Determine size and variant classes based on props
    const getSizeAndVariantClasses = () => {
      if (iconOnly) {
        return size === "sm" ? "p-3 text-xs" : "p-3 text-sm";
      } else {
        return size === "sm"
          ? "px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm"
          : "px-5 py-3 text-sm sm:px-6 sm:py-4 sm:text-base font-bold uppercase min-w-[180px]";
      }
    };

    const baseClasses = cls(
      "btn",
      "inline-flex items-center justify-center gap-8",
      "relative overflow-clip leading-none",
      "cursor-pointer rounded-lg border",
      "disabled:opacity-50 disabled:pointer-events-none",
      "text-transparent",
      getSizeAndVariantClasses(),
      className,
    );

    const commonProps = {
      class: baseClasses,
      "aria-label": ariaLabel,
      title,
      "data-variant": variant,
    };

    return href ? (
      <a
        href={href}
        aria-disabled={disabled}
        rel={rel}
        target={target}
        {...commonProps}>
        <Slot />
        {icon && <Icon name={icon} size="1rem" />}
      </a>
    ) : (
      <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        {...commonProps}>
        <Slot />
        {icon && <Icon name={icon} size="1rem" />}
      </button>
    );
  },
);

export default Button;
