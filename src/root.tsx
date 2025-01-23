import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik/build";

import "./styles/css/tailwind.css";
import "./styles/css/index.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <title>Lukáš Chylík | Creative web developer</title>
        <meta
          name="description"
          content="Explore my portfolio showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact me for collaborations."
        />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=3, viewport-fit=cover"
          name="viewport"
        />
        <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="keywords" content="" />
        <meta name="author" content="Lukáš Chylík" />

        <meta itemProp="name" content="Lukáš Chylík | Creative web developer" />
        <meta
          itemProp="description"
          content="Explore the portfolio of Lukáš Chylík, showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact for collaborations."
        />
        <meta itemProp="image" content="./images/profile/me.webp" />

        <meta itemProp="name" content="Lukáš Chylík | Creative web developer" />
        <meta
          itemProp="description"
          content="Explore the portfolio of Lukáš Chylík, showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact for collaborations."
        />
        <meta itemProp="image" content="./images/profile/me.webp" />

        <meta
          property="og:title"
          content="Lukáš Chylík | Creative web developer"
        />
        <meta
          property="og:description"
          content="Explore the portfolio of Lukáš Chylík, showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact for collaborations."
        />
        <meta property="og:url" content="https://lukaschylik.sk/" />
        <meta property="og:image" content="./images/profile/me.webp" />

        <meta
          name="twitter:title"
          content="Lukáš Chylík | Creative web developer"
        />
        <meta
          name="twitter:description"
          content="Explore the portfolio of Lukáš Chylík, showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact for collaborations."
        />

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en" class="bg-black-900">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
