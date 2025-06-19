// This file contains global type declarations

// Extend HTMLDialogElement to include the closedby attribute
declare global {
  interface HTMLDialogElement {
    closedby?: string;
  }

  interface Window {
    Cal: any;
  }
}

export {};
