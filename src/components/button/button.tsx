import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./button.types";

const Button = component$<ButtonProps>(({
    // size = "md",
    // variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    title,}) => {

    return <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        title={title}
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
        <Slot />
    </button>
});

export default Button;