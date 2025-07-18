import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cls } from "~/utils";
import { Icon } from "../icon";
import type { AlertProps } from "./alert.types";

const Alert = component$<AlertProps>(
  ({ message, visible, onClose$, duration = 5, className }) => {
    const isVisible = useSignal(visible);

    const animationDuration = `${duration}s`;

    useVisibleTask$(({ cleanup }) => {
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
          "fixed",
          "flex gap-8 items-center justify-between",
          "p-4",
          "backdrop-blur-md bg-green-500/70 text-white",
          "sm:inset-auto sm:bottom-0.5 sm:left-0.5 sm:right-0.5",
          "lg:inset-auto lg:bottom-4 lg:left-[50%] -translate-x-[50%]",
          "z-50",
          className,
        )}>
        <div
          class="alert-progress absolute top-0 left-0 h-1 bg-green-900 origin-left w-full"
          style={`--alert_duration: ${animationDuration}`}></div>
        <div class="pr-6">{message}</div>
        <button
          onClick$={handleClose}
          class=" text-white scale-100 hover:scale-110 focus:outline-none cursor-pointer transition-transform duration-250 ease-in-out"
          aria-label="Close alert">
          <Icon name="close" cls={"w-4"} />
        </button>
      </div>
    );
  },
);

export default Alert;
