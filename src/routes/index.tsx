import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import Intro from "~/sections/intro/intro";

export default component$(() => {
  return (
    <>
      <Intro />
      <section id="skills" class="min-h-screen relative text-black border-b border-black py-section-block bg-black">
        <Container>
          <h2 class="absolute inset-x-1/2 top-1/2 text-[clamp(4.5rem,35svb,16rem)] uppercase font-extrabold tracking-widest text-[hsl(0_0%_100%_/_0)] opacity-0 translate-x-half translate-y-[calc(-50svb+100%)] animate-moveToTop">Skills</h2>
        </Container>
      </section>
      <section id="reference" class="min-h-screen relative text-black border-b border-black py-section-block bg-black">
        <Container size="lg">
          <h2 class="absolute inset-x-1/2 top-1/2 text-[clamp(4.5rem,35svb,16rem)] uppercase font-extrabold tracking-widest text-[hsl(0_0%_100%_/_0)] opacity-0 translate-x-half translate-y-[calc(-50svb+100%)] animate-moveToTop">Reference</h2>
          <div class="grid grid-cols-[5fr_8fr] gap-section-inline bg-black isolate">
            <div></div>
            <ul class="bg-black list-none p-0 m-0">
              <Reference
                src="/images/logos/references/logo-riganti.svg"
                title="updateconference.net"
                webURL="https://www.updateconference.net/en/"
                year={2018}
              />
              <Reference
                src="/images/logos/references/logo-riganti.svg"
                title="thelucie.ink"
                webURL="https://thelucie.ink/"
                year={2022}
              />
              <Reference
                src="/images/logos/references/logo-riganti.svg"
                title="Riganti"
                webURL="https://www.riganti.cz/"
                year={2021}
              />
              <Reference
                src="/images/logos/references/logo-riganti.svg"
                title="Brand Design"
                webURL="https://brand-design.cz/"
                year={2017}
              />
              <Reference
                src="/images/logos/references/logo-riganti.svg"
                title="IVPA Okná"
                webURL="https://ivpaokna.sk/"
                year={2018}
              />
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
});