import { component$, useStore, $ } from "@builder.io/qwik";
import { Container, FormField, Button, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

const Contact = component$(() => {
  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    extraField: "",
  });

  // Client-side honeypot check as a fallback
  const handleSubmit = $((e: Event) => {
    if (state.extraField) {
      e.preventDefault();
      // If honeypot field is filled, discard the form data
      state.fullname = "";
      state.email = "";
      state.subject = "";
      state.message = "";
      alert("Spam detected. Form submission discarded.");
    }
  });

  return (
    <Section id="contact" className="bg-white ">
      <Container size="full" className="relative z-10 isolate">
        <SectionTitle
          text="Kontakt"
          className="content-fade-in--entry"
          dark={true}
        />
        <p class="text-l lg:text-xl leading-relaxed font-light mb-10 sm:mb-18 font-mono">
          Chcete vedieť o mne viac, potrebujete poradiť alebo chcete rovno
          naviazať spoluprácu? <strong> Neváhajte ma kontaktovať.</strong>
        </p>

        <form
          action="https://formsubmit.co/chylik.lukas@gmail.com"
          method="POST"
          onSubmit$={handleSubmit}
          class="grid grid-cols-1 gap-4 sm:gap-6 content-fade-in content-fade-in--entry">
          {/* FormSubmit configuration */}
          <input
            type="hidden"
            name="_subject"
            value="New contact form submission"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://lukaschylik.sk/?formSubmitted=true"
          />

          {/* Honeypot field - FormSubmit will automatically detect this */}
          <FormField
            label="HP"
            type="text"
            name="_honey"
            value={state.extraField}
            onInput$={(e) =>
              (state.extraField = (e.target as HTMLInputElement).value)
            }
            className="hidden"
          />
          <FormField
            label="Celé meno"
            type="text"
            name="fullname"
            value={state.fullname}
            onInput$={(e) =>
              (state.fullname = (e.target as HTMLInputElement).value)
            }
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onInput$={(e) =>
              (state.email = (e.target as HTMLInputElement).value)
            }
            required
          />
          <FormField
            label="Predmet"
            type="text"
            name="subject"
            value={state.subject}
            onInput$={(e) =>
              (state.subject = (e.target as HTMLInputElement).value)
            }
            required
          />
          <FormField
            label="Vaša správa"
            type="textarea"
            name="message"
            value={state.message}
            onInput$={(e) =>
              (state.message = (e.target as HTMLTextAreaElement).value)
            }
            required
          />
          <Button type="submit" title="Odoslať" variant="primary">
            Odoslať
          </Button>
        </form>
      </Container>
    </Section>
  );
});

export default Contact;
