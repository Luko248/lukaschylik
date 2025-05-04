import { component$ } from "@builder.io/qwik";
import { Button, Container, FormField, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

const Newsletter = component$(() => {
  return (
      <Section id="contact" className="bg-white">
        
     <Container size="sm" className="relative z-10 isolate">
      <SectionTitle text="Newsletter" size="sm" center dark />
      <form action="" method="post" class="flex flex-row gap-4 sm:gap-6 items-end">
          <FormField
          className="flex-1"
            label="Váš email"
            type="email"
            name="newsletter_email"
            placeholder="john.doe@email.com"
            value=""
            onInput$={() => {}}
            required
          />
         <Button type="submit" title="Odoberať" variant="primary">
            Odoberať
          </Button>
      </form>
      <small className="mt-4 text-center">Stay updated with our newsletter!</small>
    </Container>
   </Section>
  );
});

export default Newsletter;
