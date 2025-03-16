import { component$ } from "@builder.io/qwik";
import { Button, Container } from "~/components";
import { cls } from "~/utils";

const Intro = component$(() => {
  return (
    <Container size="lg" className="relative z-10 isolate">
      <div
        class={cls(
          "intro",
          "grid gap-4 place-items-center content-center",
          "min-h-svh text-center",
        )}>
        <h1
          class={cls(
            "intro__title",
            "opacity-0 scale-75",
            "text-7xl sm:text-8xl lg:text-[clamp(3rem,16svb,12rem)]",
            "text-black ",
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
              "text-black bg-secondary",
              "font-medium",
            )}>
            Creative web developer
          </strong>
          <div class="inline-flex gap-32 place-items-center content-center">
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
  );
});

export default Intro;
