import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { IconSet, Navigation } from "~/components";
import Intro from "~/sections/intro/intro";
import { initializeHeaderFlag } from "~/utils";

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
  const headerRef = useSignal<Element>();

  useVisibleTask$(() => {
    initializeHeaderFlag(headerRef.value);
  });

  return (
    <>
      <header ref={headerRef} class="overflow-clip h-full">
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
              href: "#references",
              text: "References",
            },
            {
              href: "#services",
              text: "Services",
            },
            {
              href: "#contact",
              text: "Contact",
            },
          ]}
        />
        <Intro />
      </header>
      <main>
        <IconSet />
        <Slot />
      </main>
      <footer>Footer</footer>
    </>
  );
});
