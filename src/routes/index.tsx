import { component$ } from "@builder.io/qwik";
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
