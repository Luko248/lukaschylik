import { component$, useStore, $ } from "@builder.io/qwik";
import { Container, FormField, Button, Section } from "~/components";
import SectionTitle from "~/components/section/section.title";

const Contact = component$(() => {
  const state = useStore({
    fullname: "",
    email: "",
    subject: "",
    message: "",
    submitting: false,
  });

  // Handle form submission
  const handleSubmit = $((event: SubmitEvent) => {
    event.preventDefault();

    if (state.submitting) return;
    state.submitting = true;

    // Get form data
    const formData = new FormData(event.target as HTMLFormElement);

    // Send form data using fetch
    fetch("https://formsubmit.co/ajax/chylik.lukas@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then(() => {
        // Reset form
        state.fullname = "";
        state.email = "";
        state.subject = "";
        state.message = "";

        // Add URL parameter to show success message and redirect
        window.location.href = `${window.location.pathname}?formSubmitted=true`;
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        // Display error message (will be shown on the form itself)
        state.submitting = false;
        alert("Odoslanie správy zlyhalo. Skúste to znova, prosím.");
      })
      .finally(() => {
        state.submitting = false;
      });
  });

  return (
    <Section id="contact" className="bg-white ">
      <Container size="full" className="relative z-10 isolate">
        <SectionTitle
          text="Kontakt"
          className="content-fade-in--entry"
          dark={true}
        />
        <p class="text-l lg:text-xl leading-relaxed font-light mb-10 sm:mb-18 font-mono content-fade-in">
          Chcete vedieť o mne viac, potrebujete poradiť alebo chcete rovno
          naviazať spoluprácu? <strong> Neváhajte ma kontaktovať.</strong>
        </p>

        <form
          onSubmit$={handleSubmit}
          class="grid grid-cols-1 gap-4 sm:gap-6 content-fade-in content-fade-in--entry">
          {/* FormSubmit configuration */}
          <input
            type="hidden"
            name="_subject"
            value="New contact form submission"
          />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_format" value="json" />
          <FormField
            label="HP"
            type="text"
            name="_honey"
            value=""
            onInput$={() => {}}
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
          <Button
            type="submit"
            title="Odoslať"
            variant="primary"
            disabled={state.submitting}>
            {state.submitting ? "Odosielam..." : "Odoslať"}
          </Button>
        </form>
      </Container>
    </Section>
  );
});

export default Contact;
