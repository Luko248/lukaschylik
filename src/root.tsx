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
        <meta name="description" content="Explore my portfolio showcasing dynamic web applications and innovative solutions. Skilled in front-end, back-end, and UI/UX design. Contact me for collaborations." />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=3, viewport-fit=cover"
          name="viewport"
        />
        <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta  name="format-detection" content="telephone=no"/>
        <meta  name="keywords" content="" />
        <meta name="author" content="Lukáš Chylík"  />

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
