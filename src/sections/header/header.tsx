import { component$ } from "@builder.io/qwik";
import { Button, Container } from "~/components";
import { cls } from "~/utils";

const Header = component$(() => {
  return (
    <header
      class={cls(
        "grid place-items-center content-center",
        "bg-white dark:bg-black",
      )}>
      <Container size="lg" className="relative z-10 isolate">
        <div
          class={cls("intro", "grid gap-4 place-items-center content-center")}>
          <h1
            class={cls(
              "intro__title",
              "opacity-0 scale-75",
              "text-7xl sm:text-8xl lg:text-[clamp(3rem,16svb,12rem)]",
              "text-white dark:text-black text-center",
              "font-extrabold uppercase leading-none tracking-widest",
            )}>
            Lukáš
            <br />
            Chylík
          </h1>
          <div class={cls("grid place-items-center content-center")}>
            <strong
              class={cls(
                "intro__subtitle",
                "block",
                "px-[.25em]",
                "text-xl sm:text-2xl lg:text-[clamp(1rem,3.8svb,3.5rem)]",
                "text-black bg-secondary rounded-lg",
                "font-medium",
              )}>
              Creative web developer
            </strong>
            <div class="inline-flex gap-32 place-items-center content-center mt-16">
              <Button
                href="#about-me"
                variant="primary"
                size="md"
                title="Kto som?"
                className="intro__btn">
                Kto som?
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
});

export default Header;
