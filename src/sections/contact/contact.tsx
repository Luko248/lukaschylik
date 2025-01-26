import { component$, useStore, $ } from "@builder.io/qwik";
import { Container, FormField, Button, Section } from "~/components";

const Contact = component$(() => {
  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    extraField: "",
  });

  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    if (state.extraField) {
      // If honeypot field is filled, discard the form data
      state.fullname = "";
      state.email = "";
      state.subject = "";
      state.message = "";
      alert("Spam detected. Form submission discarded.");
    } else {
      // Handle form submission
      alert("Message Sent!");
      // Add your form submission logic here (e.g., send data to a server)
    }
  });

  return (
    <Section id="contact">
      <Container size="full" className="relative z-10 isolate">
        <h2 class="text-[clamp(3rem,14svb,10rem)] mb-5 font-extrabold uppercase leading-none text-black tracking-widest relative color-transparent content-fade-in">
          Kontakt
        </h2>
        <p class="text-xl leading-relaxed font-light mb-18 text-white content-fade-in">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In voluptate
          quibusdam ab accusantium reiciendis corporis nemo odio sapiente qui
          molestiae delectus animi et sed voluptas aliquam neque, natus quas
          ducimus.
        </p>
        <form
          onSubmit$={handleSubmit}
          class="grid grid-cols-1 gap-6 content-fade-in content-fade-in--entry">
          <FormField
            label="HP"
            type="text"
            name="extraField"
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
            label="Vaše správa"
            type="textarea"
            name="message"
            value={state.message}
            onInput$={(e) =>
              (state.message = (e.target as HTMLTextAreaElement).value)
            }
            required
          />
          <Button type="submit" title="sent" variant="primary">
            Odoslať
          </Button>
        </form>
      </Container>
    </Section>
  );
});

export default Contact;
