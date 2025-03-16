import {
  component$,
  useStore,
  $,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Container, FormField, Button, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

const Contact = component$(() => {
  const location = useLocation();
  const formStatus = useSignal<"idle" | "success" | "error">("idle");
  const errorMessage = useSignal("");

  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    extraField: "",
  });

  // Check URL parameters for form submission status
  useVisibleTask$(({ track }) => {
    track(() => location.url.searchParams);

    const status = location.url.searchParams.get("status");
    const message = location.url.searchParams.get("message");

    if (status === "success") {
      formStatus.value = "success";
      // Reset form on success
      state.fullname = "";
      state.email = "";
      state.subject = "";
      state.message = "";
    } else if (status === "error") {
      formStatus.value = "error";

      // Set error message based on the message parameter
      switch (message) {
        case "spam":
          errorMessage.value = "Spam detected. Form submission discarded.";
          break;
        case "missing":
          errorMessage.value = "Please fill in all required fields.";
          break;
        case "invalid_email":
          errorMessage.value = "Please enter a valid email address.";
          break;
        case "send_failed":
          errorMessage.value = "Failed to send email. Please try again later.";
          break;
        default:
          errorMessage.value = "An error occurred. Please try again.";
      }
    }
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
      formStatus.value = "error";
      errorMessage.value = "Spam detected. Form submission discarded.";
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
        <p class="text-l lg:text-xl leading-relaxed font-light mb-18">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In voluptate
          quibusdam ab accusantium reiciendis corporis nemo odio sapiente qui
          molestiae delectus animi et sed voluptas aliquam neque, natus quas
          ducimus.
        </p>

        {/* Status messages */}
        {formStatus.value === "success" && (
          <div
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
            role="alert">
            <p class="font-bold">Správa odoslaná!</p>
            <p>Ďakujeme za vašu správu. Čoskoro vás budeme kontaktovať.</p>
          </div>
        )}

        {formStatus.value === "error" && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            role="alert">
            <p class="font-bold">Chyba!</p>
            <p>{errorMessage.value}</p>
          </div>
        )}

        <form
          action="/send-email.php"
          method="POST"
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
          <Button type="submit" title="Odoslať" variant="primary">
            Odoslať
          </Button>
        </form>
      </Container>
    </Section>
  );
});

export default Contact;
