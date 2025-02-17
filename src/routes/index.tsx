import { component$ } from "@builder.io/qwik";
import { About, References, Services, Contact, Intro } from "~/sections";

export default component$(() => {
  return (
    <>
      {/* <About />
      <References /> */}
      <Services />
      {/* <Contact /> */}
    </>
  );
});
