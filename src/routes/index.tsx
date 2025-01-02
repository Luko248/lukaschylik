import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import Intro from "~/sections/intro/intro";

export default component$(() => {
  return (
    <>
      <Intro />
      <section id="skills">
        <Container>
          <h2>Skills</h2>
        </Container>
      </section>
      <section id="reference" >
        <Container size="lg">
          <h2>Reference</h2>
          <div>
            <div></div>
            <ul>
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
