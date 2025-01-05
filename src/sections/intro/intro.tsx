import { component$, Slot } from "@builder.io/qwik";
import Container from "../../components/container/container";
import Button from "../../components/button/button";

const Intro = component$(() => {
  return (
    <Container size="lg" className="relative z-10 isolate">
      <div class="intro grid gap-4 place-items-center content-center min-h-svh text-center">
        <h1 class="intro__title text-[clamp(3rem,16svb,12rem)] font-extrabold uppercase leading-none text-black tracking-widest">
          Lukáš
          <br />
          Chylík
        </h1>
        <div class="grid place-items-center content-center">
          <strong class="intro__subtitle block font-medium text-[clamp(1rem,3.8svb,3.5rem)]">
            Creative web developer
          </strong>
          <div class="inline-flex gap-32 place-items-center content-center">
            <Button
              href="#about-me"
              variant="primary"
              size="md"
              title="Let's talk"
              className="intro__btn">
              Let's talk
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default Intro;
