import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";
import { classNames } from "~/utils/classNames";

const Button = component$<ButtonProps>(
  ({
    size = "md",
    variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    className,
    title,
    href,
    rel,
    target,
  }) => {
    const sizeClasses = {
      sm: "px-16 py-8 text-s",
      md: "px-24 py-16 text-m font-bold uppercase",
    };

    const commonProps = {
      class: classNames(
        'btn relative overflow-clip line-height-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none "text-transparent border border-white',
        sizeClasses[size],
        className,
      ),
      "aria-label": ariaLabel,
      title,
      "data-variant": variant,
    };

    return href ? (
      <a href={href} rel={rel} target={target} {...commonProps}>
        <Slot />
      </a>
    ) : (
      <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        {...commonProps}>
        <Slot />
      </button>
    );
  },
);

export default Button;
