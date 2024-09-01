import { Slot, component$ } from "@builder.io/qwik";
import { ButtonProps } from "./button.types";
import * as stylex from "@stylexjs/stylex";
import { STYLE, SIZES, VARIANTS } from "./styles/button.styles";

const Button = component$<ButtonProps>(({
    size = "md",
    variant = "primary",
    onClick$,
    disabled,
    ariaLabel,
    title,
    styles }) => {

    return <button
        onClick$={onClick$}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        title={title}
        {...stylex.props(
            STYLE.default,
            SIZES[size],
            VARIANTS[variant],
            styles)}>
        <Slot />
    </button>
});

export default Button;