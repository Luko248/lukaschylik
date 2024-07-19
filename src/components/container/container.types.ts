import { StyleXStylesWithout } from "@stylexjs/stylex";

export interface ContainerProps {
  size?: "sm" | "md" | "lg";
  styles?: StyleXStylesWithout<{ backgroundColor?: unknown }>
}
