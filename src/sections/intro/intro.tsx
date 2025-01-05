import { component$ } from "@builder.io/qwik";
import Container from "../../components/container/container";
import Button from "../../components/button/button";

const Intro = component$(() => {
  return (
    <header class="bg-black-900 text-white relative h-svh overflow-clip">
      <Container size="lg" className="relative z-10 isolate">
        <div class="intro grid place-items-center content-center min-h-svh text-center">
        <h1 class="intro__title text-[clamp(3rem,12svb,12rem)] font-extrabold uppercase leading-none text-black tracking-widest">
              Lukáš
              <br />
              Chylík
            </h1>
            <div class="grid place-items-center content-center">
              <strong class="intro__subtitle block mb-4 tracking-widest font-medium text-[clamp(1.5rem,3.5svb,2.5rem)]">
                Creative web developer
              </strong>
              <Button
                onClick$={() => {
                  alert("Clicked");
                }}
                variant="primary"
                size="md"
                title="Let's talk"
                className="intro__btn">
                Let's talk
              </Button>
            </div>
        </div>
      </Container>
    </header>
  );
});

export default Intro;
