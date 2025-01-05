import type { PropFunction } from "@builder.io/qwik";

export interface ButtonProps {
    onClick$?: PropFunction<() => void>;
    variant: "primary" | "secondary";
    size?: "sm" | "md";
    disabled?: boolean;
    icon?: string;
    title?: string;
    ariaLabel?: string;
    className?: string;
}