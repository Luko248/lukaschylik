import {
  component$,
  Slot,
  useSignal,
  useVisibleTask$,
  $,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { RequestHandler, DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Alert, Navigation } from "~/components";
import Social from "~/components/social/social";
import { Footer, Header } from "~/sections";
import { checkUrlForAlerts } from "~/services";
import { initializeHeaderFlag } from "~/utils";
import { AlertContext, type AlertMessage } from "~/utils/alerts";

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
      "jobTitle": "Creative web developer",
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
      "url": "https://lukaschylik.sk/",
      "name": "Lukáš Chylík | Creative web developer",
      "description": "Frontend developer so špecializáciou na vizuálnu logiku, UI-UX dizajn, prístupnosť, výkon a SEO. Konzultácie, workshopy, dizajnové systémy.",
      "publisher": {
        "@id": "#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "#webpage",
      "url": "https://lukaschylik.sk/",
      "name": "Lukáš Chylík | Creative web developer",
      "description": "Frontend developer so špecializáciou na vizuálnu logiku, UI-UX dizajn, prístupnosť, výkon a SEO. Konzultácie, workshopy, dizajnové systémy.",
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
            href: "/blog",
            text: "Blog",
          },
          {
            href: "/#contact",
            text: "Kontakt",
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
        <Social />
      </main>
      <Footer />
    </>
  );
});
