/**
 * Props interface for the Card component
 * @interface CardProps
 * @property {string} title - The title text to display in the card
 * @property {string} description - The description text to display in the card
 * @property {string} [path] - Optional URL path for the card link
 * @property {string} [src] - Optional image source URL for the card
 */
export interface CardProps {
  title: string;
  description?: string;
  path?: string;
  src?: string;
  price?: boolean;
}
