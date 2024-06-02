import { Slot, component$ } from "@builder.io/qwik";
import { ButtonProps } from "./button.types";
import { gap, color, borderRradius } from "../../vars.stylex";
import * as stylex from "@stylexjs/stylex";

const BASE = stylex.create({
    default: {
        lineHeight: "1",
        cursor: "pointer",
    }
});

const SIZES = stylex.create({
    sm: {
        paddingInline: gap.m,
        paddingBlock: gap.s,
        fontSize: "12px",
    },
    md: {
        paddingInline: gap.xl,
        paddingBlock: gap.l,
        fontSize: "1rem",
        fontWeight: "bold",
        border: "none",
        textTransform: "uppercase",
    }
});

const VARIANTS = stylex.create({
    primary: {
        color: color.white,
        backgroundColor: {
            default: color.transparent,
            ":hover": color.transparent,
        },
        border: color.white + " solid " + gap.xs,
    },
    secondary: {
        color: color.black,
        backgroundColor: {
            default: "green",
            ":hover": "darkgreen",
        },
    }
});

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
            BASE.default,
            SIZES[size],
            VARIANTS[variant],
            styles)}>
        <Slot />
    </button>
});

export default Button;