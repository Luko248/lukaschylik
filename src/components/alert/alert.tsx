import {
  $,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { cls } from "~/utils";
import { Icon } from "../icon";
import type { AlertProps } from "./alert.types";

const Alert = component$<AlertProps>(
  ({ message, visible, onClose$, duration = 5, className }) => {
    const isVisible = useSignal(visible);

    const animationDuration = `${duration}s`;

    // Keep internal visibility in sync with prop changes
    useTask$(({ track }) => {
      track(() => visible);
      isVisible.value = visible;
    });

    // Auto-hide when becoming visible
    useVisibleTask$(({ track, cleanup }) => {
      track(() => isVisible.value);
      if (isVisible.value) {
        const timer = setTimeout(() => {
          isVisible.value = false;
          onClose$?.();
        }, duration * 1000);
        cleanup(() => clearTimeout(timer));
      }
    });

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
          "fixed overflow-hidden",
          "flex gap-8 items-center justify-between",
          "p-4 rounded-md",
          "backdrop-blur-md bg-green-500/70 text-white",
          "top-auto bottom-4 left-0.5 right-0.5",
          "lg:top-auto lg:bottom-8 lg:left-[50%] lg:-translate-x-[50%]",
          "z-[500]",
          className
        )}
      >
        <div
          class="alert-progress absolute top-0 left-0 h-1 bg-green-900 origin-left w-full"
          style={`--alert_duration: ${animationDuration}`}
        ></div>
        <div class="pr-6">{message}</div>
        <button
          onClick$={handleClose}
          class=" text-white scale-100 hover:scale-110 focus:outline-none cursor-pointer transition-transform duration-250 ease-in-out"
          aria-label="Close alert"
        >
          <Icon name="close" cls={"w-4"} />
        </button>
      </div>
    );
  }
);

export default Alert;
