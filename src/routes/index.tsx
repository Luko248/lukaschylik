import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { About, Contact, References, Services } from "~/sections";

export default component$(() => {
  return (
    <>
      <About />
      <References />
      <Services />
      <Contact />
    </>
  );
});
