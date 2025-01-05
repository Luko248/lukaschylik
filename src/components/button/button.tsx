import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";
import { classNames } from "~/utils/classNames";

const Button = component$<ButtonProps>(({
    size = "md",
    variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    className,
    title,}) => {

    const sizeClasses = {
        sm: "px-16 py-8 text-s",
        md: "px-24 py-16 text-m font-bold uppercase",
    };

    const variantClasses = {
        primary: "text-transparent border border-white",
        secondary: "text-black bg-green-500 hover:bg-green-700",
    };

    return <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        title={title}
        class={classNames(
            'btn relative overflow-clip line-height-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
            sizeClasses[size],
            variantClasses[variant],
            className
        )}>
        <Slot />
    </button>
});

export default Button;