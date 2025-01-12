import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Navigation from "~/components/navigation/navigation";
import Intro from "~/sections/intro/intro";

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
  return (
    <>
      <header>
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
              href: "#contact",
              text: "Contact",
            },
          ]}
        />
        <Intro />
      </header>
      <main>
        <svg
          aria-hidden="true"
          style="position: absolute; width: 0; height: 0; overflow: hidden;"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <symbol id="icon-sent" viewBox="0 0 32 32">
              <path d="M31.588 16l-31.177 16 2.324-14.339 11.801-1.661-11.867-2.072-2.258-13.928 15.588 8z"></path>
            </symbol>
            <symbol id="icon-chewron-down" viewBox="0 0 32 32">
              <path d="M30.337 7.192l-14.337 14.29-14.337-14.29-1.663 1.669 16 15.948 16-15.948z"></path>
            </symbol>
            <symbol id="icon-github" viewBox="0 0 32 32">
              <path d="M11.179 29.684c0.968 0 1.242-0.379 1.242-0.863s0-1.537-0.021-3.032c-5.032 1.074-6.105-2.4-6.105-2.4-0.821-2.042-2.021-2.611-2.021-2.611-1.642-1.095 0.126-1.074 0.126-1.074 1.811 0.126 2.779 1.832 2.779 1.832 1.621 2.737 4.232 1.937 5.263 1.474 0.084-0.905 0.484-1.768 1.158-2.4-4.021-0.442-8.253-1.979-8.253-8.8-0.021-1.768 0.653-3.495 1.874-4.779-0.211-0.442-0.821-2.253 0.147-4.716 0 0 1.516-0.484 4.989 1.832 2.968-0.8 6.084-0.8 9.053 0 3.432-2.295 4.968-1.832 4.968-1.832 0.968 2.442 0.358 4.253 0.189 4.716 1.221 1.284 1.874 3.011 1.853 4.779 0 6.842-4.232 8.337-8.274 8.779 0.632 0.526 1.221 1.621 1.221 3.284 0 2.4-0.021 4.295-0.021 4.863 0 0.463 0.211 0.842 1.242 0.842z"></path>
            </symbol>
            <symbol id="icon-codepen" viewBox="0 0 32 32">
              <path d="M32 10.131c-0.059-0.352-0.107-0.627-0.48-0.855-15.265-9.055-15.049-9.729-16.040-9.131-11.569 7.192-14.789 8.796-15.252 9.356-0.42 0.431-0.228 1.091-0.228 11.064-0.028 1.135 10.324 7.283 15.359 11.205 0.444 0.316 1.003 0.265 1.337-0.039 14.965-10.608 15.329-10.181 15.304-11.167 0 0-0.016-10.569 0-10.435zM30 18.785l-5.168-3.145 5.168-3.596zM22.964 14.503l-5.964-3.629v-8.093l12.168 7.407zM16 19.347l-5.168-3.596 5.168-3.145 5.168 3.145zM15 2.779v8.099c-2.319 1.439-4.279 2.64-5.935 3.645l-6.233-4.336zM7.191 15.656c-2.499 1.503-4.131 2.457-5.191 3.093v-6.705zM8.964 16.888l6.036 4.199v7.999l-12.168-8.465zM17 29.087v-7.999l6.036-4.199 6.132 3.732z"></path>
            </symbol>
            <symbol id="icon-twitter" viewBox="0 0 32 32">
              <path d="M18.979 13.55l11.657-13.55h-2.762l-10.121 11.765-8.084-11.765h-9.324l12.225 17.791-12.225 14.209h2.762l10.688-12.424 8.537 12.424h9.324l-12.678-18.45zM15.195 17.948l-11.094-15.868h4.243l19.53 27.936h-4.243l-8.436-12.067z"></path>
            </symbol>
            <symbol id="icon-facebook" viewBox="0 0 32 32">
              <path d="M18.478 32v-14.596h4.897l0.735-5.69h-5.632v-3.632c0-1.647 0.455-2.769 2.82-2.769l3.010-0.001v-5.089c-0.521-0.068-2.308-0.223-4.388-0.223-4.343 0-7.317 2.651-7.317 7.519v4.196h-4.912v5.69h4.912v14.596h5.874z"></path>
            </symbol>
            <symbol id="icon-linkedin" viewBox="0 0 32 32">
              <path d="M28.8 28.8v-9.376c0-4.608-0.992-8.128-6.368-8.128-2.592 0-4.32 1.408-5.024 2.752h-0.064v-2.336h-5.088v17.088h5.312v-8.48c0-2.24 0.416-4.384 3.168-4.384 2.72 0 2.752 2.528 2.752 4.512v8.32h5.312z"></path>
              <path d="M3.616 11.712h5.312v17.088h-5.312z"></path>
              <path d="M6.272 3.2c-1.696 0-3.072 1.376-3.072 3.072s1.376 3.104 3.072 3.104 3.072-1.408 3.072-3.104-1.376-3.072-3.072-3.072z"></path>
            </symbol>
          </defs>
        </svg>

        <Slot />
      </main>
      <footer>Footer</footer>
    </>
  );
});
