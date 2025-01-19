import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Section from "~/components/section/section";

const References = component$(() => {
  return (
    <Section id="services">
      <Container size="full">
        <h2 class="text-[clamp(3rem,14svb,10rem)] mb-80 font-extrabold uppercase leading-none text-black tracking-widest relative color-transparent content-fade-in">
          Services
        </h2>
        <div class="content-fade-in">
          <p class="text-xl leading-relaxed font-light mb-64 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
            blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
            Quis, facere?
          </p>
        </div>
      </Container>
    </Section>
  );
});

export default References;
