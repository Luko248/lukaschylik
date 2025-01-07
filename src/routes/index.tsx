import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import About from "~/sections/about/about";

export default component$(() => {
  return (
    <>
      <About />
      {/* <section id="reference" class="min-h-screen relative py-section-block">
        <Container size="lg">
          <h2 class="absolute inset-x-1/2 top-1/2 text-[clamp(4.5rem,35svb,16rem)] uppercase font-extrabold tracking-widest text-[hsl(0_0%_100%_/_0)] opacity-0 translate-x-half translate-y-[calc(-50svb+100%)] animate-moveToTop">
            Reference
          </h2>
          <div class="grid grid-cols-[5fr_8fr] gap-section-inline isolate">
            <div></div>
            <ul class="list-none p-0 m-0">
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
      </section> */}
    </>
  );
});
