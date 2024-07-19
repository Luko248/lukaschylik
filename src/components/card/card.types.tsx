import { StyleXStyles } from "@stylexjs/stylex";

export interface CardProps {
  src: string;
  title: string;
  description?: string;
  webURL?: string;
  styles?: StyleXStyles;
}
