import { PropFunction } from "@builder.io/qwik";

/**
 * Props for the FormField component.
 */
export interface FormFieldProps {
  /** The label for the form field */
  label?: string;
  /** The type of the input field */
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "textarea";
  /** The name attribute for the input field */
  name: string;
  /** The value of the input field */
  value: string;
  /** The onInput event handler */
  onInput$: PropFunction<(e: Event) => void>;
  /** Whether the input field is required */
  required?: boolean;
  /** Custom class name for the input field */
  className?: string;
  /** Whether the input field is disabled */
  disabled?: boolean;
  /** Whether the input field is read-only */
  readOnly?: boolean;
}
