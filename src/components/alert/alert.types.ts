import type { PropFunction } from "@builder.io/qwik";

export interface AlertProps {
  /**
   * The message to display in the alert
   */
  message: string;

  /**
   * Whether the alert is visible
   */
  visible: boolean;

  /**
   * Function to call when the alert is closed
   */
  onClose$?: PropFunction<() => void>;

  /**
   * The duration in seconds before the alert auto-hides
   * @default 5
   */
  duration?: number;

  /**
   * Additional CSS classes to apply to the alert
   */
  className?: string;
}
