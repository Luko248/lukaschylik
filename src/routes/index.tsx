import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { attrs, create } from "@stylexjs/stylex";

import { color, gap } from "../vars.stylex";
export default component$(() => {
  return (
    <>
      <h1 {...attrs(styles.heading)}>Lukáš Chylík</h1>
      <p>
       Portfolio
      </p>
      <button class="bg-green-500">
        Click me
      </button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

const styles = create({
  heading: {
    color: color.primary,
    fontSize: gap.xl,
  },
});