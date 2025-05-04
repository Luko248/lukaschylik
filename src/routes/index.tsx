import { component$ } from "@builder.io/qwik";
import { About, References, Services, Contact, Newsletter } from "~/sections";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <About />
      <References />
      <Services />
      <Newsletter />
      <Contact />
    </>
  );
});

export const head: DocumentHead = {
  title: "Lukáš Chylík | Creative web developer",
  meta: [
    {
      name: "description",
      content:
        "Explore my portfolio showcasing dynamic web applications and innovative solutions. Skilled in frontend, back-end, and UI/UX design. Contact me for collaborations.",
    },
    {
      name: "keywords",
      content:
        "web developer, frontend, backend, UI/UX design, portfolio, Lukáš Chylík",
    },
  ],
  links: [],
};
