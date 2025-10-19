import { component$ } from "@builder.io/qwik";
import { Container } from "~/components";
import { cls } from "~/utils";
import Logo from "~/images/logos/logo-footer.svg?jsx";

const Footer = component$(() => {
  return (
    <footer class="relative bg-black text-white">
      <div class="h-px w-full bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent" />

      <Container size="md" className="relative z-10 isolate py-8 md:py-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 md:gap-x-10 md:gap-y-2 items-start">
          <div class="text-sm">
            <a
              href="/"
              class={cls(
                "relative",
                "w-[120px] h-[60px]",
                "flex items-center",
                "no-underline",
                "transition-opacity duration-200",
                "opacity-100 hover:opacity-80"
              )}
            >
              <Logo
                class="w-full h-full max-w-full"
                role="img"
                aria-label="Lukáš Chylík Logo"
                width="120"
                height="60"
              />
            </a>
            <p class="mt-2 mb-4 md:mb-0 max-w-[60ch] text-neutral-300">
              Frontend developer s presahom do UX/UI. Design Systémy a AI vo
              vývoji.
            </p>
          </div>

          <div class="md:justify-self-end text-sm">
            <address class="not-italic leading-relaxed text-neutral-300">
              Lukáš Chylík
              <br />
              Hybešova 308/61, 602 00 Brno
              <br />
              Česká republika
              <br />
              <span class="block mt-2">
                <strong>IČO:</strong> 05483247
              </span>
              <span class="block">
                <strong>Email:</strong>{" "}
                <a class="hover:underline" href="mailto:chylik.lukas@gmail.com">
                  chylik.lukas@gmail.com
                </a>
              </span>
            </address>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center text-center gap-2 text-xs text-neutral-400">
          <small class="font-mono">
            ©{new Date().getFullYear()} Všetky práva vyhradené.
          </small>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
