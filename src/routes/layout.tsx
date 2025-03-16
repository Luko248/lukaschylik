import {
  component$,
  Slot,
  useSignal,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Alert, IconSet, Navigation } from "~/components";
import { Footer, Intro } from "~/sections";
import { initializeHeaderFlag } from "~/utils";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const headerRef = useSignal<Element>();
  const location = useLocation();
  const showAlert = useSignal(
    location.url.searchParams.has("formSubmitted=true"),
  );

  // Handle alert close
  const handleAlertClose = $(() => {
    showAlert.value = false;
  });

  useVisibleTask$(() => {
    initializeHeaderFlag(headerRef.value);
  });

  return (
    <>
      <header ref={headerRef} class="overflow-y-hidden h-full">
        <Navigation
          links={[
            {
              href: "/#about-me",
              text: "O mne",
            },
            {
              href: "/#references",
              text: "Referencie",
            },
            {
              href: "/#services",
              text: "Služby",
            },
            {
              href: "#contact",
              text: "Kontakt",
            },
          ]}
        />
        <Intro />
      </header>
      <main class="overflow-y-hidden">
        <IconSet />
        <Alert
          message="Vaša správa bola úspešne odoslaná. Ďakujeme!"
          visible={showAlert.value}
          onClose$={handleAlertClose}
          duration={5}
        />
        <Slot />
      </main>
    </>
  );
});
