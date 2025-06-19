import { createContextId, type QRL, type Signal } from "@builder.io/qwik";

/**
 * Context for managing the global reservation dialog
 */
export interface DialogContextValue {
  dialogRef: Signal<HTMLDialogElement | undefined>;
  showDialog: QRL<() => void>;
  hideDialog: QRL<() => void>;
}

export const DialogContext =
  createContextId<DialogContextValue>("dialog-context");
