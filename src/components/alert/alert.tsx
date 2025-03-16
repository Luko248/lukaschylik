import {
  component$,
  useSignal,
  useVisibleTask$,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import type { AlertProps } from "./alert.types";
import { cls } from "~/utils";

const Alert = component$<AlertProps>(
  ({ message, visible, onClose$, duration = 5, className }) => {
    const isVisible = useSignal(visible);

    // CSS custom property for animation duration
    const animationDuration = `${duration}s`;

    // Apply scoped styles
    useStylesScoped$(`
    .alert-progress {
      --alert-duration: ${animationDuration};
    }
  `);

    // Auto-hide the alert after the specified duration
    useVisibleTask$(({ cleanup }) => {
      if (isVisible.value) {
        const timer = setTimeout(() => {
          isVisible.value = false;
          onClose$?.();
        }, duration * 1000);

        cleanup(() => clearTimeout(timer));
      }
    });

    // Handle close button click
    const handleClose = $(() => {
      isVisible.value = false;
      onClose$?.();
    });

    if (!isVisible.value) {
      return null;
    }

    return (
      <div
        class={cls(
          "alert fixed backdrop-blur-md bg-green-500/70 text-white p-4 rounded-lg shadow-lg z-50",
          "sm:inset-auto sm:bottom-0.5 sm:left-0.5 sm:right-0.5",
          "lg:inset-auto lg:bottom-4 lg:right-4 lg:left-auto",
          className,
        )}>
        {/* Progress bar */}
        <div
          class="alert-progress absolute top-0 left-0 h-1 bg-white origin-left"
          style={{
            width: "100%",
            transform: "scaleX(1)",
            animation: `alert-progress-shrink var(--alert-duration) linear forwards`,
          }}></div>

        {/* Close button */}
        <button
          onClick$={handleClose}
          class="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Message */}
        <div class="pr-6">{message}</div>
      </div>
    );
  },
);

export default Alert;
