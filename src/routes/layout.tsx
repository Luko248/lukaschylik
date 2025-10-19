import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Alert, Navigation, ReservationDialog } from "~/components";
import Social from "~/components/social/social";
import { Footer, Header } from "~/sections";
import { checkUrlForAlerts } from "~/services";
import { AlertContext, type AlertMessage, DialogContext } from "~/utils";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

/**
 * Default head metadata for all routes
 * This includes the Google Tag Manager script and structured data
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
    {
      key: "structuredData",
      script: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "#person",
      "name": "Lukáš Chylík",
      "jobTitle": "Frontend developer",
      "email": "chylik.lukas@gmail.com",
      "telephone": "+421721459889",
      "image": "./images/profile/me.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hybešova 308/61",
        "addressLocality": "Brno",
        "postalCode": "602 00",
        "addressCountry": "Česká republika"
      },
      "sameAs": [
        "mailto:chylik.lukas@gmail.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "#website",
      "url": "https://lukaschylik.dev/",
      "name": "Lukáš Chylík | Frontend, UX/UI, AI workshopy",
      "description": "Frontend developer s presahom do UX/UI. Design Systémy a AI vo vývoji: workshopy a školenia — spec‑driven dev, custom agenti, AI workflow.",
      "publisher": {
        "@id": "#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "#webpage",
      "url": "https://lukaschylik.dev/",
      "name": "Lukáš Chylík | Frontend, UX/UI, AI workshopy",
      "description": "Frontend developer s presahom do UX/UI. Design Systémy a AI vo vývoji: workshopy a školenia — spec‑driven dev, custom agenti, AI workflow.",
      "about": {
        "@id": "#person"
      },
      "mainEntity": {
        "@id": "#person"
      },
      "isPartOf": {
        "@id": "#website"
      },
      "inLanguage": "sk"
    }
  ]
}`,
      props: {
        type: "application/ld+json",
      },
    },
  ],
};

export default component$(() => {
  const location = useLocation();

  // Create alert store
  const alertState = useStore<AlertMessage>({
    text: "",
    visible: false,
  });

  // Create dialog ref for global reservation dialog
  const dialogRef = useSignal<HTMLDialogElement>();

  // Provide alert context
  useContextProvider(AlertContext, {
    alertMessage: alertState,
    showAlert: $((message: string) => {
      alertState.text = message;
      alertState.visible = true;
    }),
    hideAlert: $(() => {
      alertState.visible = false;
    }),
  });

  // Provide dialog context
  useContextProvider(DialogContext, {
    dialogRef,
    showDialog: $(() => {
      dialogRef.value?.showModal();
    }),
    hideDialog: $(() => {
      dialogRef.value?.close();
    }),
  });

  // Check for URL parameters on initial load
  useVisibleTask$(({ cleanup }) => {
    // Use the alert service to check for URL parameters and show appropriate alerts
    const showAlertFn = $((message: string) => {
      alertState.text = message;
      alertState.visible = true;
    });

    checkUrlForAlerts(location.url, showAlertFn);

    // No cleanup needed
    cleanup(() => {});
  });

  // Check if we're on the homepage
  const isHomePage = location.url.pathname === "/";

  // Check if we're on a blog post page
  const isBlogPostPage = location.url.pathname.startsWith("/blog/articles/");

  // Handle alert close
  const handleAlertClose = $(() => {
    alertState.visible = false;
  });

  return (
    <>
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
            href: "/#contact",
            text: "Kontakt",
          },
          {
            href: "/blog",
            text: "Blog",
          },
        ]}
      />
      {isHomePage && <Header />}
      <main>
        <Alert
          message={alertState.text}
          visible={alertState.visible}
          onClose$={handleAlertClose}
          duration={5}
        />
        <Slot />
        {!isBlogPostPage && <Social />}
      </main>
      <Footer />
      <ReservationDialog dialogRef={dialogRef} />
    </>
  );
});
