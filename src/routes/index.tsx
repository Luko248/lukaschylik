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

export const head: DocumentHead = {
  title: "Lukáš Chylík | Creative web developer",
  meta: [
    {
      name: "description",
      content:
        "Frontend developer so špecializáciou na vizuálnu logiku, UI-UX dizajn, prístupnosť, výkon a SEO. Konzultácie, workshopy, dizajnové systémy.",
    },
    {
      name: "keywords",
      content:
        "web developer, frontend, backend, UI/UX design, portfolio, Lukáš Chylík",
    },
  ],
  links: [],
};
