import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";

const Button = component$<ButtonProps>(({
    size = "md",
    variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    title,}) => {

    const sizeClasses = {
        sm: "px-16 py-8 text-s",
        md: "px-24 py-16 text-m font-bold uppercase",
    };

    const variantClasses = {
        primary: "text-white bg-transparent hover:bg-transparent border border-white",
        secondary: "text-black bg-green-500 hover:bg-green-700",
    };

    return <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        title={title}
        class={`line-height-1 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} disabled:bg-gray-400`}>
        <Slot />
    </button>
});

export default Button;