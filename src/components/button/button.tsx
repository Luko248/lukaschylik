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
    title,
    href,
    rel,
    target,
    type = "button",
  }) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-s",
      md: "px-6 py-4 text-m font-bold uppercase",
    };

    const commonProps = {
      class: cls(
        'btn relative overflow-clip leading-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none "text-transparent border border-white',
        sizeClasses[size],
        className,
      ),
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
