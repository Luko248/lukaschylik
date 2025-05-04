// This declares JSX namespace for use with Qwik

import { JSXNode } from '@builder.io/qwik';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
