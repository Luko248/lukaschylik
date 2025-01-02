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
        title={title}>
        <Slot />
    </button>
});

export default Button;