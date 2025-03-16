import {
  component$,
  Slot,
  useSignal,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { RequestHandler, DocumentHead } from "@builder.io/qwik-city";
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

/**
 * Default head metadata for all routes
 * This includes the Google Tag Manager script
 */
export const head: DocumentHead = {
  scripts: [
    {
      key: "gtm",
      script: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQFH8PWL');`,
      props: {
        async: true,
      },
    },
  ],
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
