import { component$ } from "@builder.io/qwik";
import { Card } from "~/components";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";

const References = component$(() => {
  return (
    <Section id="services">
      <Container size="full">
        <SectionTitle text="Služby" />
        <div class="content-fade-in">
          <p class="text-l lg:text-xl leading-relaxed font-light mb-18 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
            blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
            Quis, facere?
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-18 content-fade-in content-fade-in--entry">
          <Card title="Consultations" path="#services">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
              blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
              Quis, facere?
            </p>
          </Card>
          <Card title="Workshops" path="#services">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
              blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
              Quis, facere?
            </p>
          </Card>
          <Card title="Mentorship" path="#services">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
              blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
              Quis, facere?
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
});

export default References;
