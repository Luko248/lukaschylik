import { PropFunction } from "@builder.io/qwik";
import { StyleXStylesWithout } from "@stylexjs/stylex";

export interface ButtonProps {
    onClick$?: PropFunction<() => void>;
    variant: "primary" | "secondary";
    size?: "sm" | "md";
    disabled?: boolean;
    icon?: string;
    title?: string;
    ariaLabel?: string;
    styles?: StyleXStylesWithout<{ backgroundColor?: unknown }>
}