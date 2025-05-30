import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";
import { cls } from "~/utils";

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
  }) => {
    // Define base styles that apply to all button sizes
    const baseClasses =
      "btn relative overflow-clip leading-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-transparent border border-white";

    // Define conditional size classes based on whether it's an icon-only button
    const sizeClasses = iconOnly
      ? {
          sm: "p-3 text-xs",
          md: "p-3 text-sm",
        }
      : {
          sm: "px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm min-w-[150px]",
          md: "px-5 py-3 text-sm sm:px-6 sm:py-4 sm:text-base font-bold uppercase min-w-[180px]",
        };

    const commonProps = {
      class: cls(baseClasses, sizeClasses[size], className),
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
      </a>
    ) : (
      <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        {...commonProps}>
        <Slot />
      </button>
    );
  },
);

export default Button;
