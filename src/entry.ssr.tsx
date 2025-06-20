/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  type RenderToStreamOptions,
  renderToStream,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
  // Create a new options object with all the properties
  const options: RenderToStreamOptions = {
    manifest,
    containerAttributes: {
      lang: "en-us",
      ...(opts.containerAttributes || {}),
    },
    serverData: {
      ...(opts.serverData || {}),
    },
    ...opts,
  };

  // Pass the single options object to renderToStream
  return renderToStream(<Root />, options);
}
