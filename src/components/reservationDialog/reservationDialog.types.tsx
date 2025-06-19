// This file contains global type declarations

// Extend HTMLDialogElement to include the closedby attribute
declare global {
  interface HTMLDialogElement {
    closedby?: string;
  }

  interface Window {
    // The Cal type is defined in @types/cal.com
    Cal: any;
  }
}

export {};
