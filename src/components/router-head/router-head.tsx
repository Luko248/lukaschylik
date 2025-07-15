import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * RouterHead component for managing document head metadata
 * Handles default values and dynamic meta tags for SEO optimization
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const defaultTitle = "Lukáš Chylík | Creative web developer";
  const defaultDescription =
    "Frontend developer so špecializáciou na vizuálnu logiku, UI-UX dizajn, prístupnosť, výkon a SEO. Konzultácie, workshopy, dizajnové systémy.";

  // Custom override mechanism - handle title and description from routes
  const title = head.title || defaultTitle;

  // For description: look in meta array, then use default
  const descriptionFromMeta = head.meta.find(
    (m) => m.name === "description",
  )?.content;
  const description = descriptionFromMeta || defaultDescription;

  // Default meta images (not overridable)
  const defaultOpenGraphImage = "/images/meta/meta-large.webp";
  const defaultTwitterImage = "/images/meta/meta-small.webp";

  return (
    <>
      <title>{title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=3, viewport-fit=cover"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/favicon/favicon.svg"
      />
      <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicon/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Lukáš Chylík" />
      <link rel="manifest" href="/manifest.json" />

      <meta name="description" content={description} />
      <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="Content-Language" content="sk" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000"></meta>
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
      <meta itemProp="image" content={defaultOpenGraphImage} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:image" content={defaultOpenGraphImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultTwitterImage} />

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
