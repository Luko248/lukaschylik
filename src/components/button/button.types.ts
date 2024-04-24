import { Slot } from "@builder.io/qwik";
import { StyleXStylesWithout } from "@stylexjs/stylex";

export interface ButtonProps {
    onClick: () => void;
    variant: "primary" | "secondary";
    size?: "sm" | "md";
    disabled?: boolean;
    icon?: string;
    title?: string;
    ariaLabel?: string;
    styles?: StyleXStylesWithout<{ backgroundColor?: unknown }>
}