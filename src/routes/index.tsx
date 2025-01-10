import { component$ } from "@builder.io/qwik";
import About from "~/sections/about/about";
import Contact from "~/sections/contact/contact";
import References from "~/sections/references/references";

export default component$(() => {
  return (
    <>
      <About />
      <References />
      <Contact />
    </>
  );
});
