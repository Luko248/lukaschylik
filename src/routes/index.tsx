import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import '../styles/index.scss';


export default component$(() => {
  return (
    <>
      <h1>Lukáš Chylík</h1>
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
