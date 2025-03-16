import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const title = head.title || "Lukáš Chylík | Creative web developer";
  const description =
    "Explore my portfolio showcasing dynamic web applications and innovative solutions. Skilled in frontend, back-end, and UI/UX design. Contact me for collaborations.";
  const imageUrl = "./images/profile/me.webp";

  return (
    <>
      <title>{title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=3, viewport-fit=cover"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* Basic meta tags */}
      <meta name="description" content={description} />
      <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="Content-Language" content="sk" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="web developer, frontend developer, creative developer, UI/UX design, web applications, Lukáš Chylík, Brno developer, web development, javascript, typescript, react"
      />
      <meta name="author" content="Lukáš Chylík" />
      <meta name="publisher" content="Lukáš Chylík" />

      {/* Schema.org markup */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={imageUrl} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Dynamic meta tags from routes */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {/* Dynamic links from routes */}
      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {/* Dynamic styles from routes */}
      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {/* Dynamic scripts from routes */}
      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
