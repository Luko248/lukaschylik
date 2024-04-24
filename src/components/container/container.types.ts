import { StyleXStyles, StyleXStylesWithout } from "@stylexjs/stylex";
import { gap, media } from "../../vars.stylex";

export interface ContainerProps {
  size?: "sm" | "md" | "lg";
  styles?: StyleXStylesWithout<{ backgroundColor?: unknown }>
}
