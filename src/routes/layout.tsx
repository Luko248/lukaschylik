import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Navigation from "~/components/navigation/navigation";
import Intro from "~/sections/intro/intro";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <header>
        <Navigation
          links={[
            {
              href: "/",
              text: "Home",
            },
            {
              href: "#about-me",
              text: "About me",
            },
            {
              href: "#reference",
              text: "References",
            },
            {
              href: "/contact",
              text: "Contact",
            },
          ]}
        />
        <Intro />
      </header>
      <main>
        <Slot />
      </main>
      <footer>Footer</footer>
    </>
  );
});
