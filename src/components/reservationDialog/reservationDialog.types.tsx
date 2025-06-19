import type { Signal } from "@builder.io/qwik";

// Extend HTMLDialogElement to include the closedby attribute
declare global {
  interface HTMLDialogElement {
    closedby?: string;
  }

  interface Window {
    Cal: any;
  }
}

/**
 * Props for ReservationDialog component
 */
export interface ReservationDialogProps {
  /** Ref to the dialog element for external control */
  dialogRef?: Signal<HTMLDialogElement | undefined>;
}

export {};
